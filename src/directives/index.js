import LazyLoad from './lazyLoad'
// 自定义指令
const directives = {
  LazyLoad
}
export default {
  install(app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}
