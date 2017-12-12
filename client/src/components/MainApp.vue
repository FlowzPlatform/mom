<template>
  <section class="todoapp">
      <div data-reactroot="" id="top-bar" class="circularMenu">
		<div class="PageHeaderStructure-left">
			<circular-nav-bar v-on:eventChangeMenu="changeMenu"></circular-nav-bar>
		</div>
      </div>
		<div id="main-container" class="row asanaView-body pt-page-moveFromLeft" style="padding-top: 15px; margin: 10px 10px 10px 10px;"
		v-show="isMyTask">
      <div class="asanaView-paneGutter"></div>
			<div id="center_pane_container" class="scrollbar">
				<div id="center_pane">
					<div v-if="$store.state.currentProjectId && $store.state.currentProjectId.length>0">
						<left-toolbar v-if="!isCopyLink" :filters="filters">
						</left-toolbar>
						<main-left-section id="todoTask" :isCopyLink="isCopyLink" :todoObject="todoObjectById" :pholder="taskPholder" :filtered-todos="taskById"></main-left-section>
					</div>
					<div class="outer" v-else>
						<div class="middle">
							<div class="inner">
								<div class="trashcan-empty gridPaneSearchEmptyView-noProjectItems">
									<span class="fa fa-file-text-o fa-5x" @click="openCreateDialogs" />
									<div class="text gridPaneSearchEmptyView-noProjectItemsTitleText">Add New Project
									</div>
									<div class="text gridPaneSearchEmptyView-noProjectItemsText" v-show="$store.state.projectlist.length==0">You have no project created.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
      </div>
			<div :id="n.level" v-bind:key="index" class="right_pane_container" v-for="(n, index) in parentIdArray">
				<div id="right_pane">
					<main-right-section v-show="!n.show_type" :id="n.level" :pholder="subtaskPholder" :todoObject="n" :a="n"></main-right-section>
					<SubComment v-show="n.show_type==='subcomment'" :commentTaskId="n.task_id" :commentParentId="n.id" :commentName="n.comment"></SubComment>
        </div>
			</div>
			<div class="asanaView-paneGutter"></div>
			<create-project-dialog :show="isNewProjectDialogShow" v-on:updateDialog='updateDialogShow'></create-project-dialog>
		</div>
		<div id="roleAccess" class="row asanaView-body pt-page-moveFromRight" v-show="isRoleAccess">
		<role-access></role-access>
		</div>
		<div id="search" class="row asanaView-body pt-page-moveFromRight" v-show="isSearch">
			<search></search>
		</div>
  </section>
