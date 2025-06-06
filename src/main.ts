import { createApp } from 'vue'
import App from './App.vue'

import pinia from '@/store'
import i18n from '@/locales'
import JetLinksComponents from '@jetlinks-web/components/es'
import components from './components'
import directive from '@/directive'
import dayjs from 'dayjs'
import { loadMicroApp, initAxios } from '@/package'
import * as Antd from 'ant-design-vue/es'

import 'ant-design-vue/dist/antd.variable.min.css'
import 'vue3-json-viewer/dist/index.css'
import 'xgplayer/dist/index.min.css'
import '@jetlinks-web/components/es/style/index.less'
import '@/style/global.less'
import 'dayjs/locale/zh-cn'
import microApp from '@micro-zoe/micro-app'

dayjs.locale('zh-cn')

initAxios()
loadMicroApp()

if (import.meta.env.VITE_MICRO_APP) {
  microApp.start({
    iframe: true
  })
}



// 👇 用 async 包装启动逻辑
async function bootstrap() {
  const router = await import('@/router').then(mod => mod.default)

  const app = createApp(App)

  // // 全量注册组件（遍历注册）
  // Object.keys(Antd).forEach((key) => {
  //   const comp = Antd[key];
  //   // 某些可能不是组件（如 message, notification）
  //   if (comp && comp.install) {
  //     app.use(comp);
  //   }
  // });
  //
  // // 全量注册组件（遍历注册）
  // Object.keys(JetLinksComponents).forEach((key) => {
  //   const comp = JetLinksComponents[key];
  //   // 某些可能不是组件（如 message, notification）
  //   if (comp && comp.install) {
  //     app.use(comp);
  //   }
  // });

  app.provide('appInstance', app)
    .use(pinia)
    .use(router)       // ✅ 异步引入后的 router
    .use(directive)
    .use(i18n)
    .use(components)
    .use(Antd)
    .use(JetLinksComponents)
    .mount('#app')
}

bootstrap()
