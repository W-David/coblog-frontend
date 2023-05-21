/**
 * @description 延迟返回装饰器
 */
export function delayUnit(delay) {
	return function (target, name, descriptor) {
		const fn = descriptor.value
		descriptor.value = async function (...args) {
			const o_time = new Date().getTime()
			const res = await fn.apply(this, args)
			const duration = new Date().getTime() - o_time
			if (duration >= delay) {
				return res
			} else {
				const d_time = delay - duration
				await new Promise(reslove => setTimeout(reslove, d_time))
				return res
			}
		}
		return descriptor
	}
}
/**
 * @description 功能同delayUnit,直接返回延迟后的包装函数
 */

export function delayDescorator(fn, delay) {
	return async function (...args) {
		const o_time = new Date().getTime()
		const res = await fn.apply(this, args)
		const duration = new Date().getTime() - o_time
		if (duration >= delay) {
			return res
		} else {
			const d_time = delay - duration
			await new Promise(reslove => setTimeout(reslove, d_time))
			return res
		}
	}
}
