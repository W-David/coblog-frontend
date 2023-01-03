import { GET, POST, PUT, DELETE } from '@/util/http'

export function createArticle(data) {
  return POST({
    url: '/article/create',
    data
  })
}

export function updateArticle(data) {
  return PUT({
    url: `/article/update/${data.id}`,
    data
  })
}

export function favoriteArticle(data) {
  return PUT({
    url: `/article/favorite/${data.id}`,
    data
  })
}

export function listArticle(data) {
  return POST({
    url: '/article/list',
    data
  })
}

export function listByTimeArticle(data) {
  return POST({
    url: '/article/listByTime',
    data
  })
}

export function listByFavoArticle(data) {
  return POST({
    url: '/article/listByFavo',
    data
  })
}

export function listArchive(data) {
  return POST({
    url: '/article/listArchive',
    data
  })
}

export function detailArticle(id) {
  return GET({
    url: `/article/detail/${id}`
  })
}

export function noAuthDetailArticle(id) {
  return GET({
    url: `/article/noAuthDetail/${id}`
  })
}

export function deleteArticle(id) {
  return DELETE({
    url: `/article/delete/${id}`
  })
}
