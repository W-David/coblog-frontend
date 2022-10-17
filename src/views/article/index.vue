<template>
  <div class="article-page">
    <el-row justify="center" :gutter="12">
      <!-- <div id="article-toc"></div>
      <el-col class="hidden-md-and-down" :lg="6">
        <div class="article-sub-area"></div>
      </el-col> -->
      <el-col :xs="24" :sm="22" :md="20" :lg="18">
        <div class="article-area">
          <div class="article-ctrl-area" @click="toBack">
            <el-icon :size="20"><i-caret-left /></el-icon>
          </div>
          <div class="article-main-area" v-if="article">
            <div class="article-banner-container" v-if="article.banner && article.banner.path">
              <img :src="article.banner.path" alt="noImg" />
            </div>
            <div class="article-title-container">
              <div class="article-title-content">
                <h3>{{ article.title }}</h3>
              </div>
            </div>
            <div class="article-content-container">
              <div id="article-content" class="article-content" v-html="article.content"></div>
            </div>
          </div>
          <div class="article-edit-area" v-if="isCurUser">
            <el-button type="danger" plain round size="small" @click="handleDel">【删除 • 需输入文章标题】</el-button>
            <el-button type="success" plain round size="small" @click="handleEdit">【修改文章】</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-backtop :bottom="100"> </el-backtop>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { deleteArticle } from '@/api/article'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
// import tocbot from 'tocbot'

export default {
  name: 'h-article',
  props: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const articleId = +route.params.id
    const loginInfo = computed(() => store.getters.loginInfo)
    const article = computed(() => store.getters['article/getArticleById'](articleId))
    const isCurUser = computed(() => article.value.admin.id === loginInfo.value.id)
    const handleDel = async () => {
      const { value: title } = await ElMessageBox.prompt('【请输入文章标题确认删除】', '删除确认', {
        confirmButtonText: '删除此文章',
        cancelButtonText: '取消',
        inputValidator: title => {
          return title === article.value.title ? true : '输入有误'
        }
      })
      if (title !== article.value.title) {
        ElMessage({ message: '请输入正确的文章标题', type: 'warning' })
        return
      }
      const res = await deleteArticle(article.value.id)
      if (res.code !== 200) return
      router.push({ name: 'home' })
      ElMessage({ message: '已删除', type: 'success' })
    }
    const handleEdit = () => {
      router.push({ name: 'blog', params: { id: article.value.id } })
    }
    const toBack = () => {
      router.back()
    }
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
      // tocbot.destroy()
    })
    return {
      handleDel,
      handleEdit,
      toBack,
      article,
      articleId,
      isCurUser
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
      color: $primary-color;
      z-index: 1000;
      box-shadow: 0 0 6px rgb(0 0 0 / 12%);
      cursor: pointer;
      &:hover {
        background-color: $primary-color-h;
      }
    }
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
          &:deep {
            @include article-styl;
          }
        }
      }
    }
    .article-edit-area {
      @include layout(100%, auto, 8px 0, 8px);
      @include flex-box(row, flex-end, center);
      @include border(none, 8px);
      @include box-shadow;
    }
  }
}
</style>