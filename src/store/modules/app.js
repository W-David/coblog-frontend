import Cookies from 'js-cookie'

const app = {
  namespaced: true,
  state: () => ({
    device: 'desktop',
    size: ''
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
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
