<template>
	<div class="select-area-container">
		<el-button
			:type="styl"
			size="small"
			@click="handleSelect">
			{{ selectText }}
		</el-button>
		<span v-if="items && items.length">
			<el-tag
				v-for="item in items"
				:key="item.id"
				:type="styl"
				closable
				@close="handleClose(item)">
				{{ item.name }}
			</el-tag>
		</span>
		<el-input
			v-if="touchAdd"
			ref="inputRef"
			v-model="inputValue"
			class="input-new-item"
			size="small"
			@keyup.enter="handleAdd"
			@blur="handleCancel"></el-input>
		<el-button
			v-else
			plain
			size="small"
			class="btn-new-item"
			@click="showInput">
			{{ '+ ' + addText }}
		</el-button>
	</div>
</template>

<script setup>
import {ref, nextTick, toRefs, defineProps, defineEmits} from 'vue'
import {ElMessage} from 'element-plus'

const props = defineProps({
	styl: {
		type: String,
		default: 'primary'
	},
	selectText: {
		type: String,
		default: '选择项'
	},
	addText: {
		type: String,
		default: '添加项'
	},
	items: {
		type: Array,
		default: () => []
	}
})
const {items, styl, selectText, addText} = toRefs(props)
const touchAdd = ref(false)
const inputValue = ref('')
const inputRef = ref()

const emit = defineEmits(['on-select', 'on-add-item'])
const handleClose = item => {
	items.value.splice(items.value.indexOf(item), 1)
}
const handleCancel = () => {
	touchAdd.value = false
	inputValue.value = ''
}
const handleAdd = () => {
	if (!inputValue.value) {
		ElMessage({message: '内容不能为空', type: 'warning'})
		touchAdd.value = false
		inputValue.value = ''
		return
	}
	const curContent = inputValue.value
	emit('on-add-item', curContent)
	touchAdd.value = false
	inputValue.value = ''
}
const showInput = async () => {
	touchAdd.value = true
	await nextTick()
	inputRef.value.$refs.input.focus()
}
const handleSelect = () => {
	emit('on-select')
}
</script>

<style lang="scss" scoped>
@mixin margin {
	margin: 4px 6px;
}
.select-area-container {
	@include layout(auto, auto, 0, 0);
	white-space: wrap;
	.el-button {
		@include margin;
	}
	.input-new-item {
		width: 90px;
		@include margin;
	}
	.btn-new-item {
		@include margin;
	}
	.el-tag {
		@include margin;
	}
}
</style>
