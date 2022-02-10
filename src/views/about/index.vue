<template>
  <div class="about-container">
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
.about-container {
  @include layout;
  .about-card {
    @include flex-box(row, center, center);
    @include layout(100%, 100%, 20px 0, 20px);
    @include border(1px solid #eee, 12px);
    @include font-hei;
    @include transition(all 200ms ease-out);
    @include pointer;
    font-size: 18px;
    font-weight: bold;
    &:hover {
      @include box-shadow;
    }
  }
}
</style>