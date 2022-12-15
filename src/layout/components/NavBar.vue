<template>
  <div class="nav-bar-container">
    <div class="nav-icon">
      <el-icon :size="20" class="hidden-md-and-up" @click.stop.prevent="handleExpand">
        <i-expand />
      </el-icon>
      Cody's blog
    </div>
    <div v-if="isUserLogin || isAdminLogin" class="nav-menu hidden-sm-and-down">
      <el-menu :default-active="activePage" :router="true" mode="horizontal" ref="menuRef" :ellipsis="false">
        <el-menu-item v-for="menu in menuList" :key="menu.id" :index="menu.path">
          {{ menu.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div v-if="isUserLogin || isAdminLogin" class="nav-search hidden-md-and-down">
      <el-autocomplete
        v-model="queryText"
        :fetch-suggestions="querySearch"
        clearable
        placeholder="标题 / 标签 / 类别"
        @select="handleQuery"
      >
        <template #prefix>
          <el-icon @click="handleQuery"><i-search /></el-icon>
        </template>
      </el-autocomplete>
    </div>
    <div class="nav-switch">
      <el-switch
        size="large"
        v-model="isDark"
        inline-prompt
        :active-icon="'i-moon'"
        :inactive-icon="'i-sunny'"
        style="--el-switch-on-color: #1d1d1d; --el-switch-off-color: #d1d1d1"
      />
    </div>
    <div class="nav-user-info hidden-sm-and-down">
      <user v-if="isUserLogin"></user>
      <admin v-else-if="isAdminLogin"></admin>
      <span v-else @click="toLogin">
        <span class="to-login">登录</span>
      </span>
    </div>
  </div>
  <div class="drawer-container hidden-md-and-up">
    <el-drawer
      :model-value="sidebarOpen"
      :with-header="false"
      direction="ltr"
      append-to-body
      :z-index="10000"
      @close="onCloseDrawer"
    >
      <div class="collapse-container">
        <el-icon class="mb m-collapse" :size="20" @click.stop.prevent="handleCollapse">
          <i-fold />
        </el-icon>
        <div class="drawer-user-info">
          <user v-if="isUserLogin"></user>
          <admin v-else-if="isAdminLogin"></admin>
          <span v-else @click="toLogin">
            <span class="to-login">登录</span>
          </span>
        </div>
        <el-menu
          class="drawer-menu"
          :default-active="activePage"
          :router="true"
          mode="veritical"
          @select="handleChange"
        >
          <el-menu-item v-for="menu in menuList" :key="menu.id" :index="menu.path">
            {{ menu.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <el-button class="m-logout" type="info" size="small" plain @click="handleLogout"> 退出登录 </el-button>
    </el-drawer>
  </div>
</template>

<script>
import { reactive, ref, toRef, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import User from '@/components/User'
import Admin from '@/components/Admin'
import { getUserType } from '@/util/auth'
import { useDark } from '@vueuse/core'

export default {
  name: 'HNavBar',
  components: {
    User,
    Admin
  },
  props: {
    activePage: {
      type: String,
      required: true
    },
    menuList: {
      type: Array,
      required: true
    }
  },
  setup(props, { attrs, slots, emit, expose }) {
    const userType = getUserType()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userAvatar = computed(() => store.getters.userAvatar)
    const adminAvatar = computed(() => store.getters.adminAvatar)
    const device = computed(() => store.getters.device)
    const loginInfo = computed(() => store.getters.loginInfo)
    const queryText = ref('')
    const queryResList = ref([])
    const sidebarOpen = computed(() => store.getters.sidebarOpen)
    const setSidebarOpen = open => store.dispatch('app/ToggleSidebar', open)
    const menuRef = ref()

    const isDark = useDark()

    const isUserLogin = computed(() => store.getters.isUserLogin)
    const isAdminLogin = computed(() => store.getters.isAdminLogin)

    const handleChange = () => setSidebarOpen(false)
    const handleExpand = e => setSidebarOpen(true)
    const handleCollapse = () => setSidebarOpen(false)
    const onCloseDrawer = () => setSidebarOpen(false)

    const handleInfo = () => {}
    const handleLogout = async () => {
      handleChange()
      if (userType === 'user') {
        store.commit('user/LOGOUT')
        router.push({ name: 'login' })
      } else if (userType === 'admin') {
        store.commit('admin/LOGOUT')
        router.push({ name: 'login' })
      } else {
        router.push({ name: 'login' })
      }
    }

    const handleQuery = ({ type, id }) => router.push({ name: type, params: { id } })
    const createFilter = qs => restaurant => restaurant.value.toLowerCase().indexOf(qs.toLowerCase()) === 0
    const getQueryResList = async qs => {
      await new Promise(rs => setTimeout(rs, 1500))
      queryResList.value = [
        { value: 'NavelAI Surfure', type: 'article', id: '976' },
        { value: '测试中文标题', type: 'article', id: '594' },
        { value: 'Linux', type: 'category', id: '4' },
        { value: '学习', type: 'tag', id: '8' }
      ]
    }
    const querySearch = async (qs, callback) => {
      await getQueryResList(qs)
      const results = qs ? queryResList.value.filter(createFilter(qs)) : queryResList.value
      callback(results)
    }
    const toLogin = () => {
      router.push({ name: 'login' })
    }

    return {
      userAvatar,
      adminAvatar,
      isUserLogin,
      isAdminLogin,
      loginInfo,
      menuRef,
      device,
      queryText,
      handleQuery,
      querySearch,
      isDark,
      sidebarOpen,
      handleChange,
      handleExpand,
      handleCollapse,
      handleInfo,
      onCloseDrawer,
      handleLogout,
      toLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-container {
  @include flex-box(row, space-between, center);
  @include bg-color(#f4f4f4, #050505);
  @include box-shadow(0 0 4px $border-color);
  height: $header-height;
  padding: 5px 16px;
  z-index: 5000;
  .nav-icon {
    @include flex-box(row, space-between, center);
    @include font-hei;
    font-size: 18px;
    font-weight: bolder;
    .el-icon {
      margin-right: 6px;
      &:active {
        color: $primary-color;
      }
    }
  }
  .nav-menu {
    margin-left: 36px;
    &:deep {
      .el-menu {
        @include bg-color(#f4f4f4, #050505);
        border-color: transparent;
        .el-menu-item {
          padding: 0 16px;
          &.is-active {
            @include bg-color(#f4f4f4, #050505);
            color: $primary-color;
          }
          &:hover {
            @include bg-color(#f4f4f4, #050505);
            color: $primary-color;
            outline: none;
          }
        }
      }
    }
  }
  .nav-search {
    margin-left: auto;
    margin-right: 16px;
    &:deep {
      .el-input {
        width: 320px;
      }
    }
  }

  .nav-switch {
    margin-right: 16px;
  }

  .nav-user-info {
    .to-login {
      font-weight: bolder;
      color: $font-color-a;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
}
</style>
>
