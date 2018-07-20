import Vue from 'vue'
import RegexRoules from '../util/constants/RegexRoules'

Vue.filter('checkRule', function (val, data, type) {
  let ret = 'error';
  Object.keys(RegexRoules).forEach(function (key) {
    if (key === type && RegexRoules[key].test(data)) {
      ret = 'success';
    }
  });
  if (data.length === 0) {
    ret = ''
  }
  val = ret;
  return ret
});
