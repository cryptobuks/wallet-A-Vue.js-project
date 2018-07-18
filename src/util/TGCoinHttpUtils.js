import axios from 'axios'
import {Toast} from 'mint-ui'
import Qs from 'qs'

let TGCoinHttpUtils = {
  post: function (url, request) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    let config = {
      //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
      url: url,
      // 请求方法同上
      method: 'post', // default
      // 基础url前缀
      baseURL: 'http://127.0.0.1:9022',
      // transformRequest: [function (data) {
      //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      //   request = Qs.stringify({});
      //   return data;
      // }],
      transformResponse: [function (data) {
        // 这里提前处理返回的数据
        return data;
      }],
      // 请求头信息
      headers: {'X-Requested-With': 'XMLHttpRequest'},
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
    };

    return axios.post(url, request, config).then(function (res) {
      if (res.data.code !== 100) {
        Toast("[" + res.data.code + "] " + res.data.msg);
      }
      return res.data;
    })
      .catch(function (err) {
        console.log(err);
        Toast("出错了！");
      });
  }

};
export default TGCoinHttpUtils
