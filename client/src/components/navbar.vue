<template lang="html">
  <div>
    <div v-if="showProjectLoading" :value="getTodoListSize" style="margin-top: 50vh;height: 100vh">
      <img class="project-loading" src="../assets/activity.svg" style="margin-left: 10px; width:80px; height:100px;"/>
      <p style="margin-left:20px;color:gray">Populating projects...</p>
      <span style="margin-left:-170px;position: absolute;bottom:10px">
        <img src="../assets/ob_logo.svg"></img>
      </span>
    </div>  
    <div>
      <div data-reactroot="" id="top-bar" class="Topbar">
        <div class="PageHeaderStructure-center" @mouseenter="hidePopup">
          <div class="PageHeaderStructure-titleRow">
            <div class="PageHeaderStructure-title ProjectPageHeader-projectName--colorNone ProjectPageHeader-projectName">
              <input id="project-name" class="logo__title" type="text" name="fname" maxlength="25" v-model="projectName" @blur="setProjectName"
                @keyup.enter="updateProjectName" style="text-align: center;" />
                <!-- <span class="logo__title">{{$store.state.accessName}}</span> -->
            </div>
          </div>
        </div>
        <div class="PageHeaderStructure-right" >
          <div class="projectHeaderFacepile-content">
            <div v-show="($store.state.currentProjectName && $store.state.currentProjectName.length>0)?true:false" id="projectVisible"
              class="projectHeaderFacepile-privacySummary projectHeaderFacepile-privacySummaryDropdown" @click="changePrivacyPopup">
              <div class="projectHeaderFacepile-privacySummaryDropdownTextDownIconContainer">
                <svg v-if="$store.state.currentProjectPrivacy==2" class="Icon UserIcon privacySummaryDropdownLeftIcon"
                  title="UserIcon" viewBox="0 0 32 32">
                  <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                </svg>
                <svg v-else class="Icon UserIcon privacySummaryDropdownLeftIcon" title="UserIcon" viewBox="0 0 32 32">
                  <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                  <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                </svg>
              </div>
              <!-- Change privacy  -->
              <div v-show="showPrivacyPopup" @mouseleave="hidePopup" class="layerPositioner-privacy layerPositioner--offsetRight layerPositioner--alignRight layerPositioner--below"
                data-layerid="4" style="top: 80.339px;">
                <div class="layerPositioner-layer-privacy">
                  <div class="Dropdown projectHeaderFacepile-privacySummaryDropdown">
                    <ul class="menu menu--long">
                      <li class="menu-item-privacy" @click="publicMode">
                        <a id="projectHeaderFacepile-privacyPublicMenuItem" class="menuItem-button is-highlighted menuItem--small projectHeaderFacepile-privacyMenuItem">
                          <svg v-show="showPublic" class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                          </svg>
                          <svg class="Icon UsersIcon projectHeaderFacepile-privacyMenuItemIcon" title="UsersIcon" viewBox="0 0 32 32">
                            <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                            <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                          </svg>
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemText">Public to all</div>
                          </span>
                        </a>
                      </li>
                      <li class="menu-item-privacy" @click="privateMemberMode">
                        <a id="projectHeaderFacepile-privacyPublicMenuItem" class="menuItem-button is-highlighted menuItem--small projectHeaderFacepile-privacyMenuItem">
                          <svg v-show="showPrivateMember" class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                          </svg>
                          <svg class="Icon UsersIcon projectHeaderFacepile-privacyMenuItemIcon" title="UsersIcon" viewBox="0 0 32 32">
                            <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                            <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                          </svg>
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemText">Private to members</div>
                          </span>
                        </a>
                      </li>
                      <li class="hidden menu-item-privacy">
                        <a id="projectHeaderFacepile-privacyPrivateToMembersMenuItem" class="menuItem-button is-highlighted menuItem--extralarge projectHeaderFacepile-privacyMenuItem projectHeaderFacepile-privacyMenuItemUpgradeOption">
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemIconText">
                              <svg class="Icon LockIcon projectHeaderFacepile-privacyMenuItemIcon" title="LockIcon" viewBox="0 0 32 32">
                                <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                              </svg>
                              <div class="projectHeaderFacepile-privacyMenuItemText">Private to members</div>
                            </div>
                            <div class="hidden projectHeaderFacepile-privacyMenuItemUpgradeTextContainer">
                              <u class="projectHeaderFacepile-privacyMenuItemUpgradeText">Upgrade to create Private Projects with multiple members</u>
                            </div>
                          </span>
                        </a>
                      </li>
                      <li class="menu-item-privacy" @click="privateToMe">
                        <a id="projectHeaderFacepile-privacyPrivateToMeMenuItem" class="menuItem-button menuItem--small projectHeaderFacepile-privacyMenuItem">
                          <svg v-show="showPrivateCheck" class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                          </svg>
                          <svg class="Icon UserIcon projectHeaderFacepile-privacyMenuItemIcon" title="UserIcon" viewBox="0 0 32 32">
                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                          </svg>
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemText">Private to me</div>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Topbar-accountInfo">
          <a class="Topbar-settingsMenuButton">
            <div v-if="$store.state.userObject.email" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="Topbar-settingsMenuDomainName">
                    <span>Welcome {{ uname }}</span>
                  </span>
              <avatar v-if="$store.state.userObject.image_url" :username="$store.state.userObject.email" :src="$store.state.userObject.image_url"
                :size="30"></avatar>
              <avatar v-else :username="$store.state.userObject.email" :size="30" color="#fff"></avatar>
            </div>
            <ul class="dropdown-menu">
              <li>
                <a data-toggle="modal" data-target="#myModal2" @click="btnProfileClicked()">Profile</a>
              </li>
              <hr>
              <li data-target="#settingsMenu" data-toggle="modal">
                <a id="settings" class="menu-item-privacy" title="">
                  <span class="dropdown-menu-item-label">Settings</span>
                </a>
              </li>
              <hr>
              <li>
                <a href="#" @click="btnLogoutClicked()">Sign out</a>
              </li>
            </ul>
          </a>
        </div>
      </div>
      
      <router-view></router-view>
      <settings-menu :settingArr="settingArr"></settings-menu>
      <div class="todoapp">
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
                      <!-- <img v-bind:src="imageURlProfilePic" /> -->
                      <avatar v-if="imageURlProfilePic" :username="imageURlProfilePic" :size="70" :src="imageURlProfilePic"></avatar>
                      <avatar v-else :username="$store.state.userObject.email" color='#fff' :size="70"></avatar>
                    </span>
                  </div>
                  <span class="pro-part">
                    <input type="username" v-model='username' @keyup='enableUpdateProfileBtn'>
                    <div class="picture-action-label" v-if='!imageURlProfilePic'>
                      <input autocomplete="off" type="file" iuid="file" name="file" title="" class="photo-file-input" accept="image/gif,image/png,image/jpeg,image/tiff,image/bmp"
                        @change="onFileChange">
                      <span class="img-upload">Add a profile photo</span>
                    </div>
                    <div class="picture-action-label" v-else>
                      <div class="picture-action-label changeProfilePosition">
                        <input autocomplete="off" type="file" id="file" name="file" title="" class="photo-file-input" accept="image/gif,image/png,image/jpeg,image/tiff,image/bmp"
                          @change="updateProfileImage">
                        <span class="img-upload">Change profile photo</span>
                      </div>
                      <div class="clearImgBlock">
                        <span class="img-upload clearImgPosition" @click="removeImage">Clear photo</span>
                      </div>
                    </div>
                  </span>
                </div>
                <div class="form-input">
                  <div class="img-part">
                    <label>DATE OF BIRTH</label>
                  </div>
                  <span class="pro-part">
                    <ui-datepicker icon="event" placeholder="mm-dd-yyyy" v-model="datepicker" :custom-formatter="picker9Formatter" :max-date="picker10Max">
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
                <div class="form-input form-input--button" style="margin-right: 30px; padding-bottom: 30px;">
                  <button class="buttonView buttonView--default buttonView--primary buttonView--large is-disabled" data-dismiss="modal" aria-hidden="true"
                    id="updateprofile_btn" @click="btnUpdateProfileClicked()">
                    <span>Update Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="overlay" v-show="allowedProjectPermission" >
        <span id="text-overlay">{{$store.state.currentprojectPermisionRevokedMessage}}</span>
        <button id="f" > </button>
      </div>
    </div>
    <members-dialog></members-dialog>
    <delete-project-dialog></delete-project-dialog>
     
  </div>
