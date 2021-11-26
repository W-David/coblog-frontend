import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
const userToken = 'COBLOG_TOKEN'

const encodeToken = () => {
  const token = getToken()
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

const getToken = () => {
  return Cookies.get(userToken)
}

const setToken = (token) => {
  return Cookies.set(userToken, token)
}

const removeToken = () => {
  return Cookies.remove(userToken)
}

export default {
  encodeToken,
  getToken,
  setToken,
  removeToken
}
