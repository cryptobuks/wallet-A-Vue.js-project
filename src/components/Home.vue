<template>
  <div class="page-tabbar">

    <div class="page-wrap">
      <mt-header fixed title="感恩钱包" class="header"></mt-header>
      <!-- tabcontainer -->
      <div class="body">
        <mt-tab-container class="page-tabbar-container" v-model="selected">
          <mt-tab-container-item id="资产">
            <asset></asset>
          </mt-tab-container-item>
          <mt-tab-container-item id="转入">

          </mt-tab-container-item>
          <mt-tab-container-item id="转出">

          </mt-tab-container-item>
          <mt-tab-container-item id="我的">
            <div class="page-part">
              <mt-cell
                title="实名认证"
                to=""
                is-link
                value="未认证">
                <img slot="icon" src="../assets/logo.png" width="24" height="24">
              </mt-cell>
            </div>
            <div class="sing-out">
                <mt-button type="danger" @click="logout()" class="logout-button">退出</mt-button>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="资产">
        <img slot="icon" src="../assets/logo.png">
        资产
      </mt-tab-item>
      <mt-tab-item id="转入">
        <img slot="icon" src="../assets/logo.png">
        转入
      </mt-tab-item>
      <mt-tab-item id="转出">
        <img slot="icon" src="../assets/logo.png">
        转出
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import asset from '../components/Asset'
  import VueQArt from 'vue-qart'

  export default {
    name: 'home',
    data() {
      return {
        selected: '资产',
        config: {
          value: 'http://127.0.0.1:9022',
          imagePath: '../assets/logo.png',
          color: 'red',
          filter: 'color',
          size: '500px'
        }
      };
    }, components: {
      asset,
      VueQArt
    }, methods: {
      logout() {
        localStorage.removeItem('sessionKey');
        this.$router.push('/Login');
      }
    }
  }
</script>

<style>
  .header {
    height: 6%;
  }

  .body {
    overflow: auto;
    display: block;
  }

  .cell {
    min-height: 78px;
  }

  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    /*padding-bottom: 100px;*/
  }

  .page-part {
    text-align: left;
  }

  .sing-out {
    padding-top: 93%;
  }
  .logout-button{
    width: 250px;
  }
</style>
