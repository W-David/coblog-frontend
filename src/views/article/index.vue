<template>
  <div class="article-page">
    <!-- <div id="article-toc"></div>
      <el-col class="hidden-md-and-down" :lg="6">
        <div class="article-sub-area"></div>
      </el-col> -->
    <div class="article-area">
      <div class="article-ctrl-area" @click="toBack">
        <el-icon :size="20"><i-caret-left /></el-icon>
      </div>
      <div class="article-main-area" v-if="article">
        <div class="article-banner-container" v-if="article.banner && article.banner.path">
          <img v-LazyLoad="article.banner.path" alt="noImg" />
          <div class="article-info-content">
            <span class="article-author">{{ article.admin?.nickname || '佚名' }}</span>
            <span class="article-sp">|</span>
            <span class="article-date">{{ article.createdAt }}</span>
          </div>
        </div>
        <div class="article-title-container">
          <div class="row-container">
            <div class="article-title-content">{{ article.title }}</div>
            <div class="article-favorite-content">
              <div class="favorite-icon" @click="handleFavorite">
                <svg-icon v-show="article.isFavorited" icon-class="favorite-full"></svg-icon>
                <svg-icon v-show="!article.isFavorited" icon-class="favorite"></svg-icon>
              </div>
              <div class="favorite-num">{{ article.favoritedNum }}</div>
            </div>
          </div>
          <div class="article-panel-content">
            <category-panel
              :size="10"
              :category="category"
              v-for="category in article.categories"
              :key="category.id"
            ></category-panel>
            <tag-panel :size="10" :tag="tag" v-for="tag in article.tags" :key="tag.id"></tag-panel>
          </div>
          <div class="article-desc-content">{{ article.description }}</div>
        </div>
        <div class="article-content-container">
          <div id="article-content" class="article-content">
            <article class="markdown-body" v-html="articleContent"></article>
          </div>
        </div>
        <div class="article-edit-container" v-if="isAdminLogin && isCurAdmin">
          <el-button type="danger" round @click="handleDel">删除 • 需输入文章标题</el-button>
          <el-button type="success" round @click="handleEdit">修改文章</el-button>
        </div>
      </div>
    </div>
    <el-backtop :bottom="25"> </el-backtop>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick, onActivated, onUpdated, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import MarkdownIt from 'markdown-it'
import MDHighLight from 'markdown-it-highlightjs'
import MDTocAndAnchor from 'markdown-it-toc-and-anchor'

import CategoryPanel from '@/components/CategoryPanel'
import TagPanel from '@/components/TagPanel'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(MDHighLight)
  .use(MDTocAndAnchor)
const store = useStore()
const route = useRoute()
const router = useRouter()
const articleId = +route.params.id
const loginInfo = computed(() => store.getters.loginInfo)
const isAdminLogin = computed(() => store.getters.isAdminLogin)
const article = computed(() => store.getters['article/getArticleById'](articleId))
const articleContent = computed(() => (article.value.content ? md.render(article.value.content) : ''))
const isCurAdmin = computed(() => article.value?.admin?.id === loginInfo.value?.id)

const getArticle = async articleId => await store.dispatch('article/GetArticle', articleId)
const handleDel = async () => {
  const { value: title } = await ElMessageBox.prompt('【请输入文章标题确认删除】', '删除确认', {
    confirmButtonText: '删除此文章',
    cancelButtonText: '取消'
  })
  if (title !== article.value.title) {
    ElMessage({ message: '请输入正确的文章标题', type: 'warning' })
    return
  }
  await store.dispatch('article/DelArticle', article.value.id)
  router.push({ name: 'home' })
}
const handleEdit = () => {
  router.push({ name: 'blog', params: { id: article.value.id } })
}
const toBack = () => {
  router.back()
}
const handleFavorite = async () => {
  const res = await store.dispatch('article/FavoriteArticle', { id: article.value.id })
  if (res.code !== 200) return
  article.value.isFavorited = !article.value.isFavorited
  article.value.favoritedNum = res.data || article.value.favoritedNum
}

