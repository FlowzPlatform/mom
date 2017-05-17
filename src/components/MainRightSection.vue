<template>
<div class="">
<section class="todoapp right_bar">
  <right-toolbar></right-toolbar>
	<text-description  :filteredTodo="{id, parentTaskName, parentTaskDesc}" :eventIndex="eventIndex">
  </text-description>
  <main-left-section :pholder="pholder" :filtered-todos="filteredTodos" :eventIndex="eventIndex" :parentIdArr="parentIdArr"></main-left-section>
</section>
<right-footer :filteredTodo="{id, parentTaskComment}"></right-footer>
</div>
</template> 
<script>
  /* eslint-disable*/
import store from './store.js'
import MainLeftSection from './MainLeftSection.vue'
import TextDescription from './TextDescription.vue'
import RightFooter from './RightFooter.vue'
import RightToolbar from './RightToolbar.vue'

export default {
  props: ['eventIndex','pholder','filteredTodos','id', 'level', 'parentTaskName', 'parentTaskDesc', 'parentTaskComment', 'parentIdArr'],
  data: function () {
    return {
      sharedState: store.state,
    }
  },
  computed: {
    filteredTodos: function () {
       console.log('curent obj===>',this.level, "====", this.id, "===", this.parentTaskName, "==", this.parentTaskDesc, "==", this.parentTaskComment);
       var todoList = store.state.todo1(this.id, this.level); 
       return todoList
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
