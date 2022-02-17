<template>
  <div class="login-page">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="12" :lg="6" :xl="6">
        <div class="login-card">
          <div class="login-card-header">
            <span
              :class="[
                needRegister ? 'regis-header-hint' : 'login-header-hint'
              ]"
              >欢迎来到Coody's Blog</span
            >
          </div>
          <el-form
            class="login-card-content"
            v-model="form"
            ref="formRef"
            label-position="right"
            :rules="rules"
            status-icon
            inline-message>
            <el-form-item prop="email">
              <el-input v-model="form.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="rPassword" v-if="needRegister">
              <el-input
                v-model="form.rPassword"
                placeholder="再次输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" v-if="needRegister">
              <el-input v-model="form.nickName" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
              <div
                class="register-hint"
                :class="[needRegister ? 'regis-hint' : 'login-hint']">
                <span @click="handleSwitch">
                  {{
                    !needRegister
                      ? '还没有账号？注册一个吧'
                      : '已有账号，去登陆'
                  }}
                </span>
              </div>
            </el-form-item>
            <el-form-item>
              <div v-if="!needRegister" class="login-area">
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="handleLogin('admin')">
                  管理员登录
                </el-button>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="handleLogin('user')">
                  用户登录
                </el-button>
              </div>
              <div class="register-area" v-else>
                <el-button
                  type="success"
                  @click="handleRegister('admin')"
                  style="width: 100%">
                  管理员注册
                </el-button>
                <el-button
                  type="success"
                  @click="handleRegister('user')"
                  style="width: 100%">
                  用户注册
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const needRegister = ref(false)
    const formRef = ref(null)
    const form = reactive({
      email: '',
      password: '',
      rPassword: '',
      nickName: ''
    })
    const initForm = () => {
      form.email = ''
      form.password = ''
      form.rPassword = ''
      form.nickName = ''
    }
    const rules = reactive({
      email: [],
      password: [],
      rPassword: [],
      nickName: []
    })
    const handleLogin = async param => {
      const isAdmin = param === 'admin'
      const submitForm = {
        email: form.email,
        password: form.password
      }
      const res = isAdmin
        ? await store.dispatch('admin/Login', submitForm)
        : await store.dispatch('user/Login', submitForm)
      if (res.code !== 200) return
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
      router.push({ name: 'home' })
      ElMessage({ type: 'success', message: res.msg })
    }
    const handleSwitch = () => {
      initForm()
      needRegister.value = !needRegister.value
    }
    return {
      form,
      formRef,
      rules,
      needRegister,
      handleSwitch,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  @include layout(100%, 100%, 0, 16px);
  .login-card {
    @include layout(100%, auto, 80px 0 0 0, 16px);
    @include border(1px solid #eee, 16px);
    @include box-shadow;
    background-color: white;
    .login-card-header {
      @include layout(100%, 120px, 0 0 16px 0, 4px);
      @include flex-box(row, center, center);
      @include border(null, 4px);
      @include box-shadow(inset 1px 1px 4px #eee, inset -1px -1px 2px #eee);
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
      .register-hint {
        @include pointer;
      }
      .register-area,
      .login-area {
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
</style>