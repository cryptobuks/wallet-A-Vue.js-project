<template>
  <div id="login-form">
    <h1 id="login-header">感恩链</h1>
    <div id="filed-form">
      <mt-field label="账号：" state="success" v-model="username"></mt-field>
      <mt-field label="密码：" state="success" v-model="password" type="password"></mt-field>
    </div>
    <div id="filed-submit">
      <mt-button type="primary" id="login-button" @click="login()">登录</mt-button>
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

  #login-button {
    width: 250px;
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

</style>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: 'login',
    data() {
      return {
        balance: 0,
        username: "",
        password: ""
      };
    }, methods: {
      login() {
        Toast('登录成功');
        localStorage.setItem('sessionKey', 'as');
        this.$router.push('/Home');
      }
    }
  }

</script>

