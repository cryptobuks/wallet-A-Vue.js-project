<template>
  <div class="page-part">
    <mt-header fixed title="添加代币">
      <router-link to="/Home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-field placeholder="请输入合约地址"></mt-field>
    <mt-button type="primary" size="large" class="add-button">添加</mt-button>
  </div>
</template>
<script>
  import web3 from '../util/Web3Util'

  export default {}


</script>
<style>
  .add-button {
      margin-top: 20%;
  }
</style>
