import { listCategory, detailCategory, deleteCategory, listCategoryArticles } from '@/api/category'
import { cloneLoop, cloneForce } from '@jsmini/clone'

const category = {
  namespaced: true,
  state: () => ({
    categoryMap: new Map(),
    categoryArticlesMap: new Map()
  }),
  getters: {
    getCategoryById: state => id => state.categoryMap.get(id),
    getCategoryArticleById: state => id => state.categoryArticlesMap.get(id),
    getCategoryList: state => () => [...state.categoryMap.values()],
    getCategoryArticles: state => () => [...state.categoryArticlesMap.values()]
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      categories.forEach(item => {
        state.categoryMap.set(item.id, cloneLoop(item))
      })
    },
    SET_CATEGORY_ARTICLES: (state, categoryArticles) => {
      categoryArticles.forEach(item => {
        state.categoryArticlesMap.set(item.id, cloneLoop(item))
      })
    },
    SET_CATEGORY: (state, category) => {
      state.categoryMap.set(category.id, cloneLoop(category))
    },
    SET_CATEGORY_ARTICLE: (state, categoryArticle) => {
      state.categoryArticlesMap.set(categoryArticle.id, cloneLoop(categoryArticle))
    },
    DEL_CATEGORY: (state, id) => {
      state.categoryMap.delete(id)
    },
    DEL_CATEGORY_ARTICLE: (state, id) => {
      state.categoryArticlesMap.delete(id)
    },
    CLEAR_CATEGORIES: state => {
      state.categoryMap.clear()
    },
    CLEAR_CATEGORY_ARTICLES: state => {
      state.categoryArticlesMap.clear()
    }
  },
  actions: {
    async GetCategories({ state, commit }, params = {}) {
      const res = await listCategory(params)
      const categories = res.data.rows || []
      const total = res.data.count || 0
      commit('SET_CATEGORIES', categories)
      return [categories, total]
    },
    async GetCategoryArticles({ state, commit }, data = {}) {
      const res = await listCategoryArticles(data)
      const categories = res.data.rows || []
      const total = res.data.count || 0
      commit('SET_CATEGORY_ARTICLES', categories)
      return [categories, total]
    },
    async GetCategory({ state, commit }, categoryId) {
      const curCategory = state.categoryMap.get(categoryId)
      if (curCategory && curCategory.name) {
        return Promise.resolve(curCategory)
      }
      const res = await detailCategory(categoryId)
      const category = res.data || null
      commit('SET_CATEGORY', category)
      return category
    },
    async DelCategory({ state, commit }, categoryId) {
      const res = await deleteCategory(categoryId)
      const category = res.data || null
      commit('DEL_CATEGORY', category.id)
      commit('DEL_CATEGORY_ARTICLE', category.id)
      return category
    }
  }
}

export default category
