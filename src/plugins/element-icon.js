import * as ElIcons from '@element-plus/icons'

//icon组件名称转换为 i-xx-xxx-xxxx 格式，防止重名
const switchName = iconName => `i${iconName.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)}`

//导入 element-plus/icons 所有图标
export default app => {
  for (const iconName in ElIcons) {
    app.component(switchName(iconName), ElIcons[iconName])
  }
}
