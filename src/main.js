import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import registerIcon from './plugins/element-icon'
import directives from './directives'

import SvgIcon from './components/SvgIcon.vue'
import Pagination from './components/Pagination.vue'

import './assets/icons'
import './assets/element/index.scss'
import './assets/style/normallize.scss'

import './assets/markdown/github-markdown/index.scss'

const app = createApp(App)
installElementPlus(app)
registerIcon(app)

app.component('SvgIcon', SvgIcon)
app.component('Pagination', Pagination)

app.use(store).use(router)
app.use(directives)
router.isReady().then(() => app.mount('#app'))
