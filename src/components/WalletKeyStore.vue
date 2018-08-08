<template>
  <div>
    <mt-header title="KeyStore" fixed>
      <router-link to="/WalletConfig" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <mt-navbar v-model="selected">
      <mt-tab-item id="1">KeyStore</mt-tab-item>
      <mt-tab-item id="2">私钥</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="cotainer">
          <label>
            <textarea class="text">{{keyStore}}</textarea>
          </label>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="cotainer">
          <label>
            <textarea class="text">{{privateKey}}</textarea>
            <p style="color: red">私钥千万不要告诉其他人，拿到私钥就能拿到钱包的控制权</p>
          </label>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <div class="add-wallet-submit">
      <mt-button type="primary" @click="success" class="button">完成</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'add_wallet',
    data() {
      return {
        keyStore: this.$route.query.keyStore,
        privateKey: this.$route.query.privateKey,
        address: this.$route.query.address,
        selected: "1"
      };
    },
    created() {
    },
    methods: {
      success() {
        this.$router.push("/WalletConfig");
      }
    },
    components: {}
  }
</script>

<style>
  .text {
    width: 90%;
    height: 300px;
    border: #0b1929;
    border-width: 20px;
  }

  .cotainer {
    margin-top: 10%;
    margin-bottom: 10%;
  }
</style>
