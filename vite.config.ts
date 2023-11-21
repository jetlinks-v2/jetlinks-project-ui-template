import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {VueAmapResolver} from '@vuemap/unplugin-resolver'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import * as path from 'path'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import { JetlinksVueResolver } from './configs/plugin'
import { optimizeDeps } from './configs/plugin/optimize'
import progress from 'vite-plugin-progress'

// https://vitejs.dev/config/
export default defineConfig(({ mode}) => {
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());

  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      cssCodeSplit: false,
      manifest: true,
      chunkSizeWarningLimit: 2000,
      assetsInlineLimit: 1000,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia']
          },
        },
      },
    },
    plugins: [
      vue(),
      monacoEditorPlugin({}),
      vueJsx(),
      optimizeDeps(),
      Components({
        resolvers: [JetlinksVueResolver({ importStyle: 'less' }), VueAmapResolver()],
        directoryAsNamespace: true
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router'
        ],
        dts: 'src/auto-imports.d.ts',
        resolvers: [VueAmapResolver()],
      }),
      VueSetupExtend(),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()]
      }),
      progress()
    ],
    server: {
      host:'0.0.0.0',

      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://192.168.33.46:8844', // 本地开发环境
          ws: 'ws://192.168.33.46:8844',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'root-entry-name': 'variable',
            hack: `true; @import (reference) "${path.resolve('src/style/variable.less')}";`,
          },
          javascriptEnabled: true,
        }
      }
    },
    optimizeDeps: {
      include: ['pinia', 'vue-router', 'axios', 'lodash-es', '@vueuse/core', 'echarts', 'dayjs'],
    }
  }
})
