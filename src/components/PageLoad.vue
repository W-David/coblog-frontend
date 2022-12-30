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
    <div class="load-more-area" v-show="isTouchDevice && !isLoadingMore && hasMore">
      <load-more @on-load-more="handleLoadMore"></load-more>
    </div>
    <!-- <div class="bottom-divide" v-show="!hasMore">
      <span class="bottom-hint">已经到底啦(❁´◡`❁)`</span>
    </div> -->
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import LoadMore from './LoadMore.vue'
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
const store = useStore()
const isTouchDevice = computed(() => store.getters.isTouchDevice)
const emit = defineEmits(['on-load-more'])
const handleLoadMore = () => emit('on-load-more')
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
          background-color: var(--el-color-primary);
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
      color: var(--el-text-color-primary);
      html.dark & {
        color: var(--el-text-color-secondary);
      }

      font-size: 18px;
      font-weight: border;
      margin-bottom: 16px;
      letter-spacing: 2px;
      text-indent: 2px;
    }
  }
  .load-more-area {
    @include layout(100%, auto, 16px 0, 0);
    @include flex-box(row, center, center);
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
