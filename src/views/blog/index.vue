<template>
  <div class="blog-page">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="12" :xl="12">
        <div class="blog-edit-area">
          <div class="blog-img">
            <banner-upload
              :isUploaded="!!blogImg"
              :imgUrl="blogImg"
              trigHint="上传头图"
              descripHint="头图"
              @on-upload="handleUpload"
              @on-delete="handleDelete">
            </banner-upload>
          </div>
          <div class="blog-title">
            <input v-model="blogTitle" placeholder="取个标题吧(❁´◡`❁)" />
          </div>
          <div class="blog-toolbar" ref="toolbar"></div>
          <div class="blog-tc">
            <div class="tag-area">
              <select-area
                styl="primary"
                @on-select="handleTagSelect"
                @on-add-item="handleTagAdd"
                selectText="选择标签"
                addText="添加标签"
                :items="tags"></select-area>
            </div>
            <div class="cate-area">
              <select-area
                styl="success"
                @on-select="handleCateSelect"
                @on-add-item="handleCateAdd"
                selectText="选择分类"
                addText="添加分类"
                :items="cates"></select-area>
            </div>
          </div>
          <div class="blog-desc">
            <textarea
              v-model="blogDesc"
              placeholder="请输入文章描述(^///^)"></textarea>
          </div>
          <div class="blog-text" ref="text"></div>
          <div class="blog-edit"></div>
          <div class="blog-ctrl">
            <el-button type="success" @click="submitBlog">提交博文</el-button>
          </div>
        </div>
        <el-dialog v-model="showAll" :title="title.text">
          <selected-list
            :loading="isListLoading"
            :isShow="showAll"
            :list="list"
            v-model:checkedArr="checkedArr">
          </selected-list>
        </el-dialog>
      </el-col>
      <!-- <el-col class="hidden-md-and-down" :md="12" :lg="12" :xl="12">
        <div class="blog-view-area" v-html="previewHtml"></div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
import hljs from 'highlight.js'
import { onMounted, onBeforeUnmount, ref, reactive, watch, computed } from 'vue'
import BannerUpload from '@/components/FileUpload.vue'
import SelectArea from '@/components/SelectArea.vue'
import SelectedList from '@/components/SelectedList.vue'
import getOssClient from '@/util/alioss'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

import { createArticle, updateArticle } from '@/api/article'
import { addFile, deleteFile } from '@/api/file'
import { createTag, listTag } from '@/api/tag'
import { createCategory, listCategory } from '@/api/category'

export default {
  name: 'blog',
  components: {
    BannerUpload,
    SelectArea,
    SelectedList
  },
  setup() {
    const store = useStore()
    const toolbar = ref()
    const text = ref()
    const showAll = ref(false)
    const blogImg = ref('')
    const blogTitle = ref('')
    const blogDesc = ref('')
    const adminInfo = computed(() => store.getters.adminInfo)
    const blogBannerId = ref('')
    const list = ref([])
    const tags = ref([])
    const cates = ref([])
    const checkedArr = ref([])
    const title = ref('')
    const type = ref('')
    const previewHtml = ref('')
    const isListLoading = ref(false)

    let contentInstance = null
    const createContentInstance = () => {
      contentInstance = new WangEditor(toolbar.value, text.value)
      Object.assign(contentInstance.config, {
        highlight: hljs,
        zIndex: 1010,
        showFullScreen: false,
        customUploadImg,
        onchange,
        onchangeTimeout: 1500
      })
      contentInstance.create()
    }
    onMounted(() => {
      createContentInstance()
    })

    onBeforeUnmount(() => {
      contentInstance.destroy()
      contentInstance = null
    })

    const onchange = newHtml => {
      previewHtml.value = newHtml
    }

    const customUploadImg = async (resultFiles, insertImgFn) => {
      const client = getOssClient(store)
      const file = resultFiles[0]
      const res = await client.put(file.name, file)
      if (res.res.status === 200 && res.res.statusCode === 200) {
        ElMessage({ message: '上传成功', type: 'success' })
        const url = res.url
        insertImgFn(url)
      } else {
        ElMessage({ message: '图片上传失败', type: 'error' })
        return
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
      tags.value.push({
        id: res.data.id,
        name: res.data.name
      })
      ElMessage({ type: 'success', message: res.msg })
    }
    const handleCateAdd = async cateName => {
      const data = { name: cateName }
      const res = await createCategory(data)
      if (res.code !== 200) return
      cates.value.push({
        id: res.data.id,
        name: res.data.name
      })
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
        blogImg.value = url
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
        blogImg.value = ''
        return
      }
    }

    const handleDelete = async () => {
      const bannerId = blogBannerId.value || ''
      if (!bannerId) return
      blogImg.value = ''
      blogBannerId.value = ''
      const deleteRes = await deleteFile(bannerId)
      if (deleteRes.code !== 200) return
      ElMessage({ message: '头图已删除', type: 'success' })
    }

    const submitBlog = async () => {
      const title = blogTitle.value
      const content = contentInstance.txt.html()
      const adminId = adminInfo.value.id || ''
      const categoryIds = tags.value.map(tag => tag.id)
      const tagIds = cates.value.map(cate => cate.id)
      const description = blogDesc.value || '默认描述内容'
      const bannerId = blogBannerId.value || ''
      const articleRes = await createArticle({
        title,
        content,
        adminId,
        categoryIds,
        tagIds,
        description,
        bannerId
      })
      if (articleRes.code !== 200) return
      ElMessage({ message: '提交文章成功', type: 'success' })
    }

    return {
      toolbar,
      text,
      showAll,
      list,
      tags,
      cates,
      checkedArr,
      title,
      type,
      blogImg,
      blogTitle,
      blogDesc,
      previewHtml,
      isListLoading,
      handleTagSelect,
      handleCateSelect,
      handleTagAdd,
      handleCateAdd,
      handleUpload,
      handleDelete,
      submitBlog
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-page {
  @include layout(calc(100% - 32px), calc(100% - 32px), 16px, 8px);
  @include border(1px solid #ccc, 8px);
  background-color: white;
  // z-index: 1000;
  .blog-edit-area {
    @include layout(100%, 100%, 0, 0);
    .blog-img {
      @include layout(100%, 300px, 0 0 8px 0, 0);
    }
    .blog-title {
      @include layout(100%, auto, 0 0 8px 0, 0);
      @include border(1px solid #ccc);
      min-height: 48px;
      input {
        @include layout(100%, auto, 0, 12px);
        font-size: 24px;
        font-weight: bold;
        border: none !important;
        outline: none !important;
        @include font-hei;
      }
    }
    .blog-toolbar {
      @include border(1px solid #ccc);
    }
    .blog-tc {
      @include layout(100%, auto, 8px 0, 6px);
      @include border(1px solid #ccc);
      .tag-area {
        @include layout(100%, auto, 0, 0);
      }
      .cate-area {
        @include layout(100%, auto, 0, 0);
      }
    }
    .blog-desc {
      @include layout(100%, auto, 8px 0, 6px);
      @include border(1px solid #ccc);
      textarea {
        width: 100%;
        height: 120px;
        resize: none;
        border: none;
        outline: none;
        font-size: 20px;
        font-weight: 550;
        @include font-hei;
      }
    }
    .blog-text {
      @include border(1px solid #ccc);
      min-height: 360px;
    }
    .blog-ctrl {
      &:deep {
        .el-button {
          @include layout(100%, auto, 8px 0, auto);
          border-radius: 2px;
        }
      }
    }
  }
  .blog-view-area {
    @include layout(100%, 100%, 0, 16px);
    @include border(1px solid #ccc);
  }
}
</style>