import { setToken, removeToken, setUserType, removeUserType } from '@/util/auth'
import { login, register, detailUser, auth, updateUser } from '@/api/user'
import getOssClient from '@/util/alioss'

const user = {
  namespaced: true,
  state: () => ({
    userInfo: {},
    avatar: '',
    isLogin: false
  }),
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ISLOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    LOGOUT: state => {
      state.isLogin = false
      state.userInfo = {}
      state.avatar = ''
      removeToken()
      removeUserType()
    }
  },
  actions: {
    async SetAvatar({ state, commit }, { store, file }) {
      const client = getOssClient(store)
      const res = await client.put(file.name, file)
      if (res.res.status === 200 && res.res.statusCode === 200) {
        const url = res.url
        commit('SET_AVATAR', url)
        const updateRes = await updateUser({ ...state.userInfo, avatar: url })
        return updateRes.code === 200
      } else {
        return false
      }
    },
    async DeleteAvatar({ state, commit }) {
      commit('SET_AVATAR', '')
      const deleteRes = await updateUser({ ...state.userInfo, avatar: '' })
      return deleteRes.code === 200
    },
    async SetUserInfo({ state, commit }, userInfo) {
      const { username, email } = userInfo
      commit('SET_USERINFO', {
        id: state.userInfo.id,
        username,
        email
      })
      const updateRes = await updateUser({ ...state.userInfo, avatar: state.avatar })
      return updateRes.code === 200
    },
    async Login({ state, commit }, params = {}) {
      const res = await login(params)
      const user = res.data || {}
      const { id, username, email, token, avatar } = user
      if (res.code === 200) {
        commit('SET_ISLOGIN', true)
        commit('SET_AVATAR', avatar || '')
        commit('SET_USERINFO', {
          id,
          username,
          email
        })
        setToken(token)
        setUserType('user')
      } else {
        commit('LOGOUT')
      }
      return res
    },
    async Register({ state, commit }, params = {}) {
      const res = await register(params)
      const user = res.data || {}
      const { id, username, email, token } = user
      if (res.code === 200) {
        commit('SET_ISLOGIN', true)
        commit('SET_USERINFO', {
          id,
          username,
          email
        })
        setToken(token)
        setUserType('user')
      } else {
        commit('LOGOUT')
      }
      return res
    },
    async GetInfo({ state, commit }) {
      const res = await auth()
      const user = res.data || {}
      const { id, username, email, avatar } = user
      if (res.code === 200) {
        commit('SET_ISLOGIN', true)
        commit('SET_AVATAR', avatar || '')
        commit('SET_USERINFO', {
          id,
          username: username ? username : '暂无用户名',
          email
        })
        setUserType('user')
      } else {
        commit('LOGOUT')
      }
      return res
    },
    async Logout({ state, commit }) {
      commit('LOGOUT')
    }
  }
}

export default user
