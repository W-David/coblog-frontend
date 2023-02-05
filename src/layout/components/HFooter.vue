<template>
  <div class="h-footer-container">
    <div class="beian-hint">
      <el-link href="https://beian.miit.gov.cn" target="_blank">晋ICP备2023000379号-1</el-link>
      <el-divider direction="vertical" />
      <el-link href="https://coblog.fun" target="_blank">Cody's Blog</el-link>
      <el-divider direction="vertical" />
      <span id="busuanzi_container_site_uv">累计访客数 <span id="busuanzi_value_site_uv"></span> 人次</span>
    </div>
    <div class="copyright-hint">
      <span>Copyright © 2022 Cody. All rights reserved.</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.h-footer-container {
  @include layout(100%, $footer-height, 0, 0);
  @include flex-box(column, center, center);
  position: relative;
  // box-shadow: var(--el-box-shadow);
  // background-color: var(--el-bg-color);

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: $footer-height;
  //   background-color: #00000030;
  //   filter: blur(4px);
  //   z-index: -1;
  // }

  .beian-hint {
    @include flex-box(row, center, center);
    @include font-hei;
    margin-bottom: 6px;
    font-size: 12px;
    &:deep {
      .el-link {
        font-size: 12px;
      }
    }
    span {
      color: var(--el-text-color-primary);
    }
  }
  .copyright-hint {
    @include flex-box(row, center, center);
    @include font-hei;
    color: var(--el-text-color-regular);
    font-size: 12px;
    user-select: none;
  }
}
</style>
