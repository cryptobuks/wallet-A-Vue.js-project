<template>
  <div class="page-part">
    <mt-header fixed title="交易">
      <div @click="goBack()" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>
    <iframe :src="iframeUrl" id="show-iframe" frameborder="0" scrolling="auto"
            class="token-iframe">

    </iframe>
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
        iframeUrl: "",
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

      this.iframeUrl = "https://rinkeby.etherscan.io/token/" + tokenAddress + "?a=" + localStorage.getItem("walletAddress");
      this.tokenAddress = tokenAddress;

    },
    watch: {
      selected() {
        this.$router.push({path: '/' + this.selected, query: {tokenAddress: this.tokenAddress}});
      }
    },
    mounted() {
      const oIframe = document.getElementById('show-iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = deviceWidth + 'px';
      oIframe.style.height = deviceHeight + 'px';
    },
  }


</script>
<style>
  .token-iframe {
    width: 100%;
  }
</style>
