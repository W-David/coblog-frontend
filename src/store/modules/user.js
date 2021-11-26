import { getToken, setToken, removeToken } from '@/util/auth'
import { login, register, detailUser } from '@/api/user'

const user = {
  state: () => ({
    token: getToken(),
    avatar: '',
    userInfo: null,
    isLogin: false
  }),
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ISLOGIN: (state, status) => {
      state.isLogin = status
    }
  },
  actions: {
    async Login({ state, commit }, params = {}) {
      const [err, res] = await login(params)
      if (!err) {
        const user = res.data.data
        const { token } = user
        commit('SET_ISLOGIN', true)
        setToken(token)
        return [null, res]
      } else {
        return [err, null]
      }
    },
    async Register({ state, commit }, params = {}) {
      const [err, res] = await register(params)
      if (!err) {
        const user = res.data.data
        const { token } = user
        commit('SET_ISLOGIN', true)
        setToken(token)
        return [null, res]
      } else {
        return [err, null]
      }
    },
    async GetInfo({ state, commit }, params = {}) {
      const [err, res] = await detailUser(params)
      if (!err) {
        const user = res.data.data
        const { id, username, email } = user
        commit('SET_USERINFO', {
          id,
          username,
          email
        })
        return [null, res]
      } else {
        return [err, null]
      }
    },
    async Logout({ state, commit }) {
      return new Promise((rs, rj) => {
        try {
          removeToken()
          commit('SET_ISLOGIN', false)
          commit('SET_USERINFO', null)
          rs([null, true])
        } catch (err) {
          rj([err, false])
        }
      })
    }
  }
}

export default user
