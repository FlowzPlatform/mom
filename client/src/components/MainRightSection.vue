<template>
<div class="rightsection-view">
<div class="DropTargetAttachment">
<section class="todoapp right_bar">
  <right-toolbar :filteredTodo="todoObject"></right-toolbar>
   <div class="taskbarsect">
  <div v-if="todoObject.isDelete" class="MessageBanner MessageBanner--error MessageBanner--medium TaskUndeleteBanner TaskMessageBanner">
    <span class="fa fa-trash-o"  style="margin-right: 10px"/>
		<span class="TaskUndeleteBanner-message">This task is deleted.</span>
	  <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" @click="undelete(todoObject)">Undelete</a>
		<a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" data-toggle="modal" :data-target="'.'+todoObject.id">Delete Permanently</a>
    <!--<a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" @click="deletePermently(todoObject)">Delete Permanently</a>-->
    <!--@click="deletePermently(todoObject)"-->
		<noscript></noscript>
	</div>
  
	<text-description :filteredTodo="todoObject">
  </text-description>
  <collapse class="CollapseView">
    <panel v-show='showAttachment'>
      Attachments
      <p class='PanelAttach' slot="content">
        <attachments :filteredTodo="todoObject"> </attachments>
      </p>
    </panel>
    <panel>
      Tags
      <p class='PanelTag' slot="content">
        <tags :filteredTodo="todoObject"></tags>
      </p>
    </panel>
  </collapse>
  <!--<attachments :filteredTodo="todoObject"> </attachments>-->
  <!--<div class="well well-sm expand-collapse" data-toggle="collapse" data-target="#attachment">Attachments</div>-->
  <!--<button type="button" class="btn btn-info button-collapse" data-toggle="collapse" data-target="#attachment">Attachents</button>-->
  <!--<attachments id="attachment" class="collapse" :filteredTodo="todoObject"> </attachments>-->
   <!--<hr>-->
  <!--<div class="well well-sm expand-collapse" data-toggle="collapse" data-target="#tags">Tags</div>-->
  <!--<button type="button" class="btn btn-info button-collapse" data-toggle="collapse" data-target="#tags">Tags</button>
  <tags id="tags" class="collapse" :filteredTodo="todoObject"></tags>-->
  <!--<tags :filteredTodo="todoObject"></tags>-->
  <main-left-section v-if="!$store.state.deleteItemsSelected" :pholder="pholder" :filtered-todos="taskById" ></main-left-section>
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
<right-footer :filteredTodo="todoObject"></right-footer>
</div>
</template> 
<script>
  /* eslint-disable*/
import Vue from 'vue'
import MainLeftSection from './MainLeftSection.vue'
import TextDescription from './TextDescription.vue'
import RightFooter from './RightFooter.vue'
import RightToolbar from './RightToolbar.vue'
import Attachments from './Attachments.vue'
import StoryFeed from './StoryFeed.vue'
import Tags from './Tags.vue'
import { mapGetters } from 'vuex'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

export default {
  props: ['pholder', 'todoObject'],
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
              updatedAt: new Date().toJSON(),
              project_id:this.$store.state.currentProjectId
       })
       this.todolistSubTasks = taskArray
       return taskArray
     },
     showAttachment() {
       console.log('show attachment', this.$store.state.arrAttachment.length)
        return this.$store.state.arrAttachment.length > 0 ? true : false
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
