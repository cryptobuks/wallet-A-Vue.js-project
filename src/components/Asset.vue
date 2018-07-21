<template>
  <div class="page-part">
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
</template>
<script>
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'

  export default {
    name: 'asset',
    data() {
      return {
        walletList: [],
      };
    }, created: function () {
      const _this = this;
      TGCoinHttpUtils.post("/wallet/api/walletList", {})
        .then(function (res) {
          _this.walletList = res
        });
    }
  }
</script>
