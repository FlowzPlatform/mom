<template>
  <section class="todoapp">
    <!--<div data-reactroot="" class="Topbar">
      <div class="Topbar-navButtonContainer">
        <a class="Topbar-navButton">
          <svg class="Icon HamburgerIcon Topbar-sidebarToggleIcon" title="HamburgerIcon" viewBox="0 0 32 32"><rect x="2" y="4" width="28" height="4"></rect><rect x="2" y="14" width="28" height="4"></rect><rect x="2" y="24" width="28" height="4"></rect></svg>
        </a>
      </div>
      <a class="NavigationLink Topbar-myTasksButton is-selected" href="">
      My Tasks
      </a>
      <a class="NavigationLink Topbar-notificationsButton" href="">
      Inbox</a>
      <a class="NavigationLink Topbar-myDashboardButton" href="">
      Dashboard</a>
      <div class="Topbar-accountInfo">
      <a class="Button Button--small Button--primary topbarContingentUpgradeButton-button" tabindex="0" aria-role="button">
        Upgrade</a>
      <a class="Topbar-settingsMenuButton">
      <span class="Topbar-settingsMenuDomainName"><span>Welcome {{ uname }}</span></span>
      
      <div  class="dropdown-toggle Avatar Avatar--medium Avatar--color4 Topbar-settingsMenuAvatar" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
      <span v-if="imageURlProfilePic"><img v-bind:src="imageURlProfilePic" /></span>
      <span v-else>{{ capitalizeLetters }}</span>
      </div>
      <ul class="dropdown-menu">
            <li><a  data-toggle="modal" data-target="#myModal2" @click="btnProfileClicked()">Profile</a></li>
            <hr>
            <li><a href="#" @click="btnLogoutClicked()">Sign out</a></li>
            </ul></li>
      </a>
    </div>
  </div>-->

    <!--<div data-reactroot="" class="PageHeaderStructure MyTasksPageHeader">-->
    <!--<div class="PageHeaderStructure-center">
          <div class="PageHeaderStructure-titleRow">
            <div class="PageHeaderStructure-titleLeftElement">
              <div class="Avatar Avatar--small Avatar--color4 MyTasksPageHeader-ownAvatar MyTasksPageHeader-avatar">
              </div>
            </div>
            <div class="PageHeaderStructure-title MyTasksPageHeader-title">My Tasks</div>
            </div>
          </div>
          <div class="PageHeaderStructure-right">
          </div>
        </div>-->
    <div class="row asanaView-body" style="padding-top: 15px; margin: 10px 10px 10px 10px;">
      <div class="asanaView-paneGutter"></div>
      <!--<settings-menu :showModal="settings_menu" :closeAction="closeDialog"></settings-menu>-->

      <div id="center_pane_container" class="known-list">
        <div id="center_pane">

          <left-toolbar :filters="filters">
          </left-toolbar>
          <main-left-section :isCopyLink="isCopyLink" :todoObject="todoObjectById" :pholder="taskPholder" :filtered-todos="taskById"></main-left-section>
        </div>
      </div>
      <div :id="n.level" class="right_pane_container" v-for="(n, index) in parentIdArray">
        <div id="right_pane">
          <main-right-section :id="n.level" :pholder="subtaskPholder" :todoObject="n"></main-right-section>
        </div>
      </div>
      <div class="asanaView-paneGutter"></div>
    </div>
    <!--<div id="myModal2" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" style="display: none;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel2">My profile settings</h4>
          </div>
          <div class="modal-body">
            <div class="form-input">
              <div class="img-part">
                <span class="upl-img">
                <ui-progress-circular color="black" type="indeterminate" v-show="loading" class="circularProgress">
                </ui-progress-circular>
                <img v-bind:src="imageURlProfilePic"/>
              </span>
              </div>
              <span class="pro-part">
                  <label>Name {{username}}</label>
                  <input type="username" v-model='username' @keyup='enableUpdateProfileBtn'>
                  <div class="picture-action-label" v-if='!imageURlProfilePic'>
                      <input autocomplete="off" type="file" id="file" name="file" title="" class="photo-file-input" accept="image/gif,image/png,image/jpeg,image/tiff,image/bmp" @change="onFileChange">
                    <span class="img-upload">Add a profile photo</span>
            </div>
            <div class="picture-action-label" v-else>
              <div class="picture-action-label changeProfilePosition">
                <input autocomplete="off" type="file" id="file" name="file" title="" class="photo-file-input" accept="image/gif,image/png,image/jpeg,image/tiff,image/bmp"
                  @change="updateProfileImage">
                <span class="img-upload">Change profile photo</span>
              </div>
              <div class="clearImgBlock"><span class="img-upload clearImgPosition" @click="removeImage">Clear photo</span></div>
            </div>
            </span>
          </div>
          <div class="form-input">
            <div class="img-part">
              <label>DATE OF BIRTH</label>
            </div>
            <span class="pro-part">
              <ui-datepicker
                          icon="event"
                          placeholder="mm-dd-yyyy"
                          v-model="datepicker" :custom-formatter="picker9Formatter" :max-date="picker10Max">
              </ui-datepicker>
          </span>
          </div>

          <div class="form-input">
            <div class="img-part">
              <label>Role</label>
            </div>
            <span class="pro-part">
                <input type="role" v-model='role'>
