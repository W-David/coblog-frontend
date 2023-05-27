import service from './request'

export async function GET(args) {
	const {url, params} = args
	const config = {params}
	return await service.get(url, config)
}

export async function POST(args) {
	const {url, data, config} = args
	return await service.post(url, data, config)
}

export async function PATCH(args) {
	const {url, data, config} = args
	return await service.patch(url, data, config)
}

export async function PUT(args) {
	const {url, data, config} = args
	return await service.put(url, data, config)
}

export async function DELETE(args) {
	const {url, params} = args
	const config = {params}
	return await service.delete(url, config)
}
