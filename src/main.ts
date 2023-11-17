import { createApp } from 'vue'
import App from './App.vue'
import { setupPinia } from '@jetlinks/stores'
import { initRoute } from '@jetlinks/router'
import { initPackages } from './package'
import { setupRouter } from '@/router/guard'
import { initStoreBus } from '@/store'
import globalComponents from '@jetlinks/components'
import components from './components'
import './style.css'

(async () => {
    const app = createApp(App)

    setupPinia(app)



    await initPackages()

    const router = initRoute()

    app.use(router)

    await initStoreBus()
    await setupRouter()

    app.use(globalComponents)
    app.use(components)

    app.mount('#app')
})()
