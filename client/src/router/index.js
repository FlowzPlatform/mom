/* eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import Login from'@/components/LoginPage'
// const Login = () => import('../components/LoginPage.vue')
import MainApp  from '@/components/ContainerComponent'
import RoleAccess  from '@/components/RoleAccess'
import navbar  from '@/components/navbar'
import ShowTaskTypes  from '@/components/ShowTaskTypes'
import SocialAuth  from '@/components/SocialAuthProcess'
import LoadProcess  from '@/components/LoadProcess'
import ResetPassword  from '@/components/ResetPassword'
import '../style/style.css'
import '../style/style1.css'
import '../style/newStyle.css'
import '../style/keen-ui.min.css'
import '../style/theme1.css'
import '../style/custom.css'
// import '../style/theme2.css'
// import '../style/theme3.css'
// import '../style/theme4.css'
// import '../style/theme5_black.css'
// import '../style/theme6.css'
// import '../style/RepublicDay18.css'
import '../style/mediaStyle.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GSignInButton from 'vue-google-signin-button';
import { Tag } from 'element-ui'
Vue.config.productionTip = false
Vue.use(GSignInButton)
Vue.use(Tag)

Vue.use(Router)

const User = {
  template: `
    <div><navbar /><section class="section"><div class="container is-fluid"><router-view></router-view></div></section></div>
  `
}
var link = [];
link[0] = "theme1.css";
link[1] = "theme2.css";
link[2] = "theme5_black.css";

$(window).bind("load", function(){
  // var style = link[Math.floor(Math.random() * link.length )];
  // console.log("Load css", style)
  // $('head').append('<link rel="stylesheet" type="text/css" href="'+ style +'">')
  importStyle(["src/style/" +link[Math.round(Math.random() * (link.length -1))]])
})
function importCss(t){
  var n = document.createElement("link");
  n.rel = "stylesheet",
  n.type = "text/css",
  n.href = t,
  console.log(n)
  document.body.appendChild(n) 
}
function importStyle(t){
  t.forEach(importCss)
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { Auth: false }
    },
    {
      path: '/socialAuth',
      name: 'SocialAuth',
      component: SocialAuth
    },
    {
      path: '/loadProcess',
      name:'LoadProcess',
      component: LoadProcess
    },
    {
      path: '/resetpassword',
      name:'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/navbar/task/:level/:id',
      //query: {id:''},
      name: 'copytask',
      component: MainApp,
    },
    {
      path: '/navbar',
      name: 'Navbar',
      //   template: '<div><section class="section"><div class="container is-fluid"><router-view></router-view></div></section></div>',
      component: navbar,
      meta: { Auth: false },
      children: [
        {
          path: 'mainapp',
          name: 'MainApp',
          component: MainApp,
        },       
        {
          path: 'roleaccess',
          name: 'RoleAccess',
          component: RoleAccess
        }
      ]
    }
  ]
})

