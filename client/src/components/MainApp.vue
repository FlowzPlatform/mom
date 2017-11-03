<template>
  <section class="todoapp">
      <div data-reactroot="" id="top-bar" class="circularMenu">
      <div class="PageHeaderStructure-left">
          <circular-nav-bar v-on:eventChangeMenu="changeMenu"></circular-nav-bar>
      </div>
      </div>
    <div id="main-container" class="row asanaView-body pt-page-moveFromLeft" style="padding-top: 15px; margin: 10px 10px 10px 10px;" v-show="isMyTask">
      <div class="asanaView-paneGutter"></div>
    <!--<vue-splitter :margin="20">
      <div slot="left-pane">-->
        <div id="center_pane_container" >
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
      <!--</div>
      <div slot="right-pane">-->
        <div :id="n.level" class="right_pane_container" v-for="(n, index) in parentIdArray">
          <div id="right_pane">
            <!--<div slot="subtask">
              <main-right-section :id="n.level" :pholder="subtaskPholder" :todoObject="n" :a="n"></main-right-section>
            </div>-->
            <main-right-section v-show="!n.show_type" :id="n.level" :pholder="subtaskPholder" :todoObject="n" :a="n"></main-right-section>
            <SubComment v-show="n.show_type==='subcomment'" :commentTaskId="n.task_id" :commentParentId="n.id"></SubComment>
        </div>
      </div>
          </div>
        </div>
      <!--</div>
      </vue-splitter>-->
      <div class="asanaView-paneGutter"></div>
      <create-project-dialog :show="isNewProjectDialogShow" v-on:updateDialog='updateDialogShow'></create-project-dialog>
    </div>
    <div id="roleAccess" class="row asanaView-body pt-page-moveFromRight" v-show="isRoleAccess">
      <role-access></role-access>
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
  import * as Split from'./split.js'
  import CircularNavBar from './CircularNavBar.vue'
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
        isMyTask:true
      }
    },
    created() {
      this.$store.dispatch('getSettings', this.$store.state.userObject._id);
      this.$store.dispatch('removeAllEventListners');
      this.$store.dispatch('eventListener');
      this.getAllUsers()
      // ...mapActions([
      //         'getAllTodos'
      //     ])

      // get loaded URL to get querystring param
      //  var url = window.location.href;
      //  this.url_parentId = getQueryString('task', url)

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
      // this.getProjectWiseTodo;
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

      

      // if(this.$store.state.deleteItemsSelected)
      // {
      //   this.$store.dispatch('getDeleteTask');
      // }else {
      //   this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '' });
      // }

      // this.$store.dispatch('getAllTodos', {'parentId': ''});
      // let self = this;
      // socket.on('feed-change', function(item){
      //          if(item.new_val){
      //            var result = $.grep(self.taskById, function(e){ return e.id == item.new_val.id; })
      //             if (result.length == 0) {
      //               if(item.new_val.parentId.length == 0){
      //             // self.taskById.push(item.new_val)
      //               self.taskById.splice(self.taskById.length - 1, 0, item.new_val);
      //               // self.$store.state.todolist.push(item.new_val)
      //               }else{
      //               }
      //             }else if(item.old_val){
      //               if(item.new_val.parentId.length == 0){
      //               let index = _.findIndex(self.taskById,function(d){return d.id == item.new_val.id})
      //               if(index > -1){
      //                 self.taskById[index].taskName = item.new_val.taskName
      //               }
      //             }else{
      //                // console.log("Sub Task Updated")
      //             }
      //             } 
      //          }else if(item.old_val){
      //            // var index = self.taskById.indexOf(item.old_val);
      //            if(item.old_val.parentId.length == 0){
      //            let index = _.findIndex(self.taskById,function(d){return d.id == item.old_val.id})
      //            if(index > -1){
      //             self.taskById.splice(index, 1);
      //            }
      //            }else{
      //            // console.log("Sub Task Deleted")
      //            }
      //            //self.taskById.splice(index, 1);
      //          }
      //        })
    },
    watch: {
      todolist: function (todo) {
        //  console.log('test');
      }
    },
    computed: {
      ...mapGetters({
        todoById: 'getTodoById',
        parentIdArray: 'parentIdArr',
        // userSettings: 'user_setting',
        todoObjectById: 'getObjectById',
        // projectName:'getCurrentProjectName',
       
        // deletedTasks:'getDeletedTaskById'
      }),
      getProjectWiseTodo() {
        //   var projectList= this.projectListData;
        //   var projectId=this.$store.state.currentProjectId
        // if(!projectId && projectList.length>0){
        //     // projectId=this.$store.state.projectlist[0].id
        //     this.$store.state.currentProjectId=projectList[0].id
        //     this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '' ,project_id:projectId});
        // }else{
        //   console.log("cant set projectc id")
        // }

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
              //  level: 0,
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
      changeMenu (isMainTask, isRoleAccess) {
        this.isRoleAccess = isRoleAccess
        this.isMyTask = isMainTask
      },
      userDetail(deletedTasks) {
        deletedTasks.forEach(function (c) {
          let userId
          if (c.ddeletedBy) {
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
        // this.$store.commit('DELETE_ATTACHMENTS')
        // this.$store.state.userObject = {}
        // this.$store.state.isAuthorized = false
        this.$store.commit('userData')
        // this.$store.commit('authorize')
        CmnFunc.resetProjectDefault()
        // CmnFunc.deleteAutheticationDetail()
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
      
      // btnUpdateProfileClicked() {
      //   var bucket = new AWS.S3({params: {Bucket: 'obexpense'}});
      //   var fileChooser = document.getElementById('file');
      //   var file = fileChooser.files[0];
      //   if (file) {
      //     console.log('file type: ', file.type)
      //     console.log('body: ', file)
      //     var params = {Key: file.name, ContentType: file.type, Body: file};
      //     bucket.upload(params).on('httpUploadProgress', function(evt) {
      //     console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total)+'%');
      //     }).send(function(err, data) {
      //       alert("File uploaded successfully.");
      //       console.log('data: ', data)
      //       console.log('error: ', err)
      //     });
      // }
      // return false;

      // this.$store.state.userObject.username = this.username
      // this.$store.state.userObject.role = this.role
      // if (this.dob) {
      //   this.$store.state.userObject.dob = this.dob
      // }
      // this.$store.state.userObject.aboutme = this.aboutme
      // this.$store.commit('userData')
      // this.$http.post('/updateUserProfile', {
      //   email: this.$store.state.userObject.email,
      //   username: this.username,
      //   role: this.role,
      //   dob: this.dob,
      //   aboutme: this.aboutme,
      //   signup_type: this.$store.state.userObject.signup_type,
      //   image_url: this.imageURlProfilePic
      // }).then(response => response.json())
      // .then(json => {
      //   if (json.replaced) {
      //     $.notify.defaults({ className: "success" })
      //     $.notify("Profile updated successfully.", { globalPosition:"top center"})
      //   }
      //   var self = this
      //   this.$store.dispatch('updateUserProfile', {
      //     'fullname': this.username,
      //     'role': this.role,
      //     'dob': this.dob,
      //     'aboutme': this.aboutme,
      //     //'signup_type': this.$store.state.userObject.signup_type,
      //     'image_url': this.imageURlProfilePic
      //   })
      //     .then(function () {
      //       self.$store.state.userObject.fullname = self.username
      //       self.$store.state.userObject.role = self.role
      //       //if (this.dob) {
      //       self.$store.state.userObject.dob = self.dob
      //       //}
      //       self.$store.state.userObject.aboutme = self.aboutme
      //       self.$store.commit('userData')
      //     })
      //     .catch(function (error) {
      //       // $.notify.defaults({ className: "error" })
      //       // $.notify(error.message, { globalPosition:"top center"})
      //     });
      // },
      // btnProfileClicked() {
      //   console.log('UserName', this.$store.state.userObject.fullname)
      //   this.username = this.$store.state.userObject.fullname,
      //   console.log('UserName11', this.username)
      //     this.role = this.$store.state.userObject.role,
      //     this.aboutme = this.$store.state.userObject.aboutme,
      //     this.imageURlProfilePic = this.$store.state.userObject.image_url
      //   if (this.$store.state.userObject.dob) {
      //     this.datepicker = new Date(this.$store.state.userObject.dob)
      //   }
      //   this.enableUpdateProfileBtn()
      // },
      // picker9Formatter(date) {
      //   this.dob = Vue.moment(date).format('L');
      //   return this.dob
      // },
      // updateProfileImage() {
      //   this.loading = true
      //   let self = this
      //   var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
      //   var fileChooser = document.getElementById('file');
      //   var file = fileChooser.files[0];
      //   var imageKey = self.$store.state.userObject.image_name

      //   if (file) {
      //     var params = { Key: file.name, ContentType: file.type, Body: file };
      //     bucket.upload(params).on('httpUploadProgress', function (evt) {
      //       console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
      //     }).send(function (err, data) {
      //       console.log('file: ', file.name)
      //       self.imageURlProfilePic = data.Location
      //       self.$store.state.userObject.image_url = self.imageURlProfilePic
      //       self.$store.state.userObject.image_name = file.name
      //       self.$store.commit('userData')
      //       //Delete image from amazon
      //       console.log('data: ', data.Location)
      //       console.log('key: ', self.$store.state.userObject.image_name)
      //       var bucketInstance = new AWS.S3();
      //       var params = {
      //         Bucket: 'airflowbucket1/obexpense/expenses',
      //         Key: imageKey
      //       }
      //       bucketInstance.deleteObject(params, function (err, data) {
      //         if (data) {
      //           self.$http.post('/updateImageURL', {
      //             email: self.$store.state.userObject.email,
      //             signup_type: self.$store.state.userObject.signup_type,
      //             image_url: self.imageURlProfilePic,
      //             image_name: file.name
      //           }).then(response => {
      //             if (response.body.replaced) {
      //               self.loading = false
      //             }
      //           })
      //         }
      //         else {
      //           console.log("Check if you have sufficient permissions : ", err.stack);
      //         }
      //       });
      //     });
      //   }
      //   return false;
      // },
      // onFileChange() {
      //   this.loading = true;
      //   let self = this;
      //   var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
      //   var fileChooser = document.getElementById('file');
      //   var file = fileChooser.files[0];
      //   if (file) {
      //     var params = { Key: file.name, ContentType: file.type, Body: file };
      //     bucket.upload(params).on('httpUploadProgress', function (evt) {
      //       console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
      //     }).send(function (err, data) {
      //       // console.log("Amazon-data :: ", err);
      //       // self.$http.post('/updateImageURL', {
      //       // email: self.$store.state.userObject.email,
      //       // signup_type: self.$store.state.userObject.signup_type,
      //       // image_url: data.Location,
      //       // image_name: file.name
      //       // }).then(response => {
      //       //     if (response.body.replaced) {
      //       //         self.imageURlProfilePic = data.Location
      //       //         self.$store.state.userObject.image_url = self.imageURlProfilePic
      //       //         self.$store.state.userObject.image_name = file.name
      //       //         self.$store.commit('userData')
      //       //         self.loading = false
      //       //     }
      //       self.$store.dispatch('updateUserProfile', {
      //         image_url: data.Location,
      //         image_name: file.name
      //       })
      //         .then(function () {
      //           self.imageURlProfilePic = data.Location
      //           self.$store.state.userObject.image_url = self.imageURlProfilePic
      //           self.$store.state.userObject.image_name = file.name
      //           self.$store.commit('userData')
      //           self.loading = false
      //         })
      //         .catch(function (error) {
      //           // $.notify.defaults({ className: "error" })
      //           // $.notify(error.message, { globalPosition:"top center"})
      //         });
      //     });
      //   }
      //   return false;
      // },
      // createImage(file) {
      //   var image = new Image();
      //   var reader = new FileReader();
      //   reader.onload = (e) => {
      //     this.image = e.target.result;
      //   };
      //   reader.readAsDataURL(file);
      // },
      // removeImage: function (e) {
      //   this.loading = true
      //   this.imageURlProfilePic = null
      //   let self = this
      //   //Delete image from amazon
      //   var bucketInstance = new AWS.S3();
      //   var params = {
      //     Bucket: 'airflowbucket1/obexpense/expenses',
      //     Key: self.$store.state.userObject.image_name
      //   }
      //   bucketInstance.deleteObject(params, function (err, data) {
      //     if (data) {

      //       // self.$http.post('/updateImageURL', {
      //       //   email: self.$store.state.userObject.email,
      //       //   signup_type: self.$store.state.userObject.signup_type,
      //       //   image_url: self.imageURlProfilePic,
      //       //   image_name: ''
      //       //   }).then(response => {
      //       //       if (response.body.replaced) {
      //       //           self.$store.state.userObject.image_url = self.imageURlProfilePic
      //       //           self.$store.state.userObject.image_name = ''
      //       //           self.$store.commit('userData')
      //       //           self.loading = false
      //       //       }
      //       self.$store.dispatch('updateUserProfile', {
      //         image_url: self.imageURlProfilePic,
      //         image_name: ''
      //       })
      //         .then(function () {
      //           self.imageURlProfilePic = data.Location
      //           self.$store.state.userObject.image_url = self.imageURlProfilePic
      //           self.$store.state.userObject.image_name = ''
      //           self.$store.commit('userData')
      //           self.loading = false
      //         })
      //         .catch(function (error) {
      //           // $.notify.defaults({ className: "error" })
      //           // $.notify(error.message, { globalPosition:"top center"})
      //         });
      //     }
      //     else {
      //       console.log("Check if you have sufficient permissions : ", err.stack);
      //     }
      //   });
      // },
      // enableUpdateProfileBtn() {
      //   var trimmedusername = this.username.trim()
      //   if (trimmedusername.length >= 1) {
      //     $('#updateprofile_btn').removeClass('is-disabled')
      //     $("#updateprofile_btn").attr('disabled', false);
      //   } else {
      //     $('#updateprofile_btn').addClass('is-disabled')
      //     $("#updateprofile_btn").attr('disabled', true);
      //   }
      // }
      updateProjectName(){
        if(this.pName && this.pName.length > 0){
           this.$store.dispatch('renameProjectName',this.pName)
        }else{
           $.notify.defaults({ className: "error" })
           $.notify("Project name can't blank.", { globalPosition:"top center"})
        }
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
      CircularNavBar
    }
  }

</script>
<style>
/* animation sets */

/* move from / to  */

.pt-page-moveToLeft {
	-webkit-animation: moveToLeft .6s ease both;
	animation: moveToLeft .6s ease both;
}

.pt-page-moveFromLeft {
	-webkit-animation: moveFromLeft .6s ease both;
	animation: moveFromLeft .6s ease both;
}

.pt-page-moveToRight {
	-webkit-animation: moveToRight .6s ease both;
	animation: moveToRight .6s ease both;
}

.pt-page-moveFromRight {
	-webkit-animation: moveFromRight .6s ease both;
	animation: moveFromRight .6s ease both;
}

.pt-page-moveToTop {
	-webkit-animation: moveToTop .6s ease both;
	animation: moveToTop .6s ease both;
}

.pt-page-moveFromTop {
	-webkit-animation: moveFromTop .6s ease both;
	animation: moveFromTop .6s ease both;
}

.pt-page-moveToBottom {
	-webkit-animation: moveToBottom .6s ease both;
	animation: moveToBottom .6s ease both;
}

.pt-page-moveFromBottom {
	-webkit-animation: moveFromBottom .6s ease both;
	animation: moveFromBottom .6s ease both;
}

/* fade */

.pt-page-fade {
	-webkit-animation: fade .7s ease both;
	animation: fade .7s ease both;
}

/* move from / to and fade */

.pt-page-moveToLeftFade {
	-webkit-animation: moveToLeftFade .7s ease both;
	animation: moveToLeftFade .7s ease both;
}

.pt-page-moveFromLeftFade {
	-webkit-animation: moveFromLeftFade .7s ease both;
	animation: moveFromLeftFade .7s ease both;
}

.pt-page-moveToRightFade {
	-webkit-animation: moveToRightFade .7s ease both;
	animation: moveToRightFade .7s ease both;
}

.pt-page-moveFromRightFade {
	-webkit-animation: moveFromRightFade .7s ease both;
	animation: moveFromRightFade .7s ease both;
}

.pt-page-moveToTopFade {
	-webkit-animation: moveToTopFade .7s ease both;
	animation: moveToTopFade .7s ease both;
}

.pt-page-moveFromTopFade {
	-webkit-animation: moveFromTopFade .7s ease both;
	animation: moveFromTopFade .7s ease both;
}

.pt-page-moveToBottomFade {
	-webkit-animation: moveToBottomFade .7s ease both;
	animation: moveToBottomFade .7s ease both;
}

.pt-page-moveFromBottomFade {
	-webkit-animation: moveFromBottomFade .7s ease both;
	animation: moveFromBottomFade .7s ease both;
}

/* move to with different easing */

.pt-page-moveToLeftEasing {
	-webkit-animation: moveToLeft .7s ease-in-out both;
	animation: moveToLeft .7s ease-in-out both;
}
.pt-page-moveToRightEasing {
	-webkit-animation: moveToRight .7s ease-in-out both;
	animation: moveToRight .7s ease-in-out both;
}
.pt-page-moveToTopEasing {
	-webkit-animation: moveToTop .7s ease-in-out both;
	animation: moveToTop .7s ease-in-out both;
}
.pt-page-moveToBottomEasing {
	-webkit-animation: moveToBottom .7s ease-in-out both;
	animation: moveToBottom .7s ease-in-out both;
}

/********************************* keyframes **************************************/

/* move from / to  */

@-webkit-keyframes moveToLeft {
	from { }
	to { -webkit-transform: translateX(-100%); }
}
@keyframes moveToLeft {
	from { }
	to { -webkit-transform: translateX(-100%); transform: translateX(-100%); }
}

@-webkit-keyframes moveFromLeft {
	from { -webkit-transform: translateX(-100%); }
}
@keyframes moveFromLeft {
	from { -webkit-transform: translateX(-100%); transform: translateX(-100%); }
}

@-webkit-keyframes moveToRight { 
	from { }
	to { -webkit-transform: translateX(100%); }
}
@keyframes moveToRight { 
	from { }
	to { -webkit-transform: translateX(100%); transform: translateX(100%); }
}

@-webkit-keyframes moveFromRight {
	from { -webkit-transform: translateX(100%); }
}
@keyframes moveFromRight {
	from { -webkit-transform: translateX(100%); transform: translateX(100%); }
}

@-webkit-keyframes moveToTop {
	from { }
	to { -webkit-transform: translateY(-100%); }
}
@keyframes moveToTop {
	from { }
	to { -webkit-transform: translateY(-100%); transform: translateY(-100%); }
}

@-webkit-keyframes moveFromTop {
	from { -webkit-transform: translateY(-100%); }
}
@keyframes moveFromTop {
	from { -webkit-transform: translateY(-100%); transform: translateY(-100%); }
}

@-webkit-keyframes moveToBottom {
	from { }
	to { -webkit-transform: translateY(100%); }
}
@keyframes moveToBottom {
	from { }
	to { -webkit-transform: translateY(100%); transform: translateY(100%); }
}

@-webkit-keyframes moveFromBottom {
	from { -webkit-transform: translateY(100%); }
}
@keyframes moveFromBottom {
	from { -webkit-transform: translateY(100%); transform: translateY(100%); }
}

/* fade */

@-webkit-keyframes fade {
	from { }
	to { opacity: 0.3; }
}
@keyframes fade {
	from { }
	to { opacity: 0.3; }
}

/* move from / to and fade */

@-webkit-keyframes moveToLeftFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateX(-100%); }
}
@keyframes moveToLeftFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateX(-100%); transform: translateX(-100%); }
}

@-webkit-keyframes moveFromLeftFade {
	from { opacity: 0.3; -webkit-transform: translateX(-100%); }
}
@keyframes moveFromLeftFade {
	from { opacity: 0.3; -webkit-transform: translateX(-100%); transform: translateX(-100%); }
}

@-webkit-keyframes moveToRightFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateX(100%); }
}
@keyframes moveToRightFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateX(100%); transform: translateX(100%); }
}

