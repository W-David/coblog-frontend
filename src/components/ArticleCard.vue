<template>
  <div class="article-card-container">
    <div class="article-banner-container">
      <div class="article-banner-img">
        <img :src="article.banner" alt="noImg" />
      </div>
      <div
        @mouseenter="isBannerHover = true"
        @mouseleave="isBannerHover = false"
        :class="[
          'article-banner-description',
          !isBannerHover ? 'spinner-border' : ''
        ]"
        @click="openDetail">
        阅读全文
      </div>
    </div>
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
import { ref } from 'vue'
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
    const isBannerHover = ref(false)
    return {
      openDetail,
      isBannerHover
    }
  }
}
</script>
<style lang="scss" scoped>
$descrip-mr: 12px;

.article-card-container {
  @include layout(100%, 100%, 0, 0 0 16px 0);
  @include border(1px solid $border-color-a, 6px);
  @include transition(all 120ms ease-in-out);
  @include box-shadow;
  background-color: white;
  z-index: 1000;

  .article-banner-container {
    @include layout(100%, 280px, 0, 0);
    @include position(relative);
    border-bottom-color: $border-color-a;
    @include pointer;
    .article-banner-description {
      @include position(absolute);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      @include layout(auto, auto, 0, 6px 12px);
      @include border(2px solid white, 6px);
      opacity: 0;
      transition: all 220ms ease-out;
      &:hover {
        @include layout(auto, auto, 0, 12px 18px);
      }
    }
    .article-banner-img {
      @include layout(100%, 100%, 0, 0);
      @include position(relative);
      border-radius: 6px 6px 0 0;
      overflow: hidden;
      &::after {
        @include position(absolute);
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        transition: transform 600ms ease-out;
      }
      img {
        width: 100%;
        height: 100%;
        transform: scale(1.2);
        object-fit: cover;
        transition: transform 600ms ease-out;
      }
    }
    &:hover {
      .article-banner-description {
        opacity: 1;
        color: $primary-color;
        border-color: $primary-color;
      }
      .article-banner-img {
        img {
          transform: scale(1.08);
        }
        &:after {
          background-color: #00000050;
        }
      }
    }
  }

  .article-title-container {
    @include layout(100%, 42px, 28px 0 0 0, 12px 0);
    @include flex-box(row, center, center);

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
    @include layout(100%, auto, 16px 0 18px 0, 0 24px);
    font-size: 16px;
    line-height: 1.6;
    text-align: left;
    @include text-overflow(5);
  }

  .article-description-container {
    @include layout(100%, auto, 16px 0 0 0, 0 22px);
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
    @include box-shadow(4px 4px 12px 0 rgba(0, 0, 0, 0.1));
  }
}
</style>