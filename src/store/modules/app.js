import Cookies from 'js-cookie'

const app = {
  state: () => ({
    device: 'desktop'
  }),
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    }
  },
  actions: {
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
