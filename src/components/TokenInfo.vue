<template>
  <div class="page-part">
    <mt-header fixed title="交易">
      <div @click="goBack()" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>
    <iframe src="https://rinkeby.etherscan.io/address/0xf58610cc21b6568aee8b2c1af667dfdc94219057" frameborder="0" scrolling="auto" style="width: 100%" height="1000px"></iframe>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Receive">
        <img slot="icon" src="../assets/logo.png">
        收款
      </mt-tab-item>

      <mt-tab-item id="Send">
        <img slot="icon" src="../assets/logo.png">
        转账
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>

  export default {
    name: "TokenInfo",
    data() {
      return {
        tokenAddress: "",
        selected: "",
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },
    created: function () {
      let tokenAddress = this.$route.query.tokenAddress;

      if (tokenAddress == null) {
        this.$router.push('/Home');
      }

      this.tokenAddress = tokenAddress
    },
    watch: {
      selected() {
        this.$router.push({path: '/' + this.selected, query: {tokenAddress: this.tokenAddress}});
      }
    }
  }


</script>
<style>

</style>
