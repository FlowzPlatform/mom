<template>
  <div class="dropdown">
  <div class="dropdown pull-right">
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
