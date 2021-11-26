<template>
  <div class="nav-bar-container">
    <div class="web-icon">cody's blog</div>
    <div class="web-menu">
      <el-menu
        :default-active="activePage"
        class="el-menu-web"
        mode="horizontal"
        @select="switchTabPage">
        <el-menu-item
          v-for="menu in menuList"
          :key="menu.id"
          :index="menu.path">
          {{ menu.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="web-user-info">
      <user :userInfo="userInfo"></user>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import User from './User.vue'
export default {
  name: 'navBar',
  components: {
    User
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  setup(props, { attrs, slots, emit, expose }) {
    const { menuList } = toRefs(props)

    return {
      menuList
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 80px;
.nav-bar-container {
  height: $nav-height;
}
</style>>