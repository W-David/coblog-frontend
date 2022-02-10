<template>
  <div class="article-card-container">
    <div class="article-title-container">
      <span class="title-content">
        {{ article.title }}
      </span>
    </div>
    <div class="article-ct-container">
      <span
        class="article-cate"
        v-for="category in article.categorys"
        :key="category.id">
        <el-icon><i-folder-opened /></el-icon>
        {{ '↪' + category.name }}
      </span>
      <span class="article-tag" v-for="tag in article.tags" :key="tag.id">
        <el-icon><i-collection-tag /></el-icon>
        {{ '#' + tag.name }}
      </span>
    </div>
    <div class="article-content-container">
      {{ article.content }}
    </div>
    <div class="article-description-container">
      <div class="description-content">
        <span class="article-time">
          <el-icon><i-calendar /></el-icon>
          {{ article.createTime }}
        </span>
      </div>
      <div class="load-more">
        <span class="load-more-content" @click.stop.prevent="openDetail">
          查看全文
          <el-icon><i-arrow-right /></el-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup() {
    const openDetail = () => {}
    return {
      openDetail
    }
  }
}
</script>
<style lang="scss" scoped>
$descrip-mr: 12px;

.article-card-container {
  @include layout(100%, 100%, 0, 32px 16px 16px 22px);
  @include border(1px solid $border-color-a, 6px);
  @include transition(all 120ms ease-in-out);
  background-color: white;
  z-index: 1000;

  .article-title-container {
    @include flex-box(row, center, center);
    @include layout(100%, 42px, 0, 12px 0);

    .title-content {
      @include font-kai;
      color: $primary-color;
      font-size: 24px;
      font-weight: bold;
      @include pointer;

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  .article-ct-container {
    @include layout(100%, auto, 0, 12px 0);
    @include flex-box(row, center, center, wrap);
    @include border(1.2px solid $border-color-c, null, bottom);

    @mixin span-styl($mc, $bc) {
      color: $mc;
      @include layout(auto, auto, 6px, 4px 10px);
      @include border(1px solid $mc, 14px);
      font-size: 10px;
      white-space: nowrap;
      background-color: $bc;
      @include transition(all 120ms ease-in-out);
      @include pointer;
      .el-icon {
        vertical-align: middle;
      }
      &:hover {
        color: white;
        background-color: $mc;
      }
    }

    .article-cate {
      @include span-styl($success-color, $success-color-b);
    }
    .article-tag {
      @include span-styl($primary-color, $primary-color-h);
    }
  }

  .article-content-container {
    margin-top: 16px;
    font-size: 16px;
    line-height: 1.6;
    text-align: left;
    @include text-overflow(5);
  }

  .article-description-container {
    @include layout(100%, auto, 16px 0 0 0, 0);
    @include flex-box(row, space-between);

    .description-content {
      color: $font-color-b;
      .article-time {
        margin-right: $descrip-mr;
        .el-icon {
          margin-right: 2px;
        }
      }
    }

    .load-more {
      @include transition(all 120ms ease);
      @include pointer;
      .el-icon {
        vertical-align: middle;
      }
      &:hover {
        color: $primary-color;
      }
    }
  }

  &:hover {
    border-color: $border-color;
    @include box-shadow;
    // transform: scale(1.02);
  }
}
</style>