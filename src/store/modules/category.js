import { listCategory, detailCategory, deleteCategory, listCategoryArticles } from '@/api/category'
import { cloneLoop, cloneForce } from '@jsmini/clone'

const category = {
  namespaced: true,
  state: () => ({
    categoryMap: new Map(),
    categoryArticles: []
  }),
  getters: {
    getCategoryById: state => id => state.categoryMap.get(id),
    getCategoryList: state => () => [...state.categoryMap.values()],
    getCategoryArticles: state => () => state.categoryArticles
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categoryMap.clear()
      categories.forEach(category => {
        state.categoryMap.set(category.id, cloneLoop(category))
      })
    },
    SET_CATEGORY_ARTICLES: (state, categoryArticles) => {
      state.categoryArticles.splice(0, categoryArticles.length)
      categoryArticles.forEach(item => {
        state.categoryArticles.push(item)
      })
    },
    SET_CATEGORY: (state, category) => {
      state.categoryMap.set(category.id, cloneLoop(category))
    },
    DEL_CATEGORY: (state, categoryId) => {
      state.categoryMap.delete(categoryId)
    },
    CLEAR_CATEGORIES: state => {
      state.categoryMap.clear()
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
      const res = await detailCategory(categoryId)
      const category = res.data || null
      commit('SET_CATEGORY', category)
      return category
    },
    async DelCategory({ state, commit }, categoryId) {
      const res = await deleteCategory(categoryId)
      const category = res.data || null
      commit('DEL_CATEGORY', category)
      return category
    }
  }
}

export default category
