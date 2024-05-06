import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/store'
import i18n from '@/locales'
import JetlinksComponents from '@jetlinks-web/components'
import components from './components'
import 'ant-design-vue/dist/antd.variable.min.css'
import '@jetlinks-web/components/es/style/index.css'
import './style.css'
import directive from '@/directive'
import { LocalStore, setToken } from "@jetlinks-web/utils";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

(window as any).microApp?.addDataListener((data: any) => {
    console.log(data)
    if (data.token) {
        setToken(data.token)
    }

    if (data.appId) {
        LocalStore.set('appId', data.appId)
    }
}, true)

const app = createApp(App)

app.use(pinia)
    .use(router)
    .use(directive) // 注册自定义指令
    .use(i18n)
    .use(JetlinksComponents) // 注册脚手架通用组件
    .use(components) // 注册自定义通用组件
    .mount('#app')
