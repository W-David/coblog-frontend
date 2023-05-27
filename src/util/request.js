import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {ElMessage} from 'element-plus'
import {encodeToken} from './auth'
import {session} from './cache'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const controller = new AbortController()
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 30000
})

service.interceptors.request.use(
	req => {
		//是否需要token, 默认需要
		const isUnToken = (req.headers || {isToken: true}).isToken === false
		//防止频繁重复提交请求, 默认开启
		const isUnRepeatSubmit = (req.headers || {isRepeatSubmit: true}).isRepeatSubmit === false

		const token = encodeToken()
		if (token && !isUnToken) {
			req.headers['Authorization'] = token
		}
		if (!isUnRepeatSubmit) {
			req.signal = controller.signal
			const reqKey = 'req-cache'
			const reqObj = {
				url: req.url,
				method: req.method,
				data: typeof req.data === 'object' ? JSON.stringify(req.data) : req.data,
				params: typeof req.params === 'object' ? JSON.stringify(req.params) : req.params,
				time: new Date().getTime()
			}
			const reqCache = session.getJSON(reqKey)
			if (!reqCache) {
				session.setJSON(reqKey, reqObj)
			} else {
				//时间小于500ms视为频繁请求
				const interval = 500
				const {url: c_url, data: c_data, params: c_params, method: c_method, time: c_time} = reqCache
				const {url, data, params, method, time} = reqObj
				const isRepeatRequest = c_method === method && c_url === url && c_params === params && c_data === data && time - c_time < interval
				if (isRepeatRequest) {
					console.warn(`${url} 已在加载中`)
					controller.abort()
				} else {
					session.setJSON(reqKey, reqObj)
				}
			}
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
			ElMessage({type: 'warning', message: msg, showClose: false})
		}
		return res.data
	},
	error => {
		let {message} = error
		//请求被取消
		if (message === 'canceled') {
			return Promise.reject(error)
		}
		//网络异常处理
		if (message == 'Network Error') {
			message = '网络异常'
		} else if (message.includes('timeout')) {
			message = '请求超时'
		} else if (message.includes('Request failed with status code')) {
			message = '接口 ' + message.substr(message.length - 3) + ' 异常'
		}
		ElMessage({showClose: false, message: message, type: 'error'})
		return Promise.reject(error)
	}
)

export default service
