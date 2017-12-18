<template>
  <div>
    <!-- <div id="topicon">
      <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
        tabindex="410" style="margin-top: 2px;">
        <span id="close" class="destroy circularButtonView-label" @click="CLOSE_DIV(todoObject)">
          <i class="fa fa-close"></i>
        </span>
      </div>
      <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
        style="margin-top: 2px;">
        <span class="circularButtonView-label" @click="pinit(todoObject)">
          <img class="init" v-if="todoObject.isPinned" src="../assets/unpin.png" style="width:20px; height:20px;"></img>
          <img class="init" v-else src="../assets/pin.png" style="width:16px; height:16px; margin-bottom:2px;"></img>
        </span>
      </div>
      <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
        tabindex="410" @click="openfullwinodw(todoObject.level)" style="margin-top: 2px; ">
        <span class="circularButtonView-label">
          <i class="fa fa-expand" aria-hidden="true"></i>
        </span>
      </div>
    </div> -->
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
      <div class="tab-pannel">
        <text-description :id="id" :filteredTodo="todoObject" :currentView="currentView"></text-description>
        <div class="rightscroll" id="rightContainer">
          <component :is="currentView" :id="id" :taskId="todoObject.id"  :isDeleteAttachment="chkAttachment"
            :filteredTodo="todoObject" v-if="!$store.state.deleteItemsSelected && id !== 'rightTaskTypes' && id !== 'rightTaskState'"
            :pholder="pholder" :filtered-todos="taskById" :commentTaskId="todoObject.id">
          </component>
        </div>
      </div>
      <div class="nav_bottom">
        <div class="navbar-bottom" id="myNavbar">
          <a href="javascript:void(0)" id="#subtask" v-bind:class="selectedMenuIndex==0?activeClass:''" class="nav-tab" @click="subTaskShow">
            <Tooltip content="Task" placement="top-start">
              <!-- <i class="fa fa-bars" style="font-size:20px"></i> -->
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
                <div v-if="todoObject.email">
                  <avatar v-if="todoObject.image_url" :username="getListUserName(todoObject,0)" :size="30" :src="todoObject.image_url"></avatar>
                  <avatar v-else :username="getListUserName(todoObject,0)" color='#fff' :size="30"></avatar>
                </div>
              </span>
              <Row>
                <Col span="2" style="padding-right:10px">
                <Select not-found-text="No user found" placeholder="user" placement="top" v-model="selectedUser" @on-change="userListClick"
                  filterable style="width:180px;z-index:99999">
                  <Option  v-show="checkEmail(user.email,user.fullname)" style="margin:5px" v-for="user in getUserList" :label="getListUserName(user)" :value="user._id" :key="user._id">
                    <span >
                      <span style="float:left;margin-right:10px;margin-top:-8px;width: 30px; height: 30px; border-radius: 50%; text-align: center; vertical-align: middle;background:#ccc">
                        <div>
                          <avatar v-if="user.image_url" :username="getListUserName(user,0)" :size="30" :src="user.image_url"></avatar>
                          <avatar v-else color="white" :username="getListUserName(user,0)" :size="30"></avatar>
                        </div>
                      </span>
                      {{getListUserName(user,1)}}
                    </span>
                  </Option>
                </Select>
                </col>
              </Row>
            </Tooltip>
          </div>
          <!-- Task due date menu item -->
          <div class="due-date">
            <Tooltip content="Due Date" placement="top-start">
              <DatePicker :open="open" confirm size="small" placement="top" type="date" :value="todoObject.dueDate" @on-change="dueDateClick"
                @on-clear="handleClear" @on-ok="handleOk">
                <a href="javascript:void(0)" @click="handleClick">
                  <Icon v-if="todoObject.dueDate === ''" class="fa fa-calendar"></Icon>
                  <template v-if="todoObject.dueDate === ''"></template>
                  <template v-else>{{ todoObject.dueDate | formatDate}}</template>
                </a>
              </DatePicker>
            </Tooltip>
          </div>
          <!-- History -->
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
          <a href="javascript:void(0)" v-bind:class="selectedMenuIndex==3?activeClass:''" class="nav-tab hidden" @click="tagsShow">
            <Tooltip content="Tags" placement="top-start">
              <i class="nav-icon fa fa-tags" aria-hidden="true" style="font-size:20px"></i>
            </Tooltip>
          </a>
          <a href="javascript:void(0)" v-bind:class="selectedMenuIndex==4?activeClass:''" class="nav-tab" @click="commentsShow">
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
                <DropdownItem name="2">Task Priority</DropdownItem>
                <DropdownItem name="3">Copy Task URL</DropdownItem>
                <DropdownItem name="4">Delete Task</DropdownItem>
                <DropdownItem name="5">Estimated Hours</DropdownItem>
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
    <estimated-hours :showModal="estimated_time" :closeAction="closeDialog" :filteredTodo="todoObject"></estimated-hours>
    <task-priority :showModal="task_priority" :closeAction="closeDialog" :filteredTodo="todoObject"></task-priority>
  </div>
