<template>
  <div class="admin-container">
    <el-avatar class="admin-avatar hidden-xs-only" :src="avatar" fit="cover">
      <span>空</span>
    </el-avatar>
    <el-dropdown type="text" split-button trigger="click">
      Hello, {{ adminInfo.email }}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span @click="toAdminInfo">管理员信息</span>
          </el-dropdown-item>
          <el-dropdown-item class="hidden-md-and-down">
            <span @click="toBlog">写个博文</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <teleport to="#rootAdminInfo">
    <el-dialog
      v-model="openAdminInfo"
      center
      :show-close="false"
      :width="isMobile ? '70%' : '30%'">
      <div class="avatar-container">
        <avatar-upload
          :isUploaded="!!avatar"
          :imgUrl="avatar"
          @on-upload="handleUpload"
          @on-delete="handleDelete">
        </avatar-upload>
      </div>
      <div class="info-container">
        <div class="info-name">
          <span class="info-hint">昵称 - </span>
          <span class="info-content" @click="isEN = true" v-if="!isEN">
            {{ adminForm.nickname || '暂无昵称' }}
          </span>
          <input v-model="adminForm.nickname" @blur="isEN = false" v-else />
        </div>
        <div class="info-email">
          <span class="info-hint">邮箱 - </span>
          <span class="info-content" @click="isEE = true" v-if="!isEE">
            {{ adminForm.email }}
          </span>
          <input v-model="adminForm.email" @blur="isEE = false" v-else />
        </div>
      </div>
      <template #title>
        <span class="admin-info-title">管理员信息</span>
      </template>
      <template #footer>
        <div class="admin-info-footer">
          <el-button type="primary" plain @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleUpdate">修改</el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import AvatarUpload from '@/components/AvatarUpload.vue'
import useDOMCreate from '@/hooks/useDOMCreate'

export default {
  name: 'admin',
  components: {
    AvatarUpload
  },
  setup(props, { attrs, slots, emit, expose }) {
    useDOMCreate('rootAdminInfo')
    const router = useRouter()
    const store = useStore()
    const avatar = computed(() => store.getters.adminAvatar)
    const adminInfo = computed(() => store.getters.adminInfo)
    const adminForm = reactive({
      nickname: adminInfo.value.nickname,
      email: adminInfo.value.email
    })
    const isMobile = computed(() => store.getters.device === 'mobile')
    const openAdminInfo = ref(false)
    const isEN = ref(false)
    const isEE = ref(false)

    const toBlog = () => {
      router.push({ name: 'blog' })
    }
    const toAdminInfo = () => {
      openAdminInfo.value = true
    }
    const logout = async () => {
      await store.dispatch('admin/Logout')
      router.push({ name: 'login' })
    }
    const handleCancel = () => {
      openAdminInfo.value = false
    }
    const handleUpdate = async () => {
      const isSuccess = await store.dispatch('admin/SetAdminInfo', adminForm)
      openAdminInfo.value = false
      ElMessage({
        message: isSuccess ? '更新成功' : '更新失败',
        type: isSuccess ? 'success' : 'error'
      })
    }
    const handleUpload = async file => {
      const isSuccess = await store.dispatch('admin/SetAvatar', { store, file })
      ElMessage({
        message: isSuccess ? '头像上传成功' : '上传失败',
        type: isSuccess ? 'success' : 'error'
      })
    }
    const handleDelete = async () => {
      const isSuccess = await store.dispatch('admin/DeleteAvatar')
      ElMessage({
        message: isSuccess ? '已删除' : '删除失败',
        type: isSuccess ? 'success' : 'error'
      })
    }
    return {
      isEN,
      isEE,
      isMobile,
      adminInfo,
      adminForm,
      toBlog,
      avatar,
      logout,
      openAdminInfo,
      toAdminInfo,
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
.admin-container {
  @include flex-box(row, space-around, center);
  .admin-avatar {
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
      color: $primary-color;
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
.admin-info-title {
  color: $primary-color;
  font-size: 18px;
  font-weight: bold;
}
.admin-info-footer {
  @include layout(100%, auto, 0, 0);
  @include flex-box(row, space-between, center);
}
</style>