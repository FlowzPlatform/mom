<template>
	<footer class="footer">
		<span class="todo-count">
			<!-- <strong v-text="remaining"></strong>&nbsp;{{remaining | pluralize 'item'}} left -->
		</span>
		<ul class="filters">
			<li><a href="#/all" :class="{selected: sharedState.visibility == 'all'}" @click="showAllTodos">All</a></li>
			<li><a href="#/active" :class="{selected: sharedState.visibility == 'active'}" @click="showActiveTodos">Active</a></li>
			<li><a href="#/completed" :class="{selected: sharedState.visibility == 'completed'}" @click="showCompletedTodos">Completed</a></li>
		</ul>
		<button class="clear-completed" @click="removeCompletedTodos">
			Clear completed
		</button>
	</footer>
</template>
<script type="text/javascript">
import store from './store.js'
export default {
  data: function () {
    return {
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
