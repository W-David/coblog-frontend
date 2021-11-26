import { listCategory } from '@/api/category'

const category = {
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
        return Promise.resolve([null, state.categoryList])
      } else {
        const [err, res] = await listCategory(params)
        if (!err) {
          const categoryList = res.data.data
          commit('SET_CATEGORY_LIST', categoryList)
          return [null, res]
        } else {
          return [err, null]
        }
      }
    }
  }
}

export default category
