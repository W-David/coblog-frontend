import { listCategory } from '@/api/category'

const category = {
  namespaced: true,
  state: () => ({
    categoryList: []
  }),
  mutations: {
    SET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList
    }
  },
  actions: {
    async getCategoryList({ state, commit }, params = {}) {
      const categoryList = state.getters.categoryList
      if (Array.isArray(categoryList) && categoryList.length > 0) {
        return categoryList
      } else {
        const res = await listCategory(params)
        const categoryList = res.data || []
        commit('SET_CATEGORY_LIST', categoryList)
        return categoryList
      }
    }
  }
}

export default category
