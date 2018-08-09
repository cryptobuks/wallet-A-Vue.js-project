<template>
  <div class="page-part">
    <div class="asset-header" :style="screen">
      <div class="asset-address">
        <H1 @click="alterName">{{walletName}}</H1>
        <p></p>
        {{address}}
        <p>Eth资产：{{walletBalance}}</p>
      </div>
    </div>
    <div class="asset-add" @click="addToken">
      <img slot="icon" src="../assets/plus32.png" width="35" height="35"/>
    </div>
    <div>
      <div v-for="item in wallet" @click="goToTokenInfo(item.address)">
        <mt-cell class="cell"
                 :title="item.tokenName"
                 :value="item.balance"
                 is-link
        >
          <img slot="icon" src="../assets/logo.png" width="24" height="24">
        </mt-cell>
      </div>

    </div>
  </div>
</template>
<script>
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'
  import Web3Util from '../util/Web3Util'
  import {MessageBox} from 'mint-ui'

  export default {
    name: 'asset',
    data() {
      return {
        walletAddress: localStorage.getItem('walletAddress'),
        walletName: localStorage.getItem('walletName'),
        wallet: [{
          tokenName: "",
          balance: "",
          address: "",
        }],
        walletBalance: "0",
        screen: "width:" + document.body.clientWidth + "px;" + "height:" + document.body.clientHeight / 3 + "px"
      }
        ;
    }, created: function () {
      const _this = this;
      let walletList = [];

      if (this.walletAddress === null || this.walletAddress === "") {
        MessageBox.alert("还没选中钱包，现在去选择？").then(action => {
          _this.$router.push("/WalletConfig");
        });
        return false;
      }

      TGCoinHttpUtils.post("/walletToken/api/WalletTokenList", {})
        .then(function (res) {
          res.forEach(function (val) {
            walletList.push({
              tokenName: val.tokenName,
              address: val.tokenAddress,
              balance: 0,
            });
          });
        }).then(function () {
        walletList.forEach(function (obj) {
          Web3Util.getTokenBalance(obj.address).then(function (res) {
            obj.balance = res;
          });
        });
      }).then(function () {
        _this.wallet = walletList;
      });


      Web3Util.getBalance().then(function (res) {
        _this.walletBalance = res;
      })

    },
    components: {},
    computed: {
      address() {
        if (this.walletAddress !== null)
          return "钱包地址：" + this.walletAddress.substring(0, 10) + "****";
        else
          return "钱包地址：暂无"
      },
    },
    methods: {
      addToken() {
        this.$router.push("/TokenAdd");
      },
      goToTokenInfo(address) {
        this.$router.push({path: "/TokenInfo", query: {tokenAddress: address}});
      },
      alterName() {
        MessageBox.prompt("修改钱包名字").then(({value, action}) => {

        });
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
