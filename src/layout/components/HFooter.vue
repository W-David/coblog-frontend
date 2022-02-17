<template>
  <div class="h-footer-container">
    <span>© 2021 coody's blog</span>
  </div>
</template>

<script>
export default {
  name: 'hFooter'
}
</script>

<style lang="scss" scoped>
.h-footer-container {
  @include flex-box(row, center, center);
  @include layout(100%, $footer-height, 0, 0);
  @include font-song;
  background-color: $footer-bg;
  box-shadow: 0 0 2px $border-color;
}
</style>