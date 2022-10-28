import { listTag, detailTag, deleteTag, listTagArticles } from '@/api/tag'
import { cloneLoop, cloneForce } from '@jsmini/clone'

const tag = {
  namespaced: true,
  state: () => ({
    tagMap: new Map(),
    tagArticlesMap: new Map()
  }),
  getters: {
    getTagById: state => id => state.tagMap.get(id),
    getTagArticleById: state => id => state.tagArticlesMap.get(id),
    getTagList: state => () => [...state.tagMap.values()],
    getTagArticles: state => () => [...state.tagArticlesMap.values()]
  },
  mutations: {
    SET_TAGS: (state, tags) => {
      tags.forEach(item => {
        state.tagMap.set(item.id, cloneLoop(item))
      })
    },
    SET_TAG_ARTICLES: (state, tagArticles) => {
      tagArticles.forEach(item => {
        state.tagArticlesMap.set(item.id, cloneLoop(item))
      })
    },
    SET_TAG: (state, tag) => {
      state.tagMap.set(tag.id, cloneLoop(tag))
    },
    SET_TAG_ARTICLE: (state, tagArticle) => {
      state.tagArticlesMap.set(tagArticle.id, cloneLoop(tagArticle))
    },
    DEL_TAG: (state, id) => {
      state.tagMap.delete(id)
    },
    DEL_TAG_ARTICLE: (state, id) => {
      state.tagArticlesMap.delete(id)
    },
    CLEAR_TAGS: state => {
      state.tagMap.clear()
    },
    CLEAR_TAG_ARTICLES: state => {
      state.tagArticlesMap.clear()
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
      const curTag = state.tagMap.get(tagId)
      if (curTag && curTag.name) {
        return Promise.resolve(curTag)
      }
      const res = await detailTag(tagId)
      const tag = res.data || null
      commit('SET_TAG', tag)
      return tag
    },
    async DelTag({ state, commit }, tagId) {
      const res = await deleteTag(tagId)
      const tag = res.data || null
      commit('DEL_TAG', tag.id)
      commit('DEL_TAG_ARTICLE', tag.id)
      return tag
    }
  }
}

export default tag
