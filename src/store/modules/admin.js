import {setToken, removeToken, setUserType, removeUserType} from '@/util/auth'
import getOssClient from '@/util/alioss'
import {login, register, detailAdmin, auth, updateAdmin} from '@/api/admin'

const admin = {
	namespaced: true,
	state: () => ({
		adminInfo: {},
		avatar: '',
		isLogin: false
	}),
	mutations: {
		SET_ADMININFO: (state, adminInfo) => {
			state.adminInfo = adminInfo
		},
		SET_ISLOGIN: (state, isLogin) => {
			state.isLogin = isLogin
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		LOGOUT: state => {
			state.isLogin = false
			state.adminInfo = {}
			state.avatar = ''
			removeToken()
			removeUserType()
		}
	},
	actions: {
		async SetAvatar({state, commit}, {store, file}) {
			const client = getOssClient(store)
			const res = await client.put(file.name, file)
			if (res.res.status === 200 && res.res.statusCode === 200) {
				const url = res.url
				commit('SET_AVATAR', url)
				const uploadRes = await updateAdmin({...state.adminInfo, avatar: url})
				return uploadRes.code === 200
			} else {
				return false
			}
		},
		async DeleteAvatar({state, commit}) {
			commit('SET_AVATAR', '')
			const deleteRes = await updateAdmin({...state.adminInfo, avatar: ''})
			return deleteRes.code === 200
		},
		async SetAdminInfo({state, commit}, adminInfo) {
			const {nickname, email} = adminInfo
			commit('SET_ADMININFO', {
				id: state.adminInfo.id,
				nickname,
				email
			})
			const updateRes = await updateAdmin({...state.adminInfo, avatar: state.avatar})
			return updateRes.code === 200
		},
		async Login({state, commit}, params = {}) {
			const res = await login(params)
			const admin = res.data || {}
			const {id, nickname, email, token, avatar} = admin
			if (res.code === 200) {
				commit('SET_ISLOGIN', true)
				commit('SET_AVATAR', avatar || '')
				commit('SET_ADMININFO', {
					id,
					nickname,
					email
				})
				commit('app/TOGGLE_SIDEBAR', false, {root: true})
				setToken(token)
				setUserType('admin')
			} else {
				commit('LOGOUT')
			}
			return res
		},
		async Register({state, commit}, params = {}) {
			const res = await register(params)
			const admin = res.data || {}
			const {id, nickname, email, token} = admin
			if (res.code === 200) {
				commit('SET_ISLOGIN', true)
				commit('SET_ADMININFO', {
					id,
					nickname,
					email
				})
				commit('app/TOGGLE_SIDEBAR', false, {root: true})
				setToken(token)
				setUserType('admin')
			} else {
				commit('LOGOUT')
			}
			return res
		},
		async GetInfo({state, commit}) {
			const res = await auth()
			const admin = res.data || {}
			const {id, nickname, email, avatar} = admin
			if (res.code === 200) {
				commit('SET_ISLOGIN', true)
				commit('SET_AVATAR', avatar)
				commit('SET_ADMININFO', {
					id,
					nickname,
					email
				})
				setUserType('admin')
			} else {
				commit('LOGOUT')
			}
			return res
		},
		async Logout({state, commit}) {
			commit('LOGOUT')
			commit('app/TOGGLE_SIDEBAR', false, {root: true})
		}
	}
}

export default admin
