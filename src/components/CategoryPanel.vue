<template>
  <div
    class="article-cate"
    :style="{ fontSize: `${size}px`, height: `${size * 2}px`, lineHeight: `${size * 2}px`, borderRadius: `${size}px` }"
    @click.stop="toCategory(category.id)">
    <el-icon :size="size"><i-folder-opened /></el-icon>
    {{ category.name }}
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const router = useRouter()
    const toCategory = id => {
      router.push({ name: 'category', params: { id } })
    }
    return {
      toCategory
    }
  }
}
</script>

<style lang="scss" scoped>
.article-cate {
  @include panel-styl($success-color, $success-color-b);
}
</style>