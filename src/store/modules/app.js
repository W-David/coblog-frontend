import Cookies from 'js-cookie'

const app = {
  namespaced: true,
  state: () => ({
    device: 'desktop',
    sidebarOpen: false,
    size: ''
  }),
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_SIDEBAR: (state, open) => {
      state.sidebarOpen = open
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    }
  },
  actions: {
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleSidebar({ commit }, open) {
      commit('TOGGLE_SIDEBAR', open)
    }
  }
}

export default app
