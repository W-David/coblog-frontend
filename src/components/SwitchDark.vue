<template>
	<div class="switch-dark-container">
		<el-switch
			size="large"
			:model-value="modelValue"
			inline-prompt
			:active-icon="'i-moon'"
			:inactive-icon="'i-sunny'"
			style="--el-switch-on-color: #1d1d1d; --el-switch-off-color: #d1d1d1"
			@change="change"></el-switch>
	</div>
</template>

<script setup>
import { defineProps, toRefs, defineEmits } from 'vue'
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	}
})
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])
const change = val => emit('update:modelValue', val)
</script>

<style lang="scss" scoped>
.switch-dark-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
