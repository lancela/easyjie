<template>
  <div class="login-container">
     <el-form id="login-form" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h2 class="title">Login Form</h2>
      </div>
      <el-form-item prop="username">
        <el-input
          type="text"
          ref="username"
          name="username"
          placeholder="Username"
          prefix-icon="el-icon-user"
          v-model="loginForm.username"
          tabindex="1"
          auto-complete="on"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-key"
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"/>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>

</template>

<script>
// 获取校验正则表达式
import { validUsername } from '@/utils/validate'
import $ from 'jquery'
export default {
  name: 'Login',
  data () {
    // 校验方法
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('The password can not be less than 5 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      // 使用校验
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  mounted(){
   $('#login-form').addClass('animated bounceInRight')
  },
  watch:{
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$router.push('/index')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container{
  width: 100%;
  height: 100%;
  background-image: url('../../assets/login-bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style lang="scss" scoped>
.login-container {
  .login-form {
    width: 420px;
    max-width: 100%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