onMounted(async () => {
  await getArticle(articleId)
})
onUnmounted(() => {})
</script>

<style lang="scss" scoped>
.article-page {
  @include layout(100%, auto, 0 0 $main-margin 0, 0);
  z-index: 1000;
  .article-area {
    .article-ctrl-area {
      position: fixed;
      bottom: 24px;
      left: 24px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--el-color-primary);
      @include bg-color(#fff, #1d1d1d);
      z-index: 1000;
      box-shadow: 0 0 6px rgb(0 0 0 / 12%);
      cursor: pointer;
      &:hover {
        background-color: var(--el-color-primary-light-9);
      }
    }
    .article-main-area {
      @include layout(100%, 100%, 0, 16px);
      @include border(1px solid #eee, 8px);
      @include box-shadow(2px 4px 16px rgba(0, 0, 0, 0.1));
      @include bg-color(#fafafa, #2f2f2f);
      .article-banner-container {
        @include layout(100%, 320px, 0 0 12px 0, 0);
        position: relative;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
        .article-info-content {
          @include layout(auto, auto, 8px 0 0 0, 4px 8px);
          @include border(1px solid rgba(0, 0, 0, 0.8), 4px);
          @include box-shadow(2px 2px 8px rgba(0, 0, 0, 0.1));
          background-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          right: 8px;
          bottom: 8px;
          .article-author {
            color: var(--el-color-success);
            font-weight: bold;
            font-size: 14px;
            // text-align: end;
          }
          .article-sp {
            margin: 0 8px;
            font-weight: lighter;
            color: #000;
          }
          .article-date {
            color: var(--el-color-warning);
            font-size: 12px;
          }
        }
      }
      .article-title-container {
        @include layout(100%, auto, 0 0 12px 0, 8px);
        @include border(1px solid #ddd, 4px);
        .row-container {
          @include layout(100%, auto, 4px 0, 4px 8px);
          @include flex-box(row, space-between, flex-start, wrap);
        }
        .article-panel-content {
          @include layout(100%, auto, 4px 0, 4px);
          text-align: start;
        }
        .article-title-content {
          @include font-hei;
          max-width: 90%;
          font-size: 28px;
          font-weight: bolder;
          line-height: 1.2 !important;
        }
        .article-favorite-content {
          .favorite-icon {
            color: #e74645;
            text-align: center;
            cursor: pointer;
            font-size: 22px;
            transition: all 500ms ease;
            &:hover {
              transform: scale(1.25);
            }
          }
          .favorite-num {
            @include font-hei;
            text-align: center;
            font-size: 13px;
            color: var(--el-text-color-secondary);
          }
        }
        .article-desc-content {
          @include layout(100%, auto, 0, 8px);
          @include font-fang-song;
          color: var(--el-text-color-primary);
          font-style: italic;
          font-weight: bold;
          // @include border(none, 4px);
          // background-color: #fcfcfc;
          text-align: start;
        }
      }
      .article-content-container {
        @include layout(100%, auto, 0 0 12px 0, 0);
        .article-content {
          .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            // max-width: 980px;
            margin: 0 auto;
            padding: 45px;
            overflow: auto;
            @include scroll-bar;
            @include border(none, 8px);
            // box-shadow: var(--el-box-shadow);
            @include box-shadow;
            @media (max-width: 767px) {
              .markdown-body {
                padding: 15px;
              }
            }
          }
        }
      }

      .article-edit-container {
        @include layout(100%, auto, 0, 8px 0);
        @include flex-box(row, flex-end, center);
        @include border(none, 8px);
        // @include box-shadow(4px 4px 16px rgba(0, 0, 0, 0.1));
      }
    }

    .article-comments-area {
      @include layout(100%, auto, $main-margin 0 0 0, 8px 12px);
      @include border(1px solid #eee, 8px);
      @include box-shadow(4px 4px 16px rgba(0, 0, 0, 0.1));
      @include bg-color(#fafafa, #1f1f1f);
    }
  }
}
</style>
