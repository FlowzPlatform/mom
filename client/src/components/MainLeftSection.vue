<template>
	<section class="main" v-cloak>
		<ul class="todo-list">
      <draggable v-model="filteredTodos" @end="onDragEnd">
        <transition-group name="list-complete">
			    <todo-item v-model="filteredTodos" v-on:eventUpdatedIndex="getUpdatedIndex" :pholder="pholder" v-for="(todo, ind) in filteredTodos" :todo="todo" :index="eventIndex" :eventIndexR="ind" :filteredTodos="filteredTodos" v-bind:key="todo" class="list-complete-item">
          </todo-item>
        </transition-group>
      </draggable> 
		</ul>
	</section>
</template>

<script>
	/* eslint-disable*/
import store from './store.js'
import TodoItem from './TodoItem.vue'
import Vue from 'vue'
import Resource from 'vue-resource'
import draggable from 'vuedraggable'
Vue.use(Resource)
export default {
  props: ['filteredTodos', 'eventIndex', 'pholder'],
  data: function () {
    return {
    }
  },
  components: {
    TodoItem,
    draggable
  },
  methods: {
    onDragEnd () {
      console.log('Drag todo', this.filteredTodos)
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
    getUpdatedIndex (index) {
      this.$parent.eventIndex = index
    }
  }
}
</script>
