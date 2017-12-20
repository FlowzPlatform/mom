<template>
  <div class="dropdown">
  <div class="dropdown pull-right setColor">
    {{$store.state.visibility | capitalize}} Tasks
    <button class="btn btn-defualt glyphicon glyphicon-cog" type="button" data-toggle="dropdown"></button>
    <ul class="dropdown-menu">
        <li v-for="(val, key) in filters">
          <a :href="'#/' + key"
            @click="changeFilters(key)" >{{key | capitalize}}</a>
        </li>
      </ul>
  </div>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapMutations } from 'vuex'
export default {
  data() {
        return {
        }
  },
  props: ['filters'],
  methods: {
      ...mapMutations([
       'changeFilters'
     ])
  },
  filters: {
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>
<style>
 /* .dropdown.pull-right.open > ul::before {
    -webkit-transform: scale3d(1,1,1);
    transform: scale3d(1,1,1);
    -webkit-transition: none;
    transition: none;
    -webkit-animation: expand 0.6s ease-out;
    animation: expand 0.6s ease-out;
}

.dropdown.pull-right > ul::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-transform: scale3d(1,0,1);
    transform: scale3d(1,0,1);
    background: #fff;
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
}
.dropdown.pull-right.open ul li {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    opacity: 1;
    -webkit-transition: none;
    transition: none;
    -webkit-animation: bounce 0.6s ease-out;
    animation: bounce 0.6s ease-out;
}
.dropdown.pull-right ul li {
    opacity: 0;
    -webkit-transform: translate3d(0,-25px,0);
    transform: translate3d(0,-25px,0);
    -webkit-transition: opacity 0.15s, -webkit-transform 0.15s;
    transition: opacity 0.15s, transform 0.15s;
} */
</style>