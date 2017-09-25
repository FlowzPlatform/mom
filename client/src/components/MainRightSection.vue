<template>
  <div class="rightsection-view" :id="id">
    <div class="DropTargetAttachment">
      <section class="todoapp right_bar">
        <right-toolbar :subTasksArray="todolistSubTasks" v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState' " :filteredTodo="todoObject"></right-toolbar>
        <div class="taskbarsect">
          <div v-if="todoObject.isDelete" class="MessageBanner MessageBanner--error MessageBanner--medium TaskUndeleteBanner TaskMessageBanner">
            <span class="fa fa-trash-o" style="margin-right: 10px" />
            <span class="TaskUndeleteBanner-message">This task is deleted.</span>
            <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" @click="undelete(todoObject)">Undelete</a>
            <a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" data-toggle="modal" :data-target="'.'+todoObject.id">Delete Permanently</a>
            <!--<a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" @click="deletePermently(todoObject)">Delete Permanently</a>-->
            <!--@click="deletePermently(todoObject)"-->
            <noscript></noscript>
	        </div>
      	<text-description :id="id" :filteredTodo="todoObject"></text-description>
        <collapse v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState'" class="CollapseView">
          <panel v-show='showAttachment'>
            Attachments
            <p class='PanelAttach' slot="content">
              <attachments :filteredTodo="todoObject" :isDeleteAttachment="chkAttachment"></attachments>
            </p>
          </panel>
          <panel v-show="isTagReadPermission">
            Tags
            <p class='PanelTag' slot="content">
              <tags :filteredTodo="todoObject"></tags>
            </p>
          </panel>
        </collapse>
        <statuses :selectedState="typeStateList" :filteredTodo="todoObject" :id="id"></statuses>
        <!--<attachments :filteredTodo="todoObject"> </attachments>-->
        <!--<div class="well well-sm expand-collapse" data-toggle="collapse" data-target="#attachment">Attachments</div>-->
        <!--<button type="button" class="btn btn-info button-collapse" data-toggle="collapse" data-target="#attachment">Attachents</button>-->
        <!--<attachments id="attachment" class="collapse" :filteredTodo="todoObject"> </attachments>-->
        <!--<hr>-->
        <!--<div class="well well-sm expand-collapse" data-toggle="collapse" data-target="#tags">Tags</div>-->
        <!--<button type="button" class="btn btn-info button-collapse" <data-togg></data-togg>le="collapse" data-target="#tags">Tags</button>
        <tags id="tags" class="collapse" :filteredTodo="todoObject"></tags>-->
          <!--<tags :filteredTodo="todoObject"></tags>-->
          <main-left-section v-if="!$store.state.deleteItemsSelected && id !== 'rightTaskTypes' && id !== 'rightTaskState'" :pholder="pholder"
            :filtered-todos="taskById"></main-left-section>
          <history-log  :taskId="todoObject.id" :historyLog="historyLog"></history-log>
        </div>
        <story-feed v-show="readCommentBox" :filteredTodo="todoObject"></story-feed>
      </section>
      <div :class="todoObject.id" class="modal fade" role="dialog" aria-labelledby="myModalLabel2" style="display: none;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 class="modal-title" id="myModalLabel2">Permanently Delete {{todoObject.taskName}}</h4>
            </div>
            <div class="modal-body">  
              This will permanently delete the task and associated subtasks. These items will no longer be accessible to you or anyone
              else. This action is irreversible.
            </div>
            <div class="modal-footer">
              <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" data-dismiss="modal">Close</a>
              <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" data-dismiss="modal" @click="deletePermently(todoObject)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <right-footer v-show="createCommentBox" v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState'" :filteredTodo="todoObject"></right-footer>
  </div>
