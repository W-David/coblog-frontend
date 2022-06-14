import { listCategory, detailCategory, deleteCategory } from '@/api/category'

const category = {
  namespaced: true,
  state: () => ({
    categoryMap: new Map()
  }),
  getters: {
    getCategoryById: state => id => state.categoryMap.get(id),
    getCategoryList: state => () => state.categoryMap.values()
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      categories.forEach(category => {
        state.categoryMap.set(category.id, category)
      })
    },
    SET_CATEGORY: (state, category) => {
      state.categoryMap.set(category.id, category)
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
