<html>
  <head><meta name="google-signin-client_id" content="384614142196-oogtsh4idf2739028m4bd13fo0sdpk2n.apps.googleusercontent.com"></head>
</html>
<template>
	<section class="todoapp">
     <!--<text-input></text-input> -->
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
      <div class="g-signin2" data-onsuccess="onSignInSuccess" style="display: none;"></div>
       <!--<a href="#" onclick="signOut()">Sign out</a>-->
      <div class="Topbar-accountInfo">
      <a class="Button Button--small Button--primary topbarContingentUpgradeButton-button" tabindex="0" aria-role="button">
        Upgrade</a>
      <a class="Topbar-settingsMenuButton dropdown">
      <span class="Topbar-settingsMenuDomainName"><span>Welcome {{ uname }}</span></span>
      <div  class="dropdown-toggle Avatar Avatar--medium Avatar--color4 Topbar-settingsMenuAvatar" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><!-- react-text: 28 -->{{ capitalizeLetters }}<!-- /react-text --></div>
      <ul class="dropdown-menu">
            <li><a  data-toggle="modal" data-target="#myModal2" @click="btnProfileClicked()">Profile</a></li>
            <hr>
            <li><a href="#" onclick="signOut()" @click="btnLogoutClicked()">Sign out</a></li>
            </ul></li>
      </a>
    </div>

  </div>
      <div data-reactroot="" class="PageHeaderStructure MyTasksPageHeader">
        <div class="PageHeaderStructure-center">
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
        </div>
    <div class="row asanaView-body" style="padding-top: 15px; margin: 10px 10px 10px 10px;">
      <div class="asanaView-paneGutter"></div>
    <div id="center_pane_container" class="known-list">
        <div id="center_pane">
          <left-toolbar></left-toolbar>
		      <main-left-section :pholder="taskPholder" :filtered-todos="filteredTodos" :eventIndex="eventIndex" :isTask="isTask"></main-left-section>
          <!--<div>{{filteredTodos}}</div>-->
        </div>
    </div>
    <div id="right_pane_container" class="known-list">
      <div id="right_pane">
        <main-right-section :pholder="subtaskPholder" :filtered-todos="filteredTodos" :eventIndex="eventIndex" :isTask="!isTask"></main-right-section>
      </div>
    </div>
    <div class="asanaView-paneGutter"></div>
    </div>
		<!--<todo-footer></todo-footer>-->
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
                <img :src="image"/>
              </span>
            </div>
                <span class="pro-part">
                  <label>Name</label>
                  <input type="username" v-model='username' @keyup='enableUpdateProfileBtn'>
                  <div class="picture-action-label" v-if='!image'>
                      <input autocomplete="off" type="file" name="file" title="" class="photo-file-input" accept="image/gif,image/png,image/jpeg,image/tiff,image/bmp" @change="onFileChange">
                    <span class="img-upload">Add a profile photo</span>
                  </div>
                  <div class="picture-action-label" v-else>
                    <!--<input autocomplete="off" type="file" name="file" class="photo-file-input" @click="removeImage">-->
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
import TodoFooter from './TodoFooter.vue'
import MainRightSection from './MainRightSection.vue'
import LeftToolbar from './LeftToolbar.vue'
// import TextInput from './TextInput.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(require('vue-moment'));
export default {
  // el: '#filterTodo',
  props: ['passData'],
  data: function () {
    return {
      sharedState: store.state,
      eventIndex: 0,
      isTask: true,
      taskPholder: 'Task',
      subtaskPholder: 'Subtask',
      username: '',
      role: '',
      aboutme: '',
      dob: '',
      datepicker: null,
      picker10Max: new Date(),
      image: ''
    }
  },
  computed: {
    filteredTodos: function () {
      console.log('Filtered Todos:', this.sharedState.todos)
      return store.filters[this.sharedState.visibility](this.sharedState.todos)
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
    
    // gapi.load('auth2', function() {
    //     gapi.auth2.init();
    // });
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });

      this.$store.state.userObject = {}
      this.$store.state.isAuthorized = false
      this.$store.commit('userData')
      this.$store.commit('authorize')
      //location.href = '/'
    },
    btnUpdateProfileClicked () {
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
        // profile_pic: this.image
      }).then(response => response.json())
      .then(json => {
        if (json.replaced) {
          $.notify.defaults({ className: "success" })
          $.notify("Profile updated successfully.", { globalPosition:"top center"})
        }
      })
    },
    btnProfileClicked () {
      console.log('type: ', this.$store.state.userObject.signup_type)
      this.username = this.$store.state.userObject.username,
      this.role = this.$store.state.userObject.role,
      this.aboutme = this.$store.state.userObject.aboutme
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
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
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
    // TextInput,
    MainLeftSection,
    MainRightSection,
    TodoFooter,
    LeftToolbar
  }
}
</script>
