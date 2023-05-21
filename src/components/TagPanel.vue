<template>
	<div
		class="article-tag"
		:style="{ fontSize: `${size}px`, height: `${size * 2}px`, lineHeight: `${size * 2}px`, borderRadius: `${size}px` }"
		@click.stop="toTag(tag.id)">
		<el-icon :size="size"><i-collection-tag></i-collection-tag></el-icon>
		{{ tag.name }}
	</div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
	tag: {
		type: Object,
		required: true
	},
	size: {
		type: Number,
		default: 16
	}
})
const { tag, size } = toRefs(props)
const toTag = id => {
	router.push({ name: 'tag', params: { id } })
}
</script>

<style lang="scss" scoped>
.article-tag {
	@include panel-styl(var(--el-color-primary), var(--el-color-primary-light-9));
}
</style>
