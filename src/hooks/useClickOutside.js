import { onMounted, onUnmounted, ref } from 'vue'

const useClickOutside = elementRef => {
  const isClickOutside = ref(false)
  const handler = e => {
    const targetElement = elementRef.value
    if (!targetElement) {
      return
    }
    isClickOutside.value = !targetElement.contains(e.target)
  }
  onMounted(() => {
    document.body.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.body.removeEventListener('click', handler)
  })
  return isClickOutside
}
export default useClickOutside
