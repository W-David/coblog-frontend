import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { encodeToken } from './auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

service.interceptors.request.use(
  req => {
    const token = encodeToken()
    //若无需token的接口将notToken置为真
    const needToken = !req.headers.notToken
    if (needToken && !!token) {
      req.headers['Authorization'] = token
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
    const rowMsg = res.data.msg || '未知错误'
    const msg = Object.prototype.toString.call(rowMsg) === '[object Array]' ? rowMsg[0] : rowMsg
    if (!(res.status === 200 && code === 200)) {
      ElMessage({ type: 'warning', message: msg })
    }
    return res.data
  },
  error => {
    let { message } = error
    //网络异常处理
    if (message == 'Network Error') {
      message = '网络异常'
    } else if (message.includes('timeout')) {
      message = '请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '接口 ' + message.substr(message.length - 3) + ' 异常'
    }
    ElMessage({ showClose: true, message: message, type: 'error' })
    return Promise.reject(error)
  }
)

export default service
