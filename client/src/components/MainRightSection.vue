<template>
  <div>
    <slot name="subtask">
      <child-task :id="todoObject.level" :pholder="subtaskPholder" :todoObject="todoObject" :a="todoObject"></child-task>
    </slot>
  </div>
  <story-feed :filteredTodo="todoObject"></story-feed>
</section>
  <div :class="todoObject.id" class="modal fade" role="dialog" aria-labelledby="myModalLabel2" style="display: none;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
         
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel2">Permanently Delete {{todoObject.taskName}}</h4>
        </div>
        <div class="modal-body">
          This will permanently delete the task and associated subtasks. These items will no longer be accessible to you or anyone else. This action is irreversible.
        </div>
        <div class="modal-footer">
          <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" data-dismiss="modal">Close</a>
          <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" data-dismiss="modal" @click="deletePermently(todoObject)">Delete</a>
        </div>
      </div>
    </div>
  </div>
</div>
<right-footer v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState'" :filteredTodo="todoObject"></right-footer>
</div>
</template> 
<script>
  /* eslint-disable*/
  import Vue from 'vue'
  import ChildTask from './ChildTask.vue'
  import MainLeftSection from './MainLeftSection.vue'
  import TextDescription from './TextDescription.vue'
  import RightFooter from './RightFooter.vue'
  import HistoryLog from './HistoryLog.vue'
  import RightToolbar from './RightToolbar.vue'
  import Attachments from './Attachments.vue'
  import StoryFeed from './StoryFeed.vue'
  import Statuses from './Statuses.vue'
  import * as services from '../services'
  import Tags from './Tags.vue'
  import { mapGetters } from 'vuex'
  import iView from 'iview';
  import 'iview/dist/styles/iview.css';
  import CmnFunc from './CommonFunc.js'
  import * as Constant from './Constants.js'
  import AsyncComputed from 'vue-async-computed'

Vue.use(iView);

export default {
  props: ['pholder', 'todoObject', 'id'],
  data: function () {
    return {
        todolistSubTasks: [],
    }
  },
  created() {
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
   methods:{
    undelete: function () {
        this.$store.dispatch('undelete', this.todoObject)
    },
    deletePermently:function() {
      this.$store.dispatch('deletePermently', this.todoObject)
    }
  },
   watch: {
    // whenever question changes, this function will run
    todolistSubTasks: function (newQuestion) {
    }
  },
  computed: {
    ...mapGetters({
      todoById: 'getTodoById',
      typeStateList :'getTask_types_state'
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
              updatedAt: new Date().toJSON(),
              project_id:this.$store.state.currentProjectId
       })
       this.todolistSubTasks = taskArray
       return taskArray
     },
     showAttachment() {
      //  console.log('show attachment', this.$store.state.arrAttachment.length)
        return this.$store.state.arrAttachment.length > 0 ? true : false
     }
    },
    asyncComputed: {
      async showAttachment() {
        this.manageAttachmentDeletePermission()
        
        if (this.isCreatePermission){
          return this.checkAttachmentExistance()
        }
         //check attachment for only  read permission.
        let isReadPermission = await this.manageAttachmentReadPermission()
        if (isReadPermission) {
          console.log('inside read permission')
          //check whether attachment array has value or not
          return this.checkAttachmentExistance()
        } else {
          console.log('read permission false:', isReadPermission)
          //this.attchmentReadPerm = false
          return false
        }
        // return this.$store.state.arrAttachment.length > 0 ? true : false
      }
    },
    components: {
      // RightFooter,
      // MainLeftSection,
      // TextDescription,
      // RightToolbar,
      // Attachments,
      // StoryFeed,
      // Tags,
      // Statuses,
      // HistoryLog
      ChildTask
    }
}
</script>