</template>
<script>
  /* eslint-disable*/
  import Vue from 'vue'
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
  Vue.use(AsyncComputed);

  export default {
    props: ['pholder', 'todoObject', 'id',],
    data: function () {
      return {
        todolistSubTasks: [],
        createCommentBox: true,
        readCommentBox: true,
        historyLog: [],
        isDelete: false,
        chkAttachment: false,
        attchmentReadPerm: false,
        isCreatePermission: false,
        isTagReadPermission : false
      }
    },
    created: function () {
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
      this.manageAttachmentCreatePermission();
      this.tagReadPermission();
     this.tagNewPermission();
    },
    methods: {
      undelete: function () {
        this.$store.dispatch('undelete', this.todoObject)
      },
      deletePermently: function () {
        this.$store.dispatch('deletePermently', this.todoObject)
      },
      async onReadComment(id, level, created_by, typeId) {
        let permisionResult = await CmnFunc.checkActionPermision(this, typeId, Constant.USER_ACTION.COMMENT, Constant.PERMISSION_ACTION.READ)
        console.log("permisionResult Read Comment-->", permisionResult)
        if (!permisionResult && id != -1) {
          this.readCommentBox = false
        } else {
          this.readCommentBox = true
        }
      },
      async onCreateComment(id, level, created_by, typeId) {
        let permisionResult = await CmnFunc.checkActionPermision(this, typeId, Constant.USER_ACTION.COMMENT, Constant.PERMISSION_ACTION.CREATE)
        console.log("permisionResult Create Comment-->", permisionResult)
        if (!permisionResult && id != -1) {
          this.createCommentBox = false
        } else {
          this.createCommentBox = true
        }
      },
      userDetail(deletedTasks) {
        deletedTasks.forEach(function (c) {
          let userId = c.assigned_to
          let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
          if (userIndex < 0) {
          } else {
            c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
              c.email = this.$store.state.arrAllUsers[userIndex].email
          }
        }, this)

      },
      async manageAttachmentDeletePermission() {
        this.chkAttachment = await CmnFunc.checkActionPermision(this, this.todoObject.type_id, Constant.USER_ACTION.ATTACHEMENT, Constant.PERMISSION_ACTION.DELETE, "attachment")
      },
      async manageAttachmentReadPermission() {
        return await CmnFunc.checkActionPermision(this, this.todoObject.type_id, Constant.USER_ACTION.ATTACHEMENT, Constant.PERMISSION_ACTION.READ, "attachment")
      },
      manageAttachmentCreatePermission: async function () {
        this.isCreatePermission = await CmnFunc.checkActionPermision(this, this.todoObject.type_id, Constant.USER_ACTION.ATTACHEMENT, Constant.PERMISSION_ACTION.CREATE, "attachment")

      },
      checkAttachmentExistance() {
        let attachmentArray = _.find(this.$store.state.arrAttachment, ['task_id', this.todoObject.id]);
        let isAttachmentExist = false
        if (attachmentArray) {
          isAttachmentExist = true
        } else {
          isAttachmentExist = false
        }
        return isAttachmentExist
      },
      async tagReadPermission() {
            this.isTagReadPermission = await CmnFunc.checkActionPermision(this, this.todoObject.type_id, Constant.USER_ACTION.TAG, Constant.PERMISSION_ACTION.READ)
            console.log("Tag read permission:", this.isTagReadPermission)
      },
      async tagNewPermission() {
            this.isTagReadPermission = await CmnFunc.checkActionPermision(this, this.todoObject.type_id, Constant.USER_ACTION.TAG, Constant.PERMISSION_ACTION.CREATE)
            console.log("Tag create permission:", this.isTagReadPermission)
      }
    },
    watch: {
      // whenever question changes, this function will run
      todolistSubTasks: function (newQuestion) {
      },
      todoObject: function () {
        this.$store.dispatch('findHistoryLog', this.todoObject.id)
      },
      getReadPermissionValue: function(newPermission){
            console.log("watcher method call");
            // this.createPermission = this.$store.state.accessRight;
            this.tagReadPermission();
      }
    },
    computed: {
      ...mapGetters({
        todoById: 'getTodoById',
        typeStateList: 'getTask_types_state'
      }),
      taskById() {
        this.onReadComment(this.todoObject.id, this.todoObject.level, this.todoObject.created_by, this.todoObject.type_id)
        this.onCreateComment(this.todoObject.id, this.todoObject.level, this.todoObject.created_by, this.todoObject.type_id)
        let taskArray = this.todoById(this.todoObject.id, this.todoObject.level)
        taskArray.push({
          id: '-1',
          parentId: this.todoObject.id,
          taskName: '',
          taskDesc: '',
          level: this.todoObject.level + 1,
          index: taskArray.length,
          completed: false,
          dueDate: '',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
          project_id: this.$store.state.currentProjectId
        })
        this.todolistSubTasks = taskArray
        this.userDetail(this.todolistSubTasks)
        return taskArray
      },
      showAttachment() {
      //  console.log('show attachment', this.$store.state.arrAttachment.length)
        return this.$store.state.arrAttachment.length > 0 ? true : false
      },
      getReadPermissionValue(){
            return this.$store.state.accessRight;
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
      RightFooter,
      MainLeftSection,
      TextDescription,
      RightToolbar,
      Attachments,
      StoryFeed,
      Tags,
      Statuses,
      HistoryLog
    }
  }
</script>