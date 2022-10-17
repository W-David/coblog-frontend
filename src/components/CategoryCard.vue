<template>
  <div :class="['category-card-container', isActive ? 'is-active' : '']">
    <div class="category-name">
      <span class="name-content">
        {{ category.name }}
      </span>
      <span class="info-content hidden-sm-and-down">
        {{ category.createdBy ? 'create by ' + category.createdBy : '暂无' }}
      </span>
    </div>
    <div class="category-article-list">
      <div class="category-article-card" v-for="article in category.articles" :key="article.id">
        <div class="category-article-title" @click="toArticle(article)">
          <span class="title-content">
            {{ article.title }}
          </span>
          <span class="time-content">
            {{ article.createdAt }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'categoryCard',
  props: {
    category: {
      type: Object,
      required: true
    },
    isActive: Boolean
  },
  setup() {
    const router = useRouter()
    const toArticle = article => {
      router.push({ name: 'article', params: { id: article.id } })
    }
    return {
      toArticle
    }
  }
}
</script>

<style lang="scss" scoped>
.category-card-container {
  @include position(relative);
  @include layout(100%, 100%, 0, 16px);
  @include border(1px solid $success-color-a, 8px);
  @include pointer;
  @include transition(all 120ms ease-in-out);
  background-color: white;
  z-index: 1000;

  .category-name {
    @include layout(100%, auto, 0 0 8px 0, 0);
    @include flex-box(row, space-between, center, wrap);
    white-space: wrap;
    text-align: left;

    .name-content {
      @include font-fang-song;
      color: $success-color;
      font-size: 20px;
      font-weight: bold;
    }
    .info-content {
      @include font-hei;
      color: $font-color-c;
      font-weight: bold;
    }
  }
  .category-article-list {
    .category-article-card {
      @include layout(100%, 100%, 0, 0 6px);
      @include line-height(36px, 36px);
      @include border(1px solid $success-color-a, 0, bottom);
      @include pointer;
      @include transition(all 120ms linear);
      .category-article-title {
        @include flex-box(row, space-between, center);
        .title-content {
          color: $font-color-b;
          @include font-kai;
          @include text-overflow(1, 60%);
          font-size: 16px;
          text-align: left;
          font-weight: bold;
        }
        .time-content {
          color: $font-color-b;
          font-size: 12px;
          font-style: italic;
        }
      }
      &:hover {
        transform: scaleX(1.02);
        .title-content {
          color: $font-color;
        }
        .time-content {
          color: $font-color;
        }
      }
    }
  }
  &:hover {
    @include box-shadow;
    // background-color: $success-color-b;
  }
  &.is-active {
    border-color: $success-color;
    @include box-shadow;
  }
}
</style>