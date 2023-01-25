<template>
  <div class="toc-container">
    <div id="toc"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.toc-container {
  @include layout(100%, auto, 0, 8px);
  @include scroll-bar(6px, auto, transparent, var(--el-border-color), 3px);
  @include border(none, 8px);
  backgroud-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);
  z-index: 1000;
}
</style>
