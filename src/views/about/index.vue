<template>
  <div class="about-page">
    <div class="about-card">
      <div class="blog-desc">
        <div>Hi, I'am Coody,This is a personal blog.</div>
        <div>Frontend: Vue3 + ElementPlus + Webpack</div>
        <div>Backend: Koa2 + Sequelize</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.about-page {
  @include layout(100%, auto, 0 0 $main-margin 0, 0);
  z-index: 1000;
  .about-card {
    @include layout(100%, auto, 0 0 $main-margin 0, 20px);
    @include flex-box(column, center, center);
    @include border(none, 8px);
    @include font-hei;
    @include transition(all 200ms ease-out);
    @include pointer;
    @include bg-color(#fcfcfc);
    color: var(--el-color-primary);
    box-shadow: var(--el-box-shadow);
    font-weight: bolder;
    text-align: start;
    line-height: 1.8;
    &:hover {
      @include box-shadow;
    }
  }
}
</style>
