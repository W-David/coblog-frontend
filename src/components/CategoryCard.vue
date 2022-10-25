<template>
  <div :class="['category-card-container', isActive ? 'is-active' : '']" :id="`cate-${category.id}`">
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
        <div class="category-article-title" @click="toArticle(article.id)">
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
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    },
    isActive: Boolean
  },
  setup() {
    const router = useRouter()
    const toArticle = id => {
      router.push({ name: 'article', params: { id } })
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
  @include border(1px solid #eee, 8px);
  @include pointer;
  @include transition(all 120ms ease-in-out);
  @include box-shadow(0 0 16px 0 rgba(0, 0, 0, 0.1));
  background-color: #fcfcfc;
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
      @include border(1px solid #ddd, 0, bottom);
      @include pointer;
      @include transition(all 120ms linear);
      .category-article-title {
        @include flex-box(row, space-between, center);
        .title-content {
          color: $info-color;
          @include font-kai;
          @include text-overflow(1, 60%);
          font-size: 15px;
          text-align: left;
          font-weight: bolder;
        }
        .time-content {
          color: $info-color-a;
          font-size: 12px;
          font-style: italic;
          font-weight: bold;
        }
      }
      &:hover {
        // transform: scaleX(1.02);
        .title-content {
          color: $success-color;
        }
        .time-content {
          color: $info-color;
        }
      }
    }
  }
  &:hover {
    @include box-shadow(10px 10px 24px 0 rgba(0, 0, 0, 0.1));
    // background-color: $success-color-b;
  }
  &.is-active {
    border-color: $success-color;
    border-width: 2px;
    @include box-shadow;
  }
}
</style>
