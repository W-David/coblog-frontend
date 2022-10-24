<template>
  <div class="about-page">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <div class="about-card">Hi, I'am Coody,This is a test profile.</div>
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
    @include flex-box(row, center, center);
    @include layout(80%, auto, 20px auto, 20px);
    @include border(1px solid #eee, 12px);
    @include font-fang-song;
    @include transition(all 200ms ease-out);
    @include pointer;
    font-size: 18px;
    font-weight: bold;
    background-color: #fcfcfc;
    &:hover {
      @include box-shadow;
    }
  }
}
</style>
