import {useStore, mapState, mapGetters, mapActions, createNamespacedHelpers} from 'vuex'
import {computed} from 'vue'

function useStateMapper(mapper, mapFn) {
	const store = useStore()
	const storeStateFns = mapFn(mapper)
	const storeState = {}
	Object.keys(storeStateFns).forEach(fnKey => {
		storeState[fnKey] = computed(storeStateFns[fnKey].bind({$store: store}))
	})
	return storeState
}

function useActionMapper(mapper, mapFn) {
	const store = useStore()
	const storeActionsFns = mapFn(mapper)
	const storeAction = {}
	Object.keys(storeActionsFns).forEach(fnKey => {
		storeAction[fnKey] = storeActionsFns[fnKey].bind({$store: store})
	})
	return storeAction
}

function isModule(moduleName) {
	return Object.prototype.toString.call(moduleName) === '[object String]' && moduleName.length > 0
}

export function useState(moduleName, mapper) {
	const mapperFn = isModule(moduleName) ? mapState : createNamespacedHelpers(moduleName).mapState
	return useStateMapper(mapper, mapperFn)
}

export function useGetters(moduleName, mapper) {
	const mapperFn = isModule(moduleName) ? mapGetters : createNamespacedHelpers(moduleName).mapGetters
	return useStateMapper(mapper, mapperFn)
}

export function useActions(moduleName, mapper) {
	const mapperFn = isModule(moduleName) ? mapActions : createNamespacedHelpers(moduleName).mapActions
	return useActionMapper(mapper, mapperFn)
}
