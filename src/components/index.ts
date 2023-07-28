import type { App } from 'vue'
import TitleComponent from './TitleComponent/index.vue'
import ImageUpload from "./Upload/Image/ImageUpload.vue";

export default  {
    install(app: App) {
        app.component('TitleComponent', TitleComponent)
          .component('ImageUpload', ImageUpload)
    }
}