</template>
<script>
  /* eslint-disable*/
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  Vue.use(BootstrapVue)
  Vue.use(require('vue-moment'));
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import SettingsMenu from './SettingsMenu.vue'
  import CmnFunc from './CommonFunc.js'
  import MembersDialog from './MembersDialog.vue'
  import DeleteProjectDialog from './DeleteProjectDialog.vue'
  import Avatar from 'vue-avatar/src/Avatar'
  import { mapGetters, mapMutations } from 'vuex'
  import psl from 'psl'
  var VueCookie = require('vue-cookie')
  Vue.use(VueCookie)
  import KeenUI from 'keen-ui';
  Vue.use(KeenUI)
  let location = psl.parse(window.location.hostname)
  location = location.domain === null ? location.input : location.domain

  export default {
    name: 'navbar',
    data: function () {
      return {
        username: '',
        role: '',
        aboutme: '',
        dob: '',
        datepicker: null,
        picker10Max: new Date(),
        imageURlProfilePic: this.$store.state.userObject.image_url,
        loading: false,
        isOpen: this.$store.state.isSliderOpen,
        showPrivacyPopup: false,
        showPrivateCheck: false,
        showPrivateMember: false,
        showPublic: false,
        pName: '', // Project Name 
        showProjectLoading:true
      }
    },
    created() {
    },
    computed: {
      ...mapGetters([
        'settingArr',

      ]),
      uname: function () {
        if(this.$store.state.userObject.email){
            var str = this.$store.state.userObject.email
            var n = str.indexOf("@")
            var res = str.substr(0, n)
            return res
        }
      },
      allowedProjectPermission:function()
      {
        setTimeout(() => {
          $('#f').focus();
        }, 500);
        return this.$store.state.currentprojectPermisionRevoked;
      },
      projectName: {
        get() {
          return this.$store.state.currentProjectName
        },
        set(value) {
          this.pName = value;
        }
      },
      getTodoListSize(){
        if(this.$store.state.arrAllUsers.length > 0){
          this.showProjectLoading = false
        }else{
          this.showProjectLoading = true
        }
      }
    },
    methods: {
      ...mapMutations([
        'showMyTasks'
      ]),
      btnLogoutClicked() {  
        this.$cookie.delete('auth_token', { domain: location });
        // CmnFunc.deleteAutheticationDetail()
        window.location = "/"
          
      },
      btnUpdateProfileClicked() {
        var self = this
        this.$store.dispatch('updateUserProfile', {
          'fullname': this.username,
          'role': this.role,
          'dob': this.dob,
          'aboutme': this.aboutme,
          'image_url': this.imageURlProfilePic
        })
          .then(function () {
            self.$store.state.userObject.fullname = self.username
            self.$store.state.userObject.role = self.role
            self.$store.state.userObject.dob = self.dob
            self.$store.state.userObject.aboutme = self.aboutme
            self.$store.commit('userData')
          })
          .catch(function (error) {
            console.log('error: ', error.response.status)
            if (error.response.status === 401) {
              CmnFunc.deleteAutheticationDetail()
              self.$router.replace('/')
              return
            }

            $.notify.defaults({ className: "error" })
            $.notify(error.message, { globalPosition: "top center" })
          });
      },
      updateProjectName(){
        if(this.pName && this.pName.length > 0){
           this.$store.dispatch('renameProjectName',this.pName)
           $('input').blur();
          // this.pName = '';
        }else{
           $.notify.defaults({ className: "error" })
           $.notify("Project name can't blank.", { globalPosition:"top center"})
        }
      },
      btnProfileClicked() {
        this.username = this.$store.state.userObject.fullname,
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
          }).send(function (err, data) {
            self.imageURlProfilePic = data.Location
            self.$store.state.userObject.image_url = self.imageURlProfilePic
            self.$store.state.userObject.image_name = file.name
            self.$store.commit('userData')
            //Delete image from amazon
            var bucketInstance = new AWS.S3();
            var params = {
              Bucket: 'airflowbucket1/obexpense/expenses',
              Key: imageKey
            }
            bucketInstance.deleteObject(params, function (err, data) {
              self.$store.dispatch('updateUserProfile', {
                image_url: self.imageURlProfilePic,
                image_name: file.name
              })
                .then(function () {
                  self.updateUserProfileVuex()
                })
                .catch(function (error) {
                  // $.notify.defaults({ className: "error" })
                  // $.notify(error.message, { globalPosition:"top center"})
                });
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
          }).send(function (err, data) {
            self.$store.dispatch('updateUserProfile', {
              image_url: data.Location,
              image_name: file.name
            })
              .then(function () {
                self.updateUserProfileVuex(data)
              })
              .catch(function (error) {
                // $.notify.defaults({ className: "error" })
                // $.notify(error.message, { globalPosition:"top center"})
              });
          });
        }
        return false;
      },
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
            self.$store.dispatch('updateUserProfile', {
              image_url: self.imageURlProfilePic,
              image_name: ''
            })
              .then(function () {
                self.updateUserProfileVuex(data)
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
      updateUserProfileVuex (userDetail) {
        if(userDetail != null){
          this.imageURlProfilePic = userDetail.Location
        }
        this.$store.state.userObject.image_url = this.imageURlProfilePic
        this.$store.state.userObject.image_name = ''
        this.$store.commit('userData')
        this.loading = false

        let self = this
        let userIndex = _.findIndex(self.$store.state.arrAllUsers, function (m) { return m._id === self.$store.state.userObject._id })
        if(userIndex > -1){
          Vue.set(self.$store.state.arrAllUsers[userIndex],'image_url',self.imageURlProfilePic)
          // self.$store.state.arrAllUsers[userIndex].image_url = self.imageURlProfilePic
        }

      },
      enableUpdateProfileBtn() {
        if (this.username) {
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
      /***
       * Hide project setting menu
       * 
       * */
      hideProjectSetting() {
        this.$store.state.projectSettingId
        $("div.project-setting").addClass("hidden");
      },
      enableUpdateProfileBtn() {
        if (this.username) {
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
      setProjectName(e) {
        let projectName = this.$store.state.currentProjectName;
        $("#project-name").val(projectName);
      },
      changePrivacyPopup() {

       

        this.showPrivacyPopup = !this.showPrivacyPopup;
        // Check privacy id to set related option
        var id = this.$store.state.currentProjectPrivacy;
        if (id != "") {
          if (id == "0") {
            this.showPublic = true;
            this.showPrivateMember = false;
            this.showPrivateCheck = false;
          } else if (id == "1") {
            this.showPublic = false;
            this.showPrivateMember = true;
            this.showPrivateCheck = false;
          } else if (id == "2") {
            this.showPublic = false;
            this.showPrivateMember = false;
            this.showPrivateCheck = true;
          }
        }
      
      },
      publicMode() {
        if(this.$store.state.currentProject.create_by===this.$store.state.userObject._id){
        this.showPublic = true;
        this.showPrivateMember = false;
        this.showPrivateCheck = false;
        this.$store.dispatch('changeProjectPrivacy', "0")
        this.$store.state.currentProjectPrivacy = "0"
        this.showPrivacyPopup = false;
        }else{
          this.$Notice.error({
                    title: 'Permission denied',
                    desc:'Only project owner can change project privacy'
                }); 
        }

      },
      privateMemberMode() {
        if(this.$store.state.currentProject.create_by===this.$store.state.userObject._id){
        this.showPublic = false;
        this.showPrivateMember = true;
        this.showPrivateCheck = false;
        this.$store.dispatch('changeProjectPrivacy', "1")
        this.$store.state.currentProjectPrivacy = "1"
        this.showPrivacyPopup = false;
        }else{
          this.$Notice.error({
                    title: 'Permission denied',
                    desc:'Only project owner can change project privacy'
                }); 
        }

      },
      privateToMe() {
        if(this.$store.state.currentProject.create_by===this.$store.state.userObject._id){
        this.showPublic = false;
        this.showPrivateCheck = true;
        this.showPrivateMember = false;
        this.$store.dispatch('changeProjectPrivacy', "2")
        this.$store.state.currentProjectPrivacy = "2"
        this.showPrivacyPopup = false;
        }else{
          this.$Notice.error({
                    title: 'Permission denied',
                    desc:'Only project owner can change project privacy'
                }); 
        }
      },
      hidePopup() {
        this.showPrivacyPopup = false;
      }
    },
    components: {
      SettingsMenu,
      MembersDialog,
      DeleteProjectDialog,
      Avatar
    }
  }
</script>

<style>
  .vue-avatar--wrapper{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    background-color: rgb(33, 150, 243);
    font-style: normal;
    font-variant: normal;
    font-weight: bold;
    font-stretch: normal;
    font-size: 12px;
    line-height: 31px;
    font-family: Helvetica, Arial, sans-serif;
    color: rgb(255, 255, 255);
    vertical-align: middle;
    display: inline-block;
  }
  #overlay {
    position: fixed; /* Sit on top of the page content */
    display: block; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
}
#text-overlay{
    width: 100%;
    position: absolute;
    top: 55%;
    left: 50%;
    font-size: 40px;
    color: white;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
}
.project-loading{
  filter: invert(.5) sepia(1) saturate(5) hue-rotate(175deg);
}
</style>