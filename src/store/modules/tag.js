import { listTag } from '@/api/tag'

const tag = {
  namespaced: true,
  state: () => ({
    tagList: []
  }),
  mutations: {
    SET_TAG_LIST(state, tagList) {
      state.tagList = tagList
    }
  },
  actions: {
    async getTagList({ state, commit }, params = {}) {
      const tagList = state.getters.tagList
      if (Array.isArray(tagList) && tagList.length > 0) {
        return tagList
      } else {
        const res = await listTag(params)
        const tagList = res.data || []
        commit('SET_TAG_LIST', tagList)
        return tagList
      }
    }
  }
}

export default tag
