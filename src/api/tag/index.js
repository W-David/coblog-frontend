import {DELETE, GET, POST, PUT} from '@/util/http'

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

export function listTagArticles(params) {
	return GET({
		url: '/tag/list/articles',
		params
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
