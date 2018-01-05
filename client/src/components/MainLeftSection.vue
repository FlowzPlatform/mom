<template>
  <section class="main" v-cloak>
    <task-heading v-if="isCopyLink" :id="id" :filteredTodo="todoObject"></task-heading>
    <text-description v-if="isCopyLink" :filteredTodo="todoObject">
    </text-description>
    <!-- <attachments v-if="isCopyLink && $store.state.arrAttachment.length > 0" :filteredTodo="todoObject"> </attachments>
    <tags v-if="isCopyLink && $store.state.taskTags.length > 1" :filteredTodo="todoObject"></tags> -->
      <ul class="todo-list main">
      <draggable v-model="filteredTodos" @end="onDragEnd">
        <transition-group name="list-complete">
          <todo-item :id="id" v-for="(todo, ind) in filteredTodos" :prevIndex="getPrevToDo(ind)" :todo="todo" :pholder="pholder" :nextIndex="getNextToDo(ind)"
            v-bind:key="todo.id" :taskId="taskId" >
          </todo-item>
        </transition-group>
      </draggable>
    </ul>
  </section>
</template>

<script>
  /* eslint-disable*/
  import TodoItem from './TodoItem.vue'
  import TaskHeading from './TaskHeading.vue'
  import TextDescription from './TextDescription.vue'
  import Attachments from './Attachments.vue'
  import Tags from './Tags.vue'
  import Vue from 'vue'
  import Resource from 'vue-resource'
  import draggable from 'vuedraggable'
  import { mapActions } from 'vuex'
  Vue.use(Resource)
  export default {
    props: ['filteredTodos', 'pholder', 'todoObject', 'isCopyLink', 'id','taskId'],
    components: {
      TodoItem,
      draggable,
      TaskHeading,
      TextDescription,
      Attachments,
      Tags
    },
    methods: {
      onDragEnd() {
        this.$store.dispatch('dragTodo', this.filteredTodos)
      },
      getNextToDo(index) {
        if (index + 1 <= this.filteredTodos.length) {
          let nextId= this.filteredTodos[index + 1] ? this.filteredTodos[index + 1].id + "_" + this.filteredTodos[index].level : -1 + "_" + this.filteredTodos[index].level
          if(this.taskId)
            nextId+='_'+this.taskId
          return nextId
        } else {
          let nextId= -1 + "_" + this.filteredTodos[index].level
          if(this.taskId)
            nextId+='_'+this.taskId
          return nextId
        }
      },
      getPrevToDo(index) {
        if (index - 1 >= 0) {
          let nextId= this.filteredTodos[index - 1] ? this.filteredTodos[index - 1].id + "_" + this.filteredTodos[index].level : -1 + "_" + this.filteredTodos[index].level
          if(this.taskId)
            nextId+='_'+this.taskId
          return nextId
        }
      },
      async newTagPermission() {
        let permisionResult = await CmnFunc.checkActionPermision(this, typeId, Constant.USER_ACTION.TAG, Constant.PERMISSION_ACTION.CREATE)
        console.log("MainLeftSection permisionResult-->", permisionResult)
        return permisionResult;
      }
    }
  }

</script>