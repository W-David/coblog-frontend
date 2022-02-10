import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import registerIcon from './plugins/element-icon'
import 'highlight.js/styles/monokai-sublime.css'

const app = createApp(App)
installElementPlus(app)
registerIcon(app)
app.use(store).use(router).mount('#app')
