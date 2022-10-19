<template>
  <div class="article-tag" :style="{ fontSize: `${size}px`, height: `${size * 2}px`, lineHeight: `${size * 2}px`, borderRadius: `${size}px` }" @click.stop="toTag(tag.id)">
    <el-icon :size="size"><i-collection-tag /></el-icon>
    {{ tag.name }}
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    tag: {
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
    const toTag = id => {
      router.push({ name: 'tag', params: { id } })
    }
    return {
      toTag
    }
  }
}
</script>

<style lang="scss" scoped>
.article-tag {
  @include panel-styl($primary-color, $primary-color-h);
}
</style>