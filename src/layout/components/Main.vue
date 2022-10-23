<template>
  <div class="app-main-container">
    <div id="particles-js"></div>
    <router-view :key="route.path"></router-view>
    <!-- <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view> -->
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import particlesJs from '@/util/particles'

export default {
  name: 'AppMain',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      particlesJs.load('particles-js', 'static/particles.json')
    })
    return {
      route
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main-container {
  // @include fade();
  // @include slide-fade-left();
  // @include slide-fade-right();
  #particles-js {
    position: fixed;
    @include layout;
    z-index: -1;
  }
}
</style>
