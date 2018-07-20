<template>
  <div id="login-form">
    <h1 id="login-header">感恩链</h1>
    <div id="filed-form">
      <mt-field label="账号：" v-model="username"></mt-field>
      <mt-field label="密码：" v-model="password" type="password"></mt-field>
    </div>
    <div id="filed-submit">
      <mt-button type="primary" class="button" @click="login()">登录</mt-button>
    </div>
    <div id="to-register">
      <router-link to="/Register">没有账号？去注册</router-link>
    </div>
  </div>
</template>
<style>
  #login-header {
    margin-top: 30%;
  }

  #filed-form {
    margin-top: 20%;
  }

  #filed-submit {
    margin-top: 10%;
  }

  #to-register {
    margin-top: 10%;
  }

  a {
    text-decoration: none;
  }

  .mint-cell:last-child {
    background-image: none;
  }
</style>
<script>
  import {Toast} from 'mint-ui';
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'
  import RegexRoules from '../util/constants/RegexRoules'

  export default {
    name: 'login',
    data() {
      return {
        username: "",
        password: ""
      };
    }, methods: {
      login() {

        if (!RegexRoules.username.test(this.username)) {
          Toast('账号格式不正确');
          return false;
        }
        if (!RegexRoules.password.test(this.password)) {
          Toast('密码格式不正确');
          return false;
        }

        let router = this.$router;
        TGCoinHttpUtils.post("/user/api/login", {userName: this.username, password: this.password})
          .then(function (res) {
            localStorage.setItem('sessionKey', res.data);
            router.push('/Home');
          });
      }
    }
  }

</script>

