<template>
  <div class="blog-container">
    <div class="blog-toolbar" ref="toolbar"></div>
    <div class="blog-tc">
      <div class="tag-area">
        <select-area
          styl="primary"
          @on-select="handleTagSelect"
          selectText="选择标签"
          addText="添加标签"
          :items="tags"></select-area>
      </div>
      <div class="cate-area">
        <select-area
          styl="success"
          @on-select="handleCateSelect"
          selectText="选择分类"
          addText="添加分类"
          :items="cates"></select-area>
      </div>
    </div>
    <div class="blog-text" ref="text"></div>
    <div class="blog-edit"></div>
  </div>
  <el-dialog v-model="showAll" :title="title.text">
    <selected-list
      :isShow="showAll"
      :list="list"
      v-model:checkedArr="checkedArr">
    </selected-list>
  </el-dialog>
</template>

<script>
import WangEditor from 'wangeditor'
import hljs from 'highlight.js'
import { onMounted, onBeforeUnmount, ref, reactive, watch, computed } from 'vue'
import SelectArea from '@/components/SelectArea.vue'
import SelectedList from '@/components/SelectedList.vue'
import getOssClient from '@/util/alioss'
import { useStore } from 'vuex'

export default {
  name: 'blog',
  components: {
    SelectArea,
    SelectedList
  },
  setup() {
    const store = useStore()
    const toolbar = ref()
    const text = ref()
    const showAll = ref(false)
    const list = ref([])
    const tags = ref([])
    const cates = ref([])
    const checkedArr = ref([])
    const title = ref('')
    const type = ref('')
    const form = reactive({
      title: '',
      content: '',
      author: '',
      categoryIds: [],
      tagIds: []
    })
    let instance
    onMounted(() => {
      instance = new WangEditor(toolbar.value, text.value)
      Object.assign(instance.config, {
        highlight: hljs,
        zIndex: 1010,
        showFullScreen: false,
        customUploadImg
      })
      instance.create()
    })

    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })

    const customUploadImg = (resultFiles, insertImgFn) => {
      const client = getOssClient(store)
      debugger
    }

    const handleTagSelect = () => {
      title.value = {
        type: 'tag',
        text: '选择标签'
      }
      type.value = 'primary'
      const rawList = [
        { id: 1, name: 'tag1' },
        { id: 2, name: 'tag2' },
        { id: 3, name: 'tag3' },
        { id: 4, name: 'tag4' },
        { id: 5, name: 'tag5' }
      ]
      const inTags = item => tags.value.some(tag => tag.id === item.id)
      list.value = rawList.filter(item => !inTags(item))
      showAll.value = true
    }
    const handleCateSelect = () => {
      title.value = {
        type: 'cate',
        text: '选择分类'
      }
      type.value = 'success'
      const rawList = [
        { id: 1, name: 'cate1' },
        { id: 2, name: 'cate2' },
        { id: 3, name: 'cate3' },
        { id: 4, name: 'cate4' },
        { id: 5, name: 'cate5' }
      ]
      const inCates = item => cates.value.some(cate => cate.id === item.id)
      list.value = rawList.filter(item => !inCates(item))
      showAll.value = true
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
      form,
      handleTagSelect,
      handleCateSelect
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-container {
  z-index: 1000;
  @include layout(100%, 100%, 0, 16px);
  background-color: white;
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
  .blog-text {
    @include border(1px solid #ccc);
    min-height: 200px;
  }
}
</style>