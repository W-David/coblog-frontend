import { listTag } from '@/api/tag'

const tag = {
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
        return Promise.resolve([null, state.tagList])
      } else {
        const [err, res] = await listTag(params)
        if (!err) {
          const tagList = res.data.data
          commit('SET_TAG_LIST', tagList)
          return [null, res]
        } else {
          return [err, null]
        }
      }
    }
  }
}

export default tag