@-webkit-keyframes moveFromRightFade {
	from { opacity: 0.3; -webkit-transform: translateX(100%); }
}
@keyframes moveFromRightFade {
	from { opacity: 0.3; -webkit-transform: translateX(100%); transform: translateX(100%); }
}

@-webkit-keyframes moveToTopFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateY(-100%); }
}
@keyframes moveToTopFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateY(-100%); transform: translateY(-100%); }
}

@-webkit-keyframes moveFromTopFade {
	from { opacity: 0.3; -webkit-transform: translateY(-100%); }
}
@keyframes moveFromTopFade {
	from { opacity: 0.3; -webkit-transform: translateY(-100%); transform: translateY(-100%); }
}

@-webkit-keyframes moveToBottomFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateY(100%); }
}
@keyframes moveToBottomFade {
	from { }
	to { opacity: 0.3; -webkit-transform: translateY(100%); transform: translateY(100%); }
}

@-webkit-keyframes moveFromBottomFade {
	from { opacity: 0.3; -webkit-transform: translateY(100%); }
}
@keyframes moveFromBottomFade {
	from { opacity: 0.3; -webkit-transform: translateY(100%); transform: translateY(100%); }
}

/* scale and fade */

.pt-page-scaleDown {
	-webkit-animation: scaleDown .7s ease both;
	animation: scaleDown .7s ease both;
}

