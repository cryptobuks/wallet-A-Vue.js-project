<template>
  <div>
    <mt-header fixed title="注册" class="header">
      <router-link to="/Login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <mt-field label="账号" placeholder="请输入账号" v-model="input.username" :state="state.username"
              @input="checkRule('username')"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="input.phone" :state="state.phone"
              @input="checkRule('phone')"></mt-field>
    <mt-field label="验证码" placeholder="请输入6位的验证码" v-model="input.captcha" type="number" :state="state.captcha"
              @input="checkRule('captcha')">
      <span style="color: #b5b5b5" @click="sendCode">点击获取</span>
    </mt-field>
    <mt-field label="密码" placeholder="请输入6位或以上的密码" type="password" v-model="input.password" :state="state.password"
              @input="checkRule('password')"></mt-field>

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
  import {Toast} from 'mint-ui';
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
        },
        roules: {
          username: /^[a-zA-Z0-9]{4,20}$/,
          phone: /^[0-9]{11,20}$/,
          password: /^[a-zA-Z0-9]{6,20}$/,
          captcha: /^[0-9]{6}$/,
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
          TGCoinHttpUtils.post('/app/api/register', this.input)
            .then(function (res) {
              console.log(res);
              if (res.data.code === 100) {
                Toast('注册成功');
                localStorage.setItem('sessionKey', 'as');
                router.push('/Home');
              }
            })
            .catch(function (err) {
              console.log(err)
            });
        }
      },
      checkRule(type) {
        let data = this.input;
        let state = this.state;
        let roules = this.roules;
        let ret = 'error';
        Object.keys(roules).forEach(function (key) {
          if (key === type && roules[key].test(data[type])) {
            ret = 'success';
            return true;
          }
        });
        if (data[type].length === 0) {
          ret = ''
        }
        state[type] = ret
      },
      sendCode() {
        Toast('您正在注册感恩链账号，验证码为123456');
      }
    }
  }

</script>

