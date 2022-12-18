import { POST, GET, DELETE } from '@/util/http'

export function navbarSearch(text) {
  return GET({
    url: '/search/merge-search',
    params: { text }
  })
}
