<template>
  <div class="category-page">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20">
        <div class="category-list-container">
          <span v-for="category in categories" :key="category.id" :class="['article-cate', isChecked(category.id) ? 'is-active' : '']" @click="handleChecked(category)">
            {{ category.name }}
          </span>
          <span class="article-cate ctrl-btn" @click="handleAdd">
            <el-icon><i-plus /></el-icon>
            添加类别
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :sm="24" :md="20" :lg="20">
        <el-row justify="start" :gutter="20">
          <el-col :md="24" :lg="12" v-for="category in categoryArticles" :key="category.id">
            <category-card :category="category" :is-active="isChecked(category.id)"></category-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import CategoryCard from '@/components/CategoryCard'

import usePrompt from '@/hooks/usePrompt'

import { createCategory } from '@/api/category'

import { cloneLoop, cloneForce } from '@jsmini/clone'

export default {
  name: 'category',
  components: {
    CategoryCard
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const categories = computed(() => store.getters['category/getCategoryList']())
    const categoryArticles = computed(() => store.getters['category/getCategoryArticles']())
    const checkedIds = ref([])
    const isChecked = id => checkedIds.value.includes(id)
    const handleChecked = item => {
      if (isChecked(item.id)) {
        const index = checkedIds.value.indexOf(item.id)
        checkedIds.value.splice(index, 1)
      } else {
        checkedIds.value.push(item.id)
      }
    }
    const getCategories = async () => {
      await store.dispatch('category/GetCategories')
    }
    const getCategoryArticles = async () => {
      await store.dispatch('category/GetCategoryArticles')
    }
    const handleAdd = async () => {
      const { setIsFinish, showPrompt, setHint } = usePrompt()
      setHint('已添加')
      const { value } = await showPrompt('请输入添加的种类名称', '添加种类', '添加')
      if (!value) return
      const res = await createCategory({ name: value })
      if (res.code !== 200) return
      store.dispatch('category/GetCategory', res.data.id)
      store.dispatch('category/GetCategoryArticles', { ids: [res.data.id] })
      setIsFinish(true)
    }
    onMounted(() => {
      if (route.params.id) {
        checkedIds.value.push(+route.params.id)
      }
      Promise.all([getCategoryArticles(), getCategories()])
    })
    return {
      categories,
      categoryArticles,
      checkedIds,
      isChecked,
      handleAdd,
      handleChecked
    }
  }
}
</script>

<style lang="scss" scoped>
.category-page {
  @include layout(100%, 100%, 0, 12px);
  .category-list-container {
    @include flex-box(row, center, center, wrap);
    @include layout(100%, auto, 0, 20px);
    @include border(1px solid $border-color, 6px);
    @include transition(all 120ms ease-in-out);
    background-color: white;
    z-index: 1000;

    @mixin panel-styl($mc, $bc) {
      color: $mc;
      display: inline-block;
      line-height: 36px;
      @include layout(auto, 36px, 8px, 0 16px);
      @include border(1px solid $mc, 18px);
      font-size: 16px;
      white-space: wrap;
      background-color: $bc;
      @include transition(all 120ms ease-in-out);
      @include pointer;
      &:hover {
        color: white;
        background-color: $mc;
      }
      &.is-active {
        color: white;
        background-color: $mc;
      }
    }

    .article-cate {
      @include panel-styl($success-color, $success-color-b);
      &.ctrl-btn {
        @include panel-styl($font-color, $font-color-c);
      }
    }
  }
  .el-row {
    .el-col {
      margin-bottom: $row-gutter;
    }
  }
}
</style>