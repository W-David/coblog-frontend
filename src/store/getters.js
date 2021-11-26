const getters = {
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  avatar: state => state.user.avatar,
  token: state => state.user.token
}

export default getters