.pt-page-scaleUp {
	-webkit-animation: scaleUp .7s ease both;
	animation: scaleUp .7s ease both;
}

.pt-page-scaleUpDown {
	-webkit-animation: scaleUpDown .5s ease both;
	animation: scaleUpDown .5s ease both;
}

.pt-page-scaleDownUp {
	-webkit-animation: scaleDownUp .5s ease both;
	animation: scaleDownUp .5s ease both;
}

.pt-page-scaleDownCenter {
	-webkit-animation: scaleDownCenter .4s ease-in both;
	animation: scaleDownCenter .4s ease-in both;
}

.pt-page-scaleUpCenter {
	-webkit-animation: scaleUpCenter .4s ease-out both;
	animation: scaleUpCenter .4s ease-out both;
}

/********************************* keyframes **************************************/

/* scale and fade */

@-webkit-keyframes scaleDown {
	from { }
	to { opacity: 0; -webkit-transform: scale(.8); }
}
@keyframes scaleDown {
	from { }
	to { opacity: 0; -webkit-transform: scale(.8); transform: scale(.8); }
}

@-webkit-keyframes scaleUp {
	from { opacity: 0; -webkit-transform: scale(.8); }
}
@keyframes scaleUp {
	from { opacity: 0; -webkit-transform: scale(.8); transform: scale(.8); }
}

