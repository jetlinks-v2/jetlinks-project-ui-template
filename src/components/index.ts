import type { App } from 'vue'
import TitleComponent from './TitleComponent/index.vue'

export default  {
    install(app: App) {
        app.component('TitleComponent', TitleComponent)
    }
}
