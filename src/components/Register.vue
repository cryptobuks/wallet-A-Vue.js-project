<template>
  <div>
    <mt-header fixed title="注册" class="header">
      <router-link to="/Login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <mt-field label="账号" placeholder="请输入账号" v-model="input.username"
              :state="state.username|checkRule(input.username,'username')"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="input.phone"
              :state="state.phone|checkRule(input.phone,'phone')"></mt-field>
    <mt-field label="验证码" placeholder="请输入6位的验证码" v-model="input.captcha" type="number"
              :state="state.captcha|checkRule(input.captcha,'captcha')">
      <span style="color: #b5b5b5" @click="sendCode">点击获取</span>
    </mt-field>
    <mt-field label="密码" placeholder="请输入6位或以上的密码" type="password" v-model="input.password"
              :state="state.password|checkRule(input.password,'password')"></mt-field>

    <div class="submit">
      <mt-button type="primary" @click="register" class="button">下一步</mt-button>
    </div>

  </div>
</template>
<style>
  .submit {
    margin-top: 20%;
  }

  .button {
    width: 250px;
  }
</style>
<script>
  import {Toast} from 'mint-ui'
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'

  export default {
    name: 'register',
    data() {
      return {
        input: {
          username: "",
          phone: "",
          password: "",
          captcha: "",
        },
        state: {
          username: "",
          phone: "",
          password: "",
          captcha: "",
        }
      };
    }, methods: {
      register() {
        let stateMap = this.state;
        let router = this.$router;
        let isSuccess = true;
        Object.keys(stateMap).forEach(function (key) {
          if (stateMap[key] === '' || stateMap[key] !== 'success') {
            Toast('请核对信息再提交');
            isSuccess = false;
          }
        });

        if (isSuccess) {
          TGCoinHttpUtils.post('/app/api/register', this.input).then(function (res) {
            console.log(res);
            if (res.code === 100) {
              localStorage.setItem('sessionKey', 'as');
              router.push("/Home");
            }
          })
        }
      },
      sendCode() {
        Toast('您正在注册感恩链账号，验证码为123456');
      }
    }
  }

</script>