@-webkit-keyframes scaleUpDown {
	from { opacity: 0; -webkit-transform: scale(1.2); }
}
@keyframes scaleUpDown {
	from { opacity: 0; -webkit-transform: scale(1.2); transform: scale(1.2); }
}

@-webkit-keyframes scaleDownUp {
	from { }
	to { opacity: 0; -webkit-transform: scale(1.2); }
}
@keyframes scaleDownUp {
	from { }
	to { opacity: 0; -webkit-transform: scale(1.2); transform: scale(1.2); }
}

@-webkit-keyframes scaleDownCenter {
	from { }
	to { opacity: 0; -webkit-transform: scale(.7); }
}
@keyframes scaleDownCenter {
	from { }
	to { opacity: 0; -webkit-transform: scale(.7); transform: scale(.7); }
}

@-webkit-keyframes scaleUpCenter {
	from { opacity: 0; -webkit-transform: scale(.7); }
}
@keyframes scaleUpCenter {
	from { opacity: 0; -webkit-transform: scale(.7); transform: scale(.7); }
}

/* rotate sides first and scale */

.pt-page-rotateRightSideFirst {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateRightSideFirst .8s both ease-in;
	animation: rotateRightSideFirst .8s both ease-in;
}
.pt-page-rotateLeftSideFirst {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateLeftSideFirst .8s both ease-in;
	animation: rotateLeftSideFirst .8s both ease-in;
}
.pt-page-rotateTopSideFirst {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateTopSideFirst .8s both ease-in;
	animation: rotateTopSideFirst .8s both ease-in;
}
.pt-page-rotateBottomSideFirst {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateBottomSideFirst .8s both ease-in;
	animation: rotateBottomSideFirst .8s both ease-in;
}

/* flip */

.pt-page-flipOutRight {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipOutRight .5s both ease-in;
	animation: flipOutRight .5s both ease-in;
}
.pt-page-flipInLeft {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipInLeft .5s both ease-out;
	animation: flipInLeft .5s both ease-out;
}
.pt-page-flipOutLeft {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipOutLeft .5s both ease-in;
	animation: flipOutLeft .5s both ease-in;
}
.pt-page-flipInRight {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipInRight .5s both ease-out;
	animation: flipInRight .5s both ease-out;
}
.pt-page-flipOutTop {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipOutTop .5s both ease-in;
	animation: flipOutTop .5s both ease-in;
}
.pt-page-flipInBottom {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipInBottom .5s both ease-out;
	animation: flipInBottom .5s both ease-out;
}
.pt-page-flipOutBottom {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipOutBottom .5s both ease-in;
	animation: flipOutBottom .5s both ease-in;
}
.pt-page-flipInTop {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: flipInTop .5s both ease-out;
	animation: flipInTop .5s both ease-out;
}

/* rotate fall */

.pt-page-rotateFall {
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
	-webkit-animation: rotateFall 1s both ease-in;
	animation: rotateFall 1s both ease-in;
}

/* rotate newspaper */
.pt-page-rotateOutNewspaper {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: rotateOutNewspaper .5s both ease-in;
	animation: rotateOutNewspaper .5s both ease-in;
}
.pt-page-rotateInNewspaper {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: rotateInNewspaper .5s both ease-out;
	animation: rotateInNewspaper .5s both ease-out;
}

/* push */
.pt-page-rotatePushLeft {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotatePushLeft .8s both ease;
	animation: rotatePushLeft .8s both ease;
}
.pt-page-rotatePushRight {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotatePushRight .8s both ease;
	animation: rotatePushRight .8s both ease;
}
.pt-page-rotatePushTop {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotatePushTop .8s both ease;
	animation: rotatePushTop .8s both ease;
}
.pt-page-rotatePushBottom {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotatePushBottom .8s both ease;
	animation: rotatePushBottom .8s both ease;
}

/* pull */
.pt-page-rotatePullRight {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotatePullRight .5s both ease;
	animation: rotatePullRight .5s both ease;
}
.pt-page-rotatePullLeft {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotatePullLeft .5s both ease;
	animation: rotatePullLeft .5s both ease;
}
.pt-page-rotatePullTop {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotatePullTop .5s both ease;
	animation: rotatePullTop .5s both ease;
}
.pt-page-rotatePullBottom {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotatePullBottom .5s both ease;
	animation: rotatePullBottom .5s both ease;
}

/* fold */
.pt-page-rotateFoldRight {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateFoldRight .7s both ease;
	animation: rotateFoldRight .7s both ease;
}
.pt-page-rotateFoldLeft {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateFoldLeft .7s both ease;
	animation: rotateFoldLeft .7s both ease;
}
.pt-page-rotateFoldTop {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateFoldTop .7s both ease;
	animation: rotateFoldTop .7s both ease;
}
.pt-page-rotateFoldBottom {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateFoldBottom .7s both ease;
	animation: rotateFoldBottom .7s both ease;
}

