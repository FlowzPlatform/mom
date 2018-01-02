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
import '../style/style.css'
import '../style/style1.css'
import '../style/newStyle.css'
import '../style/keen-ui.min.css'
import '../style/theme1.css'
// import '../style/theme2.css'
// import '../style/theme3.css'
// import '../style/theme4.css'
// import '../style/theme5_black.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GSignInButton from 'vue-google-signin-button';
import { Tag } from 'element-ui'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// RANDOM_CSS.printlinktag();
Vue.config.productionTip = false
Vue.use(GSignInButton)
Vue.use(Tag)
// Vue.use(iView);
// import { store } from '../VuexSession'


Vue.use(Router)

const User = {
  template: `
    <div><navbar /><section class="section"><div class="container is-fluid"><router-view></router-view></div></section></div>
  `
}
var RANDOM_CSS = {
  cssfiles : ['theme1.css','theme2.css','theme3.css','theme4.css','theme5_black.css'],
  pathtocss : '../style/',
  getrandomcss : function() { return this.cssfiles[Math.floor(Math.random()*this.cssfiles.length)]; },
  getlinktag : function() { return '<link rel="stylesheet" type="text/css" href="'+this.pathtocss+this.getrandomcss()+'" />'; },
  printlinktag : function() { document.write(this.getlinktag()); }
};
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

