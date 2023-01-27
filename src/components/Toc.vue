<template>
  <div class="toc-container" v-if="tocArray && tocArray.length">
    <div class="toc-list-title">文章目录</div>
    <div class="toc-list">
      <toc-item
        v-for="item in tocArray"
        :key="item.anchor"
        :item="item"
        :isActived="activedArr.includes(item.anchor)"
        @on-checked="onChecked"
      ></toc-item>
    </div>
  </div>
</template>

<script setup>
import TocItem from './TocItem.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import useScroll from '@/hooks/useScroll'

const store = useStore()
const route = useRoute()
const articleId = +route.params.id
const article = computed(() => store.getters['article/getArticleById'](articleId))
const tocArray = computed(() => (article.value && article.value.tocArray) || [])
const activedArr = ref([])
const isActived = anchor => {
  const element = document.getElementById(anchor)
  const top = element.getBoundingClientRect().top
  return top > 0 && top < 120
}
const onChecked = anchor => activedArr.value.push(anchor)
const onScroll = offset => {
  activedArr.value.splice(0, activedArr.value.length)
  tocArray.value.forEach(toc => {
    if (isActived(toc.anchor)) {
      activedArr.value.push(toc.anchor)
    }
  })
}
useScroll({ onScroll, delay: 100 })
</script>

<style lang="scss" scoped>
.toc-container {
  @include layout(100%, auto, 0, 8px);
  @include scroll-bar(6px, auto, transparent, var(--el-border-color), 3px);
  @include border(none, 8px);
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);
  z-index: 1000;

  .toc-list-title {
    @include layout(auto, auto, 4px 8px, 2px 8px);
    border-left: 4px solid var(--el-color-primary);
    font-size: 16px;
    font-weight: bold;
  }
  .toc-list {
    @include layout(auto, auto, 12px 8px 8px 8px, 0);
    // @include border(1px solid var(--el-border-color), 8px);
    // @include box-shadow;
  }
}
</style>
