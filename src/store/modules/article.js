import {
  createArticle,
  updateArticle,
  favoriteArticle,
  deleteArticle,
  listArticle,
  detailArticle,
  noAuthDetailArticle,
  listByTimeArticle,
  listByFavoArticle,
  listArchive
} from '@/api/article'
import { articles2Archive, concatArchive } from '@/util/format'
import { cloneLoop, cloneForce } from '@jsmini/clone'

const article = {
  namespaced: true,
  state: () => ({
    articleMap: new Map(),
    articleArchive: [],
    articlesRecent: [],
    articlesHot: []
  }),
  getters: {
    getArticleMap: state => () => cloneLoop(state.articleMap),
    getArticleArchive: state => cloneLoop(state.articleArchive),
    getArticleById: state => id => state.articleMap.get(id),
    getArticleList: state => () => [...state.articleMap.values()],
    getArticlesRecent: state => cloneLoop(state.articlesRecent),
    getArticlesHot: state => cloneLoop(state.articlesHot)
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
      articleArchive.forEach(item => {
        state.articleArchive.push(item)
      })
    },
    ADD_ARTICLE_ARCHIVE: (state, articleArchive) => {
      concatArchive(state.articleArchive, articleArchive)
    },
    DEL_ARTICLE: (state, id) => {
      state.articleMap.delete(id)
    },
    CLEAR_ARCHIVE: state => {
      state.articleArchive.splice(0, state.articleArchive.length)
    },
    CLEAR_ARTICLES: state => {
      state.articleMap.clear()
    },
    SET_ARTICLES_RECENT: (state, articlesRecent) => {
      state.articlesRecent = articlesRecent
    },
    CLEAR_ARTICLES_RECENT: state => {
      state.articlesRecent.splice(0, state.articlesRecent.length)
    },
    SET_ARTICLES_HOT: (state, articlesHot) => {
      state.articlesHot = articlesHot
    },
    CLEAR_ARTICLES_HOT: state => {
      state.articlesHot.splice(0, state.articlesHot.length)
    }
  },
  actions: {
    async GetArticles({ state, commit }, data) {
      const res = await listArticle(data)
      const articles = res.data.rows || []
      const total = res.data.count || 0
      commit('SET_ARTICLES', articles)
      return [articles, total]
    },
    async GetArticlesRecent({ state, commit }, data) {
      if (state.articlesRecent && state.articlesRecent.length) {
        return Promise.resolve(cloneLoop(state.articlesRecent))
      }
      const res = await listByTimeArticle(data)
      const articles = res.data.rows || []
      const total = res.data.count || 0
      commit('CLEAR_ARTICLES_RECENT')
      commit('SET_ARTICLES_RECENT', articles)
      return [articles, total]
    },
    async GetArticlesHot({ state, commit }, data) {
      if (state.articlesHot && state.articlesHot.length) {
        return Promise.resolve(cloneLoop(state.articlesHot))
      }
      const res = await listByFavoArticle(data)
      const articles = res.data || []
      commit('CLEAR_ARTICLES_HOT')
      commit('SET_ARTICLES_HOT', articles)
      return articles
    },
    async FavoriteArticle({ state, commit }, data) {
      return favoriteArticle(data)
    },
    async GetArticleArchive({ state, commit }, data) {
      const res = await listArchive(data)
      const rawArchive = res.data.rows || []
      const total = res.data.count || 0
      const articleArchive = articles2Archive(rawArchive)
      if (state.articleArchive && state.articleArchive.length) {
        commit('ADD_ARTICLE_ARCHIVE', articleArchive)
      } else {
        commit('CLEAR_ARCHIVE')
        commit('SET_ARTICLE_ARCHIVE', articleArchive)
      }
      return [articleArchive, total]
    },
    async GetArticle({ state, commit, rootGetters }, articleId) {
      const curArticle = state.articleMap.get(articleId)
      if (curArticle && curArticle.content) {
        return Promise.resolve(curArticle)
      }
      const isAdminLogin = rootGetters.isAdminLogin
      const res = isAdminLogin ? await detailArticle(articleId) : await noAuthDetailArticle(articleId)
      const article = res.data || null
      commit('SET_ARTICLE', article)
      return article
    },
    async DelArticle({ state, commit }, articleId) {
      const res = await deleteArticle(articleId)
      const article = res.data || null
      commit('DEL_ARTICLE', article.id)
      return article
    }
  }
}

export default article
