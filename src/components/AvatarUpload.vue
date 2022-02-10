<template>
  <div class="avatar-uploader-container">
    <el-upload
      v-show="!isUploaded"
      ref="uploadRef"
      class="avatar-uploader"
      action="#"
      :multiple="false"
      :limit="1"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload">
      <template #default>
        <div id="trigger" class="trigger-area">
          <el-icon :size="24"><i-plus /></el-icon>
        </div>
      </template>
    </el-upload>
    <transition name="fade">
      <div class="avatar-img-container" v-if="isUploaded">
        <img
          class="avatar-img"
          :src="imgUrl"
          alt="noImg"
          width="100%"
          height="100%" />
        <div class="avatar-cover">
          <span class="avatar-ctrl" @click="handleView">
            <el-icon><i-view /></el-icon>
            <span> 查看大图</span>
          </span>
          <el-popconfirm
            confirm-button-text="是的"
            cancel-button-text="按错了"
            @confirm="handleDelete"
            icon-color="red"
            title="确定删除?">
            <template #reference>
              <span class="avatar-ctrl">
                <el-icon><i-delete /></el-icon>
                <span> 删除头像</span>
              </span>
            </template>
          </el-popconfirm>
          <span class="avatar-ctrl" @click="handleUpload">
            <el-icon><i-upload /></el-icon>
            <span> 重新上传</span>
          </span>
        </div>
      </div>
    </transition>
  </div>
  <el-dialog v-model="isShow" title="详情">
    <img :src="imgUrl" alt="noImg" style="width: 100%; border-radius: 4px" />
  </el-dialog>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  name: 'avatarUpload',
  props: {
    isUploaded: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['on-upload', 'on-delete'],
  setup(props, { attrs, slots, emit, expose }) {
    const store = useStore()
    const uploadRef = ref(null)
    const isShow = ref(false)
    onMounted(() => {
      store.dispatch('alioss/FetchSTS')
    })
    const beforeAvatarUpload = file => {
      emit('on-upload', file)
      return false
    }
    const handleView = () => (isShow.value = true)
    const handleDelete = () => emit('on-delete')
    const handleUpload = () => {
      document.body
        .getElementsByClassName('avatar-uploader')[0]
        .getElementsByClassName('el-upload__input')[0]
        .click()
    }
    return {
      isShow,
      uploadRef,
      beforeAvatarUpload,
      handleView,
      handleDelete,
      handleUpload
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader-container {
  @include layout(100%, 100%, 0, 0);
  @include position(relative);
  .avatar-uploader {
    @include layout(100%, 100%, 0, 0);
    &:deep {
      .el-upload {
        @include layout(100%, 100%, 0, 0);
        .trigger-area {
          @include layout(100%, 100%, 0, 0);
          @include flex-box(row, center, center);
          @include border(1.5px dashed #ccc, 8px);
          &:hover {
            color: $primary-color;
            border-color: $primary-color;
          }
        }
      }
    }
  }
  .avatar-img-container {
    @include position(absolute, 0, 0);
    @include layout(100%, 100%, 0, 0);
    @include border(1px solid $primary-color, 8px);
    .avatar-img {
      @include layout(100%, 100%, 0, 0);
      @include border(1px solid transparent, 8px);
      object-fit: cover;
    }
    .avatar-cover {
      @include position(absolute, 0, 0);
      @include layout(100%, 100%, 0, 0);
      @include flex-box(column, space-around, center);
      @include border(1px solid transparent, 8px);
      @include transition(all 0.5s ease);
      background-color: transparent;
      @include pointer;
      &:hover {
        background-color: #00000080;
      }
      .avatar-ctrl {
        color: #fff;
        font-size: 14px;
        @include pointer;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>