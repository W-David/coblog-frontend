import { listTag, detailTag, deleteTag, listTagArticles } from '@/api/tag'
import { cloneLoop, cloneForce } from '@jsmini/clone'

const tag = {
  namespaced: true,
  state: () => ({
    tagMap: new Map(),
    tagArticles: []
  }),
  getters: {
    getTagById: state => id => state.tagMap.get(id),
    getTagList: state => () => [...state.tagMap.values()],
    getTagArticles: state => () => state.tagArticles
  },
  mutations: {
    SET_TAGS: (state, tags) => {
      state.tagMap.clear()
      tags.forEach(tag => {
        state.tagMap.set(tag.id, cloneLoop(tag))
      })
    },
    SET_TAG_ARTICLES: (state, tagArticles) => {
      state.tagArticles.splice(0, tagArticles.length)
      tagArticles.forEach(item => {
        state.tagArticles.push(item)
      })
    },
    SET_TAG: (state, tag) => {
      state.tagMap.set(tag.id, cloneLoop(tag))
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
      const tags = res.data.rows || []
      const total = res.data.count || 0
      commit('SET_TAGS', tags)
      return [tags, total]
    },
    async GetTagArticles({ state, commit }, data = {}) {
      const res = await listTagArticles(data)
      const tags = res.data.rows || []
      const total = res.data.count || 0
      commit('SET_TAG_ARTICLES', tags)
      return [tags, total]
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
