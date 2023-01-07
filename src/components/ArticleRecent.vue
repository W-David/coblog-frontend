<template>
  <div class="article-recent-container">
    <div class="article-recent-title">最新文章</div>
    <div class="article-recent-list">
      <div class="article-recent-item" v-for="article in articles" :key="article.id" @click="toArticle(article.id)">
        <div class="article-cover">
          <img v-if="article.banner && article.banner.path" v-LazyLoad="article.banner.path" alt="noImg" />
          <img v-else src="/static/img/defaultCover.jpg" alt="noImg" />
        </div>
        <div class="article-content">
          <div class="article-time">
            {{ article.createdAt.split(' ')[0] }}
          </div>
          <div class="article-title">
            {{ article.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const articles = computed(() => store.getters['article/getArticlesRecent'])
const toArticle = id => {
  router.push({ name: 'article', params: { id } })
}
</script>

<style lang="scss" scoped>
.article-recent-container {
  @include layout(100%, auto, 0, 8px);
  @include scroll-bar(6px, auto, transparent, var(--el-border-color), 3px);
  @include border(none, 8px);
  @include bg-color(#fff);
  box-shadow: var(--el-box-shadow);
  z-index: 1000;

  .article-recent-title {
    @include layout(100%, auto, 4px 8px, 2px 8px);
    border-left: 4px solid var(--el-color-primary);
    font-size: 16px;
    font-weight: bold;
  }

  .article-recent-list {
    @include layout(100%, auto, 8px 0 0 0, 0);
    @include flex-box(column, flex-start, center, nowrap);
    .article-recent-item {
      @include layout(100%, auto, 0, 8px);
      @include flex-box(row, space-between, center, nowrap);
      @include border(none, 8px);
      cursor: pointer;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: transparent;
        transition: all 300ms ease-out;
      }
      .article-cover {
        @include layout(64px, 64px, 0, 0);
        img {
          @include layout(100%, 100%, 0, 0);
          @include border(none, 4px);
          transform: scale(1.05);
          object-fit: cover;
          object-position: center;
          overflow: hidden;
          transition: all 300ms ease-out;
        }
      }
      .article-content {
        @include layout(calc(100% - 76px), 64px, 0 0 0 8px, 2px 4px);
        .article-time {
          color: var(--el-color-primary-light-3);
          font-weight: bolder;
          font-size: 10px;
          font-style: italic;
        }
        .article-title {
          color: var(--el-color-primary-light-3);
          margin-top: 4px;
          font-size: 13px;
          @include text-overflow(2);
          transition: all 300ms ease-out;
        }
      }
      &:hover {
        .article-cover {
          img {
            transform: scale(1);
          }
        }
        .article-content {
          .article-time {
            color: var(--el-color-primary);
          }
          .article-title {
            color: var(--el-color-primary);
          }
        }
        &:after {
          background-color: #00000010;
        }
      }
    }
  }
}
</style>
