import { DELETE, GET, POST, PUT } from '@/util/http'

export function createCategory(data) {
	return POST({
		url: '/category/create',
		data
	})
}

export function updateCategory(data) {
	return PUT({
		url: `/category/update/${data.id}`,
		data
	})
}

export function listCategory(params) {
	return GET({
		url: '/category/list',
		params
	})
}

export function listCategoryArticles(params) {
	return GET({
		url: '/category/list/articles',
		params
	})
}

export function detailCategory(id) {
	return GET({
		url: `/category/detail/${id}`
	})
}

export function deleteCategory(id) {
	return DELETE({
		url: `/category/delete/${id}`
	})
}
