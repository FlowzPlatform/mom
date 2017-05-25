<template>
<div class="">
<section class="todoapp right_bar">
  <right-toolbar :filteredTodo="todoObject"></right-toolbar>
	<text-description :filteredTodo="todoObject" :eventIndex="eventIndex">
  </text-description>
  <main-left-section :pholder="pholder" :filtered-todos="taskById" :eventIndex="eventIndex" ></main-left-section>
</section>
<right-footer :filteredTodo="todoObject"></right-footer>
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
  props: ['eventIndex','pholder', 'index', 'todoObject'],
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      todoById: 'getTodoById'
     }),
     taskById(){
       let taskArray = this.todoById(this.todoObject.id, this.todoObject.level)
       taskArray.push({
              parentId: this.todoObject.id,
              taskName: '',
              taskDesc: '',
              level: this.todoObject.level+1,
              completed: false, 
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON()
       })
       return taskArray
     }
  },
  components: {
    RightFooter,
    MainLeftSection,
    TextDescription,
    RightToolbar
  }
}
</script>
