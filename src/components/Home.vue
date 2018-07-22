<template>
  <div class="page-tabbar">
    <mt-header fixed title="感恩钱包"></mt-header>
    <div class="page-wrap">
      <div class="body">
        <mt-tab-container class="page-tabbar-container" v-model="selected">
          <mt-tab-container-item id="asset">
            <asset></asset>
          </mt-tab-container-item>
          <mt-tab-container-item id="receive">

          </mt-tab-container-item>
          <mt-tab-container-item id="send">
          </mt-tab-container-item>

          <mt-tab-container-item id="my">
            <myself_config></myself_config>
          </mt-tab-container-item>

        </mt-tab-container>
      </div>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="asset">
        <img slot="icon" src="../assets/logo.png">
        资产
      </mt-tab-item>
      <mt-tab-item id="receive">
        <img slot="icon" src="../assets/logo.png">
        转入
      </mt-tab-item>
      <mt-tab-item id="send">
        <img slot="icon" src="../assets/logo.png">
        转出
      </mt-tab-item>
      <mt-tab-item id="my">
        <img slot="icon" src="../assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import asset from '../components/Asset'
  import myself_config from '../components/Myself_Config'

  export default {
    name: 'home',
    data() {
      return {
        selected: 'asset',
        config: {
          value: 'http://127.0.0.1:9022',
          imagePath: '../assets/logo.png',
          color: 'red',
          filter: 'color',
          size: '500px'
        },
      };
    }, components: {
      asset,
      myself_config,
    }, methods: {

    }, watch: {

    }
  }
</script>

<style>
  .cell {
    min-height: 78px;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    /*padding-bottom: 100px;*/
  }
  .page-part {
    text-align: left;
  }

  .button {
    width: 250px;
  }
</style>
