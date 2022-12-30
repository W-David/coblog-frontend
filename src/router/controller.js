import { ElMessage } from 'element-plus'
import { setToken, getToken, encodeToken, getUserType, removeToken, removeUserType } from '@/util/auth'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
const whiteList = ['login', 'home', 'article', 'tag', 'category', 'about']
const redirectList = ['login']

const controller = router => {
  router.beforeEach(async (to, from) => {
    NProgress.start()

    const token = getToken() || ''
    const userType = getUserType() || ''
    const isUserLogin = store.getters.isUserLogin
    const isAdminLogin = store.getters.isAdminLogin
    const isLogin = isUserLogin || isAdminLogin

    const needRedirect = redirectList.includes(to.name)
    const isWhiteList = whiteList.includes(to.name)

    if (token) {
      //登录过，存在token
      if (isLogin) {
        if (needRedirect) {
          // return { path: '/' }
          return { name: 'layout' }
        } else {
          return
        }
      } else {
        if (userType === 'admin') {
          const res = await store.dispatch('admin/GetInfo')
          if (res.code === 200) {
            ElMessage({ type: 'success', message: `欢迎回来，${res.data.nickname}`, showClose: false })
            // return { path: '/' }
            return { name: 'layout' }
          } else {
            // return { path: '/login' }
            return { name: 'login' }
          }
        } else if (userType === 'user') {
          const res = await store.dispatch('user/GetInfo')
          if (res.code === 200) {
            ElMessage({ type: 'success', message: `欢迎回来，用户${res.data.username}`, showClose: false })
            // return { path: '/' }
            return { name: 'layout' }
          } else {
            // return { path: '/login' }
            return { name: 'login' }
          }
        } else {
          ElMessage({ type: 'error', message: '未知用户,无法登录', showClose: false })
          removeToken()
          removeUserType()
          // return { path: '/login' }
          return { name: 'login' }
        }
      }
    } else {
      // 没有登录信息
      if (!isWhiteList) {
        ElMessage({ showClose: false, type: 'warning', message: `请先登录` })
        // return { path: '/login' }
        return { name: 'login' }
      } else {
        return
      }
    }
  })

  router.afterEach((to, from) => {
    NProgress.done()
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transitionName =
      toDepth === fromDepth ? 'fade' : toDepth < fromDepth ? 'slide-fade-left' : 'slide-fade-right'
  })

  return router
}

export default controller
