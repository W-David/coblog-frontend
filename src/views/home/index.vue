<template>
  <div class="home-page">
    <el-row justify="center" v-for="article in articles" :key="article.id">
      <el-col :xs="24" :sm="20" :md="18" :lg="12" :xl="12">
        <article-card :article="article"></article-card>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <pagination v-show="totalRef > 0" :total="totalRef" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import ArticleCard from '@/components/ArticleCard.vue'

export default {
  name: 'home',
  components: { ArticleCard },
  setup() {
    const store = useStore()
    const articles = computed(() => store.getters['article/getArticleList']())
    const totalRef = ref(0)
    const queryParams = reactive({
      title: '',
      pageNum: 1,
      pageSize: 10
    })

    const getList = async () => {
      const [_, total] = await store.dispatch('article/GetArticles', queryParams)
      totalRef.value = total || 0
    }
    onMounted(() => {
      getList()
    })
    return {
      articles,
      totalRef,
      getList,
      queryParams
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  @include layout(100%, 100%, 0, 16px);
  .el-row {
    margin-bottom: $row-gutter;
  }
}
</style>