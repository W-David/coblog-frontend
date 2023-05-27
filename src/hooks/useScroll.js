import {onMounted, onUnmounted} from 'vue'
import {getScrollTop} from '@/util/screen'
import {throttle} from 'lodash'

const useScroll = ({onScrollUp = offset => {}, onScrollDown = offset => {}, onScroll = offset => {}, delay = 200}) => {
	let scrollTopCache = 0
	const onScrolling = () => {
		const scrollTop = getScrollTop()
		const offset = scrollTop - scrollTopCache
		scrollTopCache = scrollTop
		onScroll(offset)
		if (offset >= 0) {
			onScrollDown(offset)
		} else {
			onScrollUp(-offset)
		}
	}
	const onThrottleScroll = throttle(onScrolling, delay)
	onMounted(() => setTimeout(() => window.addEventListener('scroll', onThrottleScroll), 0))
	onUnmounted(() => window.removeEventListener('scroll', onThrottleScroll))
}

export default useScroll
