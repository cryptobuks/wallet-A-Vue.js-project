<template>
  <div class="page-part">
    <div class="asset-header" :style="screenWidth"></div>
    <div class="asset-add"><img src="../assets/plus32.png" width="35" height="35"/></div>
    <div class="asset-address"></div>
    <div>
      <mt-cell class="cell"
               v-for="wallet in walletList"
               :title="wallet.tokenName"
               :value="wallet.balance"
               to=""
               is-link
      >
        <img slot="icon" src="../assets/logo.png" width="24" height="24">
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'

  export default {
    name: 'asset',
    data() {
      return {
        walletList: [],
        screenWidth: "width:" + document.body.clientWidth + "px;" + "height:" + document.body.clientHeight / 3 + "px"
      };
    }, created: function () {
      const _this = this;
      TGCoinHttpUtils.post("/wallet/api/walletList", {})
        .then(function (res) {
          _this.walletList = res
        });
    }, components: {}
  }
</script>
<style>
  .asset-header {
    background-color: lightgrey;
    height: 30%;
    min-height: 250px;
  }

  .asset-add {
    margin-top: -12%;
    float: right;
    margin-right: 5%;
  }
</style>
