const MOBILE_WIDTH = 768
export function isMobile() {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < MOBILE_WIDTH
}
