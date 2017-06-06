<template>
	<section class="main" v-cloak>
		<ul class="todo-list">
      <draggable v-model="filteredTodos" @end="onDragEnd">
        <transition-group name="list-complete">
			    <todo-item v-for="(todo, ind) in filteredTodos" :todo="todo" :pholder="pholder"  v-bind:key="todo">
          </todo-item>
        </transition-group>
      </draggable> 
		</ul>
	</section>
</template>

<script>
	/* eslint-disable*/
import TodoItem from './TodoItem.vue'
import Vue from 'vue'
import Resource from 'vue-resource'
import draggable from 'vuedraggable'
Vue.use(Resource)
export default {
  props: ['filteredTodos', 'pholder'],
  components: {
    TodoItem,
    draggable
  },
  methods: {
    onDragEnd () {
      // console.log('Drag todo', this.filteredTodos)
      for(var i=0; i < this.filteredTodos.length-1 ; i++)
      {
        if(this.filteredTodos[i].id)
        {
          this.$http.post('/updatetasks', {
                  id: this.filteredTodos[i].id,
                  index: i
              }).then(response => {
                // console.log('task updated', response.data)
          })
        }
      }
    },
  }
}
</script>
