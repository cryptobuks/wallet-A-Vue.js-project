<template>
  <div>
    <mt-header fixed title="转账">
      <div @click="goBack()" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>

    <mt-field label="收款地址" v-model="receiveAddress"><img src="../assets/txl.png" width="24"/></mt-field>

    <mt-field label="余额" v-model="tokenBalance" disableClear readonly>{{symbol}}</mt-field>

    <mt-field label="输入金额" placeholder="输入金额" v-model="sendAmount" @input="calculate" type="number"
              maxlength="33"></mt-field>

    <mt-field label="矿工费用" readonly disableClear v-model="gasValue"></mt-field>

    <mt-range v-model="rangeValue" :min="13" :max="60" :step=1>
      <div slot="start">0.013</div>
      <div slot="end">0.06</div>
    </mt-range>

    <mt-button type="default" size="large" style="margin-top: 10%" @click="sendTransfer">确认发送</mt-button>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import Web3Util from '../util/Web3Util'
  import {MessageBox} from 'mint-ui';

  export default {
    name: "Send",
    data() {

      return {
        originTokenBalance: "",
        receiveAddress: "0x3E32Fe42434A039ad630C4cf67e5378a9aAe6e36",
        tokenAddress: this.$route.query.tokenAddress,
        tokenBalance: "",
        symbol: "",
        sendAmount: 0,
        rangeValue: 13,
      }
    }, methods: {
      goBack() {
        this.$router.go(-1)
      },
      calculate() {
        let originAmount = this.originTokenBalance;
        this.tokenBalance = (originAmount - this.sendAmount).toFixed(4);
      },
      sendTransfer() {
        let _this = this;
        if (this.receiveAddress == null || this.receiveAddress === "") {
          Toast('请输入收款地址');
          return;
        }
        if (localStorage.getItem('walletKeyStroe') == null) {
          MessageBox.confirm('未选择钱包，是否去选择？').then(({value, action}) => {
            this.$router.push("/WalletConfig")
          });
        } else {
          MessageBox.prompt('请输入交易密码').then(({value, action}) => {
            let privateKey = Web3Util.decryptWallet(value);

            return Web3Util.sendTransaction(privateKey, this.tokenAddress, this.receiveAddress, this.sendAmount).then(function (res) {
              Web3Util.getBalance().then(function (res) {
                _this.balance = res;
              });
            });
          });

        }

      }
    }, computed: {
      gasValue: {
        get: function () {
          return this.rangeValue / 1000;
        },
        set: function () {
        }
      }
    }, created() {
      let _this = this;
      let tokenAddress = _this.tokenAddress;

      Web3Util.getTokenBalance(tokenAddress).then(function (res) {
        console.log(res);
        _this.tokenBalance = res;
        _this.originTokenBalance = res;
      });

      Web3Util.getSymbol(tokenAddress).then(function (o) {
        _this.symbol = o;
      });
    }
  }
</script>
<style>

</style>
