import { createApp } from 'vue'
import App from './App.vue'
import { initPackages } from './package'
import router from '@/router'
import pinia from '@/store'
import i18n from '@/locales'
import JetlinksComponents from '@jetlinks-web/components'
import components from './components'
import 'ant-design-vue/dist/antd.variable.min.css'
import './style.css'
import directive from '@/directive'

const app = createApp(App)
initPackages()

app
    .use(pinia)
    .use(router)
    .use(directive) // 注册自定义指令
    .use(i18n)
    .use(JetlinksComponents) // 注册脚手架通用组件
    .use(components) // 注册自定义通用组件
    .mount('#app')