</template>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script>
  /* eslint-disable*/
  import CreateProjectDialog from './CreateProjectDialog.vue'
  import MainLeftSection from './MainLeftSection.vue'
  import MainRightSection from './MainRightSection.vue'
  import LeftToolbar from './LeftToolbar.vue'
  import SubComment from './SubComment.vue'
  import CmnFunc from './CommonFunc.js'
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  Vue.use(BootstrapVue)
  import RoleAccess from './RoleAccess.vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapGetters, mapActions } from 'vuex'
  import VueSplitter from "@rmp135/vue-splitter"
  import CircularNavBar from './CircularNavBar.vue'
  import Search from './Search.vue'
  import iView from 'iview';
  import locale from 'iview/dist/locale/en-US';
  Vue.use(iView, { locale });
  Vue.use(require('vue-moment'))

  const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.completed),
    completed: todos => todos.filter(todo => todo.completed)
  }

  function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
  }
  export default {
    props: ['passData'],
    data: function () {
      return {
        eventIndex: 0,
        taskPholder: 'Task',
        subtaskPholder: 'Subtask',
        username: '',
        role: '',
        aboutme: '',
        dob: '',
        datepicker: null,
        picker10Max: new Date(),
        image: '',
        imageURlProfilePic: this.$store.state.userObject.image_url,
        loading: false,
        todolist: [],
        visibility: 'completed',
        filters: filters,
        url_parentId: '',
        url_level: 0,
        isCopyLink: false,
        isNewProjectDialogShow: false,
        isRoleAccess: false,
        isMyTask:true,
        isSearch: false,
        settings: {
          maxScrollbarLength: 60
        }
      }
    },
    created() {
      this.$store.dispatch('getSettings', this.$store.state.userObject._id);
      this.$store.dispatch('removeAllEventListners');
      this.$store.dispatch('eventListener');
      this.getAllUsers()
      var url = window.location.href;
      if (url.indexOf('task') > -1) {
        url = url.split('task/')
        var split_url = url[1].split('/')
        this.url_level = split_url[0] ? split_url[0] : ''
        this.url_parentId = split_url[1] ? split_url[1] : 0
        this.isCopyLink = true
        this.$store.dispatch('getTodoObject', this.url_parentId);
        this.$store.dispatch('getAttachmentFromDB', this.url_parentId)
        this.$store.dispatch('getAllTaskTags', this.url_parentId);
        this.$store.dispatch('getTaskComment', this.url_parentId)
      }
      this.$store.dispatch('removeParentIdArray') // flush showDiv object from the memory when page refresh
      this.$store.commit('DELETE_ALLTAGS')
      this.$store.dispatch('getTaskStaus')
      this.$store.dispatch('getTaskTypes')

      this.$store.state.todolist = []
      var projects = this.getProjectWiseTodo;
      var projectId = this.$store.state.currentProjectId
      console.log("projectId:--",projectId)
      if (!projectId && projects.length > 0) {
        projectId = projects[0].id
        this.$store.state.currentProjectId = projects[0].id
        this.$store.state.currentProjectName = projects[0].project_name
        this.$store.state.currentProjectMember = projects[0].members; 
        this.$store.state.currentProjectPrivacy = projects[0].project_privacy
        this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '', project_id: projectId });
      
     } else {
        console.log("Can't set projectc id")
      }
    },
    watch: {
      todolist: function (todo) {
      }
    },
    computed: {
      ...mapGetters({
        todoById: 'getTodoById',
        parentIdArray: 'parentIdArr',
        todoObjectById: 'getObjectById',

      }),
      getProjectWiseTodo() {
        return this.$store.state.projectlist;
      },
      taskById() {
        var insertPermssion=CmnFunc.isCreatePermission(15);
        let taskArray = this.todoById(this.url_parentId ? this.url_parentId : '', this.url_level)
        if (insertPermssion) {
            taskArray.push({
              id: '-1',
              parentId: this.url_parentId,
              taskName: '',
              taskDesc: '',
              level: this.url_level,
              index: taskArray.length,
              completed: false,
              dueDate: '',
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON(),
              project_id: this.$store.state.currentProjectId
            })
          }
        this.todolist = taskArray
        this.userDetail(this.todolist)
        return filters[this.$store.state.visibility](taskArray)

      },
      todos: function () {
        return this.$store.getters.getTodoById('', 0)
      },
      uname: function () {
        var str = this.$store.state.userObject.email
        var n = str.indexOf("@")
        var res = str.substr(0, n)
        return res
      },
      capitalizeLetters: function () {
        var str = this.$store.state.userObject.email
        var firstLetters = str.substr(0, 2)
        return firstLetters.toUpperCase()
      }
    },
    methods: {
		changeMenu (isMainTask, isRoleAccess, isSearch) {
			this.isRoleAccess = isRoleAccess
			this.isMyTask = isMainTask
			this.isSearch = isSearch
		  },
      userDetail(deletedTasks) {
        deletedTasks.forEach(function (c) {
          let userId
          if (c.deletedBy) {
            userId = c.deletedBy
          } else {
            userId = c.assigned_to
          }
            let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
            if (userIndex < 0) {
            } else {
              c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
                c.email = this.$store.state.arrAllUsers[userIndex].email
            }
        }, this)
        
      },
      openCreateDialogs() {
        this.isNewProjectDialogShow = true;
      },
      updateDialogShow(isDialogVal) {
        this.isNewProjectDialogShow = isDialogVal
      },
      btnLogoutClicked() {
        this.$store.commit('userData')
        CmnFunc.resetProjectDefault()
        window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000"
      },
      getAllUsers() {
        var self = this
        this.$store.dispatch('getAllUsersList')
          .catch(function (error) {
            if (error.response.status === 401) {
              CmnFunc.deleteAutheticationDetail()
              self.$router.replace('/')
              return
            }
            $.notify.defaults({ className: "error" })
            $.notify(error.message, { globalPosition: "top center" })
          })
      },
      updateProjectName(){
        if(this.pName && this.pName.length > 0){
           this.$store.dispatch('renameProjectName',this.pName)
        }else{
           $.notify.defaults({ className: "error" })
           $.notify("Project name can't blank.", { globalPosition:"top center"})
        }
      },
      scrollHanle(evt) {
      console.log(evt)
    }
    },
    components: {
      MainLeftSection,
      MainRightSection,
      LeftToolbar,
      CreateProjectDialog,
      VueSplitter,
      SubComment,
      RoleAccess,
	    CircularNavBar,
      Search
    },
  }

</script>
<style>
/* animation sets */

.pt-page-moveFromLeft {
	-webkit-animation: moveFromLeft .6s ease both;
	animation: moveFromLeft .6s ease both;
}


.pt-page-moveFromRight {
	-webkit-animation: moveFromRight .6s ease both;
	animation: moveFromRight .6s ease both;
}

/********************************* keyframes **************************************/

@-webkit-keyframes moveFromLeft {
	from { -webkit-transform: translateX(-100%); }
}
@keyframes moveFromLeft {
	from { -webkit-transform: translateX(-100%); transform: translateX(-100%); }
}


@-webkit-keyframes moveFromRight {
	from { -webkit-transform: translateX(100%); }
}
@keyframes moveFromRight {
	from { -webkit-transform: translateX(100%); transform: translateX(100%); }
}
.scrollbar
{
  overflow-y: scroll;
  cursor: pointer;
}
.asanaView-body {
  overflow-x: scroll;
  cursor: pointer;
}
#center_pane_container::-webkit-scrollbar-track, #main-container::-webkit-scrollbar-track
, #rightContainer::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

#center_pane_container::-webkit-scrollbar
, #rightContainer::-webkit-scrollbar
{
	width: 7px;
	background-color: #F5F5F5;
}
#main-container::-webkit-scrollbar{
  height: 7px;
  background-color: #F5F5F5;
}

#center_pane_container::-webkit-scrollbar-thumb, #main-container::-webkit-scrollbar-thumb
, #rightContainer::-webkit-scrollbar-thumb
{
	background-color: #acacac;
	border: 1px solid #acacac;
}
.rightscroll{
  width: 100%;
  /* height: calc(100vh - 28vh); */
  overflow-y: scroll
}
</style>