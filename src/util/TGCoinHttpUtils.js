import axios from 'axios'
import {Toast} from 'mint-ui'
// import Qs from 'qs'
import Vue from 'vue'
import router from '../router/index'
import {Indicator} from 'mint-ui';

let vue = new Vue({router});

let TGCoinHttpUtils = {
  post: function (url, request) {
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['uid'] = localStorage.getItem('uid');
    // axios.defaults.headers.post['token'] = localStorage.getItem('token');

    let config = {
      //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
      url: url,
      // 请求方法同上
      method: 'post', // default
      // 基础url前缀
      baseURL: 'http://192.168.8.125:9022',
      // transformRequest: [function (data) {
      //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      //   request = Qs.stringify({});
      //   return data;
      // }],
      // transformResponse: [function (data) {
      //   // 这里提前处理返回的数据
      //   return data;
      // }],
      // 请求头信息
      headers: {
        'Content-Type': 'application/json',
        'uid': localStorage.getItem('uid'),
        'token': localStorage.getItem('token'),
      },
      //parameter参数
      // params: {
      //   timestamp: Date.parse(new Date()) / 1000,
      //   address: "111"
      // },
      //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
      params: JSON.stringify(request),
      //设置超时时间
      timeout: 5000,
      //返回数据类型
      responseType: 'json', // default
      validateStatus: function (status) {
        return status >= 200 && status < 550; // default
      },
    };
    Indicator.open('加载中...');

    return axios.post(url, request, config).then(function (res) {

      switch (res.status) {
        case 401:
          vue.$router.push("/Login");
          Toast("请重新登录");
          localStorage.removeItem("token");
          localStorage.removeItem("uid");
          return Promise.reject("请重新登录");
        case 500:
          Toast("系统繁忙");
          return Promise.reject("系统繁忙");
        default:
          break;
      }

      if (res.data.code !== 100) {
        let err = "[" + res.data.code + "] " + res.data.msg;
        Toast(err);
        return Promise.reject(err);
      }
      return res.data.data;
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
