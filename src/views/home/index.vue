<template>
  <div class="home-page">
    <div class="article-row" v-for="article in articlesRef" :key="article.id">
      <el-row justify="center">
        <el-col :xs="24" :sm="20" :md="18" :lg="12" :xl="12">
          <article-card :article="article"></article-card>
        </el-col>
      </el-row>
    </div>
    <div class="pagination-row">
      <pagination
        v-show="totalRef > 0"
        :total="totalRef"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import ArticleCard from '@/components/ArticleCard.vue'

const store = useStore()
const articlesRef = ref([])
const totalRef = ref(0)
const queryParams = reactive({
  title: '',
  pageNum: 1,
  pageSize: 10
})

const getList = async () => {
  const [articles, total] = await store.dispatch('article/GetArticles', queryParams)
  articlesRef.value = articles || []
  totalRef.value = total || 0
}
onMounted(() => {
  store.commit('article/CLEAR_ARTICLES')
  getList()
})
</script>

<style lang="scss" scoped>
.home-page {
  @include layout(100%, 100%, 0, 16px);
  .article-row {
    @include layout(100%, auto, 0 0 $row-gutter 0, 0);
  }
  .pagination-row {
    @include layout(100%, auto, 0, 0);
    @include flex-box(row, center, center);
  }
}
</style>
