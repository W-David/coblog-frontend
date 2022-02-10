<template>
  <div class="category-container">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <div class="category-list-container">
          <span
            v-for="category in categories"
            :key="category.id"
            class="article-cate">
            {{ category.name }}
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
        v-for="category in categories"
        :key="category.id">
        <category-card :category="category"></category-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from 'vue'
import CategoryCard from '@/components/CategoryCard'
export default {
  name: 'category',
  components: {
    CategoryCard
  },
  setup() {
    const categories = reactive([
      {
        id: 1,
        name: 'cate1',
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
        name: 'cate1',
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
        name: 'cate1',
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
        name: 'cate1',
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
        name: 'cate1',
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
      categories
    }
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  @include layout(100%, 100%, 0, 12px);
  .category-list-container {
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

    .article-cate {
      @include span-styl($success-color, $success-color-b);
    }
  }
  .el-row {
    .el-col {
      margin-bottom: $row-gutter;
    }
  }
}
</style>