/* unfold */
.pt-page-rotateUnfoldLeft {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateUnfoldLeft .7s both ease;
	animation: rotateUnfoldLeft .7s both ease;
}
.pt-page-rotateUnfoldRight {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateUnfoldRight .7s both ease;
	animation: rotateUnfoldRight .7s both ease;
}
.pt-page-rotateUnfoldTop {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateUnfoldTop .7s both ease;
	animation: rotateUnfoldTop .7s both ease;
}
.pt-page-rotateUnfoldBottom {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateUnfoldBottom .7s both ease;
	animation: rotateUnfoldBottom .7s both ease;
}

/* room walls */
.pt-page-rotateRoomLeftOut {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateRoomLeftOut .8s both ease;
	animation: rotateRoomLeftOut .8s both ease;
}
.pt-page-rotateRoomLeftIn {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateRoomLeftIn .8s both ease;
	animation: rotateRoomLeftIn .8s both ease;
}
.pt-page-rotateRoomRightOut {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateRoomRightOut .8s both ease;
	animation: rotateRoomRightOut .8s both ease;
}
.pt-page-rotateRoomRightIn {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateRoomRightIn .8s both ease;
	animation: rotateRoomRightIn .8s both ease;
}
.pt-page-rotateRoomTopOut {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateRoomTopOut .8s both ease;
	animation: rotateRoomTopOut .8s both ease;
}
.pt-page-rotateRoomTopIn {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateRoomTopIn .8s both ease;
	animation: rotateRoomTopIn .8s both ease;
}
.pt-page-rotateRoomBottomOut {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateRoomBottomOut .8s both ease;
	animation: rotateRoomBottomOut .8s both ease;
}
.pt-page-rotateRoomBottomIn {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateRoomBottomIn .8s both ease;
	animation: rotateRoomBottomIn .8s both ease;
}

/* cube */
.pt-page-rotateCubeLeftOut {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateCubeLeftOut .6s both ease-in;
	animation: rotateCubeLeftOut .6s both ease-in;
}
.pt-page-rotateCubeLeftIn {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateCubeLeftIn .6s both ease-in;
	animation: rotateCubeLeftIn .6s both ease-in;
}
.pt-page-rotateCubeRightOut {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateCubeRightOut .6s both ease-in;
	animation: rotateCubeRightOut .6s both ease-in;
}
.pt-page-rotateCubeRightIn {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateCubeRightIn .6s both ease-in;
	animation: rotateCubeRightIn .6s both ease-in;
}
.pt-page-rotateCubeTopOut {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateCubeTopOut .6s both ease-in;
	animation: rotateCubeTopOut .6s both ease-in;
}
.pt-page-rotateCubeTopIn {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateCubeTopIn .6s both ease-in;
	animation: rotateCubeTopIn .6s both ease-in;
}
.pt-page-rotateCubeBottomOut {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateCubeBottomOut .6s both ease-in;
	animation: rotateCubeBottomOut .6s both ease-in;
}
.pt-page-rotateCubeBottomIn {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateCubeBottomIn .6s both ease-in;
	animation: rotateCubeBottomIn .6s both ease-in;
}

/* carousel */
.pt-page-rotateCarouselLeftOut {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateCarouselLeftOut .8s both ease;
	animation: rotateCarouselLeftOut .8s both ease;
}
.pt-page-rotateCarouselLeftIn {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateCarouselLeftIn .8s both ease;
	animation: rotateCarouselLeftIn .8s both ease;
}
.pt-page-rotateCarouselRightOut {
	-webkit-transform-origin: 0% 50%;
	transform-origin: 0% 50%;
	-webkit-animation: rotateCarouselRightOut .8s both ease;
	animation: rotateCarouselRightOut .8s both ease;
}
.pt-page-rotateCarouselRightIn {
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	-webkit-animation: rotateCarouselRightIn .8s both ease;
	animation: rotateCarouselRightIn .8s both ease;
}
.pt-page-rotateCarouselTopOut {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateCarouselTopOut .8s both ease;
	animation: rotateCarouselTopOut .8s both ease;
}
.pt-page-rotateCarouselTopIn {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateCarouselTopIn .8s both ease;
	animation: rotateCarouselTopIn .8s both ease;
}
.pt-page-rotateCarouselBottomOut {
	-webkit-transform-origin: 50% 0%;
	transform-origin: 50% 0%;
	-webkit-animation: rotateCarouselBottomOut .8s both ease;
	animation: rotateCarouselBottomOut .8s both ease;
}
.pt-page-rotateCarouselBottomIn {
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-animation: rotateCarouselBottomIn .8s both ease;
	animation: rotateCarouselBottomIn .8s both ease;
}

/* sides */
.pt-page-rotateSidesOut {
	-webkit-transform-origin: -50% 50%;
	transform-origin: -50% 50%;
	-webkit-animation: rotateSidesOut .5s both ease-in;
	animation: rotateSidesOut .5s both ease-in;
}
.pt-page-rotateSidesIn {
	-webkit-transform-origin: 150% 50%;
	transform-origin: 150% 50%;
	-webkit-animation: rotateSidesIn .5s both ease-out;
	animation: rotateSidesIn .5s both ease-out;
}

/* slide */
.pt-page-rotateSlideOut {
	-webkit-animation: rotateSlideOut 1s both ease;
	animation: rotateSlideOut 1s both ease;
}
.pt-page-rotateSlideIn {
	-webkit-animation: rotateSlideIn 1s both ease;
	animation: rotateSlideIn 1s both ease;
}

/********************************* keyframes **************************************/

/* rotate sides first and scale */

@-webkit-keyframes rotateRightSideFirst {
	0% { }
	40% { -webkit-transform: rotateY(15deg); opacity: .8; -webkit-animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); opacity:0; }
}
@keyframes rotateRightSideFirst {
	0% { }
	40% { -webkit-transform: rotateY(15deg); transform: rotateY(15deg); opacity: .8; -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); transform: scale(0.8) translateZ(-200px); opacity:0; }
}

@-webkit-keyframes rotateLeftSideFirst {
	0% { }
	40% { -webkit-transform: rotateY(-15deg); opacity: .8; -webkit-animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); opacity:0; }
}
@keyframes rotateLeftSideFirst {
	0% { }
	40% { -webkit-transform: rotateY(-15deg); transform: rotateY(-15deg); opacity: .8; -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); transform: scale(0.8) translateZ(-200px); opacity:0; }
}

@-webkit-keyframes rotateTopSideFirst {
	0% { }
	40% { -webkit-transform: rotateX(15deg); opacity: .8; -webkit-animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); opacity:0; }
}
@keyframes rotateTopSideFirst {
	0% { }
	40% { -webkit-transform: rotateX(15deg); transform: rotateX(15deg); opacity: .8; -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); transform: scale(0.8) translateZ(-200px); opacity:0; }
}

