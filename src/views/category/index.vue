<template>
  <div class="category-page">
    <transition name="slide-top">
      <div
        class="category-list"
        :style="{
          width: listStyle.width,
          maxHeight: listStyle.maxHeight
        }"
        v-show="isCateShow"
      >
        <div class="category-list-container">
          <span class="article-cate ctrl-btn" @click="handleAdd">
            <el-icon><i-plus /></el-icon>
            添加
          </span>
          <span
            v-for="category in categoryArticles"
            :key="category.id"
            :class="['article-cate', isChecked(category.id) ? 'is-active' : '']"
            @click="handleChecked(category)"
          >
            {{ category.name }}
          </span>
        </div>
      </div>
    </transition>
    <div class="category-article-list" :style="{ marginTop: `${listHeight + 16}px` }">
      <el-row justify="center">
        <el-col :xs="24" :sm="24" :md="20" :lg="20">
          <el-row justify="start" :gutter="20">
            <el-col :md="24" :lg="12" v-for="category in categoryArticles" :key="category.id">
              <category-card :category="category" :is-active="isChecked(category.id)"></category-card>
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
import { ElMessage } from 'element-plus'

import CategoryCard from '@/components/CategoryCard'
import PageLoad from '@/components/PageLoad'

import usePrompt from '@/hooks/usePrompt'
import useReachBottom from '@/hooks/useReachBottom'
import useScroll from '@/hooks/useScroll'

import { createCategory } from '@/api/category'

import { cloneLoop, cloneForce } from '@jsmini/clone'
import { scrollToByEle } from '@/util/scroll-to'

import { delayDescorator } from '@/util/decorators'

const store = useStore()
const route = useRoute()
const categoryArticles = computed(() => store.getters['category/getCategoryArticles']())
const checkedIds = ref([])
const listStyle = computed(() => {
  const device = store.getters.device
  const wMap = { xs: 24, sm: 24, md: 20, lg: 20, xl: 20 }
  const mhMap = { xs: 198, sm: 198, md: 146, lg: 146, xl: 146 }
  return {
    width: `calc(${((wMap[device] || 20) / 24) * 100}vw - 24px)`,
    maxHeight: `${mhMap[device] || 94}px`
  }
})
const listHeight = ref(0)
const hasMore = ref(true)
const isLoadingMore = ref(false)
const isChecked = id => checkedIds.value.includes(id)
const handleChecked = item => {
  if (isChecked(item.id)) {
    const index = checkedIds.value.indexOf(item.id)
    checkedIds.value.splice(index, 1)
  } else {
    scrollToByEle(document.getElementById(`cate-${item.id}`), 600, () => checkedIds.value.push(item.id))
  }
}
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
const getCategoryArticles = async queryParams => {
  if (!hasMore.value) return
  const [list, total] = await store.dispatch('category/GetCategoryArticles', queryParams)
  hasMore.value = list && list.length && queryParams.pageNum * queryParams.pageSize < total
}
const onReachBottom = async () => {
  isLoadingMore.value = true
  await getCategoryArticles({ ...queryParams, pageNum: queryParams.pageNum + 1 })
  queryParams.pageNum += 1
  isLoadingMore.value = false
}
useReachBottom(onReachBottom)

const isCateShow = ref(false)
watch(
  isCateShow,
  (nv, ov) => {
    if (!nv && ov) return
    nextTick(() => {
      const listDom = document.querySelector('.category-list')
      listHeight.value = listDom.offsetHeight
    })
  },
  { immediate: true }
)
const onScrollUp = offset => {
  isCateShow.value = true
}
const onScrollDown = offset => {
  isCateShow.value = false
}
useScroll({ onScrollUp, onScrollDown })

const handleAdd = async () => {
  const { setIsFinish, showPrompt, setHint } = usePrompt()
  setHint('已添加')
  const { value } = await showPrompt('请输入添加的种类名称', '添加种类', '添加')
  if (!value) return
  const res = await createCategory({ name: value })
  if (res.code !== 200) return
  store.dispatch('category/GetCategoryArticles', { ids: [res.data.id] })
  setIsFinish(true)
}
const handleDelete = async category => {
  const res = await store.dispatch('category/DelCategory', category.id)
}
onMounted(async () => {
  if (route.params.id) {
    checkedIds.value.push(+route.params.id)
  }
  store.commit('category/CLEAR_CATEGORY_ARTICLES')
  await Promise.all([getCategoryArticles(queryParams)])
  isCateShow.value = true
})
</script>

<style lang="scss" scoped>
.category-page {
  @include layout(100%, 100%, 0, 12px);
  @include slide-top(200ms, 400ms, 120px);

  .category-list {
    @include box-shadow(12px 12px 24px 0 rgba(0, 0, 0, 0.05));
    @include scroll-bar(6px, auto, transparent, var(--el-color-info-light-7), 3px);
    @include border(1px solid #e5f5e5, 8px);
    @include bg-color(#fff);
    position: fixed;
    top: 76px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    overflow-y: auto;

    .category-list-container {
      @include layout(auto, auto, 0, 20px);
      @include flex-box(row, center, center, wrap);

      @mixin panel-styl($mc, $bc) {
        color: $mc;
        display: inline-block;
        line-height: 36px;
        @include layout(auto, 36px, 8px, 0 16px);
        @include border(1px solid $mc, 18px);
        font-size: 16px;
        white-space: wrap;
        background-color: $bc;
        @include transition(all 120ms ease-in-out);
        @include pointer;
        &:hover {
          color: white;
          background-color: $mc;
        }
        &.is-active {
          color: white;
          background-color: $mc;
        }
      }

      .article-cate {
        @include panel-styl(var(--el-color-success), var(--el-color-success-light-7));
        &.ctrl-btn {
          @include panel-styl(var(--el-color-info), var(--el-color-info-light-7));
        }
      }
    }
  }

  .category-article-list {
  }

  .el-row {
    .el-col {
      margin-bottom: $row-gutter;
    }
  }
}
</style>
