<template>
  <div class="article-page">
    <el-row justify="center" :gutter="12">
      <!-- <div id="article-toc"></div> -->
      <!-- <el-col class="hidden-md-and-down" :lg="6">
        <div class="article-sub-area"></div>
      </el-col> -->
      <el-col :xs="24" :sm="22" :md="18" :lg="12">
        <div class="article-main-area" v-if="article">
          <div
            class="article-banner-container"
            v-if="article.banner && article.banner.path">
            <img :src="article.banner.path" alt="noImg" />
          </div>
          <div class="article-title-container">
            <div class="article-title-content">
              <h3>{{ article.title }}</h3>
            </div>
          </div>
          <div class="article-content-container">
            <div
              id="article-content"
              class="article-content"
              v-html="article.content"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import tocbot from 'tocbot'

export default {
  name: 'h-article',
  props: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const articleId = +route.params.id
    const article = computed(() =>
      store.getters['article/getArticleById'](articleId)
    )
    onMounted(async () => {
      await store.dispatch('article/GetArticle', articleId)
      // nextTick(() => {
      //   tocbot.init({
      //     tocSelector: '#article-toc',
      //     contentSelector: '#article-content',
      //     headingSelector: 'h1, h2, h3',
      //     hasInnerContainers: true,
      //     headingsOffset: 20,
      //     scrollSmoothOffset: -90
      //   })
      // })
    })
    onUnmounted(() => {
      tocbot.destroy()
    })
    return {
      article,
      articleId
    }
  }
}
</script>

<style lang="scss" scoped>
.article-page {
  @include layout(100%, 100%, 8px 0, 8px);
  // #article-toc {
  //   @include position(fixed, 360px, 88px);
  //   @include layout(240px, auto, 0, 8px);
  //   line-height: 1.8;
  // }
  // .article-sub-area {
  //   @include layout(100%, auto, 0, 16px);
  //   @include border(none, 8px);
  //   @include box-shadow;
  // }
  .article-main-area {
    @include layout(100%, 100%, 0, 16px);
    @include border(none, 8px);
    @include box-shadow;
    background-color: white;
    .article-banner-container {
      @include layout(100%, 320px, 0, 0);
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .article-title-container {
      @include layout(100%, auto, 0, 8px);
      .article-title-content {
        font-size: 24px;
        font-weight: 800;
        line-height: 1.5 !important;
        text-align: center;
      }
      .article-desc-content {
        @include layout(100%, 80px, 4px 0, 8px 0);
        @include flex-box(row, space-between, center);
        .article-author {
          color: $primary-color;
          font-size: 12px;
        }
        .article-date {
          color: $font-color-a;
          font-size: 12px;
        }
      }
    }
    .article-content-container {
      @include layout(100%, auto, 0, 24px);
      background-color: rgba(245, 236, 211, 0.2);
      .article-content {
        @include font-hei;
      }
    }
  }
}
</style>