<template>
  <div>
    <mt-header fixed title="转账">
      <div @click="goBack()" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>

    <mt-field label="收款地址" v-model="receiveAddress"><input id="scan" type='button' disabled="disabled"
                                                           @click='scanImg' value='扫描图片'/></mt-field>

    <mt-field label="余额" v-model="tokenBalance" disableClear readonly>{{symbol}}</mt-field>

    <mt-field label="输入金额" placeholder="输入金额" v-model="sendAmount" @input="calculate" type="number"
              maxlength="33"></mt-field>

    <mt-field label="矿工费用" readonly disableClear v-model="gasValue"></mt-field>

    <mt-range v-model="rangeValue" :min="13" :max="60" :step=1>
      <div slot="start">0.013</div>
      <div slot="end">0.06</div>
    </mt-range>

    <mt-button type="default" size="large" style="margin-top: 10%">确认发送</mt-button>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import Web3Util from '../util/Web3Util'

  export default {
    name: "Send",
    data() {
      return {
        receiveAddress: "",
        tokenAddress: this.$route.query.tokenAddress,
        tokenBalance: Web3Util.getTokenBalance(localStorage.getItem('walletAddress'), this.$route.query.tokenAddress),
        symbol: Web3Util.getTokenContact(this.tokenAddress, this.$route.query.tokenAddress).symbol(),
        sendAmount: 0,
        rangeValue: 13,
      }
    }, methods: {
      goBack() {
        this.$router.go(-1)
      },
      calculate() {
        let originAmount = Web3Util.getTokenBalance(localStorage.getItem('walletAddress'), this.$route.query.tokenAddress);
        this.tokenBalance = originAmount - this.sendAmount;
      },
      scanImg() {
        plus.barcode.scan( '../../assets/logo.png', function (type,result) {
          alert( "Scan success:("+type+")"+result );
        }, function (error) {
          alert( error.message );
        } );
      },
      onPlusReady() {
        var e = document.getElementById("scan");
        e.removeAttribute( "disabled" );
      }
    }, computed: {
      gasValue: {
        get: function () {
          return this.rangeValue / 1000;
        },
        set: function () {
        }
      }
    }

  }

  // 扩展API加载完毕后调用onPlusReady回调函数
  document.addEventListener( "plusready", this.onPlusReady, false );

</script>
<style>

</style>
