<template>
  <div class="archive-page">
    <div class="archive-timeline-container">
      <el-row justify="center">
        <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
          <el-timeline>
            <el-timeline-item :timestamp="a.time" type="primary" :hollow="true" placement="top" v-for="a in archive" :key="a.time">
              <el-collapse>
                <el-collapse-item :name="a.time">
                  <template #title>
                    <div class="display-title-container">
                      <div class="display-title" v-for="(title, index) in generateArchiveTitles(a.articles)" :key="index">
                        <div class="display-title-content">{{ title }}</div>
                      </div>
                    </div>
                  </template>
                  <div class="article-card" v-for="article in a.articles" :key="article.id" @click="toArticle(article.id)">
                    <div class="article-title">
                      <span class="title-content">{{ article.title }}</span>
                      <span class="time-content hidden-sm-and-down">{{ article.createdAt }}</span>
                    </div>
                    <div class="article-info" v-if="(article.categories && article.categories.length) || (article.tags && article.tags.length)">
                      <category-panel :size="12" :category="category" v-for="category in article.categories" :key="category.id"></category-panel>
                      <tag-panel :size="12" :tag="tag" v-for="tag in article.tags" :key="tag.id"></tag-panel>
                    </div>
                    <div class="m-article-time hidden-md-and-up">
                      <span class="time-content">
                        {{ article.createdAt }}
                      </span>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </div>
    <div class="archive-load-more-container">
      <load-more v-show="hasArchive" @on-load-more="handleLoadMore"></load-more>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import LoadMore from '@/components/LoadMore'

import CategoryPanel from '@/components/CategoryPanel'
import TagPanel from '@/components/TagPanel'

export default {
  name: 'archive',
  components: {
    LoadMore,
    CategoryPanel,
    TagPanel
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      pageNum: 1,
      pageSize: 20,
      beginTime: undefined,
      endTime: undefined
    })

    const archive = computed(() => store.getters['article/getArticleArchive'])
    const hasArchive = ref(true)
    const getArchive = async () => {
      const [articleArchive, total] = await store.dispatch('article/GetArticleArchive', form)
      hasArchive.value = articleArchive && articleArchive.length && form.pageNum * form.pageSize < total
    }
    const generateArchiveTitles = articles => {
      if (articles && articles.length) {
        const len = Math.min(articles.length, 3)
        return articles.slice(0, len).map(article => article.title)
      } else {
        return ['暂无文章']
      }
    }
    const toArticle = id => {
      router.push({ name: 'article', params: { id } })
    }
    const handleLoadMore = () => {
      form.pageNum = form.pageNum + 1
      getArchive()
    }
    onMounted(() => {
      store.commit('article/CLEAR_ARCHIVE')
      getArchive()
    })
    return {
      archive,
      hasArchive,
      generateArchiveTitles,
      toArticle,
      handleLoadMore
    }
  }
}
</script>

<style lang="scss" scoped>
.archive-page {
  @include layout(100%, 100%, 24px 0, 16px);
  .archive-timeline-container {
    ul {
      padding-inline-start: 0;
    }
    &:deep {
      // .el-timeline-item__node {
      //   background-color: $primary-color;
      // }
      .el-timeline-item__timestamp {
        @include font-fang-song;
        text-align: left;
        font-weight: bolder;
        color: $font-color;
      }
      .el-timeline-item__content {
        .display-title-container {
          @include layout(100%, auto, 0, 8px);
          @include flex-box(row, flex-start, center, nowrap);
          overflow: hidden;
          .display-title {
            display: inline-block;
            margin-right: 16px;
            padding: 0 8px;
            max-width: calc(100vw - 120px);
            .display-title-content {
              @include text-overflow(1);
              @include font-fang-song;
              font-style: italic;
              font-weight: bolder;
              color: $primary-color-a;
              &:hover {
                color: $primary-color;
              }
            }
          }
        }
        .article-card {
          @include layout(95%, 100%, 20px auto, 16px);
          @include border(1px solid $success-color-a, 4px);
          @include transition(all 120ms ease-in-out);
          background-color: white;
          @include pointer;

          .article-title {
            @include layout(100%, auto, 0, 0);
            @include flex-box(row, space-between, center, wrap);

            .title-content {
              @include font-kai;
              color: $primary-color;
              font-size: 24px;
              font-weight: bold;
              @include pointer;
              text-align: left;
            }

            .time-content {
              @include font-hei;
              color: $font-color-c;
            }
          }
          .article-info {
            @include layout(100%, auto, 0, 12px 0);
            @include flex-box(row, flex-start, center, wrap);
          }
          .m-article-time {
            @include clearfix;
            .time-content {
              @include font-hei;
              @include float-left;
              color: $font-color-c;
            }
          }

          &:hover {
            @include box-shadow;
            transform: scale(1.02);
          }
        }
      }
    }
  }
  .archive-load-more-container {
    @include flex-box(row, center, center);
  }
}
</style>