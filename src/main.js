import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import registerIcon from './plugins/element-icon'

import SvgIcon from './components/SvgIcon.vue'
import Pagination from './components/Pagination.vue'

import './assets/icons'
import 'highlight.js/styles/monokai-sublime.css'

const app = createApp(App)
installElementPlus(app)
registerIcon(app)

app.component('svg-icon', SvgIcon)
app.component('pagination', Pagination)

app.use(store).use(router)
router.isReady().then(() => app.mount('#app'))
