<template>
  <div class="pagination-container" @click="loadMore">
    <span class="pagination-content">加载更多</span>
  </div>
</template>

<script>
export default {
  name: 'LoadMore',
  setup(props, { attrs, slots, emit, expose }) {
    const loadMore = () => emit('on-load-more')
    return {
      loadMore
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  $mc: $font-color;
  $mbc: $font-color;
  @include layout(auto, auto, 16px 0, 0);
  .pagination-content {
    @include layout(100%, 100%, 0, 8px 16px);
    @include border(2px solid $mbc, 8px);
    @include font-hei;
    @include transition(all 300ms ease-in-out);
    font-size: 18px;
    font-weight: bolder;
    color: $mc;
    cursor: pointer;
    &:hover {
      box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
    }
  }
}
</style>