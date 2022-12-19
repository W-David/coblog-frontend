<template>
  <div class="tag-page">
    <transition name="slide-top">
      <div
        class="tag-list"
        :style="{
          width: listStyle.width,
          maxHeight: listStyle.maxHeight
        }"
        v-show="isTagShow"
      >
        <div class="tag-list-container">
          <span
            v-for="tag in tagArticles"
            :key="tag.id"
            :class="['article-tag', isChecked(tag.id) ? 'is-active' : '']"
            @click="handleChecked(tag)"
          >
            {{ tag.name }}
          </span>
          <span class="article-tag ctrl-btn" @click="handleAdd">
            <el-icon><i-plus /></el-icon>
            添加
          </span>
        </div>
      </div>
    </transition>
    <div class="tag-article-list" :style="{ marginTop: `${listHeight + 16}px` }">
      <el-row justify="center">
        <el-col :sm="24" :md="20" :lg="20">
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
import { ElMessage } from 'element-plus'

import usePrompt from '@/hooks/usePrompt'
import useReachBottom from '@/hooks/useReachBottom'
import useScroll from '@/hooks/useScroll'

import TagCard from '@/components/TagCard'
import PageLoad from '@/components/PageLoad'

import { createTag } from '@/api/tag'

import { cloneLoop, cloneForce } from '@jsmini/clone'
import { scrollToByEle } from '@/util/scroll-to'

const store = useStore()
const route = useRoute()
const tagArticles = computed(() => store.getters['tag/getTagArticles']())
const checkedIds = ref([])
const listStyle = computed(() => {
  const device = store.getters.device
  const wMap = { xs: 24, sm: 24, md: 20, lg: 20, xl: 20 }
  const mhMap = { xs: 232, sm: 232, md: 180, lg: 128, xl: 128 }
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
    scrollToByEle(document.getElementById(`tag-${item.id}`), 600, () => checkedIds.value.push(item.id))
  }
}
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
const getTagArticles = async queryParams => {
  if (!hasMore.value) return
  const [list, total] = await store.dispatch('tag/GetTagArticles', queryParams)
  hasMore.value = list && list.length && queryParams.pageNum * queryParams.pageSize < total
}
const onReachBottom = async () => {
  isLoadingMore.value = true
  await getTagArticles({ ...queryParams, pageNum: queryParams.pageNum + 1 })
  queryParams.pageNum += 1
  isLoadingMore.value = false
}
useReachBottom(onReachBottom)

const isTagShow = ref(false)
watch(
  isTagShow,
  (nv, ov) => {
    if (!nv && ov) return
    nextTick(() => {
      const listDom = document.querySelector('.tag-list')
      listHeight.value = listDom.offsetHeight
    })
  },
  { immediate: true }
)
const onScrollUp = offset => {
  isTagShow.value = true
}
const onScrollDown = offset => {
  isTagShow.value = false
}
useScroll({ onScrollUp, onScrollDown })

const handleAdd = async () => {
  const { setIsFinish, showPrompt, setHint } = usePrompt()
  setHint('已添加')
  const { value } = await showPrompt('请输入添加的标签名称', '添加标签', '添加')
  if (!value) return
  const res = await createTag({ name: value })
  if (res.code !== 200) return
  store.dispatch('tag/GetTagArticles', { ids: [res.data.id] })
  setIsFinish(true)
}
const handleDelete = async tag => {
  const res = await store.dispatch('tag/DelTag', tag.id)
}
onMounted(async () => {
  if (route.params.id) {
    checkedIds.value.push(+route.params.id)
  }
  store.commit('tag/CLEAR_TAG_ARTICLES')
  await Promise.all([getTagArticles(queryParams)])
  isTagShow.value = true
})
</script>

<style lang="scss" scoped>
.tag-page {
  @include layout(100%, 100%, 0, 12px);
  @include slide-top(200ms, 400ms, 120px);

  .tag-list {
    @include box-shadow(12px 12px 24px 0 rgba(0, 0, 0, 0.05));
    @include scroll-bar(6px, auto, transparent, $info-color-b, 3px);
    @include border(1px solid #e5f5e5, 8px);
    @include bg-color(#fff);
    position: fixed;
    top: 76px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    overflow-y: auto;
    .tag-list-container {
      @include layout(auto, auto, 0, 16px);
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

      .article-tag {
        @include panel-styl($primary-color, $primary-color-h);
        &.ctrl-btn {
          @include panel-styl($info-color, $info-color-b);
        }
      }
    }
  }

  .tag-article-list {
  }

  .el-row {
    .el-col {
      margin-bottom: $row-gutter;
    }
  }
}
</style>
