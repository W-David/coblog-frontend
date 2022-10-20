<template>
  <div class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      :pager-count="5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { scrollTo } from '@/util/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const currentPage = computed({
      get: () => props.page,
      set: val => emit('update:page', val)
    })
    const pageSize = computed({
      get: () => props.limit,
      set: val => emit('update:limit', val)
    })
    const handleSizeChange = val => {
      emit('pagination', { page: currentPage, limit: val })
      if (props.autoScroll) {
        scrollTo(0, 660)
      }
    }
    const handleCurrentChange = val => {
      emit('pagination', { page: val, limit: pageSize })
      if (props.autoScroll) {
        scrollTo(0, 660)
      }
    }
    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 16px 8px;
  text-align: center;
}
</style>
