<template>
  <div id="login-form">
    <mt-field label="账号：" class="form" state="success" v-model="username"></mt-field>
    <mt-field label="密码：" class="form" state="success" v-model="password" type="password"></mt-field>
    <mt-button type="primary" id="login-button" @click="login()">登录</mt-button>
  </div>
</template>
<style>
  #login-form {
    position: relative;
    padding-top: 50%;
  }

  #login-button {
    margin-top: 10%;
    width: 250px;
  }
</style>
<script>
  import { Toast } from 'mint-ui';

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
        localStorage.setItem('sessionKey','as');
        this.$router.push('/Home');
      }
    }
  }

</script>

