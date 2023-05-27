import {POST, GET, DELETE} from '@/util/http'

export function uploadFile(data) {
	return POST({
		url: '/upload',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data
	})
}

export function addFile(data) {
	return POST({
		url: '/upload/add',
		data
	})
}

export function getFile(id) {
	return GET({
		url: `/upload/${id}`
	})
}

export function deleteFile(id) {
	return DELETE({
		url: `/upload/${id}`
	})
}
