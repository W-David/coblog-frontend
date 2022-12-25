<template>
  <div class="tag-page">
    <div class="tag-article-list">
      <el-row justify="center">
        <el-col :xs="24" :sm="18" :md="16" :lg="18">
          <el-row justify="start" :gutter="20">
            <el-col :md="24" :lg="12" v-for="tag in tagArticles" :key="tag.id">
              <tag-card :tag="tag" :is-active="isChecked(tag.id)"></tag-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <page-load :isLoadingMore="isLoadingMore" :hasMore="hasMore"></page-load>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import useReachBottom from '@/hooks/useReachBottom'

import TagCard from '@/components/TagCard'
import PageLoad from '@/components/PageLoad'

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
  await new Promise(res => setTimeout(res, 3000))
})
</script>

<style lang="scss" scoped>
.tag-page {
  @include layout(100%, 100%, 0, 12px);
  @include slide-top(200ms, 400ms, 120px);

  .tag-article-list {
    margin-top: 16px;
  }

  .el-row {
    .el-col {
      margin-bottom: $row-gutter;
    }
  }
}
</style>
