import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { setToken, getToken, encodeToken, getUserType, removeToken, removeUserType } from '@/util/auth'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/home')
const About = () => import(/* webpackChunkName: "about" */ '@/views/about')
const Tag = () => import(/* webpackChunkName: "tag" */ '@/views/tag')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
const Archive = () => import(/* webpackChunkName: "archive" */ '@/views/archive')
const Category = () => import(/* webpackChunkName: "category" */ '@/views/category')
const Blog = () => import(/* webpackChunkName: "blog" */ '@/views/blog')
const Article = () => import(/* webpackChunkName: "article" */ '@/views/article')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
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
    path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/category/:id?',
    name: 'category',
    component: Category
  },
  {
    path: '/tag/:id?',
    name: 'tag',
    component: Tag
  },
  {
    path: '/blog/:id?',
    name: 'blog',
    component: Blog,
    props: true
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/register']
const redirectList = ['/login']

router.beforeEach(async (to, from) => {
  NProgress.start()

  const token = getToken() || ''
  const userType = getUserType() || ''
  const isUserLogin = store.getters.isUserLogin
  const isAdminLogin = store.getters.isAdminLogin
  const isLogin = isUserLogin || isAdminLogin

  const needRedirect = redirectList.includes(to.path)
  const isWhiteList = whiteList.includes(to.path)

  if (token) {
    //登录过，存在token
    if (isLogin) {
      if (needRedirect) {
        return { path: '/' }
      } else {
        return
      }
    } else {
      if (userType === 'admin') {
        const res = await store.dispatch('admin/GetInfo')
        if (res.code === 200) {
          ElMessage({ type: 'success', message: `欢迎回来，管理员${res.data.email}` })
          return { path: '/' }
        } else {
          return { path: '/login' }
        }
      } else if (userType === 'user') {
        const res = await store.dispatch('user/GetInfo')
        if (res.code === 200) {
          ElMessage({ type: 'success', message: `欢迎回来，用户${res.data.email}` })
          return { path: '/' }
        } else {
          return { path: '/login' }
        }
      } else {
        ElMessage({ type: 'error', message: '未知用户,无法登录' })
        removeToken()
        removeUserType()
        return { path: '/login' }
      }
    }
  } else {
    // 没有登录信息
    if (!isWhiteList) {
      ElMessage({ showClose: true, type: 'warning', message: `请先登录` })
      return { path: '/login' }
    } else {
      return
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
