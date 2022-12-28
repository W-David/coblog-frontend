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
  @include layout(100%, auto, 0, 0);
  .about-card {
    @include flex-box(column, center, center);
    @include layout(100%, auto, 0, 20px);
    @include border(1px solid var(--el-border-color), 12px);
    @include font-hei;
    @include transition(all 200ms ease-out);
    @include pointer;
    background-color: var(--el-bg-color);
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
