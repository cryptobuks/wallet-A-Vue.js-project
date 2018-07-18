<template>
  <div>
    <mt-header fixed title="注册" class="header">
      <router-link to="/Login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <mt-field label="用户名" placeholder="" v-model="username" :state="state.username"
              @input="checkRule('username')"></mt-field>
    <mt-field label="邮箱" placeholder="" type="email" v-model="email" :state="state.email"
              @input="checkRule('email')"></mt-field>
    <mt-field label="密码" placeholder="最少6位" type="password" v-model="password" :state="state.password"
              @input="checkRule('password')"></mt-field>
    <mt-field label="手机号" placeholder="" type="number" v-model="phone" :state="state.phone"
              @input="checkRule('phone')"></mt-field>
    <mt-field label="生日" placeholder="" type="date" v-model="birthday" :state="state.birthday"
              @input="checkRule('birthday')"></mt-field>
    <mt-field label="验证码" v-model="captcha" type="number" :state="state.captcha"
              @input="checkRule('captcha')">
      <span style="color: #b5b5b5">60秒后重新获取</span>
    </mt-field>
    <div class="submit">
      <mt-button type="primary" size="large" @click="register">下一步</mt-button>
    </div>
  </div>
</template>
<style>
  .submit {
    margin-top: 20%;
  }

</style>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: 'register',
    data() {
      return {
        username: "",
        email: "",
        password: "",
        phone: "",
        website: "",
        number: "",
        birthday: "",
        introduction: "",
        captcha: "",
        state: {
          username: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          captcha: "",
        }
      };
    }, methods: {
      register() {
        Toast('注册成功');
        localStorage.setItem('sessionKey', 'as');
        this.$router.push('/Home');
      },
      checkRule(type) {
        let ret = 'error';
        switch (type) {
          case 'username':
            if (/^[a-zA-Z0-9]{4,20}$/.test(this.username)) {
              ret = 'success'
            }
            if (this.username.length === 0) {
              ret = ''
            }
            this.state.username = ret;
            break;
          case 'email':
            if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
              ret = 'success'
            }
            if (this.email.length === 0) {
              ret = ''
            }
            this.state.email = ret;
            break;
          case 'password':
            if (/^[a-zA-Z0-9]{6,20}$/.test(this.password)) {
              ret = 'success'
            }
            if (this.password.length === 0) {
              ret = ''
            }
            this.state.password = ret;
            break;
          case 'phone':
            if (/^[0-9]{11,20}$/.test(this.phone)) {
              ret = 'success'
            }
            if (this.phone.length === 0) {
              ret = ''
            }
            this.state.phone = ret;
            break;
          case 'captcha':
            if (/^[0-9]{6}$/.test(this.captcha)) {
              ret = 'success'
            }
            if (this.captcha.length === 0) {
              ret = ''
            }
            this.state.captcha = ret;
            break;
          default:
            break;
        }
      }
    }
  }

</script>

