import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import registerIcon from './plugins/element-icon'
import 'highlight.js/styles/monokai-sublime.css'
import Pagination from './components/Pagination.vue'

const app = createApp(App)
installElementPlus(app)
registerIcon(app)
app.component('Pagination', Pagination)
app.use(store).use(router).mount('#app')