</span>
          </div>
          <div class="form-input">
            <div class="img-part">
              <label>About me</label>
            </div>
            <span class="pro-part">
              <textarea class="generic-input showing about-me" id="" style="height: 100px;" placeholder="" maxlength="200" v-model='aboutme'></textarea>
</span>
          </div>
          <div :passData="passData" class="form-input form-input--button" style="margin-right: 30px; padding-bottom: 30px;">
            <button class="buttonView buttonView--default buttonView--primary buttonView--large is-disabled" data-dismiss="modal" aria-hidden="true"
              id="updateprofile_btn" @click="btnUpdateProfileClicked()"><span>Update Profile
                </span></button>
          </div>
        </div>
      </div>
    </div>
    </div>-->
  </section>
</template>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script>
  /* eslint-disable*/
  import MainLeftSection from './MainLeftSection.vue'
  import MainRightSection from './MainRightSection.vue'
  import LeftToolbar from './LeftToolbar.vue'

  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  Vue.use(BootstrapVue)
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapGetters, mapActions } from 'vuex'
  Vue.use(require('vue-moment'))

  const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.completed),
    completed: todos => todos.filter(todo => todo.completed)
  }

  function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    console.log('reg', reg)
    var string = reg.exec(href);
    console.log('string', string)
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
        isCopyLink: false
      }
    },
    created() {
      this.$store.dispatch('eventListener');
      // ...mapActions([
      //         'getAllTodos'
      //     ])

      // get loaded URL to get querystring param
      //  var url = window.location.href;
      //  this.url_parentId = getQueryString('task', url)
      //  console.log('pppID', this.url_parentId);

      var url = window.location.href;
      if (url.indexOf('task') > -1) {
        url = url.split('task/')
        var split_url = url[1].split('/')
        console.log('level', split_url[0])
        console.log('id', split_url[1])
        this.url_level = split_url[0] ? split_url[0] : ''
        this.url_parentId = split_url[1] ? split_url[1] : 0
        this.isCopyLink = true
        this.$store.dispatch('getTodoObject', this.url_parentId);
        this.$store.dispatch('getAttachmentFromDB', this.url_parentId)
        this.$store.dispatch('getAllTaskTags', this.url_parentId);
      }

      this.$store.dispatch('removeParentIdArray') // flush showDiv object from the memory when page refresh
      this.$store.commit('DELETE_ALLTAGS')
      this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '' });
      // this.$store.dispatch('getAllTodos', {'parentId': ''});
      // let self = this;
      // socket.on('feed-change', function(item){
      //          //console.log("TodoItem.vue:item***",item);
      //          if(item.new_val){
      //            var result = $.grep(self.taskById, function(e){ return e.id == item.new_val.id; })
      //             if (result.length == 0) {
      //               if(item.new_val.parentId.length == 0){
      //               // console.log("Main Task Inserted")
      //               // console.log('Length',self.taskById.length)
      //             // self.taskById.push(item.new_val)
      //               self.taskById.splice(self.taskById.length - 1, 0, item.new_val);
      //               // self.$store.state.todolist.push(item.new_val)
      //               }else{
      //                 //console.log("Sub Task Inserted")
      //               }
      //             }else if(item.old_val){
      //               if(item.new_val.parentId.length == 0){
      //               // console.log("Main Task Updated")
      //               let index = _.findIndex(self.taskById,function(d){return d.id == item.new_val.id})
      //               // console.log('Index of object', index)
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
      //           //  console.log("Main Task Deleted")
      //           //  console.log("Row Deleted");
      //           //  console.log('self.taskById',self.taskById)
      //           //  console.log('item.old_val',item.old_val)
      //            let index = _.findIndex(self.taskById,function(d){return d.id == item.old_val.id})
      //           //  console.log('Index of object', index)
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
        userSettings: 'user_setting',
        todoObjectById: 'getObjectById'
      }),
      taskById() {
        //let taskArray = this.todoById('', 0)
        let taskArray = this.todoById(this.url_parentId ? this.url_parentId : '', this.url_level)
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
          updatedAt: new Date().toJSON()
        })
        this.todolist = taskArray
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
      // btnLogoutClicked() {
      //   // this.$store.commit('DELETE_ATTACHMENTS')
      //   // this.$store.state.userObject = {}
      //   // this.$store.state.isAuthorized = false
      //   // this.$store.commit('userData')
      //   // this.$store.commit('authorize')
      //   CmnFunc.deleteAutheticationDetail()
      //   window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000"
      // },
      btnUpdateProfileClicked() {
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
        var self = this
        this.$store.dispatch('updateUserProfile', {
          'fullname': this.username,
          'role': this.role,
          'dob': this.dob,
          'aboutme': this.aboutme,
          //'signup_type': this.$store.state.userObject.signup_type,
          'image_url': this.imageURlProfilePic
        })
          .then(function () {
            self.$store.state.userObject.fullname = self.username
            self.$store.state.userObject.role = self.role
            //if (this.dob) {
            self.$store.state.userObject.dob = self.dob
            //}
            self.$store.state.userObject.aboutme = self.aboutme
            self.$store.commit('userData')
          })
          .catch(function (error) {
            // $.notify.defaults({ className: "error" })
            // $.notify(error.message, { globalPosition:"top center"})
          });
      },
      btnProfileClicked() {
        console.log('UserName', this.$store.state.userObject.fullname)
        this.username = this.$store.state.userObject.fullname,
        console.log('UserName11', this.username)
          this.role = this.$store.state.userObject.role,
          this.aboutme = this.$store.state.userObject.aboutme,
          this.imageURlProfilePic = this.$store.state.userObject.image_url
        if (this.$store.state.userObject.dob) {
          this.datepicker = new Date(this.$store.state.userObject.dob)
        }
        this.enableUpdateProfileBtn()
      },
      picker9Formatter(date) {
        this.dob = Vue.moment(date).format('L');
        return this.dob
      },
      updateProfileImage() {
        this.loading = true
        let self = this
        var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
        var fileChooser = document.getElementById('file');
        var file = fileChooser.files[0];
        var imageKey = self.$store.state.userObject.image_name

        if (file) {
          var params = { Key: file.name, ContentType: file.type, Body: file };
          bucket.upload(params).on('httpUploadProgress', function (evt) {
            console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
          }).send(function (err, data) {
            console.log('file: ', file.name)
            self.imageURlProfilePic = data.Location
            self.$store.state.userObject.image_url = self.imageURlProfilePic
            self.$store.state.userObject.image_name = file.name
            self.$store.commit('userData')
            //Delete image from amazon
            console.log('data: ', data.Location)
            console.log('key: ', self.$store.state.userObject.image_name)
            var bucketInstance = new AWS.S3();
            var params = {
              Bucket: 'airflowbucket1/obexpense/expenses',
              Key: imageKey
            }
            bucketInstance.deleteObject(params, function (err, data) {
              if (data) {
                self.$http.post('/updateImageURL', {
                  email: self.$store.state.userObject.email,
                  signup_type: self.$store.state.userObject.signup_type,
                  image_url: self.imageURlProfilePic,
                  image_name: file.name
                }).then(response => {
                  if (response.body.replaced) {
                    self.loading = false
                  }
                })
              }
              else {
                console.log("Check if you have sufficient permissions : ", err.stack);
              }
            });
          });
        }
        return false;
      },
      onFileChange() {
        this.loading = true;
        let self = this;
        var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
        var fileChooser = document.getElementById('file');
        var file = fileChooser.files[0];
        if (file) {
          var params = { Key: file.name, ContentType: file.type, Body: file };
          bucket.upload(params).on('httpUploadProgress', function (evt) {
            console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
          }).send(function (err, data) {
            // console.log("Amazon-data :: ", err);
            // self.$http.post('/updateImageURL', {
            // email: self.$store.state.userObject.email,
            // signup_type: self.$store.state.userObject.signup_type,
            // image_url: data.Location,
            // image_name: file.name
            // }).then(response => {
            //     if (response.body.replaced) {
            //         self.imageURlProfilePic = data.Location
            //         self.$store.state.userObject.image_url = self.imageURlProfilePic
            //         self.$store.state.userObject.image_name = file.name
            //         self.$store.commit('userData')
            //         self.loading = false
            //     }
            self.$store.dispatch('updateUserProfile', {
              image_url: data.Location,
              image_name: file.name
            })
              .then(function () {
                self.imageURlProfilePic = data.Location
                self.$store.state.userObject.image_url = self.imageURlProfilePic
                self.$store.state.userObject.image_name = file.name
                self.$store.commit('userData')
                self.loading = false
              })
              .catch(function (error) {
                // $.notify.defaults({ className: "error" })
                // $.notify(error.message, { globalPosition:"top center"})
              });
          });
        }
        return false;
      },
      // createImage(file) {
      //   var image = new Image();
      //   var reader = new FileReader();
      //   reader.onload = (e) => {
      //     this.image = e.target.result;
      //   };
      //   reader.readAsDataURL(file);
      // },
      removeImage: function (e) {
        this.loading = true
        this.imageURlProfilePic = null
        let self = this
        //Delete image from amazon
        var bucketInstance = new AWS.S3();
        var params = {
          Bucket: 'airflowbucket1/obexpense/expenses',
          Key: self.$store.state.userObject.image_name
        }
        bucketInstance.deleteObject(params, function (err, data) {
          if (data) {

            // self.$http.post('/updateImageURL', {
            //   email: self.$store.state.userObject.email,
            //   signup_type: self.$store.state.userObject.signup_type,
            //   image_url: self.imageURlProfilePic,
            //   image_name: ''
            //   }).then(response => {
            //       if (response.body.replaced) {
            //           self.$store.state.userObject.image_url = self.imageURlProfilePic
            //           self.$store.state.userObject.image_name = ''
            //           self.$store.commit('userData')
            //           self.loading = false
            //       }
            self.$store.dispatch('updateUserProfile', {
              image_url: self.imageURlProfilePic,
              image_name: ''
            })
              .then(function () {
                self.imageURlProfilePic = data.Location
                self.$store.state.userObject.image_url = self.imageURlProfilePic
                self.$store.state.userObject.image_name = ''
                self.$store.commit('userData')
                self.loading = false
              })
              .catch(function (error) {
                // $.notify.defaults({ className: "error" })
                // $.notify(error.message, { globalPosition:"top center"})
              });
          }
          else {
            console.log("Check if you have sufficient permissions : ", err.stack);
          }
        });
      },
      enableUpdateProfileBtn() {
        var trimmedusername = this.username.trim()
        if (trimmedusername.length >= 1) {
          $('#updateprofile_btn').removeClass('is-disabled')
          $("#updateprofile_btn").attr('disabled', false);
        } else {
          $('#updateprofile_btn').addClass('is-disabled')
          $("#updateprofile_btn").attr('disabled', true);
        }
      }
    },
    components: {
      MainLeftSection,
      MainRightSection,
      LeftToolbar,

    }
  }

</script>