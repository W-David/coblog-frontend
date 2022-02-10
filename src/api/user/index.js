import { GET, POST, PUT, DELETE } from '@/util/http'

export function login(data) {
  return POST({
    url: '/user/login',
    data
  })
}

export function register(data) {
  return POST({
    url: '/user/register',
    data
  })
}

export function auth() {
  return GET({
    url: '/user/auth'
  })
}

export function listUser(params) {
  return GET({
    url: '/user/list',
    params
  })
}

export function detailUser(id) {
  return GET({
    url: `/user/detail/${id}`
  })
}

export function deleteUser(id) {
  return DELETE({
    url: `/user/delete/${id}`
  })
}

export function updateUser(data) {
  return PUT({
    url: `/user/update/${data.id}`,
    data
  })
}
