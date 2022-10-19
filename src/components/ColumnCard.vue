<template>
  <div class="column-card-container">
    <div class="column-avatar-container">
      <img :src="column.avatar" alt="noAvatar" />
    </div>
    <div class="column-info-container">
      <div class="column-nickname">{{ column.nickname }}</div>
      <div class="column-email">{{ column.email }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColumnCard',
  props: {
    column: Object
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.column-card-container {
  @include layout(100%, auto, 0, 0);
  @include border(1px solid transparent, 8px);
  @include box-shadow;
  .column-avatar-container {
    @include layout(100%, auto, 0, 0);
    @include flex-box(rows, center, center);
  }
}
</style>