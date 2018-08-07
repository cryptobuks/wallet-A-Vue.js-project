import axios from 'axios'
import {Toast} from 'mint-ui'
import Qs from 'qs'
import Vue from 'vue'
import router from '../router/index'
import {Indicator} from 'mint-ui';
import MythereWalletConfig from './constants/MythereWalletConfig';

let TGCoinHttpUtils = {
  post: function (url, request) {

    let config = {
      //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
      url: url,
      // 请求方法同上
      method: 'post', // default
      // 基础url前缀
      baseURL: MythereWalletConfig.host,
      transformRequest: [function (request) {
        request = Qs.stringify(request);
        return request;
      }],
      //设置超时时间
      timeout: 30000,
      //返回数据类型
      responseType: 'json', // default
      validateStatus: function (status) {
        return status >= 200 && status < 550; // default
      },
    };
    Indicator.open('加载中...');
    let vue = new Vue({router});

    return axios.post(url, request, config).then(function (res) {
      return res.data;
    })
      .catch(error => {
        console.log(error);
        Toast(error);
        return Promise.reject(error);
      }).finally(
        function () {
          Indicator.close();
        }
      );
  }

};
export default TGCoinHttpUtils
