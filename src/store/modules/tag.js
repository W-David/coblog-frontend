import { listTag, detailTag, deleteTag } from '@/api/tag'

const tag = {
  namespaced: true,
  state: () => ({
    tagMap: new Map()
  }),
  getters: {
    getTagById: state => id => state.tagMap.get(id),
    getTagList: state => () => state.tagMap.values()
  },
  mutations: {
    SET_TAGS: (state, tags) => {
      tags.forEach(tag => {
        state.tagMap.set(tag.id, tag)
      })
    },
    SET_TAG: (state, tag) => {
      state.tagMap.set(tag.id, tag)
    },
    DEL_TAG: (state, tagId) => {
      state.tagMap.delete(tagId)
    },
    CLEAR_TAGS: state => {
      state.tagMap.clear()
    }
  },
  actions: {
    async GetTags({ state, commit }, params = {}) {
      const res = await listTag(params)
      const tags = res.data || []
      commit('SET_TAGS', tags)
      return tags
    },
    async GetTag({ state, commit }, tagId) {
      const res = await detailTag(tagId)
      const tag = res.data || null
      commit('SET_TAG', tag)
      return tag
    },
    async DelTag({ state, commit }, tagId) {
      const res = await deleteTag(tagId)
      const tag = res.data || null
      commit('DEL_TAG', tag)
      return tag
    }
  }
}

export default tag
