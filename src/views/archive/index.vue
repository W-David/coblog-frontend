<template>
  <div class="archive-page">
    <div class="archive-timeline-container">
      <el-row justify="center">
        <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
          <el-timeline>
            <el-timeline-item :timestamp="a.time" type="primary" placement="top" :hollow="true" v-for="a in archive" :key="a.time">
              <el-collapse>
                <el-collapse-item :name="a.time">
                  <template #title>
                    <div class="display-title-container">
                      <div class="display-title" v-for="(title, index) in generateArchiveTitles(a.articles)" :key="index">
                        <span class="display-title-content">{{ title }}</span>
                      </div>
                    </div>
                  </template>
                  <div class="article-card" v-for="article in a.articles" :key="article.id">
                    <div class="article-title">
                      <span class="title-content">{{ article.title }}</span>
                      <span class="time-content hidden-sm-and-down">{{ article.createdAt }}</span>
                    </div>
                    <div class="article-info" v-if="(article.categories && article.categories.length) || (article.tags && article.tags.length)">
                      <span class="article-info-category" v-for="category in article.categories" :key="category.id" @click="toCategory(category.id)">
                        {{ '↪' + category.name }}
                      </span>
                      <span class="article-info-tag" v-for="tag in article.tags" :key="tag.id" @click="toTag(tag.id)">
                        {{ '#' + tag.name }}
                      </span>
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
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { listByTimeArticle } from '@/api/article'

export default {
  name: 'archive',
  setup() {
    const router = useRouter()
    const archive = ref([])
    const getArchive = async (beginTime, endTime) => {
      const res = await listByTimeArticle(beginTime, endTime)
      if (res.code !== 200) return
      const rawArchive = res.data.rows || []
      const articles2Archive = () => {
        let curTime = '',
          curArticles = null,
          _list = []
        for (let i = 0, len = rawArchive.length; i < len; i++) {
          const time = rawArchive[i].createdAt.split(' ')[0]
          if (curTime !== time) {
            const curArchive = { time, articles: [] }
            _list.push(curArchive)
            curTime = time
            curArticles = curArchive.articles
          }
          curArticles.push(rawArchive[i])
        }
        return _list
      }
      archive.value = articles2Archive()
    }
    const generateArchiveTitles = articles => {
      if (articles && articles.length) {
        const len = Math.min(articles.length, 3)
        return articles.slice(0, len).map(article => article.title)
      } else {
        return ['暂无文章']
      }
    }
    const toCategory = id => {
      router.push({ name: 'category', params: { id } })
    }
    const toTag = id => {
      router.push({ name: 'tag', params: { id } })
    }
    onMounted(() => getArchive())
    return {
      archive,
      generateArchiveTitles,
      toCategory,
      toTag
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
      .el-timeline-item__timestamp {
        text-align: left;
      }
      .el-timeline-item__content {
        .display-title-container {
          @include layout(100%, auto, 0, 8px);
          @include flex-box(row, flex-start, center, wrap);
          .display-title {
            display: inline-block;
            max-width: 120px;
            .display-title-content {
              @include text-overflow(1);
              margin: 0 16px;
              color: $success-color;
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

            @mixin custom-tc {
              @include layout(auto, auto, 6px, 4px 10px);
              @include transition(all 120ms ease-in-out);
              @include border(null, 14px);
              @include pointer;
              white-space: wrap;
            }

            .article-info-category {
              @include custom-tc;
              color: $success-color;
              background-color: $success-color-b;
              &:hover {
                color: white;
                background-color: $success-color;
              }
            }
            .article-info-tag {
              @include custom-tc;
              color: $primary-color;
              background-color: $primary-color-h;
              &:hover {
                color: white;
                background-color: $primary-color;
              }
            }
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
}
</style>