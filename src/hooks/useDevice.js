import store from '@/store'
import {onBeforeMount, onBeforeUnmount, onMounted} from 'vue'
import {device} from 'device.js'

const useDevice = () => {
	onMounted(() => $_get_device())
	const $_get_device = () => {
		const isTouchDevice = device.mobile || device.tablet
		store.commit('app/SET_ISTOUCHDEVICE', !!isTouchDevice)
	}
}

export default useDevice
