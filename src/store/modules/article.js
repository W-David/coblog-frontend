import { createArticle, updateArticle, deleteArticle, listArticle, detailArticle } from '@/api/article'

const article = {
  namespaced: true,
  state: () => ({
    articleMap: new Map()
  }),
  getters: {
    getArticleById: state => id => state.articleMap.get(id),
    getArticleList: state => () => state.articleMap.values()
  },
  mutations: {
    SET_ARTICLES: (state, articles) => {
      articles.forEach(article => {
        state.articleMap.set(article.id, article)
      })
    },
    SET_ARTICLE: (state, article) => {
      state.articleMap.set(article.id, article)
    },
    DEL_ARTICLE: (state, articleId) => {
      state.articleMap.delete(articleId)
    },
    CLEAR_ARTICLES: state => {
      state.articleMap.clear()
    }
  },
  actions: {
    async GetArticles({ state, commit }, data) {
      const res = await listArticle(data)
      const articles = res.data.rows || []
      const total = res.data.count || 0
      commit('CLEAR_ARTICLES')
      commit('SET_ARTICLES', articles)
      return [articles, total]
    },
    async GetArticle({ state, commit }, articleId) {
      const res = await detailArticle(articleId)
      const article = res.data || null
      commit('SET_ARTICLE', article)
      return article
    },
    async DelArticle({ state, commit }, articleId) {
      const res = await deleteArticle(articleId)
      const article = res.data || null
      commit('DEL_ARTICLE', article)
      return article
    }
  }
}

export default article
