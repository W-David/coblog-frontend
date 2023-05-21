<template>
	<div class="tag-list-container">
		<div class="tag-list-title">
			<svg-icon
				class="title-icon"
				icon-class="tag"></svg-icon>
			<span class="title-text">标签</span>
		</div>
		<div class="tag-list">
			<span
				v-if="isAdminLogin"
				class="article-tag ctrl-btn"
				@click="handleAdd">
				<el-icon><i-plus></i-plus></el-icon>
			</span>
			<span
				v-for="tag in tagList"
				:key="tag.id"
				:class="['article-tag', isChecked(tag.id) ? 'is-active' : '']"
				@click="handleChecked(tag)">
				{{ tag.name }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { reactive, computed, onMounted, ref, nextTick, watch, defineProps, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import usePrompt from '@/hooks/usePrompt'

const store = useStore()
const route = useRoute()
const router = useRouter()
const tagList = computed(() => store.getters['tag/getTagList']())
const checkedIds = computed(() => store.getters['tag/getCheckedTagIds'])
const isChecked = id => checkedIds.value.includes(id)

const isAdminLogin = computed(() => store.getters.isAdminLogin)

const handleChecked = item => {
	if (isChecked(item.id)) {
		store.commit('tag/REMOVE_CHECKED_TAG_ID', item.id)
	} else {
		store.commit('tag/ADD_CHECKED_TAG_ID', item.id)
	}
}
const handleAdd = async () => {
	const { setIsFinish, showPrompt, setHint } = usePrompt()
	setHint('已添加')
	const { value: name } = await showPrompt('请输入添加的标签名称', '添加标签', '添加')
	if (!name) {
		ElMessage({ message: '名称不可为空', type: 'warning' })
		return
	}
	await store.dispatch('tag/CreateTag', { name })
	setIsFinish(true)
}

const handleDelete = async tag => {
	const res = await store.dispatch('tag/DelTag', tag.id)
}
</script>

<style lang="scss" scoped>
.tag-list-container {
	// @include box-shadow(12px 12px 24px 0 rgba(0, 0, 0, 0.05));
	@include layout(100%, auto, 0, 4px);
	@include scroll-bar(6px, auto, transparent, var(--el-border-color), 3px);
	@include border(none, 8px);
	@include bg-color(#fff);
	box-shadow: var(--el-box-shadow);
	.tag-list-title {
		@include layout(auto, auto, 0, 4px 8px);
		font-size: 16px;
		font-weight: bold;
		.title-icon {
			color: var(--el-color-primary);
		}
		.title-text {
			margin-left: 4px;
		}
	}
	.tag-list {
		@include layout(auto, auto, 0, 4px 8px 12px);
		@include flex-box(row, center, center, wrap);

		.article-tag {
			@include panel-styl(var(--el-color-primary), var(--el-color-primary-light-9));
			&.ctrl-btn {
				@include panel-styl(var(--el-color-info), var(--el-color-info-light-7));
			}
		}
	}
}
</style>
