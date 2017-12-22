<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>    
  </div>
</template>

<script>
/* eslint-disable*/
export default {
  name: 'app',

  created (){
    // if(this.$session.get('auth_token')){
    //   this.$router.push('/');
    // }
    if(this.$cookie.get('auth_token')){
      let isCopyLink = false;  
      let url = window.location.href;
      if (url.indexOf('task') > -1) {
        isCopyLink = true
      }
      console.log('Copytask URL:', isCopyLink)
      if(!isCopyLink)
        this.$router.push('/navbar/mainapp');
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
