<template>
  <div class="selected-list-container">
    <el-card v-loading="loading" shadow="never" class="checkbox-card">
      <div v-if="list && list.length">
        <el-check-tag
          @change="handleCheckChange(item)"
          v-for="item in list"
          :checked="isChecked(item)"
          :key="item.id">
          {{ item.name }}
        </el-check-tag>
      </div>
      <div v-else>
        <span class="empty-hint">这里还空空如也(┬┬﹏┬┬)</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'
export default {
  name: 'selectedList',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    isShow: Boolean,
    list: {
      type: Array,
      required: true
    },
    checkedArr: {
      type: Array,
      required: true
    }
  },
  emits: ['update:checkedArr'],
  setup(props, { emit }) {
    const { isShow } = toRefs(props)
    const checkedList = ref([])

    watch(isShow, (nv, ov) => {
      if (!nv && ov) {
        checkedList.value = []
        emit('update:checkedArr', [])
      }
    })

    const isChecked = item => checkedList.value.some(it => it.id === item.id)

    const handleCheckChange = item => {
      if (isChecked(item)) {
        checkedList.value = checkedList.value.filter(it => it.id !== item.id)
      } else {
        checkedList.value.push(item)
      }
      emit('update:checkedArr', [...checkedList.value])
    }
    return {
      isChecked,
      checkedList,
      handleCheckChange
    }
  }
}
</script>

<style lang="scss" scoped>
.selected-list-container {
  @include layout(auto, auto, 0, 0);
  .checkbox-card {
    &:deep {
      .el-card__body {
        padding: 16px;
        .el-check-tag {
          margin-right: 12px;
        }
      }
    }
    .empty-hint {
      @include font-hei;
      color: $danger-color;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>