<template>
  <div class="login-page">
    <div
      class="bg-fade-animation"
      v-for="(bgImg, index) in bgImgs"
      :key="index"
      :style="{
        backgroundImage: 'url(' + bgImg + ')',
        animationDelay: (animationDuration / bgImgs.length) * index + 's',
        animationDuration: animationDuration + 's'
      }"
    ></div>
    <el-row justify="center" class="login-row-container">
      <el-col class="login-col-container" :xs="22" :sm="12" :md="8" :lg="6" :xl="6">
        <div class="login-card">
          <div class="login-card-header">
            <span :class="[needRegister ? 'regis-header-hint' : 'login-header-hint']">欢迎来到Coody's Blog</span>
          </div>
          <el-form
            class="login-card-content"
            v-model="form"
            ref="formRef"
            label-position="right"
            :rules="rules"
            status-icon
            inline-message
          >
            <el-form-item prop="email">
              <el-input v-model="form.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="rPassword" v-show="needRegister">
              <el-input v-model="form.rPassword" placeholder="再次输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" v-show="needRegister">
              <el-input v-model="form.nickName" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="hint-area">
                <div class="register-hint" :class="[needRegister ? 'regis-hint' : 'login-hint']" @click="handleSwitch">
                  {{ !needRegister ? '还没有账号？注册一个吧' : '已有账号，去登陆' }}
                </div>
                <div class="remember-hint">
                  <el-checkbox v-model="rememberMe" label="保存密码" size="small" border />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div v-if="!needRegister" class="login-area">
                <el-button type="primary" style="width: 100%" @click="handleLogin('admin')"> 管理员登录 </el-button>
                <el-button type="primary" style="width: 100%" @click="handleLogin('user')"> 用户登录 </el-button>
              </div>
              <div class="register-area" v-else>
                <el-button type="success" @click="handleRegister('admin')" style="width: 100%"> 管理员注册 </el-button>
                <el-button type="success" @click="handleRegister('user')" style="width: 100%"> 用户注册 </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { local } from '@/util/cache'

const store = useStore()
const router = useRouter()
const needRegister = ref(false)
const formRef = ref(null)
const form = reactive({
  // email: 'admin@root.com',
  // password: 'admin@root',
  email: '',
  password: '',
  rPassword: '',
  nickName: ''
})
const rememberMe = ref(false)
watch(
  rememberMe,
  (nv, ov) => {
    if (!nv && ov) {
      // debugger
      local.remove('login-form')
      local.set('remember-me', false)
    }
  },
  { immediate: true }
)
const initForm = () => {
  const rememberMeCache = !!local.get('remember-me')
  rememberMe.value = rememberMeCache || false
  if (rememberMe.value) {
    // debugger
    const formCache = local.getJSON('login-form')
    form.email = formCache?.email || ''
    form.password = formCache?.password || ''
    form.rPassword = formCache?.rPassword || ''
    form.nickName = formCache?.nickName || ''
  } else {
    // debugger
    form.email = ''
    form.password = ''
    form.rPassword = ''
    form.nickName = ''
  }
}
const rules = reactive({
  email: [],
  password: [],
  rPassword: [],
  nickName: []
})

onMounted(() => {
  initForm()
})
const handleLogin = async param => {
  const isAdmin = param === 'admin'
  const submitForm = {
    email: form.email,
    password: form.password
  }
  const res = isAdmin ? await store.dispatch('admin/Login', submitForm) : await store.dispatch('user/Login', submitForm)
  if (res.code !== 200) return
  if (rememberMe.value) {
    local.set('remeber-me', true)
    local.setJSON('login-form', form)
  }
  router.push({ name: 'home' })
  ElMessage({ type: 'success', message: res.msg })
}
const handleRegister = async param => {
  const isAdmin = param === 'admin'
  const submitForm = isAdmin
    ? {
        email: form.email,
        password: form.password,
        rPassword: form.rPassword,
        nickname: form.nickName
      }
    : {
        email: form.email,
        password: form.password,
        rPassword: form.rPassword,
        username: form.nickName
      }
  const res = isAdmin
    ? await store.dispatch('admin/Register', submitForm)
    : await store.dispatch('user/Register', submitForm)
  if (res.code !== 200) return
  if (rememberMe.value) {
    local.set('remeber-me', true)
    local.setJSON('login-form', form)
  }
  router.push({ name: 'home' })
  ElMessage({ type: 'success', message: res.msg })
}
const handleSwitch = () => {
  form.email = ''
  form.password = ''
  form.rPassword = ''
  form.nickName = ''
  needRegister.value = !needRegister.value
}
const animationDuration = ref(48)
const bgImgs = reactive([
  require('../assets/image/bg-01.jpg'),
  require('../assets/image/bg-02.jpg'),
  require('../assets/image/bg-03.jpg'),
  require('../assets/image/bg-04.jpg')
])
</script>

<style lang="scss" scoped>
.login-page {
  @include layout(100vw, 100vh, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  .login-row-container {
    height: 100%;
    .login-col-container {
      @include layout(100%, auto, 0, 24vh 0 0 0);
      .login-card {
        @include layout(80%, auto, 0 auto, 12px);
        @include border(1px solid #ececec, 8px);
        @include bg-color(#fff, #1d1d1d);
        .login-card-header {
          @include layout(100%, 120px, 0 0 16px 0, 4px);
          @include flex-box(row, center, center);
          @include border(null, 4px);
          @include box-shadow(2px 2px 4px #ececec, -1px -1px 2px #ececec);
          @include font-kai;
          color: $font-color-a;
          font-size: 20px;
          font-weight: bold;

          .login-header-hint {
            color: $primary-color;
          }
          .regis-header-hint {
            color: $success-color;
          }
        }
        .login-card-content {
          &:deep {
            .el-form-item {
              margin-bottom: 10px;
            }
          }

          .hint-area {
            @include layout(100%, auto, 0, 0 2px);
            @include flex-box(row, space-between, center);
            .register-hint {
              user-select: none !important;
              @include pointer;
            }
            .remember-hint {
            }
          }
          .register-area,
          .login-area {
            width: 100%;
            &:deep {
              .el-button {
                margin: 0;
              }
              .el-button:last-child {
                margin-top: 10px;
              }
            }
          }
          .login-hint {
            &:hover {
              color: $primary-color;
            }
          }
          .regis-hint {
            &:hover {
              color: $success-color;
            }
          }
          &:deep {
            .el-form-item:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
