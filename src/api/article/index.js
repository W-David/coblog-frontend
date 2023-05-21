import { DELETE, GET, PATCH, POST, PUT } from '@/util/http'

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
	return PATCH({
		url: `/article/favorite/${data.id}`,
		data
	})
}

export function listArticle(params) {
	return GET({
		url: '/article/list',
		params
	})
}

export function listByTimeArticle(params) {
	return GET({
		url: '/article/listByTime',
		params
	})
}

export function listByFavoArticle(params) {
	return GET({
		url: '/article/listByFavo',
		params
	})
}

export function listArchive(params) {
	return GET({
		url: '/article/listArchive',
		params
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
