import { createApp } from 'vue'
import App from './App.vue'
import { initPackages } from './package'
import { initRoute } from '@/router'
import { LOGIN_ROUTE } from '@/router/basic'
import pinia from '@/store'
import i18n from '@/locales'
import globalComponents from '@jetlinks-web/components'
import components from './components'
import 'ant-design-vue/dist/antd.variable.min.css'
import './style.css'
import directive from '@/directive'
import { setupRouter } from './router/guard'

( async () => {
  const app = createApp(App)
  initPackages()
  const router = initRoute({Login: LOGIN_ROUTE})
  app
    .use(pinia)
    .use(router)
    .use(directive) // 注册自定义指令
    .use(i18n)
    .use(globalComponents) // 注册脚手架通用组件
    .use(components) // 注册自定义通用组件
    .mount('#app')
  await setupRouter()
} )()
