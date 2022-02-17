<template>
  <div class="tag-page">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <div class="tag-list-container">
          <span v-for="tag in tags" :key="tag.id" class="article-tag">
            {{ tag.name }}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center" :gutter="20">
      <el-col
        :xs="24"
        :sm="20"
        :md="18"
        :lg="10"
        :xl="10"
        v-for="tag in tags"
        :key="tag.id">
        <tag-card :tag="tag"></tag-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from 'vue'
import TagCard from '@/components/TagCard'
export default {
  name: 'tag',
  components: {
    TagCard
  },
  setup() {
    const tags = reactive([
      {
        id: 1,
        name: 'tag1',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 2,
        name: '测试长长长长长长长长长',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 3,
        name: '测试长长长长长长长长长长长长长长长类别',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 4,
        name: 'tag1',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 5,
        name: 'tag1',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 6,
        name: '测试长长长长长长长长长长长长长长',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 7,
        name: '测试长长长长长长长长长长长长长长长类别',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 8,
        name: '测试长长长长长长长长长长长',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 9,
        name: 'tag1',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      },
      {
        id: 10,
        name: 'tag1',
        createdBy: 'coody',
        articles: [
          {
            id: 1,
            title: '测试标题1测试标题1测试标题1测试标题1',
            createdAt: '2021-8-10'
          },
          {
            id: 2,
            title: '测试标题2',
            createdAt: '2021-9-10'
          },
          {
            id: 3,
            title: '测试标题3',
            createdAt: '2021-10-10'
          }
        ]
      }
    ])
    return {
      tags
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-page {
  @include layout(100%, 100%, 0, 12px);
  .tag-list-container {
    @include flex-box(row, center, center, wrap);
    @include layout(100%, auto, 0, 20px);
    @include border(1px solid $border-color, 6px);
    @include transition(all 120ms ease-in-out);
    background-color: white;
    z-index: 1000;

    @mixin span-styl($mc, $bc) {
      color: $mc;
      @include layout(auto, auto, 8px, 8px 16px);
      @include border(1px solid $mc, 17px);
      font-size: 16px;
      white-space: wrap;
      background-color: $bc;
      @include transition(all 120ms ease-in-out);
      @include pointer;
      &:hover {
        color: white;
        background-color: $mc;
      }
    }

    .article-tag {
      @include span-styl($primary-color, $primary-color-h);
    }
  }
  .el-row {
    .el-col {
      margin-bottom: $row-gutter;
    }
  }
}
</style>