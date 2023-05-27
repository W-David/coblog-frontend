<template>
	<div
		v-if="isExternal"
		:style="styleExternalIcon"
		class="svg-external-icon svg-icon"
		v-bind="$attrs" />
	<svg
		v-else
		:class="svgClass"
		aria-hidden="true"
		v-bind="$attrs">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script setup>
import {isExternal as validIsExternal} from '@/util/validate'
import {toRefs, computed, defineProps} from 'vue'

const props = defineProps({
	iconClass: {
		type: String,
		required: true
	},
	className: {
		type: String,
		default: ''
	}
})
const {iconClass, className} = toRefs(props)
const isExternal = computed(() => validIsExternal(iconClass.value))
const iconName = computed(() => `#icon-${iconClass.value}`)
const svgClass = computed(() => (className.value ? `svg-icon ${className.value}` : 'svg-icon'))
const styleExternalIcon = computed(() => ({
	mask: `url(${iconClass.value}) no-repeat 50% 50%`,
	'-webkit-mask': `url(${iconClass.value}) no-repeat 50% 50%`
}))
</script>

<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.svg-external-icon {
	background-color: currentColor;
	mask-size: cover !important;
	display: inline-block;
}
</style>
