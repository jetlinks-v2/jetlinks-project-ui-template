import { createApp } from 'vue'
import App from './App.vue'
import { setupPinia } from '@jetlinks-web/stores'
import { initRoute } from '@jetlinks-web/router'
import { initPackages } from './package'
import { setupRouter } from '@/router/guard'
import { initStoreBus } from '@/store'
import globalComponents from '@jetlinks-web/components'
import components from './components'
import './style.css'
import {LOGIN_ROUTE} from "@/router/basic";

(async () => {
    const app = createApp(App)

    setupPinia(app)

    await initPackages()

    const router = initRoute({ Login: LOGIN_ROUTE})

    app.use(router)

    await initStoreBus()
    await setupRouter()

    app.use(globalComponents)
    app.use(components)

    app.mount('#app')
})()
