<template>
	<section class="main" v-cloak>
		<ul class="todo-list">
      <draggable v-model="filteredTodos" @end="onDragEnd">
        <transition-group name="list-complete">
			    <todo-item v-for="(todo, ind) in filteredTodos" :todo="todo" :pholder="pholder" :index="getNextToDo(ind)" v-bind:key="todo">
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
import { mapActions } from 'vuex'
Vue.use(Resource)
export default {
  props: ['filteredTodos', 'pholder'],
  components: {
    TodoItem,
    draggable
  },
  methods: {
    ...mapActions ([
      'dragTodo'
    ]),
    onDragEnd () {
      // console.log('Drag todo', this.filteredTodos)
      this.$store.dispatch('dragTodo', this.filteredTodos)
      // for(var i=0; i < this.filteredTodos.length-1 ; i++)
      // {
      //   if(this.filteredTodos[i].id)
      //   {
      //     this.$http.post('/updatetasks', {
      //             id: this.filteredTodos[i].id,
      //             index: i
      //         }).then(response => {
      //           // console.log('task updated', response.data)
      //     })
      //   }
      // }
    },
    getNextToDo(index){
      
      if(index+1<=this.filteredTodos.length)
      {
        return this.filteredTodos[index+1] ? this.filteredTodos[index+1].id +"_"+this.filteredTodos[index].level : -1+"_"+this.filteredTodos[index].level
      }else{
        return -1+"_"+this.filteredTodos[index].level
      }
    }
  }
}
</script>
