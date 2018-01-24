<template>
  <div>
    <div :id="id" class="right_pannel" style="display: grid;">
       <Alert v-if="todoObject.isDelete" class="right-top-alert" type="error">
        <span slot="desc">
          <span class="deleteIcon">
            <Icon type="android-delete"></Icon>
          </span>
          <span class="TaskUndeleteBanner-message">This task is deleted.</span>
          <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" @click="undelete(todoObject)">Undelete</a>
          <a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" data-toggle="modal" :data-target="'.'+todoObject.id">Delete Permanently</a>
        </span>
      </Alert>
      <div class="tab-pannel" id="rightContainer" @mouseenter="handleOk">
        <task-heading :id="id" :filteredTodo="todoObject"></task-heading>
        <breadcrumb :filteredTodo="todoObject" v-if="id==='searchTask'"></breadcrumb>
        <div class="rightscroll">
          <component :is="currentView" :id="id" :taskId="todoObject.id" :historyLog="historyLog" :isDeleteAttachment="chkAttachment"
            :filteredTodo="todoObject" v-if="!$store.state.deleteItemsSelected && id !== 'rightTaskTypes' && id !== 'rightTaskState'"
            :pholder="pholder" :filtered-todos="taskById" :commentTaskId="todoObject.id">
          </component>
        </div>
        <task-priority :filteredTodo="todoObject"></task-priority>
        <estimated-hours :filteredTodo="todoObject"></estimated-hours>
      </div>
      <div class="nav_bottom">
        <div class="navbar-bottom" id="myNavbar">
          <a href="javascript:void(0)" id="#subtask" v-bind:class="selectedMenuIndex==0?activeClass:''" class="nav-tab" @click="subTaskShow">
            <Tooltip content="Task" placement="top-start">
              <svg class="Icon HamburgerIcon Topbar-sidebarToggleIcon" viewBox="0 0 32 32">
                <rect x="2" y="4" width="28" height="4"></rect>
                <rect x="2" y="14" width="28" height="4"></rect>
                <rect x="2" y="24" width="28" height="4"></rect>
              </svg>
            </Tooltip>
          </a>
          <!-- Assign task to user menu item -->
          <div class="assing-to-menu">
            <Tooltip content="Assignee" placement="top-start">
              <span style="float:left;margin-top:-3px">
                <div v-show="todoObject.email">
                  <avatar v-if="todoObject.image_url" :username="todoObject.email" :size="30" :src="todoObject.image_url"></avatar>
                  <avatar v-else  :username="todoObject.email" color='#fff' :size="30"></avatar>
                </div>
              </span>
              <Row>
                <Col span="2" style="padding-right:10px">
                  <Select not-found-text="No user found" placeholder="user" placement="top" :value="selectedUser" @on-change="userListClick"
                    filterable style="width:180px;z-index:99999">
                    <Option style="margin:5px" v-for="user in getUserList" :label="getListUserName(user)"
                      :value="user._id" :key="user._id">
                      <span>
                        <span style="float:left;margin-right:10px;margin-top:-8px;width: 30px; height: 30px; border-radius: 50%; text-align: center; vertical-align: middle;background:#ccc">
                          <div v-if="user.email">
                            <avatar v-if="user.image_url" :username="user.email" :size="30" :src="user.image_url"></avatar>
                            <avatar v-else color="white" :username="user.email" :size="30"></avatar>
                          </div>
                        </span>
                        {{getListUserName(user)}}
                      </span>
                    </Option>
                  </Select>
                </Col>
              </Row>
            </Tooltip>
          </div>
          <!-- Task type -->
          <div class="task-type-menu">
            <Select placement="top" :value="getTasTypeId" @on-change="btnTypeClicked" filterable style="width:150px;z-index:90">
              <Option style="margin:5px" v-for="task_type in getTaskTypes" :label="task_type.type" :value="task_type.id" :key="task_type.id">
                {{task_type.type}}
              </Option>
            </Select>
          </div>
          <!-- Task due date menu item -->
          <div :id="'calendar-'+id"  class="due-date">
            <Tooltip content="Due Date" placement="top-start">
              <DatePicker :options="options3" :open="open" confirm size="small" placement="top" type="date" :value="todoObject.dueDate" @on-change="dueDateClick"
                @on-clear="handleClear" @on-ok="handleOk">
                <a href="javascript:void(0)" @click="handleClick">
                  <Icon v-if="todoObject.dueDate === ''" class="nav-icon fa fa-calendar"></Icon>
                  <template v-if="todoObject.dueDate === ''"></template>
                  <template v-else>{{ todoObject.dueDate | formatDate}}</template>
                </a>
              </DatePicker>
            </Tooltip>
          </div>
          <!-- History -->
          <a :id="'history-'+id" href="javascript:void(0)"  v-bind:class="selectedMenuIndex==1?activeClass:''" class="nav-tab" @click="historyShow">
            <Tooltip content="History" placement="top-start">
              <i class="nav-icon fa fa-history" aria-hidden="true" style="font-size:20px"></i>
            </Tooltip>
          </a>
          <!-- Attchments -->
          <a :id="'attchment-'+id" href="javascript:void(0)"  v-bind:class="selectedMenuIndex==2?activeClass:''" class="nav-tab" @click="attachmentShow">
            <Tooltip content="Attachments" placement="top-start">
              <i class="nav-icon fa fa-paperclip" aria-hidden="true" style="font-size:20px"></i>
            </Tooltip>
          </a>
          <!-- Tags -->
          <a href="javascript:void(0)"  v-bind:class="selectedMenuIndex==3?activeClass:''" class="nav-tab hidden" @click="tagsShow">
            <Tooltip content="Tags" placement="top-start">
              <i class="nav-icon fa fa-tags" aria-hidden="true" style="font-size:20px"></i>
            </Tooltip>
          </a>
          <a :id="'comment-'+id" href="javascript:void(0)"  v-bind:class="selectedMenuIndex==4?activeClass:''" class="nav-tab" @click="commentsShow">
            <Tooltip content="Comments" placement="top-start">
              <i class="nav-icon fa fa-comments" aria-hidden="true" style="font-size:20px"></i>
            </Tooltip>
          </a>
          <div class="option">
            <Dropdown @on-click="moreActionMenuClick" trigger="click" placement="top">
              <a href="javascript:void(0)" @click="handleOpen" class="option-menu">
                <Tooltip content="More Actions" placement="top-start">
                  <i class="glyphicon glyphicon-option-horizontal" aria-hidden="true" style="font-size:22px"></i>
                </Tooltip>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="1">Tags</DropdownItem>
                <DropdownItem name="2" :data-target="'#taskPriority'+todoObject.id" data-toggle="modal">Task Priority</DropdownItem>
                <DropdownItem name="3">Copy Task URL</DropdownItem>
                <DropdownItem name="4">Delete Task</DropdownItem>
                <DropdownItem name="5" :data-target="'#estimateHr'+todoObject.id" data-toggle="modal">Estimated Hours</DropdownItem>
                <DropdownItem  :id="'comment-opt-'+id" style="display:none" name="6">Comments</DropdownItem>
                <DropdownItem  :id="'attchment-opt-'+id" style="display:none" name="7">Attachments</DropdownItem>
                <DropdownItem  :id="'history-opt-'+id" style="display:none" name="8">History</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="tab-container">
        </div>
      </div>
    </div>
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
            <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" data-dismiss="modal" @click="deletePermently">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable*/
  import Vue from "vue";
  import MainLeftSection from "./MainLeftSection.vue";
  import SubComment from "./SubComment.vue";
  import HistoryLog from "./HistoryLog.vue";
  import Attachments from "./Attachments.vue";
  import Tags from "./Tags.vue";
  import SubTask from "./SubTask.vue";
  import { mapMutations, mapGetters, mapActions } from "vuex";
  import iView from "iview";
  import "iview/dist/styles/iview.css";
  import CmnFunc from "./CommonFunc.js";
  import * as Constant from "./Constants.js";
  import AsyncComputed from "vue-async-computed";
  import Avatar from "vue-avatar/src/Avatar";
  import moment from "moment";
  import EstimatedHours from './EstimatedHours.vue'
  import TaskPriority from './TaskPriority.vue'
  import TaskHeading from './TaskHeading.vue'
  import config from '../../config/customConfig'
  import Breadcrumb from './Breadcrumb.vue'
  Vue.use(AsyncComputed);
  Vue.filter("formatDate", function (value) {
    if (value) {
      return moment(String(value)).format("MMM DD");
    }
  });
  function setIcon(currentView, id){
    if(currentView === SubTask){
        $('#'+id).addClass('fa fa-tasks')
        $('#'+id).removeClass('fa fa-history')
        $('#'+id).removeClass('fa fa-paperclip')
        $('#'+id).removeClass('fa fa-tags')
        $('#'+id).removeClass('fa fa-comments')
    } else if(currentView === HistoryLog) {
        $('#'+id).addClass('fa fa-history')
        $('#'+id).removeClass('fa fa-tasks')
        $('#'+id).removeClass('fa fa-paperclip')
        $('#'+id).removeClass('fa fa-tags')
        $('#'+id).removeClass('fa fa-comments')
    } else if(currentView === Attachments) {
        $('#'+id).addClass('fa fa-paperclip')
        $('#'+id).removeClass('fa fa-tasks')
        $('#'+id).removeClass('fa fa-history')
        $('#'+id).removeClass('fa fa-tags')
        $('#'+id).removeClass('fa fa-comments')
    } else if(currentView === Tags) {
        $('#'+id).addClass('fa fa-tags')
        $('#'+id).removeClass('fa fa-paperclip')
        $('#'+id).removeClass('fa fa-tasks')
        $('#'+id).removeClass('fa fa-history')
        $('#'+id).removeClass('fa fa-comments')
    } else if (currentView === SubComment) {
        $('#'+id).addClass('fa fa-comments')
        $('#'+id).removeClass('fa fa-paperclip')
        $('#'+id).removeClass('fa fa-tasks')
        $('#'+id).removeClass('fa fa-history')
        $('#'+id).removeClass('fa fa-tags')
    }
  }
  Vue.use(AsyncComputed);
  export default {
    props: ["pholder", "todoObject", "id"],
    data: function () {
      return {
        todolistSubTasks: [],
        createCommentBox: true,
        readCommentBox: true,
        historyLog: [],
        chkAttachment: false,
        attchmentReadPerm: false,
        isCreatePermission: false,
        isTagReadPermission: false,
        isTabContainerShow: false,
        currentView: SubTask,
        activeClass: "active",
        selectedMenuIndex: 0,
        previousUser: this.todoObject.assigned_to,
        userObj: "", // selected user object
        open: false,
        selectedType:this.todoObject.type_id,
        selectedIndex:-1,
        options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
      };
    },
    created: function () {
      this.manageAttachmentCreatePermission();
      this.tagReadPermission();
      this.tagNewPermission();
    },
    mounted(){
      setIcon(SubTask, this.id)
    },
    methods: {
      undelete: function () {
        this.$store.dispatch("undelete", this.todoObject);
      },
      moreActionMenuClick: function (val) {
        // Show Estimated tags val=1
        if (val == 1) {
          this.tagsShow()
        }
        // Show copy Url val=3
        else if (val == 3) {
          var $temp = $("<input>");
          $("body").append($temp);
          
          let copyTask;
          if(process.env.NODE_ENV == 'development')
            copyTask = process.env.COPY_URL_PATH
          else
            copyTask = config.copyUrlPath

          var url = copyTask + "/navbar/task/" + (this.todoObject.level + 1) + "/" + this.todoObject.id
          $temp.val(url).select();
          document.execCommand("copy");
          $temp.remove();
        }
        // Show delete dialog val=4
        else if (val == 4) {
          this.$Notice.open({
                    title: this.todoObject.taskName+' Deleted'
                });
          this.$store.dispatch("delete_Todo", this.todoObject);
        }
        // Show estimate hour val=5
        else if (val == 5) { 
          this.estimated_time = true
        }
        // Show comments val=6
        else if (val == 6) { 
          this.commentsShow()
        }
        // Show attachments val=7
        else if (val == 7) { 
          this.attachmentShow()
        }
        // Show history val=8
        else if (val == 8) { 
          this.historyShow()
        }

      },
      closeDialog() {
        this.estimated_time = false
        this.task_priority = false
      },
      deletePermently: function () {
        this.$store.dispatch("deletePermently", this.todoObject);
        this.$store.commit("CLOSE_DIV",this.todoObject)
      },
      getListUserName: function (user) {
        if (user.fullname && user.fullname.trim().length > 0) {
          return user.fullname;
        } 
        return user.email
      },
      async onReadComment(id, level, created_by, typeId) {
        let permisionResult = await CmnFunc.checkActionPermision(
          this,
          typeId,
          Constant.USER_ACTION.COMMENT,
          Constant.PERMISSION_ACTION.READ
        );
        if (!permisionResult && id != -1) {
          this.readCommentBox = false;
        } else {
          this.readCommentBox = true;
        }
      },
      async onCreateComment(id, level, created_by, typeId) {
        let permisionResult = await CmnFunc.checkActionPermision(
          this,
          typeId,
          Constant.USER_ACTION.COMMENT,
          Constant.PERMISSION_ACTION.CREATE
        );
        if (!permisionResult && id != -1) {
          this.createCommentBox = false;
        } else {
          this.createCommentBox = true;
        }
      },
      userDetail(deletedTasks) {
        deletedTasks.forEach(function (c) {
          let userId = c.assigned_to;
          let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) {
            return m._id === userId;
          });
          if (userIndex < 0) {
          } else {
              (c.image_url = this.$store.state.arrAllUsers[userIndex].image_url),
              (c.email = this.$store.state.arrAllUsers[userIndex].email);
          }
        }, this);
      },
      async manageAttachmentDeletePermission() {
        this.chkAttachment = await CmnFunc.checkActionPermision(
          this,
          this.todoObject.type_id,
          Constant.USER_ACTION.ATTACHMENT,
          Constant.PERMISSION_ACTION.DELETE,
          "attachment"
        );
      },
      async manageAttachmentReadPermission() {
        return await CmnFunc.checkActionPermision(
          this,
          this.todoObject.type_id,
          Constant.USER_ACTION.ATTACHMENT,
          Constant.PERMISSION_ACTION.READ,
          "attachment"
        );
      },
      manageAttachmentCreatePermission: async function () {
        this.isCreatePermission = await CmnFunc.checkActionPermision(
          this,
          this.todoObject.type_id,
          Constant.USER_ACTION.ATTACHMENT,
          Constant.PERMISSION_ACTION.CREATE,
          "attachment"
        );
      },
      checkAttachmentExistance() {
        let attachmentArray = _.find(this.$store.state.arrAttachment, [
          "task_id",
          this.todoObject.id
        ]);
        let isAttachmentExist = false;
        if (attachmentArray) {
          isAttachmentExist = true;
        } else {
          isAttachmentExist = false;
        }
        return isAttachmentExist;
      },
      async tagReadPermission() {
        this.isTagReadPermission = await CmnFunc.checkActionPermision(
          this,
          this.todoObject.type_id,
          Constant.USER_ACTION.TAG,
          Constant.PERMISSION_ACTION.READ
        );
      },
      async tagNewPermission() {
        this.isTagReadPermission = await CmnFunc.checkActionPermision(
          this,
          this.todoObject.type_id,
          Constant.USER_ACTION.TAG,
          Constant.PERMISSION_ACTION.CREATE
        );
      },
      subTaskShow() {
        this.selectedMenuIndex = 0;
        this.currentView = SubTask;
        setIcon(SubTask, this.id)
      },
      async attachmentShow() {
        $(".nav").removeClass("hidden");
        this.selectedMenuIndex = 2;
        this.currentView = Attachments;
        setIcon(Attachments, this.id)
        //call method getattachment from db 
        await this.$store.dispatch('getAttachmentFromDB', this.todoObject.id)
      },
      async tagsShow() {
        this.selectedMenuIndex = 3;
        this.currentView = Tags;
        setIcon(Tags, this.id)
        await this.$store.dispatch('getAllTaskTags', this.todoObject.id);
      },
      async historyShow() {
        this.selectedMenuIndex = 1;
        this.currentView = HistoryLog;
        setIcon(HistoryLog, this.id)
        await this.$store.dispatch('getHistoryFromDB', this.todoObject.id)
      },
      commentsShow() {
        this.selectedMenuIndex = 4;
        this.currentView = SubComment;
        setIcon(SubComment, this.id)
      },
      assignToShow() {
        this.selectedMenuIndex = 5;
      },
      handleOpen() {
        this.selectedMenuIndex = 5;
        $(".nav").addClass("hidden");
        this.open = false;
      },
      async setAssignUser(userId) {
        var user = _.find(this.$store.state.arrAllUsers, ["_id", userId]);
        this.todoObject.image_url = user.image_url
        this.todoObject.email = user.email

        if (user) {
          this.$store.dispatch("editTaskName", {
            todo: this.todoObject,
            assigned_by: this.$store.state.userObject._id,
            assigned_to: user._id,
            log_action: Constant.HISTORY_LOG_ACTION.TASK_ASSIGN,
            log_text: userId
          });
        }
      },
      dueDateClick(dateTo) {
        if(this.open){
          this.open = false;
          var selectedDate = moment(dateTo, "YYYY-MM-DD").format("DD");
            this.$store.dispatch("editTaskName", {
            todo: this.todoObject,
            selectedDate: dateTo,
            log_action: Constant.HISTORY_LOG_ACTION.DUE_DATE,
            log_text: dateTo
          });
          this.todoObject.dueDate = dateTo
        }
      },
      handleClick() {
        this.open = !this.open;
      },
      handleClear() {
        // this.open = false;
      },
      handleOk() {
        this.open = false;
      },
      /**
      * Selected user from assign user list
      */
      userListClick:async function (user_id) {
        if(this.selectedUser != user_id){
            this.setAssignUser(user_id)
            this.$store.commit('SHOW_DIV', this.todoObject)
        }
        
      },
      async btnTypeClicked(objType) {
        if(objType !== this.todoObject.type_id){
          await this.$store.dispatch('editTaskName', { "todo": this.todoObject, "selectedType": objType,"selectedState": null ,
              log_action:Constant.HISTORY_LOG_ACTION.TASK_TYPE, log_text:objType})
          // await this.$store.dispatch('editTaskName', { "todo": this.todoObject, "selectedState": '' })
        }
      },
      checkEmail(email){
        if(email && email !='null'){
          return CmnFunc.checkValidEmail(email)
        }
        return false
        // return (fullname && fullname.length>0) || (email && email.length>0 && CmnFunc.checkValidEmail(email))
      },
      displayComment(){
         $('#comment-'+this.id).css( "display", "block" );
         $('#comment-opt-'+this.id).css( "display", "none" );
      },
      hideComment(){
        $('#comment-'+this.id).css( "display", "none" );
        $('#comment-opt-'+this.id).css( "display", "block" );
      },
      displayAttchment(){
        $('#attchment-'+this.id).css( "display", "block" );
        $('#attchment-opt-'+this.id).css( "display", "none" );
      },
      hideAttchment(){
        $('#attchment-'+this.id).css( "display", "none" );
        $('#attchment-opt-'+this.id).css( "display", "block" );
      },
      displayHistory(){
        $('#history-'+this.id).css( "display", "block" );
        $('#history-opt-'+this.id).css( "display", "none" );
      },
      hideHistory(){
        $('#history-'+this.id).css( "display", "none" );
        $('#history-opt-'+this.id).css( "display", "block" );
      }

    },
    watch: {
      getIdArray:function(ids){
       let sectionWidth = 0
       	let containerWidth = ($(window).width())
        for (var id in ids) {
            //conversion of percentage into pixel(width) of section
            this.sectionWidth = (containerWidth * ids[id]) / 100
            if((this.id+1) == id){
                this.selectedIndex = this.id
              // Comment
                if(parseInt(this.sectionWidth) > 371  && parseInt(this.sectionWidth) < 442 ){
                  // Hide menu
                  this.hideComment()
                  // Show menu
                  this.displayAttchment()
                  this.displayHistory()

                }else if(parseInt(this.sectionWidth) > 333  && parseInt(this.sectionWidth) < 371 ){
                   // Hide menu
                  this.hideComment()
                  this.hideAttchment()
                  // Show menu
                  this.displayHistory()
                }else if(parseInt(this.sectionWidth) > 300  && parseInt(this.sectionWidth) < 333 ){
                   // Hide menu
                  this.hideComment()
                  this.hideAttchment()
                  this.hideHistory()
                  // Show menu
                }
                else if(parseInt(this.sectionWidth) > 0  && parseInt(this.sectionWidth) < 300 ){
                    // Hide menu
                  this.hideComment()
                  this.hideAttchment()
                  this.hideHistory()
                  this.hideCalendar()
                }else{
                  this.displayComment()
                  this.displayAttchment()
                  this.displayHistory()
                }

                  // When two sliptter section 
                  if(ids.length==2){
                    if(parseInt(this.sectionWidth) > 550  && parseInt(this.sectionWidth) < 663){
                        // Hide menu
                        this.hideComment()
                        // Show menu
                        this.displayAttchment()
                        this.displayHistory()
                        this.displayCalendar()
                      }else if(parseInt(this.sectionWidth) > 511 && parseInt(this.sectionWidth) < 550){
                        this.hideComment()
                        this.hideAttchment()
                        // Show menu
                        this.displayHistory()
                        this.displayCalendar()
                      }else if(parseInt(this.sectionWidth) > 446 && parseInt(this.sectionWidth) < 511){
                          // Hide menu
                        this.hideComment()
                        this.hideAttchment()
                        this.hideHistory()
                        // Show menu
                        this.displayCalendar()

                      }else if(parseInt(this.sectionWidth) > 350 && parseInt(this.sectionWidth) < 446){
                          // Hide menu
                        this.hideComment()
                        this.hideAttchment()
                        this.hideHistory()
                        this.hideCalendar()
                      }else if(parseInt(this.sectionWidth) > 250 && parseInt(this.sectionWidth) < 350){
                        console.log("call block 10")
                      }else{
                        this.displayComment()
                        this.displayAttchment()
                        this.displayHistory()
                        this.displayCalendar()
                      }                
                  }
                
                
            }
        }
      }
    },
    computed: {
      ...mapGetters({
        todoById: "getTodoById",
        typeStateList: "getTask_types_state",
        getUserList: "getAllUserList",
        // getTypes: 'getTaskTypeList'
        getIdArray:'getIdArray'
      }),
      getTaskTypes() {
        return this.$store.state.task_types_list.filter(type => type.id !== '-1')
      },
      getTasTypeId(){
          return this.todoObject.type_id
      },
      selectedUser(){
        return this.todoObject.assigned_to
      }, 
      taskById() {
        this.onReadComment(
          this.todoObject.id,
          this.todoObject.level,
          this.todoObject.created_by,
          this.todoObject.type_id
        );
        this.onCreateComment(
          this.todoObject.id,
          this.todoObject.level,
          this.todoObject.created_by,
          this.todoObject.type_id
        );
        let taskArray = this.todoById(this.todoObject.id, this.todoObject.level);
        taskArray.push({
          id: "-1",
          parentId: this.todoObject.id,
          taskName: "",
          taskDesc: "",
          level: this.todoObject.level + 1,
          index: taskArray.length,
          completed: false,
          dueDate: "",
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
          project_id: this.$store.state.currentProjectId
        });
        this.todolistSubTasks = taskArray;
        this.userDetail(this.todolistSubTasks);
        return taskArray;
      }
    },
    asyncComputed: {
      async showAttachment() {
        this.manageAttachmentDeletePermission();
        if (this.isCreatePermission) {
          return this.checkAttachmentExistance();
        }
        //check attachment for only  read permission.
        let isReadPermission = await this.manageAttachmentReadPermission();
        if (isReadPermission) {
          //check whether attachment array has value or not
          return this.checkAttachmentExistance();
        } else {
          //this.attchmentReadPerm = false
          return false;
        }
        // return this.$store.state.arrAttachment.length > 0 ? true : false
      }
    },
    components: {
      MainLeftSection,
      Attachments,
      Tags,
      HistoryLog,
      SubComment,
      Avatar,
      EstimatedHours,
      TaskPriority,
      TaskHeading,
      Breadcrumb
    }
  }
</script>