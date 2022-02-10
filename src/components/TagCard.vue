<template>
  <div class="tag-card-container">
    <div class="tag-name">
      <span class="name-content">
        {{ tag.name }}
      </span>
      <span class="info-content hidden-sm-and-down">
        {{ 'create by ' + tag.createdBy }}
      </span>
    </div>
    <div class="tag-article-list">
      <div
        class="tag-article-card"
        v-for="article in tag.articles"
        :key="article.id">
        <div class="tag-article-title">
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
export default {
  name: 'tagCard',
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  setup() {}
}
</script>

<style lang="scss" scoped>
.tag-card-container {
  @include position(relative);
  @include layout(100%, 100%, 0, 16px);
  @include border(1px solid $primary-color-h, 8px);
  @include pointer;
  @include transition(all 120ms ease-in-out);
  background-color: white;
  z-index: 1000;

  .tag-name {
    @include layout(100%, auto, 0 0 8px 0, 0);
    @include flex-box(row, space-between, center, wrap);
    white-space: wrap;
    text-align: left;

    .name-content {
      @include font-fang-song;
      color: $primary-color;
      font-size: 20px;
      font-weight: bold;
    }
    .info-content {
      @include font-hei;
      color: $font-color-c;
      font-weight: bold;
    }
  }
  .tag-article-list {
    .tag-article-card {
      @include layout(100%, 100%, 0, 0 6px);
      @include line-height(36px, 36px);
      @include border(1px solid $primary-color-h, 0, bottom);
      @include pointer;
      @include transition(all 120ms linear);
      .tag-article-title {
        @include flex-box(row, space-between, center);
        .title-content {
          color: $font-color;
          @include font-kai;
          @include text-overflow(1, 60%);
          font-size: 16px;
          text-align: left;
        }
        .time-content {
          color: $font-color-a;
        }
      }
      &:hover {
        transform: scaleX(1.02);
        font-weight: bold;
      }
    }
  }
  &:hover {
    border-color: $primary-color;
    @include box-shadow;
  }
}
</style>