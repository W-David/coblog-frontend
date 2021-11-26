import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getCurrentInstance } from 'vue'

const { msgConfirm, msgError, msgWarning } = getCurrentInstance().proxy

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseUrl: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

service.interceptors.request.use(
  req => {
    const token = store.getters.token || ''
    //若无需token的接口将notToken置为真
    const needToken = !req.headers.notToken
    if (needToken && !!token) {
      req.headers['Authorization'] = 'Basic ' + token
    }
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    const code = res.data.code || 500
    const msg = res.data.msg || '未知错误'
    if (res.status === 200 && code === 200) {
      return res
    } else {
      //已知错误提示并处理
      msgError(msg)
      if (code === 401) {
        //token过期处理
        store.dispatch('Logout').then(() => {
          router.push({ path: '/login' })
        })
      }
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
