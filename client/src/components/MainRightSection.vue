<template>
  <div>
    <div id="topicon">
      <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
        tabindex="410" @click="openfullwinodw(todoObject.level)" style="margin-top: 2px; margin-right:51px;">
        <span class="circularButtonView-label">
          <i class="fa fa-expand" aria-hidden="true"></i>    
        </span>
      </div>
      <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
            style="margin-top: 2px; margin-right:-52px;">
        <span class="circularButtonView-label"  @click="pinit(todoObject)"><img class="init" v-if="todoObject.isPinned" src="../assets/unpin.png" style="width:20px; height:20px;"></img>
        <img class="init" v-else src="../assets/pin.png" style="width:16px; height:16px; margin-bottom:2px;"></img></span>
      </div>
      <span id="close" class="destroy" @click="CLOSE_DIV(todoObject)"><i class="fa fa-close"></i></span>
    </div>
    <div :id="id" class="right_pannel" style="display: grid;">
        <Alert v-show="isDeleteActive" class="right-top-alert" type="error">
            <span slot="desc">
                  <span class="deleteIcon"><Icon type="android-delete" ></Icon></span>
                  <span class="TaskUndeleteBanner-message">This task is deleted.</span>
                  <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" @click="undelete(todoObject)">Undelete</a>
                  <a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" @click="deleleteTask" data-toggle="modal" :data-target="'.'+todoObject.id">Delete Permanently</a>
            </span>
        </Alert>
        <div class="tab-pannel" v-bind:style="{ top: topMargin+'px'}">
           
          <component :is="currentView" 
            :id="id" 
            :taskId="todoObject.id" 
            :historyLog="historyLog" 
            :isDeleteAttachment="chkAttachment" 
            :filteredTodo="todoObject" 
            v-if="!$store.state.deleteItemsSelected && id !== 'rightTaskTypes' && id !== 'rightTaskState'" 
            :pholder="pholder" 
            :filtered-todos="taskById"
            :commentTaskId="todoObject.id">
          </component>
          
        </div>
         <!-- <Select placeholder="hemant" placement="top" v-model="model8" style="right:0;width:200px;position:absolute;bottom:36px;z-index:99999">
              <Option value="delhi">delhi</Option>
              <Option value="punjab">punjab</Option>
              <Option value="gujarat">gujarat</Option>
        </Select> -->
        <div class="nav_bottom" style="z-index: 10;">
          <div class="navbar-bottom" id="myNavbar">
            <a href="javascript:void(0)" id="#subtask" v-bind:class="selectedMenuIndex==0?activeClass:''" class="nav-tab" @click="subTaskShow">
              <Tooltip content="Task" placement="top-start">
                <i class="nav-icon ion-navicon-round" style="font-size:20px"></i>
              </Tooltip>
            </a>
            <a href="javascript:void(0)" v-bind:class="selectedMenuIndex==1?activeClass:''" class="nav-tab" @click="historyShow">
              <Tooltip content="History" placement="top-start">
                <i class="nav-icon fa fa-history" aria-hidden="true" style="font-size:20px"></i>
              </Tooltip>
            </a>
            <a href="javascript:void(0)" v-bind:class="selectedMenuIndex==2?activeClass:''" class="nav-tab" @click="attachmentShow">
              <Tooltip content="Attachments" placement="top-start">
                <i class="nav-icon fa fa-paperclip" aria-hidden="true" style="font-size:20px"></i>
              </Tooltip>
            </a>
            <a href="javascript:void(0)" v-bind:class="selectedMenuIndex==3?activeClass:''" class="nav-tab" @click="tagsShow">
              <Tooltip content="Tags" placement="top-start">
                <i class="nav-icon fa fa-tags" aria-hidden="true" style="font-size:20px"></i>
              </Tooltip>
            </a>
            <a href="javascript:void(0)" v-bind:class="selectedMenuIndex==4?activeClass:''" class="nav-tab" @click="commentsShow">
              <Tooltip content="Comments" placement="top-start">
                <i class="nav-icon fa fa-comments" aria-hidden="true" style="font-size:20px"></i>
              </Tooltip>
            </a>
            <div class="assing-to-menu">
                      <span style="float:left;margin-right:10px;margin-top:-3px">
                        <avatar username="getUserLetters()" :size='30' src='https://s3.amazonaws.com/profile_photos/329633778653756.1pmLUlVhFA8h81mZ3biR_60x60.png'></avatar>
                      </span>
                      <Row>
                            <Col span="2" style="padding-right:10px">
                                <Select not-found-text="No user found" placeholder="user"  placement="top" v-model="selectedUser" filterable  style="width:180px;z-index:99999">
                                      <Option v-for="user in getUserList" not-found-text="AAxsd" :label="getListUserName(user.email)" :value="getListUserName(user.email)" :key="user._id">
                                        <span style="float:left;margin-right:10px;margin-top:-8px">
                                          <avatar username="getUserLetters()" :size='30' src='https://s3.amazonaws.com/profile_photos/329633778653756.1pmLUlVhFA8h81mZ3biR_60x60.png'></avatar>
                                        </span>
                                        {{getListUserName(user.email)}}
                                        </Option>
                                      <!-- <Option value="gujarat"><avatar username="getUserLetters()" :size='30' src='https://s3.amazonaws.com/profile_photos/329633778653756.1pmLUlVhFA8h81mZ3biR_60x60.png'></avatar>gujarat</Option> -->
                                </Select>
                            </col>
                      </Row>                                
            </div>  
              <div class="assing-to-menu">
                        <DatePicker placement="top" type="date" placeholder="Select date" style="width: 200px"></DatePicker>                             
            </div>  
            <div class="option">
              <Dropdown @on-click="deleteMenuClick" trigger="click" placement="top">
                <a href="javascript:void(0)" @click="handleOpen" class="option-menu">
                  <i class="glyphicon glyphicon-option-horizontal" aria-hidden="true" style="font-size:22px"></i>
                </a>
                <DropdownMenu  slot="list">
                  <DropdownItem name="1">Estimated Hours</DropdownItem>
                  <DropdownItem name="2">Task Priority</DropdownItem>
                  <DropdownItem name="3">Copy Task URL</DropdownItem>
                  <DropdownItem name="4">Delete Task</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div class="tab-container">

          </div>
      </div>
    </div>
    <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>Delete confirmation</span>
        </p>
        <div style="text-align:center">
            <p>This will permanently delete the task and associated subtasks. These items will no longer be accessible to you or anyone else. This action is irreversible.</p>
            <p>Will you delete it?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="deletePermently">Delete</Button>
        </div>
    </Modal>
          <!-- <right-toolbar :subTasksArray="todolistSubTasks" v-if="id !== 'right+TaskTypes' && id !== 'rightTaskState' " :filteredTodo="todoObject"></right-toolbar> -->
    
    <!-- <div :id="id">
      <div class="hidden DropTargetAttachment">
        <section class="todoapp right_bar">
          <right-toolbar :subTasksArray="todolistSubTasks" v-if="id !== 'right+TaskTypes' && id !== 'rightTaskState' " :filteredTodo="todoObject"></right-toolbar>
          <div class="taskbarsect">
            <div v-if="todoObject.isDelete" class="MessageBanner MessageBanner--error MessageBanner--medium TaskUndeleteBanner TaskMessageBanner">
              <span class="fa fa-trash-o" style="margin-right: 10px" />
              <span class="TaskUndeleteBanner-message">This task is deleted.</span>
              <a class="Button Button--small Button--secondary TaskUndeleteBanner-undeleteButton" @click="undelete(todoObject)">Undelete</a>
              <a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" data-toggle="modal" :data-target="'.'+todoObject.id">Delete Permanently</a>
              <!--todoObject<a class="Button Button--small Button--primary TaskUndeleteBanner-permadeleteButton" @click="deletePermently(todoObject)">Delete Permanently</a>-->
              <!--@click="deletePermently(todoObject)"-->
              <!--<noscript></noscript>
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
            <main-left-section v-if="!$store.state.deleteItemsSelected && id !== 'rightTaskTypes' && id !== 'rightTaskState'" :pholder="pholder" :filtered-todos="taskById"></main-left-section>
            <history-log :taskId="todoObject.id" :historyLog="historyLog"></history-log>
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
      <right-footer class="hidden" v-show="createCommentBox" v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState'" :filteredTodo="todoObject"></right-footer>
      <right-tabs class="hidden"></right-tabs>
    </div> -->
    <!-- <div   :class="todoObject.id" role="dialog" aria-labelledby="myModalLabel2" style="">
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
    </div> -->
  </div>
