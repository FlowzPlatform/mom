// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Login from './components/LoginPage.vue'
import mainApp from './components/MainApp.vue'
// import hello from './components/Hello.vue'
import App from './App.vue'
import './style/style.css'
import './style/newStyle.css'
import './style/keen-ui.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

/* eslint-disable no-new */

const routes = [
    {path: '/', component: Login},
    {path: '/main-app', component: mainApp}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// new Vue({app, router})
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
