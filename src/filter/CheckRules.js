import Vue from 'vue'

const roules = {
  username: /^[a-zA-Z0-9]{4,20}$/,
  phone: /^[0-9]{11,20}$/,
  password: /^[a-zA-Z0-9]{6,20}$/,
  captcha: /^[0-9]{6}$/
};

Vue.filter('checkRule', function (val, data, type) {
  let ret = 'error';
  Object.keys(roules).forEach(function (key) {
    if (key === type && roules[key].test(data)) {
      ret = 'success';
    }
  });
  if (data.length === 0) {
    ret = ''
  }
  return ret
});
