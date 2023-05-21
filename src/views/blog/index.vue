<template>
	<div class="blog-page">
		<div class="blog-edit-area">
			<div class="blog-img">
				<banner-upload
					:is-uploaded="!!blogBanner"
					:img-url="blogBanner"
					trig-hint="上传头图"
					descrip-hint="头图"
					@on-upload="handleUpload"
					@on-delete="handleDelete"></banner-upload>
			</div>
			<div class="blog-title">
				<input
					v-model="blogTitle"
					placeholder="取个标题吧(❁´◡`❁)" />
			</div>
			<div class="blog-tc">
				<div class="tag-area">
					<select-area
						styl="primary"
						select-text="选择标签"
						add-text="添加标签"
						:items="tags"
						@on-select="handleTagSelect"
						@on-add-item="handleTagAdd"></select-area>
				</div>
				<div class="cate-area">
					<select-area
						styl="success"
						select-text="选择分类"
						add-text="添加分类"
						:items="cates"
						@on-select="handleCateSelect"
						@on-add-item="handleCateAdd"></select-area>
				</div>
			</div>
			<div class="blog-desc">
				<textarea
					v-model="blogDesc"
					placeholder="请输入文章描述(^///^)" />
			</div>
			<div class="blog-text">
				<mavon-editor
					ref="mavon"
					v-model="text"
					:box-shadow="false"
					:subfield="false"
					@img-add="imgAdd"
					@img-del="imgDel"></mavon-editor>
			</div>
			<div class="blog-ctrl">
				<el-button
					type="success"
					@click="submitBlog">
					提交博文
				</el-button>
			</div>
		</div>
		<!-- <div class="blog-view-area" v-html="previewHtml"></div> -->
		<el-dialog
			v-model="showAll"
			:title="title.text">
			<selected-list
				v-model:checkedArr="checkedArr"
				:loading="isListLoading"
				:is-show="showAll"
				:list="list"></selected-list>
		</el-dialog>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive, watch, computed, toRaw, defineProps } from 'vue'
