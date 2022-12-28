<template>
  <div class="links-container">
    <div class="links-title">
      <svg-icon class="title-icon" icon-class="link"></svg-icon>
      <span class="title-text">友链</span>
    </div>
    <div class="links-list">
      <div class="links-item" v-for="(link, index) in links" :key="index">
        <el-link :type="link.type || 'default'" :href="link.href" target="_blank">{{ link.text }}</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  links: {
    type: Array,
    default: () => []
  }
})
const { links } = toRefs(props)
</script>

<style lang="scss" scoped>
.links-container {
  @include layout(100%, auto, 0, 4px);
  @include scroll-bar(6px, auto, transparent, var(--el-border-color), 3px);
  @include border(none, 8px);
  @include bg-color(#fff);
  box-shadow: var(--el-box-shadow);
  .links-title {
    @include layout(100%, auto, 4px 8px, 4px);
    font-size: 16px;
    font-weight: bold;
    .title-icon {
      color: var(--el-color-success);
    }
    .title-text {
      margin-left: 4px;
    }
  }
  .links-list {
    @include layout(auto, auto, 0, 4px 8px 12px);
    @include flex-box(column, flex-start, center, nowrap);
    .links-item {
      @include layout(100%, auto, 0, 8px);
      @include flex-box(row, center, center, nowrap);
      @include border(none, 8px);
      cursor: pointer;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: transparent;
        transition: all 300ms ease-out;
      }
      ::v-deep {
        .el-link {
          z-index: 1000;
        }
      }
      &:hover {
        &:after {
          background-color: #00000010;
        }
      }
    }
  }
}
</style>
