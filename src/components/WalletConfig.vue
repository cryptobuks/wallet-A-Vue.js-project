<template>
  <div class="page-part">
    <mt-header fixed title="感恩钱包"></mt-header>
    <mt-radio
      :max="1"
      align="right"
      title="钱包切换"
      v-model="wallet"
      :options="addressOptions ">
    </mt-radio>
  </div>
</template>
<script>
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'
  import web3 from '../util/constants/Web3Util'

  export default {
    name: 'asset',
    data() {
      return {
        wallet: "",
        addressOptions: [],
        screen: "width:" + document.body.clientWidth + "px;" + "height:" + document.body.clientHeight / 3 + "px"
      };
    }, created: function () {
      const _this = this;
      TGCoinHttpUtils.post("/wallet/api/walletList", {})
        .then(function (res) {
          res.forEach(function (row) {
            let obj = {
              label: row.tokenName,
              value: row.address,
            };
            _this.addressOptions.push(obj);
          })
        });
    },
    components: {},
    computed: {},
    methods: {},
    watch:{
      wallet(){
        console.log(this.wallet)
      }
    }
  }
</script>
<style>
  .asset-header {
    background-color: #fafafa;
    height: 30%;
    min-height: 250px;
    background-image: url("../assets/1532503610.png");

    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;

  }

  .asset-add {
    margin-top: -13%;
    float: right;
    margin-right: 5%;
  }

  .asset-address {
    padding-top: 12%;
    margin-left: 20%;
  }
</style>
