<template>
  <div class="tag-page">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <div class="tag-list-container">
          <span v-for="tag in tags" :key="tag.id" :class="['article-tag', isChecked(tag.id) ? 'is-active' : '']" @click="handleChecked(tag)">
            {{ tag.name }}
          </span>
          <span class="article-tag ctrl-btn" @click="handleAdd">
            <el-icon><i-plus /></el-icon>
            添加标签
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :sm="24" :md="20" :lg="20">
        <el-row justify="start" :gutter="20">
          <el-col :md="24" :lg="12" v-for="tag in tagArticles" :key="tag.id">
            <tag-card :tag="tag" :is-active="isChecked(tag.id)"></tag-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import usePrompt from '@/hooks/usePrompt'

import TagCard from '@/components/TagCard'

import { createTag } from '@/api/tag'

import { cloneLoop, cloneForce } from '@jsmini/clone'

export default {
  name: 'tag',
  components: {
    TagCard
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const tags = computed(() => store.getters['tag/getTagList']())
    const tagArticles = computed(() => store.getters['tag/getTagArticles']())
    const checkedIds = ref([])
    const isChecked = id => checkedIds.value.includes(id)
    const handleChecked = item => {
      if (isChecked(item.id)) {
        const index = checkedIds.value.indexOf(item.id)
        checkedIds.value.splice(index, 1)
      } else {
        checkedIds.value.push(item.id)
      }
    }
    const getTags = async () => {
      await store.dispatch('tag/GetTags')
    }
    const getTagArticles = async () => {
      await store.dispatch('tag/GetTagArticles')
    }
    const handleAdd = async () => {
      const { setIsFinish, showPrompt, setHint } = usePrompt()
      setHint('已添加')
      const { value } = await showPrompt('请输入添加的标签名称', '添加标签', '添加')
      if (!value) return
      const res = await createTag({ name: value })
      if (res.code !== 200) return
      store.dispatch('tag/GetTag', res.data.id)
      store.dispatch('tag/GetTagArticles', { ids: [res.data.id] })
      setIsFinish(true)
    }
    onMounted(() => {
      if (route.params.id) {
        checkedIds.value.push(+route.params.id)
      }
      Promise.all([getTagArticles(), getTags()])
    })
    return {
      tags,
      tagArticles,
      isChecked,
      handleAdd,
      handleChecked
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-page {
  @include layout(100%, 100%, 0, 12px);
  .tag-list-container {
    @include flex-box(row, center, center, wrap);
    @include layout(100%, auto, 0, 20px);
    @include border(1px solid $border-color, 6px);
    @include transition(all 120ms ease-in-out);
    background-color: white;
    z-index: 1000;

    @mixin span-styl($mc, $bc) {
      color: $mc;
      display: inline-block;
      line-height: 36px;
      @include layout(auto, 36px, 8px, 0 16px);
      @include border(1px solid $mc, 18px);
      font-size: 16px;
      white-space: wrap;
      background-color: $bc;
      @include transition(all 120ms ease-in-out);
      @include pointer;
      &:hover {
        color: white;
        background-color: $mc;
      }
      &.is-active {
        color: white;
        background-color: $mc;
      }
    }

    .article-tag {
      @include span-styl($primary-color, $primary-color-h);
      &.ctrl-btn {
        @include span-styl($font-color, $font-color-c);
      }
    }
  }
  .el-row {
    .el-col {
      margin-bottom: $row-gutter;
    }
  }
}
</style>