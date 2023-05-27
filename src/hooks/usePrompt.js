import {ElMessage, ElMessageBox} from 'element-plus'
import {ref, watch} from 'vue'

const usePrompt = () => {
	const isFinishRef = ref(false)
	const hintRef = ref('')
	const showPrompt = (content, title, confirmText = '确认', cancelText = '取消') => {
		return ElMessageBox.prompt(content, title, {
			confirmButtonText: confirmText,
			cancelButtonText: cancelText
		})
	}
	const setHint = hint => (hintRef.value = hint)
	const setIsFinish = isFinish => (isFinishRef.value = isFinish)
	watch(isFinishRef, (nv, ov) => {
		if (!nv && ov) return
		ElMessage({message: hintRef.value, showClose: false})
	})
	return {setIsFinish, showPrompt, setHint}
}

export default usePrompt
