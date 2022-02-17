<template>
  <div class="archive-page">
    <div class="archive-timeline-container">
      <el-row justify="center">
        <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
          <el-timeline>
            <el-timeline-item
              :timestamp="a.time"
              placement="top"
              :hollow="true"
              v-for="a in archive"
              :key="a.time">
              <div
                class="article-card"
                v-for="article in a.articles"
                :key="article.id">
                <div class="article-title">
                  <span class="title-content">{{ article.title }}</span>
                  <span class="time-content hidden-sm-and-down">{{
                    article.createdAt
                  }}</span>
                </div>
                <div class="article-info">
                  <span
                    class="article-info-category"
                    v-for="category in article.categories"
                    :key="category.id">
                    {{ '↪' + category.name }}
                  </span>
                  <span
                    class="article-info-tag"
                    v-for="tag in article.tags"
                    :key="tag.id">
                    {{ '#' + tag.name }}
                  </span>
                </div>
                <div class="m-article-time hidden-md-and-up">
                  <span class="time-content">
                    {{ article.createdAt }}
                  </span>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'archive',
  setup() {
    const archive = reactive([
      {
        time: '2021-9-9',
        articles: [
          {
            id: 1,
            title: 'ceshi-title1-ceshi-title1-ceshi-title1',
            createdAt: '2021-9-9 10:30:45',
            categories: [
              { id: 1, name: 'cate1' },
              { id: 2, name: 'cate2' },
              { id: 3, name: 'cate2' },
              { id: 4, name: 'cate2' }
            ],
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' }
            ]
          },
          {
            id: 2,
            title: 'ceshi-title1',
            createdAt: '2021-9-9 10:30:45',
            categories: [
              { id: 1, name: 'cate1' },
              { id: 2, name: 'cate2' }
            ],
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' }
            ]
          },
          {
            id: 3,
            title: 'ceshi-title1',
            createdAt: '2021-9-9 10:30:45',
            categories: [
              { id: 1, name: 'cate1' },
              { id: 2, name: 'cate2' }
            ],
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' }
            ]
          }
        ]
      },
      {
        time: '2021-10-10',
        articles: [
          {
            id: 1,
            title: 'ceshi-title1',
            createdAt: '2021-10-10 10:30:45',
            categories: [
              { id: 1, name: 'cate1' },
              { id: 2, name: 'cate2' }
            ],
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' }
            ]
          },
          {
            id: 2,
            title: 'ceshi-title1',
            createdAt: '2021-10-10 10:30:45',
            categories: [
              { id: 1, name: 'cate1' },
              { id: 2, name: 'cate2' }
            ],
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' }
            ]
          },
          {
            id: 3,
            title: 'ceshi-title1',
            createdAt: '2021-10-10 10:30:45',
            categories: [
              { id: 1, name: 'cate1' },
              { id: 2, name: 'cate2' }
            ],
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' }
            ]
          }
        ]
      }
    ])
    return {
      archive
    }
  }
}
</script>

<style lang="scss" scoped>
.archive-page {
  @include layout(100%, 100%, 0, 16px);
  .archive-timeline-container {
    ul {
      padding-inline-start: 0;
    }
    &:deep {
      .el-timeline-item__timestamp {
        text-align: left;
      }
      .el-timeline-item__content {
        .article-card {
          @include layout(100%, 100%, 20px 0, 16px);
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