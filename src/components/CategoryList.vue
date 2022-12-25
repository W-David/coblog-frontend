<template>
  <div class="category-list-container">
    <transition name="slide-top">
      <div
        class="category-list"
        :style="{
          width: listStyle.width
        }"
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
.category-list {
  @include box-shadow(12px 12px 24px 0 rgba(0, 0, 0, 0.05));
  @include scroll-bar(6px, auto, transparent, var(--el-color-info-light-7), 3px);
  @include border(1px solid var(--el-color-success), 8px);
  @include bg-color(#fff);
  z-index: 9999;
  overflow-y: auto;

  .category-list-container {
    @include layout(auto, auto, 0, 20px);
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
