import {
  createArticle,
  updateArticle,
  deleteArticle,
  listArticle,
  detailArticle,
  listByTimeArticle
} from '@/api/article'
import { articles2Archive, concatArchive } from '@/util/format'
import { cloneLoop, cloneForce } from '@jsmini/clone'

const article = {
  namespaced: true,
  state: () => ({
    articleMap: new Map(),
    articleArchive: []
  }),
  getters: {
    getArticleMap: state => () => cloneLoop(state.articleMap),
    getArticleArchive: state => cloneLoop(state.articleArchive),
    getArticleById: state => id => state.articleMap.get(id),
    getArticleList: state => () => state.articleMap.values()
  },
  mutations: {
    SET_ARTICLES: (state, articles) => {
      articles.forEach(article => {
        state.articleMap.set(article.id, cloneLoop(article))
      })
    },
    SET_ARTICLE: (state, article) => {
      state.articleMap.set(article.id, cloneLoop(article))
    },
    SET_ARTICLE_ARCHIVE: (state, articleArchive) => {
      state.articleArchive.splice(0, articleArchive.length)
      articleArchive.forEach(item => {
        state.articleArchive.push(item)
      })
    },
    ADD_ARTICLE_ARCHIVE: (state, articleArchive) => {
      concatArchive(state.articleArchive, articleArchive)
    },
    DEL_ARTICLE: (state, articleId) => {
      state.articleMap.delete(articleId)
    },
    CLEAR_ARCHIVE: state => {
      state.articleArchive.splice(0, state.articleArchive.length)
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
    async GetArticleArchive({ state, commit }, data) {
      const res = await listByTimeArticle(data)
      const rawArchive = res.data.rows || []
      const total = res.data.count || 0
      const articleArchive = articles2Archive(rawArchive)
      if (state.articleArchive && state.articleArchive.length) {
        commit('ADD_ARTICLE_ARCHIVE', articleArchive)
      } else {
        commit('SET_ARTICLE_ARCHIVE', articleArchive)
      }
      return [articleArchive, total]
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
