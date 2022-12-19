<template>
  <div class="h-footer-container">
    <span>© 2022 coody's blog</span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.h-footer-container {
  @include flex-box(row, center, center);
  @include layout(100%, $footer-height, 0, 0);
  @include box-shadow(0 0 2px $border-color);
  @include font-song;
  @include bg-color(#f5f5f5, #050505);
}
</style>
