<template>
  <div>
    <mt-header title="添加钱包" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="add-wallet-header" :style="screen">
      <ul class="add-wallet-warn">
        <li>密码用于保护私钥和交易授权，强度非常重要</li>
        <li>钱包不存储密码，也无法帮你找回，请务必牢记</li>
      </ul>
    </div>
    <div class="add-wallet-field">
      <mt-field label="钱包名" placeholder="请输入钱包名" v-model="input.walletName"
                :state="state.walletName|checkRule(input.walletName,'walletName')"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="input.password"
                :state="state.password|checkRule(input.password,'password')"></mt-field>
      <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="input.passwordAgain"
                :state="state.passwordAgain|checkRule(input.passwordAgain,'password')"></mt-field>
    </div>
    <div class="add-wallet-submit">
      <mt-button type="primary" @click="addWallet" class="button">下一步</mt-button>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import RegexRoules from '../util/constants/RegexRoules'
  import Web3Util from '../util/Web3Util'
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'

  export default {
    name: 'add_wallet',
    data() {
      return {
        screen: "width:" + document.body.clientWidth + "px;",
        input: {
          walletName: "",
          password: "",
          passwordAgain: "",
        },
        state: {
          walletName: "",
          password: "",
          passwordAgain: "",
        }
      };
    },
    methods: {
      addWallet() {
        let inputMap = this.input;
        let router = this.$router;
        let isSuccess = true;
        Object.keys(inputMap).forEach(function (key) {
          if (!RegexRoules[key].test(inputMap[key])) {
            Toast(RegexRoules['desc'][key] + '格式有误，请核对后再提交');
            isSuccess = false;
            throw new Error('input error');
          }
        });
        if (inputMap.password !== inputMap.passwordAgain) {
          Toast('两次输入的密码不一样');
          isSuccess = false;
          throw new Error('input error');
        }

        if (isSuccess) {
          let walletGenerateRes = Web3Util.walletgenerate();
          inputMap['address'] = walletGenerateRes.getAddressString();

          let address = inputMap['address'];
          let keyStore = walletGenerateRes.toV3String(inputMap.password);
          let privateKey = walletGenerateRes.getPrivateKeyString();

          TGCoinHttpUtils.post("/wallet/api/walletAdd", inputMap).then(function (res) {
            localStorage.setItem("walletPrivateKey", privateKey);
            localStorage.setItem("walletAddress", address);
            localStorage.setItem("walletKeyStroe", keyStore);
            localStorage.setItem("walletName", inputMap.walletName);

            router.push({
              path: "/WalletKeyStroe",
              query: {keyStore: keyStore, address: address, privateKey: privateKey}
            });

          });
        }

      }
    }
  }
</script>

<style>
  .add-wallet-header {
    background-color: #3c77c4;
    height: 30%;
    padding-top: 1%;
  }

  .add-wallet-warn {
    font-size: 10px;
    text-align: left;
    color: white;
  }

  .add-wallet-field {
    margin-top: 3%;
  }

  .add-wallet-submit {
    margin-top: 3%;
  }
</style>