import BannerUpload from '@/components/FileUpload.vue'
import SelectArea from '@/components/SelectArea.vue'
import SelectedList from '@/components/SelectedList.vue'
import getOssClient from '@/util/alioss'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { mavonEditor as MavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { createArticle, updateArticle } from '@/api/article'
import { addFile, deleteFile } from '@/api/file'
import { createTag, listTag } from '@/api/tag'
import { createCategory, listCategory } from '@/api/category'

const props = defineProps({
	id: {
		type: String,
		default: ''
	}
})
const store = useStore()
const router = useRouter()

const text = ref()
const mavon = ref()

const title = ref('')
const list = ref([])
const type = ref('')
const showAll = ref(false)
const isListLoading = ref(false)
const checkedArr = ref([])

const blogBanner = ref('')
const blogBannerId = ref('')
const blogTitle = ref('')
const blogDesc = ref('')
const tags = ref([])
const cates = ref([])

const isEditMode = computed(() => !!props.id)

onMounted(() => {
	if (isEditMode.value) {
		const article = computed(() => store.getters['article/getArticleById'](+props.id))
		const { title = '', content = '', banner = {}, description = '', categories = [], tags: tgs = [] } = article.value

		blogTitle.value = title
		blogBannerId.value = (banner && banner.id) || ''
		blogBanner.value = (banner && banner.path) || ''
		blogDesc.value = description
		cates.value = categories
		tags.value = tgs
		text.value = content
		// contentInstance.txt.html(content)
	}
})

onBeforeUnmount(() => {
	// contentInstance.destroy()
	// contentInstance = null
})

const imgAdd = async (pos, file) => {
	const url = await uploadImg(file)
	mavon.value.$img2Url(pos, url)
}

const imgDel = () => {}
const uploadImg = async file => {
	const client = getOssClient(store)
	const res = await client.put(file.name, file)
	if (res.res.status === 200 && res.res.statusCode === 200) {
		ElMessage({ message: '上传成功', type: 'success' })
		const url = res.url
		return url
	} else {
		ElMessage({ message: '图片上传失败', type: 'error' })
		return ''
	}
}

const handleTagSelect = async () => {
	title.value = {
		type: 'tag',
		text: '选择标签'
	}
	type.value = 'primary'
	showAll.value = true
	isListLoading.value = true
	const res = await listTag()
	isListLoading.value = false
	if (res.code !== 200) return
	const rawList = res.data.rows.map(item => ({
		id: item.id,
		name: item.name
	}))
	const inTags = item => tags.value.some(tag => tag.id === item.id)
	list.value = rawList.filter(item => !inTags(item))
}
const handleCateSelect = async () => {
	title.value = {
		type: 'cate',
		text: '选择分类'
	}
	type.value = 'success'
	showAll.value = true
	isListLoading.value = true
	const res = await listCategory()
	isListLoading.value = false
	if (res.code !== 200) return
	const rawList = res.data.rows.map(item => ({
		id: item.id,
		name: item.name
	}))
	const inCates = item => cates.value.some(cate => cate.id === item.id)
	list.value = rawList.filter(item => !inCates(item))
}
const handleTagAdd = async tagName => {
	const data = { name: tagName }
	const res = await createTag(data)
	if (res.code !== 200) return
	const tag = {
		id: res.data.id,
		name: res.data.name
	}
	tags.value.push(tag)
	ElMessage({ type: 'success', message: res.msg })
}
const handleCateAdd = async cateName => {
	const data = { name: cateName }
	const res = await createCategory(data)
	if (res.code !== 200) return
	const cate = {
		id: res.data.id,
		name: res.data.name
	}
	cates.value.push(cate)
	ElMessage({ type: 'success', message: res.msg })
}
watch(showAll, (nv, ov) => {
	if (!nv && ov) {
		if (!checkedArr.value || !checkedArr.value.length) {
			return
		}
		if (title.value.type === 'tag') {
			tags.value.push(...checkedArr.value)
		} else if (title.value.type === 'cate') {
			cates.value.push(...checkedArr.value)
			// eslint-disable-next-line
    } else {
		}
	}
})

const handleUpload = async file => {
	const { name, size, type } = file
	const client = getOssClient(store)
	const res = await client.put(file.name, file)
	if (res.res.status === 200 && res.res.statusCode === 200) {
		const url = res.url
		blogBanner.value = url
		const fileData = {
			name,
			size,
			extension: type,
			path: url
		}
		const addRes = await addFile({ ...fileData })
		if (addRes.code !== 200) return
		blogBannerId.value = addRes.data.id || ''
		ElMessage({ message: '头图已成功上传', type: 'success' })
	} else {
		ElMessage({ message: '头图上传失败', type: 'error' })
		blogBanner.value = ''
		return
	}
}

const handleDelete = async () => {
	const bannerId = blogBannerId.value || ''
	if (!bannerId) return
	blogBanner.value = ''
	blogBannerId.value = ''
	const deleteRes = await deleteFile(bannerId)
	if (deleteRes.code !== 200) return
	ElMessage({ message: '头图已删除', type: 'success' })
}

const submitBlog = async () => {
	const title = blogTitle.value
	const content = text.value
	const categoryIds = cates.value.map(cate => cate.id)
	const tagIds = tags.value.map(tag => tag.id)
	const description = blogDesc.value || '默认描述内容'
	const bannerId = blogBannerId.value || ''
	const blog = {
		title,
		content,
		description,
		bannerId,
		categoryIds,
		tagIds
	}
	const articleRes = isEditMode.value ? await updateArticle({ ...blog, id: +props.id }) : await createArticle(blog)
	if (articleRes.code !== 200) return
	store.commit('article/SET_ARTICLE', articleRes.data)
	router.push({ name: 'home' })
	ElMessage({ message: `已保存 • ${title}`, type: 'success' })
}
</script>

<style lang="scss" scoped>
.blog-page {
	@include layout(100%, auto, 0 0 $main-margin 0, 0);
	z-index: 1000;

	.blog-edit-area {
		@include layout(auto, auto, 0, $main-margin);
		@include border(none);
		@include box-shadow(8px 8px 20px rgba(0, 0, 0, 0.05), -4px -4px 20px rgba(0, 0, 0, 0.05));
		@include bg-color(#fff, #1a1a1a);
		.blog-img {
			@include layout(100%, 300px, 0 0 8px 0, 0);
			background-color: var(--el-bg-color);
			border-radius: 8px;
		}
		.blog-title {
			@include layout(100%, auto, 0 0 8px 0, 0);
			min-height: 48px;
			input {
				@include layout(100%, auto, 0, 12px);
				font-size: 24px;
				font-weight: bold;
				outline: none !important;
				background-color: var(--el-bg-color);
				@include border(1px solid var(--el-border-color), 4px);
				@include font-hei;
			}
		}
		.blog-toolbar {
			::v-deep .w-e-toolbar {
				background-color: var(--el-bg-color);
				@include border(1px solid var(--el-border-color), 4px);
				@include layout(100%, auto, 8px 0, 0);
			}
		}
		.blog-tc {
			@include layout(100%, auto, 8px 0, 6px);
			@include border(1px solid var(--el-border-color), 4px);
			background-color: var(--el-bg-color);
			.tag-area {
				@include layout(100%, auto, 0, 0);
			}
			.cate-area {
				@include layout(100%, auto, 0, 0);
			}
		}
		.blog-desc {
			@include layout(100%, auto, 8px 0, 0);
			textarea {
				width: 100%;
				height: 120px;
				margin: 0;
				padding: 12px;
				resize: none;
				border: none;
				outline: none;
				font-size: 20px;
				font-weight: 550;
				@include border(1px solid var(--el-border-color), 4px);
				@include font-hei;
				background-color: var(--el-bg-color);
			}
		}
		.blog-text {
			@include layout(100%, auto, 8px 0, 0);
			&:deep {
				.v-note-wrapper {
					z-index: 1000 !important;
					@include border(1px solid var(--el-border-color), 4px);
					&.fullscreen {
						z-index: 10000 !important;
					}
					background-color: var(--el-bg-color) !important;
					.v-note-op {
						background-color: var(--el-bg-color) !important;
						border-bottom-color: var(--el-border-color) !important;
						.op-icon {
							&:hover {
								background-color: var(--el-bg-color-overlay) !important;
							}
							&.selected {
								color: var(--el-text-color-regular) !important;
								background-color: var(--el-bg-color-page) !important;
							}
						}
						.op-icon,
						.op-icon-divider {
							color: var(--el-text-color-regular) !important;
						}
					}
					.v-note-panel {
						.v-note-edit {
							.content-input-wrapper {
								background-color: var(--el-bg-color) !important;
								textarea {
									background-color: var(--el-bg-color) !important;
									color: var(--el-text-color-primary) !important;
								}
							}
						}
						.v-note-show {
							&.single-show {
								.scroll-style {
									background-color: var(--el-bg-color) !important;
								}
							}
						}
					}
				}
			}
		}
		.blog-ctrl {
			&:deep {
				.el-button {
					@include layout(100%, auto, 8px 0 0 0, auto);
					border-radius: 16px;
				}
			}
		}
	}
	.blog-view-area {
		@include layout(100%, 100%, 0, 16px);
		@include border(1px solid var(--el-border-color));
	}
}
</style>
