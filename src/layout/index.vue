<template>
  <div class="app-container">
    <header class="header-container">
      <nav-bar :activePage="activePage" :menuList="menuList"></nav-bar>
    </header>
    <div class="content-container">
      <section class="main-container">
        <app-main />
      </section>
      <footer class="footer-container">
        <h-footer></h-footer>
      </footer>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HFooter from './components/HFooter.vue'
import AppMain from './components/AppMain.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { reactive, ref, computed, onMounted, watch } from 'vue'
import useWindowResize from '@/hooks/useWindowResize'
import useDevice from '@/hooks/useDevice'

useDevice()
useWindowResize()

const store = useStore()
const route = useRoute()
const activePage = ref('/home')
const isAdminLogin = computed(() => store.getters.isAdminLogin)
const isUserLogin = computed(() => store.getters.isUserLogin)
const isLogin = isAdminLogin.value || isUserLogin.value

watch(
  () => route.path,
  path => {
    activePage.value = path
  }
)

const loginMenu = [
  { id: 0, name: '首页', path: '/home' },
  { id: 1, name: '归档', path: '/archive' },
  { id: 2, name: '标签', path: '/tag' },
  { id: 3, name: '分类', path: '/category' },
  { id: 4, name: '关于', path: '/about' }
]

const unLoginMenu = [
  { id: 0, name: '首页', path: '/home' },
  { id: 1, name: '标签', path: '/tag' },
  { id: 2, name: '分类', path: '/category' },
  { id: 3, name: '关于', path: '/about' }
]

const menuList = isLogin ? loginMenu : unLoginMenu
</script>

<style lang="scss" scoped>
.app-container {
  @include layout(100%, 100%);

  .header-container {
    @include position(fixed, 0, 0, 0);
    width: 100%;
    z-index: 1005;
  }

  .content-container {
    @include flex-box(column);
    @include layout;

    .main-container {
      position: relative;
      margin-top: $header-height;
    }

    .footer-container {
      margin-top: auto;
    }
  }
}
</style>
>
