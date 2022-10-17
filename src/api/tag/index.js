import { GET, POST, PUT, DELETE } from '@/util/http'

export function createTag(data) {
  return POST({
    url: '/tag/create',
    data
  })
}

export function updateTag(data) {
  return PUT({
    url: `/tag/update/${data.id}`,
    data
  })
}

export function listTag(params) {
  return GET({
    url: '/tag/list',
    params
  })
}

export function listTagArticles(data) {
  return POST({
    url: '/tag/list/articles',
    data
  })
}

export function detailTag(id) {
  return GET({
    url: `/tag/detail/${id}`
  })
}

export function deleteTag(id) {
  return DELETE({
    url: `/tag/delete/${id}`
  })
}
