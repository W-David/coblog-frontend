import Cookies from 'js-cookie'

const app = {
  namespaced: true,
  state: () => ({
    deviceSize: 'lg',
    isTouchDevice: false,
    sidebarOpen: false
  }),
  mutations: {
    TOGGLE_DEVICE_SIZE: (state, deviceSize) => {
      state.deviceSize = deviceSize
    },
    TOGGLE_SIDEBAR: (state, open) => {
      state.sidebarOpen = open
    },
    SET_ISTOUCHDEVICE: (state, isTouchDevice) => {
      state.isTouchDevice = isTouchDevice
    }
  },
  actions: {
    ToggleDeviceSize({ commit }, deviceSize) {
      commit('TOGGLE_DEVICE_SIZE', deviceSize)
    },
    ToggleSidebar({ commit }, open) {
      commit('TOGGLE_SIDEBAR', open)
    }
  }
}

export default app