</template>
<script>
/* eslint-disable*/
import Vue from "vue";
import MainLeftSection from "./MainLeftSection.vue";
import TextDescription from "./TextDescription.vue";
// import RightFooter from './RightFooter.vue'
// import Comment from './Comment.vue'
import SubComment from "./SubComment.vue";
import HistoryLog from "./HistoryLog.vue";
import RightToolbar from "./RightToolbar.vue";
import Attachments from "./Attachments.vue";
import StoryFeed from "./StoryFeed.vue";
import Statuses from "./Statuses.vue";
import * as services from "../services";
import Tags from "./Tags.vue";
import SubTask from "./SubTask.vue";
import { mapMutations, mapGetters } from "vuex";
import iView from "iview";
import "iview/dist/styles/iview.css";
import CmnFunc from "./CommonFunc.js";
import * as Constant from "./Constants.js";
import AsyncComputed from "vue-async-computed";
import Avatar from "vue-avatar/dist/Avatar";
import Datepicker from 'vuejs-datepicker'


Vue.use(AsyncComputed);

export default {
  props: ["pholder", "todoObject", "id"],
  data: function() {
    return {
      todolistSubTasks: [],
      createCommentBox: true,
      readCommentBox: true,
      historyLog: [],
      isDelete: false,
      chkAttachment: false,
      attchmentReadPerm: false,
      isCreatePermission: false,
      isTagReadPermission: false,
      isTabContainerShow: false,
      currentView: SubTask,
      activeClass: "active",
      selectedMenuIndex: 0,
      modal2: false,
      modal_loading: false,
      topMargin: 0, // Top margin of sub task panel
      isDeleteActive: false, // Hide soft delete dialog
      imageURlProfilePic: "",
      model8: '',
      selectedUser: ''
    };
  },
  created: function() {
    this.manageAttachmentCreatePermission();
    this.tagReadPermission();
    this.tagNewPermission();
  },
  methods: {
    ...mapMutations(["CLOSE_DIV"]),
    undelete: function() {
      // Hide delete dialog
      this.isDeleteActive = false;
      this.topMargin = 0; // Top margin of sub task list
      this.$store.dispatch("undelete", this.todoObject);
    },
    deleteMenuClick: function(val) {
      // Show delete dialog val=4
      if (val == 4) {
        this.isDeleteActive = true;
        this.topMargin = 80;
        this.$store.dispatch("delete_Todo", this.todoObject);
      }
    },
    deleleteTask: function() {
      this.isDeleteActive = false;
      this.modal2 = true;
      this.topMargin = 30; // Top margin of sub task list
    },
    deletePermently: function() {
      this.$store.dispatch("deletePermently", this.todoObject);
      this.modal2 = false;
    },
    getListUserName: function(userName){
        if(userName){
          return userName
        }else{
          return 'n/a'
        }
    },
    async onReadComment(id, level, created_by, typeId) {
      let permisionResult = await CmnFunc.checkActionPermision(
        this,
        typeId,
        Constant.USER_ACTION.COMMENT,
        Constant.PERMISSION_ACTION.READ
      );
      console.log("permisionResult Read Comment-->", permisionResult);
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
      console.log("permisionResult Create Comment-->", permisionResult);
      if (!permisionResult && id != -1) {
        this.createCommentBox = false;
      } else {
        this.createCommentBox = true;
      }
    },
    userDetail(deletedTasks) {
      deletedTasks.forEach(function(c) {
        let userId = c.assigned_to;
        let userIndex = _.findIndex(this.$store.state.arrAllUsers, function(m) {
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
        Constant.USER_ACTION.ATTACHEMENT,
        Constant.PERMISSION_ACTION.DELETE,
        "attachment"
      );
    },
    async manageAttachmentReadPermission() {
      return await CmnFunc.checkActionPermision(
        this,
        this.todoObject.type_id,
        Constant.USER_ACTION.ATTACHEMENT,
        Constant.PERMISSION_ACTION.READ,
        "attachment"
      );
    },
    manageAttachmentCreatePermission: async function() {
      this.isCreatePermission = await CmnFunc.checkActionPermision(
        this,
        this.todoObject.type_id,
        Constant.USER_ACTION.ATTACHEMENT,
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
      console.log("Tag read permission:", this.isTagReadPermission);
    },
    async tagNewPermission() {
      this.isTagReadPermission = await CmnFunc.checkActionPermision(
        this,
        this.todoObject.type_id,
        Constant.USER_ACTION.TAG,
        Constant.PERMISSION_ACTION.CREATE
      );
      console.log("Tag create permission:", this.isTagReadPermission);
    },
    subTaskShow() {
      this.selectedMenuIndex = 0;
      this.currentView = SubTask;
    },
    attachmentShow() {
      $(".nav").removeClass("hidden");
      this.selectedMenuIndex = 2;
      this.currentView = Attachments;
    },
    tagsShow() {
      this.selectedMenuIndex = 3;
      this.currentView = Tags;
    },
    historyShow() {
      this.selectedMenuIndex = 1;
      this.currentView = HistoryLog;
    },
    commentsShow() {
      this.selectedMenuIndex = 4;
      // this.currentView = Comment
      this.currentView = SubComment;
    },
    assignToShow() {
      this.selectedMenuIndex = 5;
      // this.currentView = Comment
    },
    handleOpen() {
      this.selectedMenuIndex = 5;
      $(".nav").addClass("hidden");
    },
    openfullwinodw: function(ind) {
      console.log("Openfullwindow called====");
      $(".window-full.circularButtonView")
        .find(".fa")
        .toggleClass("fa-compress");
      $(".window-full.circularButtonView")
        .parents(".right_pane_container #right_pane #" + ind)
        .toggleClass("open");
    },
    pinit(filteredTodo) {
      console.log("TODO Object", filteredTodo);

      if (
        _.find(this.$store.state.todolist, ["id", filteredTodo.id]) &&
        !_.find(this.$store.state.todolist, ["id", filteredTodo.id]).isPinned
      ) {
        console.log("pinnned true");
        _.find(this.$store.state.todolist, [
          "id",
          filteredTodo.id
        ]).isPinned = true;
      } else {
        console.log("pinnned false");
        _.find(this.$store.state.todolist, [
          "id",
          filteredTodo.id
        ]).isPinned = false;
      }
    },
    getAssignedUserName() {
      var user = this.getAssignedUserObj();
      return this.getName(user.email);
    },
    getName(name) {
      var str = name;
      var n = str.indexOf("@");
      var res = str.substr(0, n);
      return res;
    },
    getAssignedUserObj() {
      var objUser;
      // console.log('filteredTodo.assigned_to', this.todoObject.assigned_to)
      // console.log('this.$store.state.userObject._id', this.$store.state.userObject)
      if (this.todoObject.assigned_to === this.$store.state.userObject._id) {
        objUser = this.$store.state.userObject;
      } else {
        objUser = _.find(this.$store.state.arrAllUsers, [
          "_id",
          this.todoObject.assigned_to
        ]);
      }
      // console.log('User', objUser)
      return objUser;
    },
    getUserLetters() {
      var user = this.getAssignedUserObj();
      if (user.image_url) {
        this.imageURlProfilePic = user.image_url;
        return;
      }
      this.imageURlProfilePic = "";
      return this.capitalizeLetters(user.email);
    },
    capitalizeLetters(name) {
      var str = "null";
      if (name != null) {
        str = name;
      }
      // else if(name.fullname != null){
      //   console.log('Name', name.fullname)
      //   str = name.fullname
      // }
      // var str = name.email
      var firstLetters = str.substr(0, 2);
      return firstLetters.toUpperCase();
    }
  },
  watch: {
    // whenever question changes, this function will run
    todolistSubTasks: function(newQuestion) {},
    todoObject: function() {
      console.log("Right Section Log history", this.todoObject)
      this.$store.dispatch('findHistoryLog', this.todoObject.id)
    }
  },
  computed: {
    ...mapGetters({
      todoById: "getTodoById",
      typeStateList: "getTask_types_state",
      getUserList: "getAllUserList"
    }),
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
      })
      this.todolistSubTasks = taskArray
      this.userDetail(this.todolistSubTasks)
      return taskArray
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
        console.log("inside read permission");
        //check whether attachment array has value or not
        return this.checkAttachmentExistance();
      } else {
        console.log("read permission false:", isReadPermission);
        //this.attchmentReadPerm = false
        return false;
      }
      // return this.$store.state.arrAttachment.length > 0 ? true : false
    }
  },
  components: {
    // RightFooter,
    MainLeftSection,
    TextDescription,
    RightToolbar,
    Attachments,
    StoryFeed,
    Tags,
    Statuses,
    HistoryLog,
    SubComment,
    Avatar,
    Datepicker,
    // Comment,
  }
};
</script>
<style scoped>
.navbar-bottom {
  overflow: hidden;
  background-color: #333;
  bottom: 0;
  width: 100%;
}

