<template>
  <section class="main" v-cloak>
    <text-description v-if="isCopyLink" :filteredTodo="todoObject">
    </text-description>
    <attachments v-if="isCopyLink && $store.state.arrAttachment.length > 0" :filteredTodo="todoObject"> </attachments>
    <tags v-if="isCopyLink && $store.state.taskTags.length > 1" :filteredTodo="todoObject"></tags>
      <ul class="todo-list main">
      <draggable v-model="filteredTodos" @end="onDragEnd">
        <transition-group name="list-complete">
          <todo-item v-for="(todo, ind) in filteredTodos" :prevIndex="getPrevToDo(ind)"
         :todo="todo" :pholder="pholder" :nextIndex="getNextToDo(ind)" v-bind:key="todo">
          </todo-item>
        </transition-group>
      </draggable>
    </ul>
  </section>
</template>

<script>
  /* eslint-disable*/
  import TodoItem from './TodoItem.vue'
  import TextDescription from './TextDescription.vue'
  import Attachments from './Attachments.vue'
  import Tags from './Tags.vue'
  import Vue from 'vue'
  import Resource from 'vue-resource'
  import draggable from 'vuedraggable'
  import { mapActions } from 'vuex'
  Vue.use(Resource)
  export default {
    props: ['filteredTodos', 'pholder', 'todoObject', 'isCopyLink'],
    components: {
      TodoItem,
      draggable,
      TextDescription,
      Attachments,
      Tags
    },
    methods: {
      // ...mapActions([
      //   'dragTodo'
      // ]),
      onDragEnd() {
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
      getNextToDo(index) {
        
        if (index + 1 <= this.filteredTodos.length) {
          return this.filteredTodos[index + 1] ? this.filteredTodos[index + 1].id + "_" + this.filteredTodos[index].level : -1 + "_" + this.filteredTodos[index].level
        } else {
          return -1 + "_" + this.filteredTodos[index].level
        }
      },
      getPrevToDo(index){
      if(index-1>=0)
      {
        return this.filteredTodos[index-1] ? this.filteredTodos[index-1].id +"_"+this.filteredTodos[index].level : -1+"_"+this.filteredTodos[index].level
      }
      }
    }
  }

</script>