@-webkit-keyframes rotateBottomSideFirst {
	0% { }
	40% { -webkit-transform: rotateX(-15deg); opacity: .8; -webkit-animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); opacity:0; }
}
@keyframes rotateBottomSideFirst {
	0% { }
	40% { -webkit-transform: rotateX(-15deg); transform: rotateX(-15deg); opacity: .8; -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; }
	100% { -webkit-transform: scale(0.8) translateZ(-200px); transform: scale(0.8) translateZ(-200px); opacity:0; }
}

/* flip */

@-webkit-keyframes flipOutRight {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
}
@keyframes flipOutRight {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateY(90deg); transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
}

@-webkit-keyframes flipInLeft {
	from { -webkit-transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
}
@keyframes flipInLeft {
	from { -webkit-transform: translateZ(-1000px) rotateY(-90deg); transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
}

@-webkit-keyframes flipOutLeft {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
}
@keyframes flipOutLeft {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateY(-90deg); transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
}

@-webkit-keyframes flipInRight {
	from { -webkit-transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
}
@keyframes flipInRight {
	from { -webkit-transform: translateZ(-1000px) rotateY(90deg); transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
}

@-webkit-keyframes flipOutTop {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
}
@keyframes flipOutTop {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateX(90deg); transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
}

@-webkit-keyframes flipInBottom {
	from { -webkit-transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
}
@keyframes flipInBottom {
	from { -webkit-transform: translateZ(-1000px) rotateX(-90deg); transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
}

@-webkit-keyframes flipOutBottom {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
}
@keyframes flipOutBottom {
	from { }
	to { -webkit-transform: translateZ(-1000px) rotateX(-90deg); transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
}

@-webkit-keyframes flipInTop {
	from { -webkit-transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
}
@keyframes flipInTop {
	from { -webkit-transform: translateZ(-1000px) rotateX(90deg); transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
}

/* fall */

@-webkit-keyframes rotateFall {
	0% { -webkit-transform: rotateZ(0deg); }
	20% { -webkit-transform: rotateZ(10deg); -webkit-animation-timing-function: ease-out; }
	40% { -webkit-transform: rotateZ(17deg); }
	60% { -webkit-transform: rotateZ(16deg); }
	100% { -webkit-transform: translateY(100%) rotateZ(17deg); }
}
@keyframes rotateFall {
	0% { -webkit-transform: rotateZ(0deg); transform: rotateZ(0deg); }
	20% { -webkit-transform: rotateZ(10deg); transform: rotateZ(10deg); -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; }
	40% { -webkit-transform: rotateZ(17deg); transform: rotateZ(17deg); }
	60% { -webkit-transform: rotateZ(16deg); transform: rotateZ(16deg); }
	100% { -webkit-transform: translateY(100%) rotateZ(17deg); transform: translateY(100%) rotateZ(17deg); }
}

/* newspaper */

@-webkit-keyframes rotateOutNewspaper {
	from { }
	to { -webkit-transform: translateZ(-3000px) rotateZ(360deg); opacity: 0; }
}
@keyframes rotateOutNewspaper {
	from { }
	to { -webkit-transform: translateZ(-3000px) rotateZ(360deg); transform: translateZ(-3000px) rotateZ(360deg); opacity: 0; }
}

@-webkit-keyframes rotateInNewspaper {
	from { -webkit-transform: translateZ(-3000px) rotateZ(-360deg); opacity: 0; }
}
@keyframes rotateInNewspaper {
	from { -webkit-transform: translateZ(-3000px) rotateZ(-360deg); transform: translateZ(-3000px) rotateZ(-360deg); opacity: 0; }
}

/* push */

@-webkit-keyframes rotatePushLeft {
	from { }
	to { opacity: 0; -webkit-transform: rotateY(90deg); }
}
@keyframes rotatePushLeft {
	from { }
	to { opacity: 0; -webkit-transform: rotateY(90deg); transform: rotateY(90deg); }
}

@-webkit-keyframes rotatePushRight {
	from { }
	to { opacity: 0; -webkit-transform: rotateY(-90deg); }
}
@keyframes rotatePushRight {
	from { }
	to { opacity: 0; -webkit-transform: rotateY(-90deg); transform: rotateY(-90deg); }
}

@-webkit-keyframes rotatePushTop {
	from { }
	to { opacity: 0; -webkit-transform: rotateX(-90deg); }
}
@keyframes rotatePushTop {
	from { }
	to { opacity: 0; -webkit-transform: rotateX(-90deg); transform: rotateX(-90deg); }
}

@-webkit-keyframes rotatePushBottom {
	from { }
	to { opacity: 0; -webkit-transform: rotateX(90deg); }
}
@keyframes rotatePushBottom {
	from { }
	to { opacity: 0; -webkit-transform: rotateX(90deg); transform: rotateX(90deg); }
}

/* pull */

@-webkit-keyframes rotatePullRight {
	from { opacity: 0; -webkit-transform: rotateY(-90deg); }
}
@keyframes rotatePullRight {
	from { opacity: 0; -webkit-transform: rotateY(-90deg); transform: rotateY(-90deg); }
}

@-webkit-keyframes rotatePullLeft {
	from { opacity: 0; -webkit-transform: rotateY(90deg); }
}
@keyframes rotatePullLeft {
	from { opacity: 0; -webkit-transform: rotateY(90deg); transform: rotateY(90deg); }
}

@-webkit-keyframes rotatePullTop {
	from { opacity: 0; -webkit-transform: rotateX(-90deg); }
}
@keyframes rotatePullTop {
	from { opacity: 0; -webkit-transform: rotateX(-90deg); transform: rotateX(-90deg); }
}

@-webkit-keyframes rotatePullBottom {
	from { opacity: 0; -webkit-transform: rotateX(90deg); }
}
@keyframes rotatePullBottom {
	from { opacity: 0; -webkit-transform: rotateX(90deg); transform: rotateX(90deg); }
}

/* fold */

@-webkit-keyframes rotateFoldRight {
	from { }
	to { opacity: 0; -webkit-transform: translateX(100%) rotateY(90deg); }
}
@keyframes rotateFoldRight {
	from { }
	to { opacity: 0; -webkit-transform: translateX(100%) rotateY(90deg); transform: translateX(100%) rotateY(90deg); }
}

@-webkit-keyframes rotateFoldLeft {
	from { }
	to { opacity: 0; -webkit-transform: translateX(-100%) rotateY(-90deg); }
}
@keyframes rotateFoldLeft {
	from { }
	to { opacity: 0; -webkit-transform: translateX(-100%) rotateY(-90deg); transform: translateX(-100%) rotateY(-90deg); }
}

@-webkit-keyframes rotateFoldTop {
	from { }
	to { opacity: 0; -webkit-transform: translateY(-100%) rotateX(90deg); }
}
@keyframes rotateFoldTop {
	from { }
	to { opacity: 0; -webkit-transform: translateY(-100%) rotateX(90deg); transform: translateY(-100%) rotateX(90deg); }
}

@-webkit-keyframes rotateFoldBottom {
	from { }
	to { opacity: 0; -webkit-transform: translateY(100%) rotateX(-90deg); }
}
@keyframes rotateFoldBottom {
	from { }
	to { opacity: 0; -webkit-transform: translateY(100%) rotateX(-90deg); transform: translateY(100%) rotateX(-90deg); }
}

/* unfold */

@-webkit-keyframes rotateUnfoldLeft {
	from { opacity: 0; -webkit-transform: translateX(-100%) rotateY(-90deg); }
}
@keyframes rotateUnfoldLeft {
	from { opacity: 0; -webkit-transform: translateX(-100%) rotateY(-90deg); transform: translateX(-100%) rotateY(-90deg); }
}

@-webkit-keyframes rotateUnfoldRight {
	from { opacity: 0; -webkit-transform: translateX(100%) rotateY(90deg); }
}
@keyframes rotateUnfoldRight {
	from { opacity: 0; -webkit-transform: translateX(100%) rotateY(90deg); transform: translateX(100%) rotateY(90deg); }
}

@-webkit-keyframes rotateUnfoldTop {
	from { opacity: 0; -webkit-transform: translateY(-100%) rotateX(90deg); }
}
@keyframes rotateUnfoldTop {
	from { opacity: 0; -webkit-transform: translateY(-100%) rotateX(90deg); transform: translateY(-100%) rotateX(90deg); }
}

@-webkit-keyframes rotateUnfoldBottom {
	from { opacity: 0; -webkit-transform: translateY(100%) rotateX(-90deg); }
}
@keyframes rotateUnfoldBottom {
	from { opacity: 0; -webkit-transform: translateY(100%) rotateX(-90deg); transform: translateY(100%) rotateX(-90deg); }
}

/* room walls */

@-webkit-keyframes rotateRoomLeftOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(-100%) rotateY(90deg); }
}
@keyframes rotateRoomLeftOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(-100%) rotateY(90deg); transform: translateX(-100%) rotateY(90deg); }
}

@-webkit-keyframes rotateRoomLeftIn {
	from { opacity: .3; -webkit-transform: translateX(100%) rotateY(-90deg); }
}
@keyframes rotateRoomLeftIn {
	from { opacity: .3; -webkit-transform: translateX(100%) rotateY(-90deg); transform: translateX(100%) rotateY(-90deg); }
}

@-webkit-keyframes rotateRoomRightOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(100%) rotateY(-90deg); }
}
@keyframes rotateRoomRightOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(100%) rotateY(-90deg); transform: translateX(100%) rotateY(-90deg); }
}

@-webkit-keyframes rotateRoomRightIn {
	from { opacity: .3; -webkit-transform: translateX(-100%) rotateY(90deg); }
}
@keyframes rotateRoomRightIn {
	from { opacity: .3; -webkit-transform: translateX(-100%) rotateY(90deg); transform: translateX(-100%) rotateY(90deg); }
}

@-webkit-keyframes rotateRoomTopOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(-100%) rotateX(-90deg); }
}
@keyframes rotateRoomTopOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(-100%) rotateX(-90deg); transform: translateY(-100%) rotateX(-90deg); }
}

