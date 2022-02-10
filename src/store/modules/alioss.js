import { getSTS } from '@/api/alioss'

const alioss = {
  namespaced: true,
  state: () => ({
    sts: {}
  }),
  mutations: {
    SET_STS(state, sts) {
      state.sts = sts
    }
  },
  actions: {
    async FetchSTS({ commit }) {
      const res = await getSTS()
      const stsObj = res.data || {}
      commit('SET_STS', stsObj)
      return stsObj
    }
  }
}

export default alioss
