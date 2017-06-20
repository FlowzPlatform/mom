<template>
<div class="rightsection-view">
<div class="DropTargetAttachment">
<section class="todoapp right_bar">
  <right-toolbar :filteredTodo="todoObject"></right-toolbar>
	<text-description :filteredTodo="todoObject">
  </text-description>
  <attachments :filteredTodo="todoObject"> </attachments>
  <!--<div class="well well-sm expand-collapse" data-toggle="collapse" data-target="#attachment">Attachments</div>-->
  <!--<button type="button" class="btn btn-info button-collapse" data-toggle="collapse" data-target="#attachment">Attachents</button>-->
  <!--<attachments id="attachment" class="collapse" :filteredTodo="todoObject"> </attachments>-->
   <hr>
  <!--<div class="well well-sm expand-collapse" data-toggle="collapse" data-target="#tags">Tags</div>-->
  <!--<button type="button" class="btn btn-info button-collapse" data-toggle="collapse" data-target="#tags">Tags</button>
  <tags id="tags" class="collapse" :filteredTodo="todoObject"></tags>-->
  <tags :filteredTodo="todoObject"></tags>
  <main-left-section :pholder="pholder" :filtered-todos="taskById" ></main-left-section>
  <story-feed :filteredTodo="todoObject"></story-feed>
</section>
</div>
<right-footer :filteredTodo="todoObject"></right-footer>
</div>
</template> 
<script>
  /* eslint-disable*/
import MainLeftSection from './MainLeftSection.vue'
import TextDescription from './TextDescription.vue'
import RightFooter from './RightFooter.vue'
import RightToolbar from './RightToolbar.vue'
import Attachments from './Attachments.vue'
import StoryFeed from './StoryFeed.vue'
import Tags from './Tags.vue'
import { mapGetters } from 'vuex'

export default {
  props: ['pholder', 'todoObject'],
  data: function () {
    return {
        todolistSubTasks: []
    }
  },
  created() {
    console.log('MainRight created')
    // let self = this;
    //      socket.on('feed-change', function(item){
    //           //  console.log("TodoItem.vue:item***",item);
    //           //  console.log("Array",self.taskById)
    //            if(item.new_val){
    //              var result = $.grep(self.taskById, function(e){ return e.id == item.new_val.id; })
    //               if (result.length == 0) {
    //                 // console.log('Item Parent ID',item.new_val.parentId)
    //                 // console.log('Todo object Parent ID',self.todoObject)
    //                 if(item.new_val.parentId.length > 0 && (item.new_val.parentId == self.todoObject.id)){
    //                 self.taskById.push(item.new_val)
    //                 self.taskById.splice(self.taskById.length - 1, 0, item.new_val);
    //                 // self.$store.state.todolist.push(item.new_val)
    //                 }
    //               }else{
    //                 if(item.new_val.parentId.length > 0 && (item.new_val.parentId == self.todoObject.id)){
    //                 // console.log("Subtask Task Updated")
    //                 let index = _.findIndex(self.taskById,function(d){return d.id == item.new_val.id})
    //                 // console.log('Index of object', index)
    //                 if(index > -1){
    //                   self.taskById[index].taskName = item.new_val.taskName
    //                 }
    //               }
    //               } 
    //            }else if(item.old_val){
    //              // var index = self.taskById.indexOf(item.old_val);
    //              if(item.old_val.parentId.length > 0 && (item.old_val.parentId == self.todoObject.id)){
    //             //  console.log("Subtask Task Deleted")
    //             //  console.log('self.taskById',self.taskById)
    //             //  console.log('item.old_val',item.old_val)
    //              let index = _.findIndex(self.taskById,function(d){return d.id == item.old_val.id})
    //             //  console.log('Index of object', index)
    //              if(index > -1){
    //               self.taskById.splice(index, 1);
    //              }
    //              }
    //              //self.taskById.splice(index, 1);
    //            }
    //          })
  },
   watch: {
    // whenever question changes, this function will run
    todolistSubTasks: function (newQuestion) {
    }
  },
  computed: {
    ...mapGetters({
      todoById: 'getTodoById'
     }),
     taskById(){
       let taskArray = this.todoById(this.todoObject.id, this.todoObject.level)
       taskArray.push({
              id: '-1',
              parentId: this.todoObject.id,
              taskName: '', 
              taskDesc: '',
              level: this.todoObject.level+1,
              index: taskArray.length,
              completed: false, 
              dueDate:'',
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON()
       })
       this.todolistSubTasks = taskArray
       return taskArray
     }
  },
  components: {
    RightFooter,
    MainLeftSection,
    TextDescription,
    RightToolbar,
    Attachments,
    StoryFeed,
    Tags
  }
}
</script>
