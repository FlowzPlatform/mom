// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable*/
import Vue from 'vue'
import App from './App.vue';
import router from './router'

Vue.config.productionTip = false
Vue.config.silent = false
Vue.config.devtools = true
// Vue.config.errorHandler = function (err, vm, info) {
//   console.error(err, vm, info);
//   // handle error
//   // `info` is a Vue-specific error info, e.g. which lifecycle hook
//   // the error was found in. Only available in 2.2.0+
// }
Vue.config.warnHandler = function (msg, vm, trace) {
  console.warn(msg, vm, trace);
  // `trace` is the component hierarchy trace
}

import { store } from './VuexSession'
import config from '../config/customConfig'


new Vue({
  el: '#app',
  //render: h => h(App),
  router,
  store,
  template: '<App/>',
  components: { App }
})
console.log('Domain Name:', config.user_auth)
var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId : process.env.accesskey,
  secretAccessKey : process.env.secretkey
});
AWS.config.region = 'us-west-2';

