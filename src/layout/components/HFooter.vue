<template>
  <div class="h-footer-container">
    <el-link type="primary" href="http://39.98.122.206:8088/" target="_blank">hexo博客</el-link>
    <el-divider direction="vertical" />
    <el-link type="primary" href="http://39.98.122.206/" target="_blank">Cody's Blog</el-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.h-footer-container {
  @include font-hei;
  font-size: 18px;
  @include flex-box(row, center, center);
  @include layout(100%, $footer-height, 0, 0);
  // box-shadow: var(--el-box-shadow);
  // background-color: var(--el-bg-color);
  .footer-hint {
    color: var(--el-text-color-primary);
    cursor: pointer;
    transition: all 200ms ease;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
