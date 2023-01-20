<template>
  <div class="app-main-container">
    <div id="particles-js"></div>
    <el-row justify="center" :gutter="16">
      <el-col :sm="7" :md="6" :lg="5" :xl="5" class="hidden-xs-only" v-if="!!leftSidebarComponent">
        <component :is="leftSidebarComponent" :key="route.name" />
      </el-col>
      <el-col
        :xs="24"
        :sm="isOneColLayout ? 22 : 15"
        :md="isOneColLayout ? 20 : 16"
        :lg="isOneColLayout ? 14 : 12"
        :xl="12"
      >
        <h-main></h-main>
      </el-col>
      <el-col :lg="5" class="hidden-md-and-down" v-if="!!rightSidebarComponent">
        <transition name="slide-fade-right" appear>
          <component :is="rightSidebarComponent" :key="route.name" />
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import particlesJs from '@/util/particles'

import { onMounted, reactive, ref, computed, watch, defineProps, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import MainLeftSidebar from './LeftSidebar.vue'
import MainRightSidebar from './RightSidebar.vue'
import HMain from './HMain.vue'

const store = useStore()
const route = useRoute()

const routeName = route.name
const isArticlePage = ref(routeName === 'article')

// const leftSidebarComponent = ref(null)
// const rightSidebarComponent = ref(null)
const twoColPageList = ['article']
const oneColPageList = ['blog']

const isTwoColLayout = computed(() => !!~twoColPageList.indexOf(route.name))
const isOneColLayout = computed(() => !!~oneColPageList.indexOf(route.name))
const isThreeColLayout = computed(() => !isTwoColLayout.value && !isOneColLayout.value)

const leftSidebarComponent = computed(() => (isThreeColLayout.value || isTwoColLayout.value ? MainLeftSidebar : null))
const rightSidebarComponent = computed(() => (isThreeColLayout.value ? MainRightSidebar : null))

onMounted(async () => {
  particlesJs.load('particles-js', 'static/particles.json')
})
</script>

<style lang="scss" scoped>
.app-main-container {
  @include layout(100%, 100%, 0, $main-margin);
  @include slide-fade-left;
  @include slide-fade-right;
  #particles-js {
    position: fixed;
    @include layout;
    z-index: -1;
  }
  .main-content-container {
    @include widget-styl;
    z-index: 1000;
  }
}
</style>
