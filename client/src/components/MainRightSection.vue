<template>
<div class="">
<section class="todoapp right_bar">
  <right-toolbar :filtered-todos="{id, parentDueDate, index}"></right-toolbar>
	<text-description :filteredTodo="todoObject.todoArr" :eventIndex="eventIndex">
  </text-description>
  <main-left-section :pholder="pholder" :filtered-todos="taskById" :eventIndex="eventIndex" :parentIdArr="parentIdArr"></main-left-section>
</section>
<right-footer :filteredTodo="todoObject.todoArr"></right-footer>
</div>
</template> 
<script>
  /* eslint-disable*/
import store from './store.js'
import MainLeftSection from './MainLeftSection.vue'
import TextDescription from './TextDescription.vue'
import RightFooter from './RightFooter.vue'
import RightToolbar from './RightToolbar.vue'
import { mapGetters } from 'vuex'

export default {
  props: ['eventIndex','pholder','id', 'level', 'parentTaskName', 'parentTaskDesc', 'parentTaskComment', 'parentIdArr', 'parentDueDate', 'index', 'todoObject'],
  data: function () {
    return {
      sharedState: store.state,
    }
  },
  computed: {
    // filteredTodos: function () {
      //console.log('parent-todo-filteredTodos', this.filteredTodos)
      //  console.log('curent obj===>',this.level, "====", this.id, "===", this.parentTaskName, "==", this.parentTaskDesc, "==", this.parentTaskComment);
      //  this.$store.dispatch('getTodo', {'parentId':this.todoObject.id, 'currentLevel': this.todoObject.level})
      //  var todoList = store.state.todo1(this.todoObject.id, this.todoObject.level); 
      //  return todoList
    // }
    ...mapGetters({
      todoById: 'getTodoById'
     }),
     taskById(){
       let taskArray = this.todoById(this.id, this.level)
       taskArray.push({
              parentId: this.id,
              taskName: '',
              taskDesc: '',
              level: this.level+1,
              completed: false, 
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON()
       })
       return taskArray

     }
  },
  // watch:{
  //   parentIdArray(parentIdArr)
  //   {
  //     // console.log('ParentIds: ', parentIdArr)
  //     this.$parent.parentIdArr = this.parentIds
  //   }
  // },
  components: {
    RightFooter,
    MainLeftSection,
    TextDescription,
    RightToolbar
  }
}
</script>
