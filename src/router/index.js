import { createRouter, createWebHashHistory } from 'vue-router'
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCurrentInstance } from 'vue'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/home')
const About = () => import(/* webpackChunkName: "about" */ '@/views/about')
const Tag = () => import(/* webpackChunkName: "tag" */ '@/views/tag')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
const Article = () => import(/* webpackChunkName: "article" */ '@/views/article')
const Category = () => import(/* webpackChunkName: "category" */ '@/views/category')
const Register = () => import(/* webpackChunkName: "register" */ '@/views/register.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/tag',
    name: 'tag',
    component: Tag
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

NProgress.configure({ showSpinner: false })
const { msgSuccess, msgError } = getCurrentInstance().proxy
const whiteList = ['/login', '/register']
const redirectList = ['/login']

const token = state.getters.token
const userInfo = state.getters.userInfo
const isLogin = state.getters.isLogin

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const needRedirect = redirectList.includes(to.path)
  const isWhiteList = whiteList.includes(to.path)

  if (isLogin) {
    //已登录则一定存在token,对登录页重定向
    needRedirect ? next({ path: '/' }) : next()
  } else {
    if (token) {
      if (needRedirect) {
        //未登录但存在token代表登陆过，同样对登录页重定向
        next({ path: '/' })
      } else {
        if (!userInfo) {
          //未获取userInfo
          const [err, res] = await store.dispatch('GetInfo')
          if (!err) {
            msgSuccess(`欢迎您, ${res.data.username}, 您已成功登录`)
            next()
          } else {
            msgError(`${err?.msg || err.message}, 登录失败`)
            next({ path: '/' })
          }
        } else {
          //已获取用户信息
          next()
        }
      }
    } else {
      // 没有token
      isWhiteList ? next() : next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
