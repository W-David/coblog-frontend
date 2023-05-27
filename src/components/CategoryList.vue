<template>
	<div class="category-list-container">
		<div class="category-list-title">
			<svg-icon
				class="title-icon"
				icon-class="category"></svg-icon>
			<span class="title-text">分类</span>
		</div>
		<div class="category-list">
			<span
				v-if="isAdminLogin"
				class="article-cate ctrl-btn"
				@click="handleAdd">
				<el-icon><i-plus></i-plus></el-icon>
			</span>
			<span
				v-for="category in categoryList"
				:key="category.id"
				:class="['article-cate', isChecked(category.id) ? 'is-active' : '']"
				@click="handleChecked(category)">
				{{ category.name }}
			</span>
		</div>
	</div>
</template>

<script setup>
import {reactive, computed, onMounted, ref, nextTick, watch, defineProps, toRefs, onUnmounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import usePrompt from '@/hooks/usePrompt'

const store = useStore()
const route = useRoute()
const router = useRouter()
const categoryList = computed(() => store.getters['category/getCategoryList']())
const checkedIds = computed(() => store.getters['category/getCheckedCateIds'])
const isChecked = id => checkedIds.value.includes(id)

const isAdminLogin = computed(() => store.getters.isAdminLogin)

const handleChecked = item => {
	if (isChecked(item.id)) {
		store.commit('category/REMOVE_CHECKED_CATE_ID', item.id)
	} else {
		store.commit('category/ADD_CHECKED_CATE_ID', item.id)
	}
}

const handleAdd = async () => {
	const {setIsFinish, showPrompt, setHint} = usePrompt()
	setHint('已添加')
	const {value: name} = await showPrompt('请输入添加的种类名称', '添加种类', '添加')
	if (!name) {
		ElMessage({message: '名称不可为空', type: 'warning'})
		return
	}
	await store.dispatch('category/CreateCategory', {name})
	setIsFinish(true)
}
const handleDelete = async category => {
	const res = await store.dispatch('category/DelCategory', category.id)
}

onUnmounted(() => {
	store.commit('category/CLEAR_CHECKED_CATE_IDS')
})
</script>

<style lang="scss" scoped>
.category-list-container {
	// @include box-shadow(12px 12px 24px 0 rgba(0, 0, 0, 0.05));
	@include layout(100%, auto, 0, 4px);
	@include scroll-bar(6px, auto, transparent, var(--el-border-color), 3px);
	@include border(none, 8px);
	@include bg-color(#fff);
	box-shadow: var(--el-box-shadow);

	.category-list-title {
		@include layout(auto, auto, 0, 4px 8px);
		font-size: 16px;
		font-weight: bold;
		.title-icon {
			color: var(--el-color-success);
		}
		.title-text {
			margin-left: 4px;
		}
	}
	.category-list {
		@include layout(auto, auto, 0, 4px 8px 12px);
		@include flex-box(row, center, center, wrap);

		.article-cate {
			@include panel-styl(var(--el-color-success), var(--el-color-success-light-7));
			&.ctrl-btn {
				@include panel-styl(var(--el-color-info), var(--el-color-info-light-7));
			}
		}
	}
}
</style>
