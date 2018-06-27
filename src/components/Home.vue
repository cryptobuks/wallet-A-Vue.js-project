<template>
  <div class="page-tabbar">

    <div class="page-wrap">
      <mt-header fixed title="感恩钱包" class="header"></mt-header>
      <!-- tabcontainer -->
      <div class="body">
        <mt-tab-container class="page-tabbar-container" v-model="selected">
          <mt-tab-container-item id="资产">
            <div class="page-part">
              <mt-cell class="cell"
                       title="ETH"
                       to="//github.com"
                       is-link
                       value="100.00000000000">
                <img slot="icon" src="../assets/logo.png" width="24" height="24">
              </mt-cell>
              <mt-cell class="cell"
                       title="TG-COIN"
                       to="//github.com"
                       is-link
                       v-model="balance"
                       value="">
                <img slot="icon" src="../assets/logo.png" width="24" height="24">
              </mt-cell>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="转入">

          </mt-tab-container-item>
          <mt-tab-container-item id="转出">

          </mt-tab-container-item>
          <mt-tab-container-item id="我的">
            <div class="page-part">

              <mt-cell
                title="实名认证"
                to="//github.com"
                is-link
                value="未认证">
                <img slot="icon" src="../assets/logo.png" width="24" height="24">
              </mt-cell>

            </div>
            <div class="sing-out">
              <router-link to="/">
                <!-- button -->
                <mt-button type="danger" size="large">退出</mt-button>
              </router-link>
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
  import Vue from 'vue'
  import axios from 'axios'
  import Qs from 'qs'

  export default {

    name: 'page-tabbar',

    data() {
      return {
        selected: '资产',
        // balance: this.post("http://localhost:9022/api/getBalance", "")
        balance: 0
      };
    },
    methods: {
      post: function (url, data) {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        let config = {
          //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
          url: url,

          // 请求方法同上
          method: 'post', // default
          // 基础url前缀
          baseURL: 'http://120.79.191.116:1444',

          transformRequest: [function (data) {
            // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
            data = Qs.stringify({});
            return data;
          }],

          transformResponse: [function (data) {
            // 这里提前处理返回的数据

            return data;
          }],

          // 请求头信息
          headers: {'X-Requested-With': 'XMLHttpRequest'},

          //parameter参数
          params: {
            timestamp: Date.parse(new Date()) / 1000
          },

          //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
          data: data,

          //设置超时时间
          timeout: 5000,
          //返回数据类型
          responseType: 'json', // default
        };
        return axios.post(url, data, config)
      }
    }, created: function () {
      this.post("/api/getBalance", "")
        .then(function (res) {
          console.log(res.data);
          balance = res.data;
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
  ;
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

  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
</style>
