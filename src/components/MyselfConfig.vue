<template>
  <div class="page-part">
    <mt-cell
      title="实名认证"
      to=""
      is-link
      value="未认证">
      <img slot="icon" src="../assets/logo.png" width="24" height="24">
    </mt-cell>
    <div class="sing-out">
      <mt-button type="danger" @click="logout()" size="large">退出</mt-button>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'myself_config',
    data() {
      return {};
    }, methods: {
      logout() {
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
        this.$router.push('/Login');
      }
    },
    created: function () {
    }
  }
</script>
<style>
  .sing-out {
    padding-top: 93%;
  }
</style>
