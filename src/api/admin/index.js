import { DELETE, GET, POST, PUT } from '@/util/http'

export function login(data) {
	return POST({
		url: '/admin/login',
		data
	})
}

export function register(data) {
	return POST({
		url: '/admin/register',
		data
	})
}

export function auth() {
	return GET({
		url: '/admin/auth'
	})
}

export function listAdmin(params) {
	return GET({
		url: '/admin/list',
		params
	})
}

export function detailAdmin(id) {
	return GET({
		url: `/admin/detail/${id}`
	})
}

export function deleteAdmin(id) {
	return DELETE({
		url: `/admin/delete/${id}`
	})
}

export function updateAdmin(data) {
	return PUT({
		url: `/admin/update/${data.id}`,
		data
	})
}
