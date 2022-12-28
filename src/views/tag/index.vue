<template>
  <div class="tag-page">
    <div class="tag-article-list">
      <div class="widget-list">
        <div class="widget-item" v-for="tag in tagArticles" :key="tag.id">
          <tag-card :tag="tag" :is-active="isChecked(tag.id)"></tag-card>
        </div>
      </div>
    </div>
    <page-load :isLoadingMore="isLoadingMore" :hasMore="hasMore"></page-load>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import useReachBottom from '@/hooks/useReachBottom'

import TagCard from '@/components/TagCard.vue'
import PageLoad from '@/components/PageLoad.vue'

const store = useStore()
const route = useRoute()
const checkedIds = ref([])
const isChecked = id => checkedIds.value.includes(id)
const hasMore = ref(true)
const isLoadingMore = ref(false)
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
const tagArticles = computed(() => store.getters['tag/getTagArticles']())

const getTagArticles = async queryParams => {
  if (!hasMore.value) return
  const [list, total] = await store.dispatch('tag/GetTagArticles', queryParams)
  hasMore.value = list && list.length && queryParams.pageNum * queryParams.pageSize < total
}

useReachBottom(onReachBottom)
const onReachBottom = async () => {
  isLoadingMore.value = true
  await getTagArticles({ ...queryParams, pageNum: queryParams.pageNum + 1 })
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
</script>

<style lang="scss" scoped>
.tag-page {
  @include layout(100%, 100%, 0, 0);
  @include widget-styl;
  .tag-article-list {
  }
}
</style>
