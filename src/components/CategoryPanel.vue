<template>
	<div
		class="article-cate"
		:style="{fontSize: `${size}px`, height: `${size * 2}px`, lineHeight: `${size * 2}px`, borderRadius: `${size}px`}"
		@click.stop="toCategory(category.id)">
		<el-icon :size="size"><i-folder-opened></i-folder-opened></el-icon>
		{{ category.name }}
	</div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {defineProps, toRefs} from 'vue'
const router = useRouter()
const props = defineProps({
	category: {
		type: Object,
		required: true
	},
	size: {
		type: Number,
		default: 16
	}
})
const {category, size} = toRefs(props)
const toCategory = id => {
	router.push({name: 'category', params: {id}})
}
</script>

<style lang="scss" scoped>
.article-cate {
	@include panel-styl(var(--el-color-success), var(--el-color-success-light-7));
}
</style>
