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

  // created(){
  //   var url = window.location.href;
  //   console.log('URL', url);
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
