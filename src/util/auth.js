import Cookies from 'js-cookie'
import {Base64} from 'js-base64'
const userToken = 'COBLOG_TOKEN'
const userType = 'COBLOG_USERTYPE'

export function encodeToken() {
	const token = getToken()
	const base64 = Base64.encode(token + ':')
	return 'Basic ' + base64
}

export function getToken() {
	return Cookies.get(userToken)
}

export function setToken(token) {
	return Cookies.set(userToken, token)
}

export function removeToken() {
	return Cookies.remove(userToken)
}

export function setUserType(type) {
	return Cookies.set(userType, type)
}

export function getUserType() {
	return Cookies.get(userType)
}

export function removeUserType() {
	return Cookies.remove(userType)
}
