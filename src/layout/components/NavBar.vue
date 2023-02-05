<template>
  <div class="nav-bar-container">
    <div class="nav-icon">
      <el-icon :size="20" class="hidden-md-and-up" @click.stop.prevent="handleExpand">
        <i-expand />
      </el-icon>
      <span data-text="Cody's Blog" class="icon-text" @click="toHome">Cody's Blog</span>
    </div>
    <div class="nav-menu hidden-sm-and-down">
      <el-menu :default-active="activePage" :router="true" mode="horizontal" ref="menuRef" :ellipsis="false">
        <el-menu-item v-for="menu in menuList" :key="menu.id" :index="menu.path">
          {{ menu.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="nav-search">
      <search></search>
    </div>
    <div class="nav-right">
      <div class="nav-switch hidden-xs-only">
        <switch-dark v-model="isDark"></switch-dark>
      </div>
      <div class="nav-user-info hidden-sm-and-down">
        <user v-if="isUserLogin"></user>
        <admin v-else-if="isAdminLogin"></admin>
        <span v-else @click="toLogin">
          <span class="to-login">登录</span>
        </span>
      </div>
    </div>
  </div>
  <div class="drawer-container hidden-md-and-up">
    <el-drawer
      class="side-drawer"
      :model-value="sidebarOpen"
      :with-header="false"
      direction="ltr"
      append-to-body
      :z-index="10000"
      @close="onCloseDrawer"
    >
      <div class="collapse-top">
        <el-icon class="drawer-icon" :size="20" @click.stop.prevent="handleCollapse">
          <i-fold />
        </el-icon>
        <div class="drawer-user-info">
          <user v-if="isUserLogin"></user>
          <admin v-else-if="isAdminLogin"></admin>
          <span v-else @click="toLogin">
            <span class="to-login">登录</span>
          </span>
        </div>
        <el-menu class="drawer-menu" :default-active="activePage" :router="true" mode="vertical" @select="handleChange">
          <el-menu-item v-if="isAdminLogin" class="hidden-md-and-up" index="/blog">博文</el-menu-item>
          <el-menu-item v-for="menu in menuList" :key="menu.id" :index="menu.path">
            {{ menu.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="collapse-bottom">
        <el-button v-if="isLogin" class="drawer-logout" type="warning" plain @click="handleLogout">
          退出登录
        </el-button>
        <switch-dark class="drawer-switch hidden-sm-and-up" v-model="isDark"></switch-dark>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, toRef, toRefs, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import User from '@/components/User.vue'
import Admin from '@/components/Admin.vue'
import Search from '@/components/Search.vue'
import SwitchDark from '@/components/SwitchDark.vue'
import { getUserType } from '@/util/auth'
import { useDark } from '@vueuse/core'

const props = defineProps({
  activePage: {
    type: String,
    required: true
  },
  menuList: {
    type: Array,
    required: true
  }
})
const { activePage, menuList } = toRefs(props)
const userType = getUserType()
const store = useStore()
const router = useRouter()
const route = useRoute()
const sidebarOpen = computed(() => store.getters.sidebarOpen)
const setSidebarOpen = open => store.dispatch('app/ToggleSidebar', open)
const menuRef = ref()

const toHome = () => {
  router.push({ name: 'home' })
}

const isAdminLogin = computed(() => store.getters.isAdminLogin)
const isUserLogin = computed(() => store.getters.isUserLogin)
const isLogin = isAdminLogin.value || isUserLogin.value

const isDark = useDark()

const handleChange = () => setSidebarOpen(false)
const handleExpand = e => setSidebarOpen(true)
const handleCollapse = () => setSidebarOpen(false)
const onCloseDrawer = () => setSidebarOpen(false)

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
const toLogin = () => {
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>
.nav-bar-container {
  @include flex-box(row, space-between, center);
  @include bg-color(#f4f4f4, #050505);
  @include box-shadow(0 0 4px var(--el-border-color));
  height: $header-height;
  padding: 5px 16px;
  z-index: 5000;
  .nav-icon {
    @include flex-box(row, space-between, center);
    @include font-hei;
    .icon-text {
      @include font-fang-song;
      font-weight: bold;
      color: var(--el-color-primary);
      position: relative;
      font-size: 22px;
      word-spacing: 1.2px;
      line-height: 1.2;
      white-space: nowrap;
      user-select: none;
      cursor: pointer;
    }

    &:deep .el-icon {
      --color: var(--el-color-primary) !important;
      margin-right: 6px;
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
            color: var(--el-color-primary);
          }
          &:hover {
            @include bg-color(#f4f4f4, #050505);
            color: var(--el-color-primary);
            outline: none;
          }
        }
      }
    }
  }
  .nav-search {
    margin-left: auto;
  }

  .nav-right {
    @include flex-box(row, center, center, nowrap);
    .nav-switch {
      @include flex-box(row, center, center, nowrap);
      margin-left: 16px;
    }

    .nav-user-info {
      margin-left: 16px;
      .to-login {
        font-weight: bold;
        font-size: 16px;
        text-indent: 1px;
        letter-spacing: 1px;
        // text-shadow: 1px 1px 2px var(--el-color-primary-light-9);
        cursor: pointer;
        transition: all 300ms ease;
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
