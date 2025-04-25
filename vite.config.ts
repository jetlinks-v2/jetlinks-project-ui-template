import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { VueAmapResolver } from '@vuemap/unplugin-resolver'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import * as path from 'path'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import { optimizeDeps, registerModulesAlias, backupModulesFile, restoreModulesFile, updateModulesFile, handleRestoreModulesFile, copyFile, copyImagesPlugin } from './configs/plugin'
import { NO_MODULE, DEFAULT_POINT } from './configs/contst'
import progress from 'vite-plugin-progress'
import federation from '@originjs/vite-plugin-federation'

process.on('SIGINT', handleRestoreModulesFile)
process.on('SIGTERM', handleRestoreModulesFile)
process.on('uncaughtException', handleRestoreModulesFile)
process.on('unhandledRejection', handleRestoreModulesFile)

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd())
  let modulesName
  let isModule = false

    if (String(command) === 'build') {
        backupModulesFile();
        modulesName = process.argv.find(arg => arg.startsWith('--modules='))?.split('=')[1] || DEFAULT_POINT;
        updateModulesFile(modulesName)
    }

    isModule = modulesName && ![DEFAULT_POINT, NO_MODULE].includes(modulesName)

    let buildConfig = {}

    if (isModule) {
        buildConfig = {
            lib: {
                entry: path.resolve(__dirname, `src/modules/${modulesName}/plugins/index.ts`),
                name: 'plugin-components',
                fileName: 'plugin-components'
            },
            rollupOptions: {
                external: ['vue', '@jetlinks-web/core', '@jetlinks-web/utils', '@jetlinks-web/hooks'],
                output: {
                    globals: {
                        vue: 'Vue',
                        '@jetlinks-web/core': '@jetlinks-web/core',
                        '@jetlinks-web/utils': '@jetlinks-web/utils',
                        '@jetlinks-web/hooks': '@jetlinks-web/hooks'
                    }
                },
            }
        }
    }

    return {
        base: './',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                ...registerModulesAlias(),
                vue: 'vue',
                '@jetlinks-web/core': '@jetlinks-web/core',
                '@jetlinks-web/utils': '@jetlinks-web/utils',
                '@jetlinks-web/hooks': '@jetlinks-web/hooks',
            },
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            // 可选，如果用到其它 process 变量
            'process.env': {
                'VITE_APP_BASE_API': '/api',
                'VITE_TOKEN_KEY': 'X-Access-Token',
                'VITE_TOKEN_KEY_URL': ':X_Access_Token'
            },
        },
        build: {
            outDir: isModule ? `src/modules/${modulesName}/dist` : 'dist',
            assetsDir: isModule ? `src/modules/${modulesName}/assets` : 'assets',
            sourcemap: false,
            cssCodeSplit: false,
            manifest: true,
            chunkSizeWarningLimit: 2000,
            assetsInlineLimit: 4000,
            rollupOptions: {
                external: ['vue', '@jetlinks-web/core', '@jetlinks-web/utils', '@jetlinks-web/hooks'],
                output: {
                    entryFileNames: `assets/[name].js`,
                    chunkFileNames: `assets/[name].js`,
                    assetFileNames: (pre) => {
                        const fileType = pre.name.split('.')?.pop()
                        if (['png', 'svg', 'ico', 'jpg'].includes(fileType)) {
                            return `images/[name].[ext]`
                        }
                        return `assets/[name].[ext]`
                    },
                    compact: true,
                    manualChunks: {
                        vue: ['vue-router', 'pinia'],
                    },
                    globals: {
                        vue: 'Vue',
                        '@jetlinks-web/core': '@jetlinks-web/core',
                        '@jetlinks-web/utils': '@jetlinks-web/utils',
                        '@jetlinks-web/hooks': '@jetlinks-web/hooks'
                    }
                },
            },
            ...buildConfig,
        },
        plugins: [
            vue(),
            vueJsx(),
            VueSetupExtend(),
            monacoEditorPlugin({}),
            optimizeDeps(),
            Components({
                resolvers: [
                    AntDesignVueResolver({
                        resolveIcons: true,
                        importStyle: 'less',
                    }),
                    VueAmapResolver(),
                ],
                directoryAsNamespace: true,
            }),
            AutoImport({
                imports: ['vue', 'vue-router'],
                dts: 'src/auto-imports.d.ts',
                resolvers: [VueAmapResolver()],
            }),
            createStyleImportPlugin({
                resolves: [AndDesignVueResolve()],
            }),
            progress(),
            {
                name: 'vite-plugin-error-handler',
                buildEnd(error) {
                    if (error) {
                        console.error('Build failed:', error);
                        handleRestoreModulesFile();
                    }
                }
            },
            restoreModulesFile(),
            copyFile(isModule ? modulesName : ''),
            copyImagesPlugin(isModule),
        ],
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT),
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_APP_DEV_PROXY_URL,
                    ws: true,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
                }
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        'root-entry-name': 'variable',
                        hack: `true; @import (reference) "${ path.resolve(
                            'src/style/variable.less',
                        ) }";`,
                    },
                    javascriptEnabled: true,
                },
            },
        },
        optimizeDeps: {
            include: [
                'pinia',
                'vue-router',
                'axios',
                'lodash-es',
                '@vueuse/core',
                'echarts',
                'dayjs',
            ],
        },
    }
})
