<template>
  <div class="dropdown">
  <div class="dropdown pull-right">
    <button class="btn btn-defualt dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
    </button>
    <ul class="dropdown-menu">
        <li><a href="#/all" :class="{selected: sharedState.visibility == 'all'}" @click="showAllTodos">All</a></li>
        <li><a href="#/active" :class="{selected: sharedState.visibility == 'active'}" @click="showActiveTodos">Active</a></li>
        <li><a href="#/completed" :class="{selected: sharedState.visibility == 'completed'}" @click="showCompletedTodos">Completed</a></li>
      </ul>
  </div>
  </div>
</template>
<script>
/*eslint-disable*/
import store from './store.js'
export default {
  data() {
        return {
          selected: '',
          sharedState: store.state
        }
  },
  props: ['newtood'],
  computed: {
    remaining: function () {
      return store.filters.active(store.state.todos).length
    }
  },
  methods: {
    showAllTodos: function () {
      store.state.visibility = 'all'
    },
    showActiveTodos: function () {
      store.state.visibility = 'active'
    },
    showCompletedTodos: function () {
      store.state.visibility = 'completed'
    },
    removeCompletedTodos: function () {
      store.removeCompletedTodos()
    }
  }
}
</script>
