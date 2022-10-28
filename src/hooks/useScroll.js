import { onMounted, onUnmounted } from 'vue'
import { getScrollTop } from '@/util/screen'
import { throttle } from 'lodash'

const useScroll = ({ onScrollUp, onScrollDown }) => {
  let scrollTopCache = 0
  const onScroll = () => {
    const scrollTop = getScrollTop()
    const offset = scrollTop - scrollTopCache
    scrollTopCache = scrollTop
    if (offset >= 0) {
      onScrollDown(offset)
    } else {
      onScrollUp(-offset)
    }
  }
  const onThrottleScroll = throttle(onScroll, 200)
  onMounted(() => setTimeout(() => window.addEventListener('scroll', onThrottleScroll), 0))
  onUnmounted(() => window.removeEventListener('scroll', onThrottleScroll))
}

export default useScroll
