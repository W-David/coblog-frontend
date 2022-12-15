<template>
  <div class="about-page">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <div class="about-card">
          <div class="blog-desc">
            <div>Hi, I'am Coody,This is a personal blog.</div>
            <div>Frontend: Vue3 + ElementPlus + Webpack</div>
            <div>Backend: Koa2 + Sequelize</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="scss" scoped>
.about-page {
  @include layout;
  .about-card {
    @include flex-box(column, center, center);
    @include layout(80%, auto, 20px auto, 20px);
    @include border(1px solid #eee, 12px);
    @include font-hei;
    @include transition(all 200ms ease-out);
    @include pointer;
    @include bg-color(#fcfcfc);
    font-weight: bolder;
    text-align: start;
    line-height: 1.8;
    &:hover {
      @include box-shadow;
    }
  }
}
</style>
