<template>
  <div class="category-list-container">
    <div class="category-list-title">
      <svg-icon class="title-icon" icon-class="category"></svg-icon>
      <span class="title-text">分类</span>
    </div>
    <div class="category-list">
      <span class="article-cate ctrl-btn" @click="handleAdd">
        <el-icon><i-plus /></el-icon>
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
</template>

<script setup>
import { reactive, computed, onMounted, ref, nextTick, watch, defineProps, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import usePrompt from '@/hooks/usePrompt'

import { createCategory } from '@/api/category'
import { scrollToByEle } from '@/util/scroll-to'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const { list: categoryArticles } = toRefs(props)

const store = useStore()
const route = useRoute()
const router = useRouter()
const checkedIds = ref([])
const isChecked = id => checkedIds.value.includes(id)

const handleChecked = item => {
  if (isChecked(item.id)) {
    const index = checkedIds.value.indexOf(item.id)
    checkedIds.value.splice(index, 1)
  } else {
    scrollToByEle(document.getElementById(`cate-${item.id}`), 600, () => checkedIds.value.push(item.id))
  }
}

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
    @include layout(100%, auto, 0, 4px 8px);
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
