<template>
	<section class="todoapp">
    <div data-reactroot="" class="Topbar">
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
      <!--<div class="PageHeaderStructure-center PageHeaderStructure-title MyTasksPageHeader-title">My Tasks</div>-->
      <div class="Topbar-accountInfo">
      <a class="Button Button--small Button--primary topbarContingentUpgradeButton-button" tabindex="0" aria-role="button">
        Upgrade</a>
      <a class="Topbar-settingsMenuButton">
      <span class="Topbar-settingsMenuDomainName"><span>Welcome {{ uname }}</span></span>
      
      <div  class="dropdown-toggle Avatar Avatar--medium Avatar--color4 Topbar-settingsMenuAvatar" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><!-- react-text: 28 --><!-- /react-text -->
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
  </div>
      
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
    <div id="center_pane_container" class="known-list">
        <div id="center_pane">
          <left-toolbar></left-toolbar>
          <main-left-section :pholder="taskPholder" :filtered-todos="taskById" :eventIndex="eventIndex" ></main-left-section>
        </div>
    </div>
    <div id="right_pane_container" class="known-list" v-for="(n, index) in parentIdArray">
      <div id="right_pane">
        
        <main-right-section :pholder="subtaskPholder" :index="index" :todoObject="n" :eventIndex="eventIndex" ></main-right-section>
      </div>
    </div>
    <div class="asanaView-paneGutter"></div>
    </div>
    <div id="myModal2" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" style="display: none;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel2">Profile</h4>
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
                  <label>Name</label>
                  <input type="username" v-model='username' @keyup='enableUpdateProfileBtn'>
                  <div class="picture-action-label" v-if='!imageURlProfilePic'>
                      <input autocomplete="off" type="file" id="file" name="file" title="" class="photo-file-input" accept="image/gif,image/png,image/jpeg,image/tiff,image/bmp" @change="onFileChange">
                    <span class="img-upload">Add a profile photo</span>
                  </div>
                  <div class="picture-action-label" v-else>
                    <span class="img-upload" @click="removeImage">Clear photo</span>
                  </div>
                </span>
            </div>
            <div class="form-input" >
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
              <button class="buttonView buttonView--default buttonView--primary buttonView--large is-disabled" data-dismiss="modal" aria-hidden="true" id="updateprofile_btn" @click="btnUpdateProfileClicked()"><span>Update Profile
                </span></button>
            </div>
        </div>
      </div>
    </div>
  </div>
	</section> 
</template>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script>
/* eslint-disable*/
import store from './store.js'
import MainLeftSection from './MainLeftSection.vue'
import MainRightSection from './MainRightSection.vue'
import LeftToolbar from './LeftToolbar.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapGetters, mapActions } from 'vuex'

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
        loading: false
    }
  },
  created() {
    // ...mapActions([
    //         'getAllTodos'
    //     ])
      this.$store.dispatch('removeParentIdArray') // flush showDiv object from the memory when page refresh
      this.$store.dispatch('getAllTodos');
  },
  computed: {
    ...mapGetters({
      todoById: 'getTodoById',
      parentIdArray: 'parentIdArr'
     }),
     taskById(){
       let taskArray = this.todoById('', 0)
       taskArray.push({
              parentId: '',
              taskName: '',
              taskDesc: '',
              level: 0,
              completed: false, 
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON()
       })
       return taskArray
     },
    uname: function(){
      var str = this.$store.state.userObject.email
      var n = str.indexOf("@")
      var res = str.substr(0, n)
      return res
    },
    capitalizeLetters: function(){
      var str = this.$store.state.userObject.email
      var firstLetters = str.substr(0,2)
      return firstLetters.toUpperCase()
    }
  },
  methods: {
    btnLogoutClicked (){
      this.$store.state.userObject = {}
      this.$store.state.isAuthorized = false
      this.$store.commit('userData')
      this.$store.commit('authorize')
      window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000"
    },
    btnUpdateProfileClicked () {
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

      this.$store.state.userObject.username = this.username
      this.$store.state.userObject.role = this.role
      if (this.dob) {
        this.$store.state.userObject.dob = this.dob
      }
      this.$store.state.userObject.aboutme = this.aboutme
      this.$store.commit('userData')
      this.$http.post('/updateUserProfile', {
        email: this.$store.state.userObject.email,
        username: this.username,
        role: this.role,
        dob: this.dob,
        aboutme: this.aboutme,
        signup_type: this.$store.state.userObject.signup_type,
        image_url: this.imageURlProfilePic
      }).then(response => response.json())
      .then(json => {
        if (json.replaced) {
          $.notify.defaults({ className: "success" })
          $.notify("Profile updated successfully.", { globalPosition:"top center"})
        }
      })
    },
    btnProfileClicked () {
      this.username = this.$store.state.userObject.username,
      this.role = this.$store.state.userObject.role,
      this.aboutme = this.$store.state.userObject.aboutme,
      this.imageURlProfilePic = this.$store.state.userObject.image_url
      if(this.$store.state.userObject.dob) {
        this.datepicker = new Date(this.$store.state.userObject.dob)
      }
      this.enableUpdateProfileBtn()
    },
    picker9Formatter(date) {
        this.dob = Vue.moment(date).format('L');
        return this.dob
    },
    onFileChange(e) {
     this.loading = true;
        let self = this;
        var bucket = new AWS.S3({params: {Bucket: 'airflowbucket1/obexpense/expenses'}});
        var fileChooser = document.getElementById('file');
        var file = fileChooser.files[0];
        if (file) {
            var params = {Key: file.name, ContentType: file.type, Body: file};
            bucket.upload(params).on('httpUploadProgress', function(evt) {
            console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total)+'%');
          }).send(function(err, data) {
              console.log("Amazon-data :: ", err);
              self.$http.post('/updateImageURL', {
              email: self.$store.state.userObject.email,
              signup_type: self.$store.state.userObject.signup_type,
              image_url: data.Location,
              image_name: file.name
              }).then(response => {
                  if (response.body.replaced) {
                      self.imageURlProfilePic = data.Location
                      self.$store.state.userObject.image_url = self.imageURlProfilePic
                      self.$store.state.userObject.image_name = file.name
                      self.$store.commit('userData')
                      self.loading = false
                  }
              })
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
            
            self.$http.post('/updateImageURL', {
              email: self.$store.state.userObject.email,
              signup_type: self.$store.state.userObject.signup_type,
              image_url: self.imageURlProfilePic,
              image_name: ''
              }).then(response => {
                  if (response.body.replaced) {
                      self.$store.state.userObject.image_url = self.imageURlProfilePic
                      self.$store.state.userObject.image_name = ''
                      self.$store.commit('userData')
                      self.loading = false
                  }
              })
          }
          else {
            console.log("Check if you have sufficient permissions : ", err.stack);
          }
        });
    },
    enableUpdateProfileBtn () {
      var trimmedusername = this.username.trim()
      if (trimmedusername.length >= 1) {
        $('#updateprofile_btn').removeClass('is-disabled')
        $("#updateprofile_btn").attr('disabled', false);
      }else{
        $('#updateprofile_btn').addClass('is-disabled')
        $("#updateprofile_btn").attr('disabled', true);
      }
    }
  },
  components: {
    MainLeftSection,
    MainRightSection,
    LeftToolbar
  }
}
</script>