@-webkit-keyframes rotateRoomTopIn {
	from { opacity: .3; -webkit-transform: translateY(100%) rotateX(90deg); }
}
@keyframes rotateRoomTopIn {
	from { opacity: .3; -webkit-transform: translateY(100%) rotateX(90deg); transform: translateY(100%) rotateX(90deg); }
}

@-webkit-keyframes rotateRoomBottomOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(100%) rotateX(90deg); }
}
@keyframes rotateRoomBottomOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(100%) rotateX(90deg); transform: translateY(100%) rotateX(90deg); }
}

@-webkit-keyframes rotateRoomBottomIn {
	from { opacity: .3; -webkit-transform: translateY(-100%) rotateX(-90deg); }
}
@keyframes rotateRoomBottomIn {
	from { opacity: .3; -webkit-transform: translateY(-100%) rotateX(-90deg); transform: translateY(-100%) rotateX(-90deg); }
}

/* cube */

@-webkit-keyframes rotateCubeLeftOut {
	0% { }
	50% { -webkit-animation-timing-function: ease-out;  -webkit-transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
	100% { opacity: .3; -webkit-transform: translateX(-100%) rotateY(-90deg); }
}
@keyframes rotateCubeLeftOut {
	0% { }
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out;  -webkit-transform: translateX(-50%) translateZ(-200px) rotateY(-45deg);  transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
	100% { opacity: .3; -webkit-transform: translateX(-100%) rotateY(-90deg); transform: translateX(-100%) rotateY(-90deg); }
}

@-webkit-keyframes rotateCubeLeftIn {
	0% { opacity: .3; -webkit-transform: translateX(100%) rotateY(90deg); }
	50% { -webkit-animation-timing-function: ease-out;  -webkit-transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
}
@keyframes rotateCubeLeftIn {
	0% { opacity: .3; -webkit-transform: translateX(100%) rotateY(90deg); transform: translateX(100%) rotateY(90deg); }
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out;  -webkit-transform: translateX(50%) translateZ(-200px) rotateY(45deg);  transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
}

@-webkit-keyframes rotateCubeRightOut {
	0% { }
	50% { -webkit-animation-timing-function: ease-out; -webkit-transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
	100% { opacity: .3; -webkit-transform: translateX(100%) rotateY(90deg); }
}
@keyframes rotateCubeRightOut {
	0% { }
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; -webkit-transform: translateX(50%) translateZ(-200px) rotateY(45deg); transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
	100% { opacity: .3; -webkit-transform: translateX(100%) rotateY(90deg); transform: translateX(100%) rotateY(90deg); }
}

@-webkit-keyframes rotateCubeRightIn {
	0% { opacity: .3; -webkit-transform: translateX(-100%) rotateY(-90deg); }
	50% { -webkit-animation-timing-function: ease-out; -webkit-transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
}
@keyframes rotateCubeRightIn {
	0% { opacity: .3; -webkit-transform: translateX(-100%) rotateY(-90deg); transform: translateX(-100%) rotateY(-90deg); }
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; -webkit-transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
}

@-webkit-keyframes rotateCubeTopOut {
	0% { }
	50% { -webkit-animation-timing-function: ease-out; -webkit-transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
	100% { opacity: .3; -webkit-transform: translateY(-100%) rotateX(90deg); }
}
@keyframes rotateCubeTopOut {
	0% {}
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; -webkit-transform: translateY(-50%) translateZ(-200px) rotateX(45deg); transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
	100% { opacity: .3; -webkit-transform: translateY(-100%) rotateX(90deg); transform: translateY(-100%) rotateX(90deg); }
}

@-webkit-keyframes rotateCubeTopIn {
	0% { opacity: .3; -webkit-transform: translateY(100%) rotateX(-90deg); }
	50% { -webkit-animation-timing-function: ease-out; -webkit-transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
}
@keyframes rotateCubeTopIn {
	0% { opacity: .3; -webkit-transform: translateY(100%) rotateX(-90deg); transform: translateY(100%) rotateX(-90deg); }
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; -webkit-transform: translateY(50%) translateZ(-200px) rotateX(-45deg); transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
}

@-webkit-keyframes rotateCubeBottomOut {
	0% { }
	50% { -webkit-animation-timing-function: ease-out; -webkit-transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
	100% { opacity: .3; -webkit-transform: translateY(100%) rotateX(-90deg); }
}
@keyframes rotateCubeBottomOut {
	0% { }
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; -webkit-transform: translateY(50%) translateZ(-200px) rotateX(-45deg); transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
	100% { opacity: .3; -webkit-transform: translateY(100%) rotateX(-90deg); transform: translateY(100%) rotateX(-90deg); }
}

@-webkit-keyframes rotateCubeBottomIn {
	0% { opacity: .3; -webkit-transform: translateY(-100%) rotateX(90deg); }
	50% { -webkit-animation-timing-function: ease-out; -webkit-transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
}
@keyframes rotateCubeBottomIn {
	0% { opacity: .3; -webkit-transform: translateY(-100%) rotateX(90deg); transform: translateY(-100%) rotateX(90deg); }
	50% { -webkit-animation-timing-function: ease-out; animation-timing-function: ease-out; -webkit-transform: translateY(-50%) translateZ(-200px) rotateX(45deg); transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
}

/* carousel */

@-webkit-keyframes rotateCarouselLeftOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(-150%) scale(.4) rotateY(-65deg); }
}
@keyframes rotateCarouselLeftOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(-150%) scale(.4) rotateY(-65deg); transform: translateX(-150%) scale(.4) rotateY(-65deg); }
}

@-webkit-keyframes rotateCarouselLeftIn {
	from { opacity: .3; -webkit-transform: translateX(200%) scale(.4) rotateY(65deg); }
}
@keyframes rotateCarouselLeftIn {
	from { opacity: .3; -webkit-transform: translateX(200%) scale(.4) rotateY(65deg); transform: translateX(200%) scale(.4) rotateY(65deg); }
}

@-webkit-keyframes rotateCarouselRightOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(200%) scale(.4) rotateY(65deg); }
}
@keyframes rotateCarouselRightOut {
	from { }
	to { opacity: .3; -webkit-transform: translateX(200%) scale(.4) rotateY(65deg); transform: translateX(200%) scale(.4) rotateY(65deg); }
}

@-webkit-keyframes rotateCarouselRightIn {
	from { opacity: .3; -webkit-transform: translateX(-200%) scale(.4) rotateY(-65deg); }
}
@keyframes rotateCarouselRightIn {
	from { opacity: .3; -webkit-transform: translateX(-200%) scale(.4) rotateY(-65deg); transform: translateX(-200%) scale(.4) rotateY(-65deg); }
}

@-webkit-keyframes rotateCarouselTopOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(-200%) scale(.4) rotateX(65deg); }
}
@keyframes rotateCarouselTopOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(-200%) scale(.4) rotateX(65deg); transform: translateY(-200%) scale(.4) rotateX(65deg); }
}

