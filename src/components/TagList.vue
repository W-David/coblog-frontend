<template>
  <transition name="slide-top">
    <div
      class="tag-list"
      :style="{
        width: listStyle.width
      }"
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
</template>

<script setup>
import { reactive, computed, onMounted, ref, nextTick, watch, defineProps, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import usePrompt from '@/hooks/usePrompt'

import { createTag } from '@/api/tag'
import { scrollToByEle } from '@/util/scroll-to'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const { list: tagArticles } = toRefs(props)

const store = useStore()
const route = useRoute()
const router = useRouter()
const checkedIds = ref([])
const isChecked = id => checkedIds.value.includes(id)

const listStyle = computed(() => {
  const device = store.getters.device
  const wMap = { xs: 24, sm: 24, md: 6, lg: 4, xl: 4 }
  return {
    width: `calc(${((wMap[device] || 20) / 24) * 100}vw - 16px)`
  }
})
const handleChecked = item => {
  if (isChecked(item.id)) {
    const index = checkedIds.value.indexOf(item.id)
    checkedIds.value.splice(index, 1)
  } else {
    scrollToByEle(document.getElementById(`tag-${item.id}`), 600, () => checkedIds.value.push(item.id))
  }
}
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
</script>

<style lang="scss" scoped>
.tag-list {
  @include box-shadow(12px 12px 24px 0 rgba(0, 0, 0, 0.05));
  @include scroll-bar(6px, auto, transparent, var(--el-color-info-light-7), 3px);
  @include border(1px solid var(--el-color-primary), 8px);
  @include bg-color(#fff);
  z-index: 9999;
  overflow-y: auto;
  .tag-list-container {
    @include layout(auto, auto, 0, 16px);
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
