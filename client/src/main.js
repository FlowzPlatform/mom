// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Login from './components/LoginPage.vue'
import mainApp from './components/MainApp.vue'
import App from './App.vue'
import './style/style.css'
import './style/newStyle.css'
import './style/keen-ui.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

import { store } from './VuexSession'
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
/* eslint-disable no-new */

const routes = [
     {path: '/', meta: { Auth: false }, component: Login},
     {path: '/main-app', meta: { Auth: true }, component: mainApp}
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Auth)) {
    // console.log('auth.status: ' + store.state.isAuthorized)
    if (!store.state.isAuthorized) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
