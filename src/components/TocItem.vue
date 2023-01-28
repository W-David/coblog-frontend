<template>
  <div class="toc-item-container">
    <div :class="['toc-item', isActived ? 'is-actived' : '']">
      <div class="item-content" :style="{ 'text-indent': `${indent * Math.max(item.level - 1, 0)}px` }">
        <!-- <a :href="`#${encodeURIComponent(item.anchor)}`">{{ item.content }}</a> -->
        <a @click="anchor(item.anchor)">{{ item.content }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, toRefs } from 'vue'
import { scrollToByView } from '@/util/scroll-to'

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  indent: {
    type: Number,
    default: 16
  },
  isActived: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['on-checked'])
const { item } = toRefs(props)
const anchor = anchor => {
  emits('on-checked', anchor)
  scrollToByView(anchor)
}
</script>

<style lang="scss" scoped>
.toc-item-container {
  .toc-item {
    @include layout(auto, auto, 4px, 4px 12px);
    @include border(none, 4px);
    transition: all 220ms ease;
    cursor: pointer;
    .item-content {
      a {
        font-size: 14px;
        height: 18px;
        line-height: 18px;
        color: var(--el-text-color-regular);
        @include text-overflow(1, 8px);
        transition: all 220ms ease;
        &:hover {
          color: var(--el-color-primary);
          // text-decoration: underline;
          // text-underline-offset: 4px;
        }
      }
    }
    &.is-actived {
      background-color: var(--el-bg-color-page);
      .item-content {
        a {
          color: var(--el-color-primary);
          // text-decoration: underline;
          // text-underline-offset: 6px;
        }
      }
    }
    &:hover {
      background-color: var(--el-bg-color-page);
    }
  }
}
</style>
