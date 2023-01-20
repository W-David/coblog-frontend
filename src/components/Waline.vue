<template>
  <div class="waline-comp-container">
    <div id="waline"></div>
  </div>
</template>

<script setup>
import { init } from '@waline/client'
import { onMounted } from 'vue'

const mountWaline = () => {
  init({
    el: '#waline',
    serverURL: process.env.VUE_APP_WALINE_API,
    lang: 'zh-CN',
    reaction: true,
    dark: '.dark'
  })
}
onMounted(() => {
  mountWaline()
})
</script>

<style lang="scss" scoped>
.waline-comp-container {
  @include layout(100%, auto, $main-margin 0 0 0, 8px 12px);
  @include border(1px solid #eee, 8px);
  @include box-shadow(4px 4px 16px rgba(0, 0, 0, 0.1));
  @include bg-color(#fafafa, #1f1f1f);
}
</style>
