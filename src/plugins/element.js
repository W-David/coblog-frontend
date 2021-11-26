import ElementPlus from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import '../element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export default app => {
  app.config.globalProperties['msgError'] = message => ElMessage({ showClose: true, type: 'error', message })
  app.config.globalProperties['msgSuccess'] = message => ElMessage({ showClose: true, type: 'success', message })
  app.config.globalProperties['msgWarning'] = message => ElMessage({ showClose: true, type: 'warning', message })
  app.config.globalProperties['msgConfirm'] = (message, title, options) => ElMessageBox.confirm(message, title, options)
  app.use(ElementPlus, { locale })
}
