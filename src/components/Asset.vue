<template>
  <div class="page-part">
    <mt-cell class="cell"
             title="TG-COIN"
             to=""
             is-link
             v-model="balance">
      <img slot="icon" src="../assets/logo.png" width="24" height="24">
    </mt-cell>
  </div>
</template>
<script>
  import TGCoinHttpUtils from '../util/TGCoinHttpUtils'

  export default {
    name: 'page-tabbar',
    data() {
      return {
        balance: 0,
      };
    }, created: function () {
      const _this = this;
      TGCoinHttpUtils.post("/api/getBalance", "0x10458298a51e19f676cb42302c63382b7ad594c1")
        .then(function (res) {
          console.log(res.data);
          _this.balance = res.data;
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
</script>
