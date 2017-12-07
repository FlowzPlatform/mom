// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
// import Task from './Task.vue'
// import navbar from './components/navbar.vue'
// import Login from './components/LoginPage.vue'
// import MainApp from './components/MainApp.vue'
import router from './router'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
Vue.config.productionTip = false
/* eslint-disable*/
import { store } from './VuexSession'

// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)
/* eslint-disable no-new */

// const routes = [
//      {path: '/', meta: { Auth: false }, component: Login},
//      {path: '/main-app', meta: { Auth: true }, component: mainApp}
// ]
// const router = new VueRouter({
//   routes,
//   mode: 'history'
// })


// router.beforeEach((to, from, next) => {
//   // console.log('to ' , to)
//   // console.log('from ',from )
//   // console.log('next ', next)
//   console.log('window.location.href ', window.location.href)
//   if (to.matched.some(record => record.meta.Auth)) {
//     console.log('auth.status: ' + store.state.isAuthorized)
//     if (!store.state.isAuthorized) {
//       next({
//         path: '/',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
      
//     }
//   } else {
//     next()
//   }
// })

new Vue({
  el: '#app',
  // render: h => h(App),
  router,
  store,
  template: '<App/>',
  components: { App }
})

console.log('AWS===>',process.env.accesskey + "====="+ process.env.secretkey)
var AWS = require('aws-sdk');
console.log('AWS===>',AWS)
AWS.config.update({
  accessKeyId : process.env.accesskey,
  secretAccessKey : process.env.secretkey
});
AWS.config.region = 'us-west-2';

// new Vue({
//   el: '#task',
//   // render: h => h(App),
//   router,
//   store,
//   template: '<Task/>',
//   components: { Task }
// })
