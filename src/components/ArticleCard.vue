<template>
  <div class="article-card-container">
    <div class="article-banner-container">
      <div class="article-banner-img">
        <img v-if="article.banner && article.banner.path" :src="article.banner.path" alt="noImg" />
        <img v-else src="/static/img/defaultCover.jpg" alt="noImg" />
      </div>
      <div
        @mouseenter="isBannerHover = true"
        @mouseleave="isBannerHover = false"
        :class="['article-banner-description', !isBannerHover ? 'spinner-border-animation' : '']"
        @click="openDetail"
      >
        阅读全文
      </div>
      <!-- <div class="article-no-banner" v-if="!article.banner">
        <div class="article-no-banner-hint">暂无头图</div>
        <div class="article-no-banner-link" @click="openDetail">阅读原文</div>
      </div> -->
    </div>
    <div class="article-title-container">
      <span class="title-content" @click="openDetail">
        {{ article.title }}
      </span>
    </div>
    <div class="article-ct-container">
      <category-panel
        :size="12"
        :category="category"
        v-for="category in article.categories"
        :key="category.id"
      ></category-panel>
      <tag-panel :size="12" :tag="tag" v-for="tag in article.tags" :key="tag.id"></tag-panel>
    </div>
    <div class="article-content-container" v-html="article.description"></div>
    <div class="article-description-container">
      <div class="description-content">
        <span class="article-time">
          <el-icon><i-calendar /></el-icon>
          {{ article.createdAt }}
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

<script setup>
import { ref, defineProps, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import CategoryPanel from '@/components/CategoryPanel'
import TagPanel from '@/components/TagPanel'

const router = useRouter()
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})
const { article } = toRefs(props)
const openDetail = () => {
  const { id } = article.value
  router.push({ name: 'article', params: { id } })
}
const isBannerHover = ref(false)
</script>

<style lang="scss" scoped>
$descrip-mr: 12px;

.article-card-container {
  @include layout(100%, 100%, 0, 0 0 16px 0);
  @include border(1px solid $border-color-a, 6px);
  @include transition(all 120ms ease-in-out);
  @include box-shadow;
  @include bg-color;
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
    .article-no-banner {
      @include layout(100%, 100%, 0, 0);
      @include flex-box(rows, center, center);
      background-color: rgba(0, 0, 0, 0.085);
      transition: background-color 600ms ease-out;
      position: relative;
      font-size: 24px;
      .article-no-banner-hint {
        transition: all 600ms ease-out;
        color: $primary-color-a;
      }
      .article-no-banner-link {
        padding: 6px 12px;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 600ms ease-out;
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
      .article-no-banner {
        background-color: rgba(0, 0, 0, 0.2);
        .article-no-banner-hint {
          opacity: 0;
        }
        .article-no-banner-link {
          background-color: $success-color;
          padding: 12px 24px;
          color: white;
          opacity: 1;
        }
      }
    }
  }

  .article-title-container {
    @include layout(100%, auto, 28px 0 0 0, 12px 16px);
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
  }

  .article-content-container {
    @include layout(100%, auto, 16px 0 18px 0, 0 24px);
    font-size: 16px;
    line-height: 1.6;
    text-align: left;
    @include text-overflow(5);
    text-indent: 1em;
  }

  .article-description-container {
    @include layout(100%, auto, 16px 0 0 0, 0 22px);
    @include flex-box(row, space-between);

    .description-content {
      color: $font-color-b;
      .article-time {
        margin-right: $descrip-mr;
        &:deep .el-icon {
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