@-webkit-keyframes rotateCarouselTopIn {
	from { opacity: .3; -webkit-transform: translateY(200%) scale(.4) rotateX(-65deg); }
}
@keyframes rotateCarouselTopIn {
	from { opacity: .3; -webkit-transform: translateY(200%) scale(.4) rotateX(-65deg); transform: translateY(200%) scale(.4) rotateX(-65deg); }
}

@-webkit-keyframes rotateCarouselBottomOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(200%) scale(.4) rotateX(-65deg); }
}
@keyframes rotateCarouselBottomOut {
	from { }
	to { opacity: .3; -webkit-transform: translateY(200%) scale(.4) rotateX(-65deg); transform: translateY(200%) scale(.4) rotateX(-65deg); }
}

@-webkit-keyframes rotateCarouselBottomIn {
	from { opacity: .3; -webkit-transform: translateY(-200%) scale(.4) rotateX(65deg); }
}
@keyframes rotateCarouselBottomIn {
	from { opacity: .3; -webkit-transform: translateY(-200%) scale(.4) rotateX(65deg); transform: translateY(-200%) scale(.4) rotateX(65deg); }
}

/* sides */

@-webkit-keyframes rotateSidesOut {
	from { }
	to { opacity: 0; -webkit-transform: translateZ(-500px) rotateY(90deg); }
}
@keyframes rotateSidesOut {
	from { }
	to { opacity: 0; -webkit-transform: translateZ(-500px) rotateY(90deg); transform: translateZ(-500px) rotateY(90deg); }
}

@-webkit-keyframes rotateSidesIn {
	from { opacity: 0; -webkit-transform: translateZ(-500px) rotateY(-90deg); }
}
@keyframes rotateSidesIn {
	from { opacity: 0; -webkit-transform: translateZ(-500px) rotateY(-90deg); transform: translateZ(-500px) rotateY(-90deg); }
}

/* slide */

@-webkit-keyframes rotateSlideOut {
	0% { }
	25% { opacity: .5; -webkit-transform: translateZ(-500px); }
	75% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); }
	100% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); }
}
@keyframes rotateSlideOut {
	0% { }
	25% { opacity: .5; -webkit-transform: translateZ(-500px); transform: translateZ(-500px); }
	75% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); transform: translateZ(-500px) translateX(-200%); }
	100% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); transform: translateZ(-500px) translateX(-200%); }
}

@-webkit-keyframes rotateSlideIn {
	0%, 25% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(200%); }
	75% { opacity: .5; -webkit-transform: translateZ(-500px); }
	100% { opacity: 1; -webkit-transform: translateZ(0) translateX(0); }
}
@keyframes rotateSlideIn {
	0%, 25% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(200%); transform: translateZ(-500px) translateX(200%); }
	75% { opacity: .5; -webkit-transform: translateZ(-500px); transform: translateZ(-500px); }
	100% { opacity: 1; -webkit-transform: translateZ(0) translateX(0); transform: translateZ(0) translateX(0); }
}

/* animation delay classes */

.pt-page-delay100 {
	-webkit-animation-delay: .1s;
	animation-delay: .1s;
}
.pt-page-delay180 {
	-webkit-animation-delay: .180s;
	animation-delay: .180s;
}
.pt-page-delay200 {
	-webkit-animation-delay: .2s;
	animation-delay: .2s;
}
.pt-page-delay300 {
	-webkit-animation-delay: .3s;
	animation-delay: .3s;
}
.pt-page-delay400 {
	-webkit-animation-delay: .4s;
	animation-delay: .4s;
}
.pt-page-delay500 {
	-webkit-animation-delay: .5s;
	animation-delay: .5s;
}
.pt-page-delay700 {
	-webkit-animation-delay: .7s;
	animation-delay: .7s;
}
.pt-page-delay1000 {
	-webkit-animation-delay: 1s;
	animation-delay: 1s;
}

</style>