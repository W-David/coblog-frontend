const getters = {
	userAvatar: state => state.user.avatar,
	adminAvatar: state => state.admin.avatar,
	isUserLogin: state => state.user.isLogin,
	isAdminLogin: state => state.admin.isLogin,
	userInfo: state => state.user.userInfo,
	adminInfo: state => state.admin.adminInfo,
	loginInfo: state => (state.user.isLogin ? state.user.userInfo : state.admin.isLogin ? state.admin.adminInfo : {}),
	deviceSize: state => state.app.deviceSize,
	isTouchDevice: state => state.app.isTouchDevice,
	sidebarOpen: state => state.app.sidebarOpen,
	sts: state => state.alioss.sts
}

export default getters
