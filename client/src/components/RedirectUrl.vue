<template>
    <h1> Redirect URL</h1>
</template>

<script>
  /* eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default {
  data: function () {
    return {
    }
  },
  created()
  {
     var url = window.location.href;
     console.log('Nav-URL', url);
    this.$router.replace('/navbar/mainapp')
  }
}
</script>