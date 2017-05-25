<template>
  <div class="dropdown">
  <div class="dropdown pull-right">
    <button class="btn btn-defualt glyphicon glyphicon-cog" type="button" data-toggle="dropdown"></button>
    <ul class="dropdown-menu">
        <li><a href="#/active" :class="{selected: sharedState.visibility == 'active'}" @click="showActiveTodos">Incomplete Tasks</a></li>
        <li><a href="#/completed" :class="{selected: sharedState.visibility == 'completed'}" @click="showCompletedTodos">Completed Tasks</a></li>
        <li><a href="#/all" :class="{selected: sharedState.visibility == 'all'}" @click="showAllTodos">All Tasks</a></li>
      </ul>
  </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  data() {
        return {
          selected: '',
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
