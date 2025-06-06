 import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueAmapResolver } from '@vuemap/unplugin-resolver'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import monacoEditorPlugin from './configs/plugin/monaco-editor'
 import { registerModulesAlias, backupModulesFile, restoreModulesFile, updateModulesFile, handleRestoreModulesFile, copyFile, copyImagesPlugin } from './configs/plugin'
 import { NO_MODULE, DEFAULT_POINT } from './configs/contst'
import progress from 'vite-plugin-progress'
import * as path from 'path'

 // process.on('SIGINT', handleRestoreModulesFile)
 // process.on('SIGTERM', handleRestoreModulesFile)
 // process.on('uncaughtException', handleRestoreModulesFile)
 // process.on('unhandledRejection', handleRestoreModulesFile)

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd())

    let modulesName
    let isModule = false

    if (String(command) === 'build') {
        backupModulesFile();
        modulesName = process.argv.find(arg => arg.startsWith('--modules='))?.split('=')[1] || DEFAULT_POINT;
        // updateModulesFile(modulesName)
    }

    isModule = modulesName && ![DEFAULT_POINT, NO_MODULE].includes(modulesName)

    return {
        base: './',
        resolve: {
            alias: [
                { find: '@', replacement: path.resolve(__dirname, 'src') },
                { find: /^@jetlinks-web\/components$/, replacement: '@jetlinks-web/components/es' },
                { find: /^ant-design-vue$/, replacement: 'ant-design-vue/es' },
                ...registerModulesAlias('array') as Array<Record<string, string>>
            ]
            // alias: {
            //     '@': path.resolve(__dirname, 'src'),
            //     ...registerModulesAlias()
            // },
        },
        build: {
            outDir: isModule ? `src/modules/${modulesName}/dist` : 'dist',
            assetsDir: isModule ? `src/modules/${modulesName}/assets` : 'assets',
            sourcemap: true,
            cssCodeSplit: false,
            manifest: true,
            chunkSizeWarningLimit: 2000,
            assetsInlineLimit: 1000,
            rollupOptions: {
                external: ['vue', 'vue-router', 'pinia', 'lodash-es', 'vue-i18n', 'axios', 'dayjs', 'vue-i18n'],
                output: {
                    entryFileNames: `assets/[name].${ new Date().getTime() }.js`,
                    chunkFileNames: `assets/[name].${ new Date().getTime() }.js`,
                    assetFileNames: (pre) => {
                        const fileType = pre.name.split('.')?.pop()
                        if (['png', 'svg', 'ico', 'jpg'].includes(fileType)) {
                            return `assets/[name].[ext]`
                        }
                        return `assets/[name].${ new Date().getTime() }.[ext]`
                    },
                    compact: true,
                    manualChunks: {
                        'echarts': ['echarts'],
                        'ant-design-vue': ['ant-design-vue'],
                        'JComponents': ['@jetlinks-web/components'],
                    },
                    globals: {
                        vue: 'Vue',
                        'vue-router': 'VueRouter',
                        'pinia': 'Pinia',
                        'vue-i18n': 'VueI18n',
                        'axios': 'axios',
                        'dayjs': 'dayjs',
                        'lodash-es': '_'
                    }
                },
            },
        },
        plugins: [
            vue(),
            vueJsx(),
            VueSetupExtend(),
            monacoEditorPlugin({
                languageWorkers: [ 'editorWorkerService', 'json', 'typescript']
            }),
            Components({
                resolvers: [
                    VueAmapResolver(),
                ],
                directoryAsNamespace: true,
            }),
            AutoImport({
                imports: ['vue', 'vue-router'],
                dts: 'src/auto-imports.d.ts',
                resolvers: [VueAmapResolver()],
            }),
            progress(),
            // {
            //     name: 'vite-plugin-error-handler',
            //     buildEnd(error) {
            //         if (error) {
            //             console.error('Build failed:', error);
            //             handleRestoreModulesFile();
            //         }
            //     }
            // },
            restoreModulesFile(),
            copyFile(isModule ? modulesName : ''),
            copyImagesPlugin(isModule)
        ],
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT),
            cors: true,
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: 'http://192.168.33.52:8844',
                    // target: 'http://192.168.32.233:8601', // 王
                    // target: 'http://192.168.35.114:8844',
                    // target: 'http://192.168.33.210:8800',
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
                '@jetlinks-web/components'
            ],
        },
    }
})
