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
        receiveAddress: "",
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
        this.tokenBalance = originAmount - this.sendAmount;
      },
      sendTransfer() {
        if (this.receiveAddress == null || this.receiveAddress === "") {
          Toast('请输入收款地址');
        }
        MessageBox.prompt('请输入密码').then(({value, action}) => {
          let web3 = Web3Util.instance;
          let walletAddress = localStorage.getItem('walletAddress');
          web3.eth.defaultAccount = walletAddress;
          web3.personal.unlockAccount(walletAddress, value, function (err, transactionHash) {
            if (!err)
              console.log('unlockAccount:' + transactionHash);
            else
              console.log('unlockAccount:' + err);
          });
          web3.eth.defaultAccount = walletAddress;
          let contract = Web3Util.getTokenContact(this.tokenAddress);
          contract.transfer(this.receiveAddress, this.sendAmount, function (err, transactionHash) {
            if (!err)
              console.log('transfer:' + transactionHash);
            else
              console.log('transfer:' + err);
          });
        });
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
