<template>
  <div class="page-part">
    <mt-header fixed title="添加代币">
      <router-link to="/Home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-field placeholder="请输入合约地址" v-model="tokenAddress"></mt-field>

    <mt-radio
      title="推荐合约地址："
      v-model="selectAddress"
      :options="addressOptions">
    </mt-radio>
    <mt-button type="primary" size="large" class="add-button" @click="addToken">添加</mt-button>
  </div>
</template>
<script>
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'
  import Web3Util from '../util/Web3Util'

  export default {
    data() {
      return {
        tokenAddress: "",
        selectAddress: "",
        addressOptions: [
          {
            label: '感恩链（Tgc）',
            value: '0xCc79Cb5023A4896547F4b00a2289d1ed4098Ce13',
          }
        ]
      }
    },
    methods: {
      addToken() {
        let router = this.$router;
        let tokenAddress = this.tokenAddress;
        Web3Util.getName(tokenAddress).then(function (res) {
          TGCoinHttpUtils.post("/walletToken/api/addToken", {
            tokenAddress: tokenAddress,
            tokenName: res
          }).then(function (res) {
            router.push("/Home");
          });
        });

      }
    },
    watch: {
      selectAddress() {
        this.tokenAddress = this.selectAddress;
      },
      tokenAddress() {
        if (this.tokenAddress !== this.selectAddress) {
          this.selectAddress = "";
        }
      }
    }
  }


</script>
<style>
  .add-button {
    margin-top: 20%;
  }
</style>
