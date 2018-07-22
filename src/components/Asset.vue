<template>
  <div class="page-part">
    <div class="asset-header" :style="screenWidth">
      <div class="asset-address">钱包地址：{{address}}</div>
      <div class="asset-add">
        <div @click="addWallet">
          <img slot="icon" src="../assets/plus32.png" width="35" height="35"/>
        </div>
      </div>
    </div>

    <div>
      <mt-cell class="cell"
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
        wallet: {
          tokenName: "",
          balance: "",
          address: "",
        },
        screenWidth: "width:" + document.body.clientWidth + "px;" + "height:" + document.body.clientHeight / 3 + "px"
      };
    }, created: function () {
      const _this = this;
      TGCoinHttpUtils.post("/wallet/api/walletList", {})
        .then(function (res) {
          _this.wallet = res[0]
        });
    },
    components: {},
    computed: {
      address() {
        return this.wallet.address.substring(0, 10) + "****";
      }
    },
    methods: {
      addWallet() {
        this.$router.push("/AddWallet");
      }
    }
  }
</script>
<style>
  .asset-header {
    background-color: lightgrey;
    height: 30%;
    min-height: 250px;
  }

  .asset-add {
    margin-top: 15%;
    float: right;
    margin-right: 5%;
  }

  .asset-address {
    padding-top: 30%;
    margin-left: 20%;
  }
</style>
