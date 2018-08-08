<template>
  <div>
    <mt-header fixed title="收款">
      <div @click="goBack()" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>

    <div>
      收款地址
      <p class="address-font-size">{{walletAddress}}</p>
      <mt-button type="default" @click="doCopy">复制</mt-button>
    </div>
    <div>
      <qrcode-vue :value="walletAddress" :size="150" style="margin-top: 10%" level="H"></qrcode-vue>
    </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  import {Toast} from 'mint-ui'

  export default {
    name: "Receive",
    data() {
      return {
        tokenAddress: this.$route.query.tokenAddress,
        walletAddress: localStorage.getItem("walletAddress")
      }
    }, methods: {
      goBack() {
        this.$router.go(-1)
      },
      doCopy: function () {
        let _this = this;
        _this.$copyText(_this.walletAddress).then(function (e) {
          Toast({
            message: '复制成功',
            position: 'bottom',
          })
        }, function (e) {
        })
      }
    },
    watch: {},
    components: {
      QrcodeVue
    },
  }


</script>
<style>

</style>
