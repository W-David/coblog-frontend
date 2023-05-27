<template>
	<div class="tag-page">
		<div class="tag-article-list">
			<div
				v-for="tag in tagArticles"
				:key="tag.id"
				class="tag-aritlce-item">
				<tag-card
					:tag="tag"
					:is-active="isChecked(tag.id)"></tag-card>
			</div>
		</div>
		<page-load
			v-show="tagArticles && tagArticles.length"
			:is-loading-more="isLoadingMore"
			:has-more="hasMore"
			@on-load-more="onLoadMore"></page-load>
	</div>
</template>

<script setup>
import {reactive, computed, onMounted, onUnmounted, ref, nextTick, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

import useReachBottom from '@/hooks/useReachBottom'

import TagCard from '@/components/TagCard.vue'
import PageLoad from '@/components/PageLoad.vue'

const store = useStore()
const route = useRoute()
const checkedIds = computed(() => store.getters['tag/getCheckedTagIds'])
const isChecked = id => checkedIds.value.includes(id)
const hasMore = ref(true)
const isLoadingMore = ref(false)
const queryParams = reactive({pageNum: 1, pageSize: 5})
const tagArticles = computed(() => store.getters['tag/getTagArticles']())

const getTagArticles = async queryParams => {
	if (!hasMore.value) return
	const [list, total] = await store.dispatch('tag/GetTagArticles', queryParams)
	hasMore.value = list && list.length && queryParams.pageNum * queryParams.pageSize < total
}

// useReachBottom(onLoadMore)
const onLoadMore = async () => {
	isLoadingMore.value = true
	await getTagArticles({...queryParams, pageNum: queryParams.pageNum + 1})
	queryParams.pageNum += 1
	isLoadingMore.value = false
}

onMounted(async () => {
	if (route.params.id) {
		checkedIds.value.push(+route.params.id)
	}
	store.commit('tag/CLEAR_TAG_ARTICLES')
	await Promise.all([getTagArticles(queryParams)])
})

onUnmounted(() => {
	store.commit('tag/CLEAR_CHECKED_TAG_IDS')
})
</script>

<style lang="scss" scoped>
.tag-page {
	@include layout(100%, auto, 0 0 $main-margin 0, 0);
	z-index: 1000;
	.tag-article-list {
		.tag-aritlce-item {
			margin-bottom: $main-margin;
		}
	}
}
</style>
