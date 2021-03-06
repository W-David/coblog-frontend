<template>
  <div class="user-container">
    <el-avatar class="user-avatar hidden-xs-only" :src="avatar" fit="cover">
      <span>空</span>
    </el-avatar>
    <el-dropdown type="text" split-button trigger="click">
      Hi,{{ userInfo.email }}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span @click="toUserInfo"> 用户信息 </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="logout"> 退出登录 </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <teleport to="#rootUserInfo">
    <el-dialog
      v-model="openUserInfo"
      center
      :show-close="false"
      :width="isMobile ? '70%' : '30%'">
      <div class="avatar-container">
        <avatar-upload
          :isUploaded="!!avatar"
          :imgUrl="avatar"
          trigHint="上传头像"
          descripHint="头像"
          @on-upload="handleUpload"
          @on-delete="handleDelete">
        </avatar-upload>
      </div>
      <div class="info-container">
        <div class="info-name">
          <span class="info-hint">昵称 - </span>
          <span class="info-content" @click="isEN = true" v-if="!isEN">
            {{ userForm.username || '暂无昵称' }}
          </span>
          <input v-model="userForm.username" @blur="isEN = false" v-else />
        </div>
        <div class="info-email">
          <span class="info-hint">邮箱 - </span>
          <span class="info-content" @click="isEE = true" v-if="!isEE">
            {{ userForm.email }}
          </span>
          <input v-model="userForm.email" @blur="isEE = false" v-else />
        </div>
      </div>
      <template #title>
        <span class="user-info-title">用户信息</span>
      </template>
      <template #footer>
        <div class="user-info-footer">
          <el-button type="danger" plain @click="handleCancel">取消</el-button>
          <el-button type="danger" @click="handleUpdate">修改</el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import AvatarUpload from '@/components/FileUpload.vue'
import useDOMCreate from '@/hooks/useDOMCreate'

export default {
  name: 'user',
  components: {
    AvatarUpload
  },
  setup(props, { attrs, slots, emit, expose }) {
    useDOMCreate('rootUserInfo')
    const store = useStore()
    const router = useRouter()
    const avatar = computed(() => store.getters.userAvatar)
    const userInfo = computed(() => store.getters.userInfo)
    const userForm = reactive({
      username: userInfo.value.username,
      email: userInfo.value.email
    })
    const isMobile = computed(() => store.getters.device === 'mobile')
    const openUserInfo = ref(false)
    const isEN = ref(false)
    const isEE = ref(false)

    const toUserInfo = () => {
      openUserInfo.value = true
    }
    const logout = async () => {
      await store.dispatch('user/Logout')
      router.push({ name: 'login' })
    }
    const handleCancel = () => {
      openUserInfo.value = false
    }
    const handleUpdate = async () => {
      const isSuccess = await store.dispatch('user/SetUserInfo', userForm)
      openUserInfo.value = false
      ElMessage({
        message: isSuccess ? '更新成功' : '更新失败',
        type: isSuccess ? 'success' : 'error'
      })
    }
    const handleUpload = async file => {
      const isSuccess = await store.dispatch('user/SetAvatar', { store, file })
      ElMessage({
        message: isSuccess ? '头像上传成功' : '上传失败',
        type: isSuccess ? 'success' : 'error'
      })
    }
    const handleDelete = async () => {
      const isSuccess = await store.dispatch('user/DeleteAvatar')
      ElMessage({
        message: isSuccess ? '已删除' : '删除失败',
        type: isSuccess ? 'success' : 'error'
      })
    }
    return {
      isEE,
      isEN,
      isMobile,
      openUserInfo,
      toUserInfo,
      avatar,
      userInfo,
      userForm,
      logout,
      handleCancel,
      handleUpdate,
      handleUpload,
      handleDelete
    }
  }
}
</script>

<style lang="scss" scoped>
$avatar-size: 38px;
$avatar-radius: 4px;
.user-container {
  @include flex-box(row, space-around, center);
  .user-avatar {
    width: $avatar-size;
    height: $avatar-size;
    border-radius: $avatar-radius;
    margin-right: 8px;
  }
}
.avatar-container {
  @include layout(100%, 220px, 0, 0);
}
.info-container {
  .info-name,
  .info-email {
    @include layout(100%, auto, 12px 0, 12px);
    @include box-shadow(
      inset 2px 2px 4px $info-color-b,
      inset -1px -1px 2px $info-color-b
    );
    @include border(1px solid transparent, 8px);
    @include pointer;
    .info-hint {
      font-weight: bold;
      color: $danger-color;
    }
    .info-content {
      color: $font-color-b;
      &:hover {
        color: $font-color;
      }
    }
    input {
      border: none !important;
      outline: none !important;
    }
  }
}
.user-info-title {
  color: $danger-color;
  font-size: 18px;
  font-weight: bold;
}
.user-info-footer {
  @include layout(100%, auto, 0, 0);
  @include flex-box(row, space-between, center);
}
</style>