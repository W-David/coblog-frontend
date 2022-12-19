<template>
  <div class="page-load-container">
    <div class="loading-area" v-show="isLoadingMore && hasMore">
      <div class="loader">
        <span class="ball" style="--i: 1"></span>
        <span class="shadow" style="--i: 1"></span>
        <span class="ball" style="--i: 2"></span>
        <span class="shadow" style="--i: 2"></span>
        <span class="ball" style="--i: 3"></span>
        <span class="shadow" style="--i: 3"></span>
        <span class="ball" style="--i: 4"></span>
        <span class="shadow" style="--i: 4"></span>
        <span class="ball" style="--i: 5"></span>
        <span class="shadow" style="--i: 5"></span>
      </div>
    </div>
    <div class="bottom-divide" v-show="!hasMore">
      <span class="bottom-hint">已经到底啦(❁´◡`❁)`</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
const props = defineProps({
  isLoadingMore: {
    type: Boolean,
    default: false
  },
  hasMore: {
    type: Boolean,
    default: true
  }
})
const { isLoadingMore, hasMore } = toRefs(props)
</script>

<style lang="scss" scoped>
.page-load-container {
  @include layout(auto, auto, 0, 0);
  .loading-area {
    @include layout(auto, auto, 0, 0);
    @include flex-box(row, center, center);
    .loader {
      width: 130px;
      height: 40px;
      margin-bottom: 16px;
      position: relative;
      span {
        &.ball {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: $primary-color;
          position: absolute;
          /* 通过var函数调用自定义属性--i，计算出每个小球的位置 */
          left: calc(var(--i) * 20px);
          animation: jump 2s linear infinite calc(var(--i) * 0.3s);
        }
        &.shadow {
          width: 10px;
          height: 5px;
          border-radius: 50%;
          background-color: #000;
          position: absolute;
          left: calc(var(--i) * 20px);
          bottom: -2.5px;
          z-index: -1;
          animation: shadow 2s linear infinite calc(var(--i) * 0.3s);
        }
      }
    }
  }
  .bottom-divide {
    @include layout(100%, auto, 12px 0, 0);
    @include flex-box(row, center, center);
    .bottom-hint {
      color: $font-color;
      html.dark & {
        color: $font-color-b;
      }

      font-size: 18px;
      font-weight: border;
      margin-bottom: 16px;
      letter-spacing: 2px;
      text-indent: 2px;
    }
  }

  @keyframes jump {
    0%,
    100% {
      bottom: 30px;
    }
    40%,
    60% {
      bottom: 0;
      height: 10px;
    }
    50% {
      height: 5px;
      filter: hue-rotate(180deg);
    }
  }

  @keyframes shadow {
    0%,
    100% {
      transform: scale(2);
      opacity: 0.1;
      filter: blur(1px);
    }
    40%,
    60% {
      transform: scale(1);
      opacity: 1;
      filter: blur(0.4px);
    }
  }
}
</style>
