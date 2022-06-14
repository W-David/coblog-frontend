<template>
  <div class="app-container">
    <header class="header-container">
      <nav-bar :activePage="activePage" :menuList="menuList"> </nav-bar>
    </header>
    <div class="content-container">
      <main class="main-container">
        <div id="particles-js"></div>
        <router-view></router-view>
      </main>
      <footer class="footer-container">
        <h-footer></h-footer>
      </footer>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import HFooter from './components/HFooter.vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { setToken, encodeToken } from '@/util/auth'
import particlesJs from '@/util/particles'
import { isMobile } from '@/util/device'

export default {
  name: 'index',
  components: {
    NavBar,
    HFooter
  },
  setup(props, { attrs, slots, emit, expose }) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const activePage = ref('')

    watch(
      () => route.path,
      val => (activePage.value = val)
    )

    onMounted(async () => {
      store.commit('app/TOGGLE_DEVICE', isMobile() ? 'mobile' : 'desktop')
      particlesJs.load('particles-js', 'static/particles.json')
    })

    const currentPath = computed(() => route.path)
    const menuList = ref([
      { id: 0, name: '首页', path: '/home' },
      { id: 1, name: '归档', path: '/archive' },
      { id: 2, name: '标签', path: '/tag' },
      { id: 3, name: '分类', path: '/category' },
      { id: 4, name: '关于', path: '/about' }
    ])

    return {
      currentPath,
      activePage,
      menuList
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  @include layout(100%, 100%);
  .header-container {
    @include position(fixed, 0, 0, 0);
    z-index: 1005;
  }
  .content-container {
    @include flex-box(column);
    @include layout;
    .main-container {
      position: relative;
      margin-top: $header-height;
      #particles-js {
        position: fixed;
        @include layout;
        z-index: -1;
      }
    }
    .footer-container {
      margin-top: auto;
    }
  }
}
</style>>