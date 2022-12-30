<template>
  <div class="category-page">
    <div class="category-article-list">
      <div class="category-article-item" v-for="category in categoryArticles" :key="category.id">
        <category-card :category="category" :is-active="isChecked(category.id)"></category-card>
      </div>
    </div>
    <page-load :isLoadingMore="isLoadingMore" :hasMore="hasMore" @on-load-more="onLoadMore"></page-load>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import useReachBottom from '@/hooks/useReachBottom'

import CategoryCard from '@/components/CategoryCard'
import PageLoad from '@/components/PageLoad'

const store = useStore()
const route = useRoute()
const checkedIds = computed(() => store.getters['category/getCheckedCateIds'])
const isChecked = id => checkedIds.value.includes(id)
const hasMore = ref(true)
const isLoadingMore = ref(false)
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
const categoryArticles = computed(() => store.getters['category/getCategoryArticles']())

const getCategoryArticles = async queryParams => {
  if (!hasMore.value) return
  const [list, total] = await store.dispatch('category/GetCategoryArticles', queryParams)
  hasMore.value = list && list.length && queryParams.pageNum * queryParams.pageSize < total
}

useReachBottom(onLoadMore)
const onLoadMore = async () => {
  isLoadingMore.value = true
  await getCategoryArticles({ ...queryParams, pageNum: queryParams.pageNum + 1 })
  queryParams.pageNum += 1
  isLoadingMore.value = false
}
onMounted(async () => {
  if (route.params.id) {
    store.commit('category/CLEAR_CHECKED_CATE_IDS')
  }
  store.commit('category/CLEAR_CATEGORY_ARTICLES')
  await Promise.all([getCategoryArticles(queryParams)])
})
</script>

<style lang="scss" scoped>
.category-page {
  @include layout(100%, auto, 0 0 $main-margin 0, 0);
  z-index: 1000;
  .category-article-list {
    .category-article-item {
      margin-bottom: $main-margin;
    }
  }
}
</style>