.navbar-bottom a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 6px 26px;
  text-decoration: none;
}

.navbar-bottom div {
  margin-top: 1px;
}

.navbar-bottom a.active {
  /*background-color: rgba(63, 81, 181, 0.48);*/
  background-color: #999999;
  color: white;
}

.navbar-bottom:hover a.active {
  /*background-color: rgba(63, 81, 181, 0.90);*/
  background-color: #999999;
  color: white;
}

.navbar-bottom .icon {
  display: none;
}

.nav-icon {
  font-size: x-large;
}

.nav-title {
  font-size: small;
}

.tab-container {
  display: none;
}

.tab-container-active {
  display: block;
  width: 100%;
  background: white;
  /* height: 510px; */
}

div.right_pannel {
  width: 100%;
  height: 100%;
}

.tab-pannel {
  /* overflow-y: scroll; */
  height: 95%;
  position: absolute;
  width: 100%;
  overflow-x: hidden;
}

.nav_bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* height of the bottom tab bar */
  height: 36px;
}

.nav-sub-bottom {
  height: 320px;
}

a.option-menu.glyphicon.glyphicon-option-horizontal {
  float: right;
}

.right_pane_container #right_pane {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.option-menu {
  float: right;
}
.right-top-alert {
  top: 10px;
}
.ivu-alert-error {
  border: 1px solid #d7c5c7;
  background-color: #ffedef;
}
.deleteIcon {
  font-size: 2.5em;
  margin-right: 10px;
  color: #ed3f14;
}
.navbar-bottom{

}
.navbar-bottom .assing-to-menu{
  padding: 5px;
  border-radius: 30px;
  background: #745a93ab;
  float: left;
  height: 35px;
  width:150px;
}
.navbar-bottom .assing-to-menu:hover{
  background: #745a93;
}


</style>