</template>
<script>
  /* eslint-disable*/
  import Vue from "vue";
  import MainLeftSection from "./MainLeftSection.vue";
  import TextDescription from "./TextDescription.vue";
  import SubComment from "./SubComment.vue";
  import HistoryLog from "./HistoryLog.vue";
  import RightToolbar from "./RightToolbar.vue";
  import Attachments from "./Attachments.vue";
  import StoryFeed from "./StoryFeed.vue";
  import Statuses from "./Statuses.vue";
  import * as services from "../services";
  import Tags from "./Tags.vue";
  import SubTask from "./SubTask.vue";
  import { mapMutations, mapGetters, mapActions } from "vuex";
  import iView from "iview";
  import "iview/dist/styles/iview.css";
  import CmnFunc from "./CommonFunc.js";
  import * as Constant from "./Constants.js";
  import AsyncComputed from "vue-async-computed";
  import Avatar from "vue-avatar/src/Avatar";
  import Datepicker from "vuejs-datepicker";
  import moment from "moment";
  import EstimatedHours from './EstimatedHours.vue'
  import TaskPriority from './TaskPriority.vue'
  Vue.use(AsyncComputed);
  Vue.filter("formatDate", function (value) {
    if (value) {
      return moment(String(value)).format("MMM DD");
    }
  });
  Vue.filter("dateofDay", function (value) {
    if (value) {
      return moment(String(value)).format("DD");
    }
  });

  Vue.use(AsyncComputed);
  export default {
    props: ["pholder", "todoObject", "id"],
    data: function () {
      return {
        todolistSubTasks: [],
        createCommentBox: true,
        readCommentBox: true,
        isDelete: false,
        chkAttachment: false,
        attchmentReadPerm: false,
        isCreatePermission: false,
        isTagReadPermission: false,
        isTabContainerShow: false,
        currentView: SubTask,
        activeClass: "active",
        selectedMenuIndex: 0,
        modal_loading: false,
        topMargin: 20, // Top margin of sub task panel
        isDeleteActive: false, // Hide soft delete dialog
        // imageURlProfilePic: "",
        model8: "",
        selectedUser: this.todoObject.assigned_to,
        previousUser:this.todoObject.assigned_to,
        userObj: "", // selected user object
        estimated_time: false,
        task_priority: false,
        open: false,
      };
    },
    created: function () {
      // this.manageAttachmentCreatePermission();
      // this.tagReadPermission();
      // this.tagNewPermission();
    },
    methods: {
      // ...mapMutations(["CLOSE_DIV"]),    
      undelete: function () {
        this.$store.dispatch("undelete", this.todoObject);
      },
      moreActionMenuClick: function (val) {
        // Show Estimated Hour val=1
        if (val == 1) {
          // Show tags
          this.tagsShow()
        }
        // Show Task Priority val=2
        else if (val == 2) {
          this.task_priority = true
        }
        // Show copy Url val=3
        else if (val == 3) {
          var $temp = $("<input>");
          $("body").append($temp);
          var url = process.env.COPY_URL_PATH + "/navbar/task/" + (this.todoObject.level + 1) + "/" + this.todoObject.id
          $temp.val(url).select();
          document.execCommand("copy");
          $temp.remove();
        }
        // Show delete dialog val=4
        else if (val == 4) {
          this.$store.dispatch("delete_Todo", this.todoObject);
        }
        else if (val == 5) { 
          this.estimated_time = true
        }
      },
      closeDialog() {
        this.estimated_time = false
        this.task_priority = false
      },
      deletePermently: function () {
        this.$store.dispatch("deletePermently", this.todoObject);
      },
      getListValue: function (user) {
        if (user.email) {
          return user.email;
        } else {
          return 
        }
      },
      getListUserName: function (user,flag) {
      
        if (user.fullname && user.fullname.trim().length > 0) {
          return user.fullname;
        } else if(user.email){
          // return user.email.substr(0,user.email.indexOf("@"));
        return flag==0? user.email.substr(0,user.email.indexOf("@")):user.email;
        }else{
          return "Un"
        }
      },
      onUserClick: function (user) {
        this.userObj = user;
        if (user.email) {
          return user.email;
        } else {
          return;
        }
      },
      userClick: function (user) {
        console.log("user detail call");
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
        const totalHeight = $("#"+this.id).height()
        const divHeight = $(".task").height() + 40
        document.getElementById('rightContainer').style.height = totalHeight - divHeight + "px";
      },
      attachmentShow() {
        $(".nav").removeClass("hidden");
        this.selectedMenuIndex = 2;
        this.currentView = Attachments;
        const totalHeight = $("#"+this.id).height()
        const divHeight = $("#text-area").height() + 40
        document.getElementById('rightContainer').style.height = totalHeight - divHeight + "px";
      },
      tagsShow() {
        this.selectedMenuIndex = 3;
        this.currentView = Tags;
      },
      historyShow() {
        this.selectedMenuIndex = 1;
        this.currentView = HistoryLog;
        const totalHeight = $("#"+this.id).height()
        const divHeight = $("#text-area").height() + 40
        document.getElementById('rightContainer').style.height = totalHeight - divHeight + "px";
      },
      commentsShow() {
        this.selectedMenuIndex = 4;
        this.currentView = SubComment;
      },
      assignToShow() {
        this.selectedMenuIndex = 5;
      },
      handleOpen() {
        this.selectedMenuIndex = 5;
        $(".nav").addClass("hidden");
      },
      // openfullwinodw: function(ind) {
      //   console.log("Openfullwindow called====");
      //   $(".window-full.circularButtonView")
      //     .find(".fa")
      //     .toggleClass("fa-compress");
      //   $(".window-full.circularButtonView")
      //     .parents(".right_pane_container #right_pane #" + ind)
      //     .toggleClass("open");
      // },
      // pinit(filteredTodo) {
      //   console.log("TODO Object", filteredTodo);
      //   if (
      //     _.find(this.$store.state.todolist, ["id", filteredTodo.id]) &&
      //     !_.find(this.$store.state.todolist, ["id", filteredTodo.id]).isPinned
      //   ) {
      //     console.log("pinnned true");
      //     _.find(this.$store.state.todolist, [
      //       "id",
      //       filteredTodo.id
      //     ]).isPinned = true;
      //   } else {
      //     console.log("pinnned false");
      //     _.find(this.$store.state.todolist, [
      //       "id",
      //       filteredTodo.id
      //     ]).isPinned = false;
      //   }
      // },
      async setAssignUser(userId) {
        var user = _.find(this.$store.state.arrAllUsers, ["_id", userId]);
        console.log("Selected User setAssignUser method:", user);
        this.todoObject.image_url  = user.image_url
        this.todoObject.email  = user.email

        if (user) {
          this.$store.dispatch("editTaskName", {
            todo: this.todoObject,
            assigned_by: this.$store.state.userObject._id,
            assigned_to: user._id,
            log_action:Constant.HISTORY_LOG_ACTION.TASK_ASSIGN,
            log_text:userId
          });
        }
      },
      getAssignedUserName() {
        var user = this.getAssignedUserObj();
        return user.email ? this.getName(user.email) : "";
      },
      getName(name) {
        var str = name;
        var n = str.indexOf("@");
        var res = str.substr(0, n);
        return res;
      },
      getAssignedUserObj(assignUserId) {
        var objUser;
        if (this.todoObject.assigned_to === this.$store.state.userObject._id) {
          objUser = this.$store.state.userObject;
        } else {
          objUser = _.find(this.$store.state.arrAllUsers, [
            "_id",
            assignUserId
          ]);
        }
        return objUser;
      },
      dueDateClick(dateTo) {
        var selectedDate = moment(dateTo, "YYYY-MM-DD").format("DD");
        this.$store.dispatch("editTaskName", {
          todo: this.todoObject,
          selectedDate: dateTo,
          log_action:Constant.HISTORY_LOG_ACTION.DUE_DATE,
          log_text:dateTo
        });
        this.todoObject.dueDate = dateTo
      },
      handleClick() {
        this.open = !this.open;
      },
      handleClear() {
        this.open = false;
      },
      handleOk() {
        this.open = false;
      },
      /**
      * Selected user from assign user list
      */
      userListClick: function (user_id) {
        //console.log("on-change:",user_id," this.selectedUser:",this.selectedUser)

         console.log("userListClick click call",this.selectedUser+" previousUser:"+this.previousUser)
         if (this.selectedUser !== this.previousUser)
           this.setAssignUser(user_id)
      },
      checkEmail(email,fullname){
        // console.log("check fullname",fullname)
        // console.log("check email",email)
        return (fullname && fullname.length>0) || (email && email.length>0 && CmnFunc.checkValidEmail(email))
      }
    },
    watch: {
      // whenever question changes, this function will run
      // todolistSubTasks: function(newQuestion) {},
      // todoObject: function() {
      //   console.log("Right Section Log history", this.todoObject);
      //   this.$store.dispatch("findHistoryLog", this.todoObject.id);
      // },
      todoObject: function (todo) {
        this.previousUser = todo.assigned_to;
        this.selectedUser = todo.assigned_to;
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
      EstimatedHours,
      TaskPriority
    }
  };
</script>