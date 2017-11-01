<template lang="html">
  <div>
    <div>
      <div data-reactroot="" id="top-bar" class="Topbar">
        <div class="PageHeaderStructure-center">
            <div class="PageHeaderStructure-titleRow">
              <div class="PageHeaderStructure-title ProjectPageHeader-projectName--colorNone ProjectPageHeader-projectName">
                <input id="project-name" type="text" name="fname" maxlength="25" v-model="projectName" @blur="setProjectName" @keyup.enter="updateProjectName" style="text-align: center;"/>
              </div>
            </div>
          </div>
        <div class="PageHeaderStructure-right">
            <div class="projectHeaderFacepile-content">
              <div class="Facepile Facepile--grouped projectHeaderFacepile-facepile hidden">
                <div class="Avatar Avatar--large Avatar--color2 Facepile-avatar--clickable">
                  he
                </div>
                <a class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                  <div class="CircularButton-label">
                    <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                      <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                    </svg>
                  </div>
                </a>
                <a class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                  <div class="CircularButton-label">
                    <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                      <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                    </svg>
                  </div>
                </a>
              </div>
              <a id="ProjectPageHeader-facepileAddButton" class="CircularButton CircularButton--enabled CircularButton--small projectHeaderFacepile-addButton hidden"
                tabindex="0" aria-role="button">
                <div class="CircularButton-label">
                  <svg class="Icon PlusIcon projectHeaderFacepile-addIcon" title="PlusIcon" viewBox="0 0 32 32">
                    <polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18"></polygon>
                  </svg>
                </div>
              </a>
              <div v-show="($store.state.currentProjectName && $store.state.currentProjectName.length>0)?true:false" id="projectVisible" class="projectHeaderFacepile-privacySummary projectHeaderFacepile-privacySummaryDropdown" @click="changePrivacyPopup">
                <div class="projectHeaderFacepile-privacySummaryDropdownTextDownIconContainer">
                  <svg v-if="$store.state.currentProjectPrivacy==2" class="Icon UserIcon projectHeaderFacepile-privacySummaryDropdownLeftIcon"
                    title="UserIcon" viewBox="0 0 32 32">
                    <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                  </svg>
                  <svg v-else class="Icon UserIcon projectHeaderFacepile-privacySummaryDropdownLeftIcon" title="UserIcon" viewBox="0 0 32 32">
                    <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                    <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                  </svg>
                  <!-- <div class="projectHeaderFacepile-privacySummaryDropdownText" v-if="$store.state.currentProjectPrivacy==0">Public to all</div>
                  <div class="projectHeaderFacepile-privacySummaryDropdownText" v-else-if="$store.state.currentProjectPrivacy==1">Private to member</div>
                  <div class="projectHeaderFacepile-privacySummaryDropdownText" v-else="$store.state.currentProjectPrivacy==2">Private to me</div>
                  <svg class="Icon DownIcon projectHeaderFacepile-privacySummaryDropdownDownIcon" title="DownIcon" viewBox="0 0 32 32">
                    <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                  </svg> -->
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
            <span class="Topbar-settingsMenuDomainName"><span>Welcome {{ uname }}</span></span>
            <div v-if="$store.state.userObject.email" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <avatar v-if="$store.state.userObject.image_url" :username="$store.state.userObject.email" :src="$store.state.userObject.image_url" :size="30"></avatar>
              <avatar v-else :username="$store.state.userObject.email" :size="30" color="#fff"></avatar>
            </div>
            <ul class="dropdown-menu">
              <li><a data-toggle="modal" data-target="#myModal2" @click="btnProfileClicked()">Profile</a></li>
              <hr>
              <li @click="settings_menu = true">
                <a id="settings" class="menu-item-privacy" title="">
                    <span class="dropdown-menu-item-label" >Settings</span>
                  </a>
              </li>
              <hr>
              <li><a href="#" @click="btnLogoutClicked()">Sign out</a></li>
            </ul>
          </a>
        </div>
      </div>
      <router-view></router-view>
      <settings-menu :settingArr="settingArr" :showModal="settings_menu" :closeAction="closeDialog"></settings-menu>
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
                      <img v-bind:src="imageURlProfilePic"/>
                    </span>
                  </div>
                  <span class="pro-part">
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
    </div>
    <!-- Member setting dialog  -->
    <members-dialog></members-dialog>
    <!-- Project delete dialog  -->
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
  import NavBarSlider from './NavBarSlider.vue'
  import CmnFunc from './CommonFunc.js'
  import MembersDialog from './MembersDialog.vue'
  import DeleteProjectDialog from './DeleteProjectDialog.vue'
  import Avatar from 'vue-avatar/dist/Avatar'
  import { mapGetters, mapMutations } from 'vuex'

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
        image: '',
        imageURlProfilePic: this.$store.state.userObject.image_url,
        loading: false,
        settings_menu: false,
        isOpen: this.$store.state.isSliderOpen,
        showPrivacyPopup: false,
        showPrivateCheck: false,
        showPrivateMember: false,
        showPublic: false,
        pName:'' // Project Name 
      }
    },
    created() {
      //  this.$store.dispatch('getAllUsersList')
    },
    computed: {
      ...mapGetters([
        'settingArr'
      ]),
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
      },
      projectName:{
          get(){
            return this.$store.state.currentProjectName
          },
          set(value){
            this.pName = value;
           // this.$store.commit('updateProjectName', value)
          }
        },
    },
    methods: {
      ...mapMutations([
        'showMyTasks'
      ]),
      openCloseNav: function () {
        $('.Topbar-navButton').css('margin-left', '-35px');
        document.getElementById('mySidenav').style.width = "250px"
        document.getElementById("top-bar").style.marginLeft = "250px"
        // document.getElementById("center_pane").style.marginLeft = "250px";
        document.getElementById("main-container").style.marginLeft = "250px";
        this.isOpen = true
        this.$store.commit('UPDATE_SLIDER_VALUE', this.isOpen)
      },
      closeDialog() {
        this.settings_menu = false
      },
      btnLogoutClicked() {
        CmnFunc.deleteAutheticationDetail()
        // this.$store.state.userObject = {}
        // this.$store.state.isAuthorized = false
        // this.$store.commit('userData')
        // this.$store.commit('authorize')
        window.location = "/"
      },
      btnUpdateProfileClicked() {
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
            console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
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
        console.log('UN', this.username)
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
      /***
       * Show project member dialog
       * 
       * */
      showMemberDialog() {
        // Hide project setting menu
        $("div.project-setting").addClass("hidden");
        $("#project-setting-dialog").removeClass("hidden");
      },
     /***
      * Show project delete dialog 
      */
     showDeleteProjectDialog(){
         this.hideProjectSetting();
         $("#project-delete-dialog").removeClass("hidden");
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
    showTaskCreatedBy: function () {
      this.$store.state.searchView = "Tasks I've Created"
      this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
      this.$store.commit('showMyTasks')
      this.$store.dispatch('getTaskCreatedBy', { 'project_id': this.$store.state.currentProjectId, 'userID': this.$store.state.userObject._id })
    },
    recentlyCompletedTasks: function () {
      this.$store.state.searchView = "Recently Completed Tasks"
      this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
      this.$store.dispatch('getRecentlyCompletedTasks', { 'project_id': this.$store.state.currentProjectId, 'userID': this.$store.state.userObject._id })
    },
    taskToAssignOther: function () {
      this.$store.state.searchView = "Tasks I've Assigned to Others"
      this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
      this.$store.dispatch('getTaskToAssignOthers', { 'project_id': this.$store.state.currentProjectId, 'userID': this.$store.state.userObject._id })
    },
    setProjectName(){
           let projectName = this.$store.state.currentProjectName ;
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
        this.showPublic = true;
        this.showPrivateMember = false;
        this.showPrivateCheck = false;
        this.$store.dispatch('changeProjectPrivacy', "0")
        this.$store.state.currentProjectPrivacy = "0"
        this.showPrivacyPopup = false;

      },
      privateMemberMode() {
        this.showPublic = false;
        this.showPrivateMember = true;
        this.showPrivateCheck = false;
        this.$store.dispatch('changeProjectPrivacy', "1")
        this.$store.state.currentProjectPrivacy = "1"
        this.showPrivacyPopup = false;

      },
      privateToMe() {
        this.showPublic = false;
        this.showPrivateCheck = true;
        this.showPrivateMember = false;
        this.$store.dispatch('changeProjectPrivacy', "2")
        this.$store.state.currentProjectPrivacy = "2"
        this.showPrivacyPopup = false;
      },
      hidePopup() {
        this.showPrivacyPopup = false;
      }
  },
    components: {
      SettingsMenu,
      NavBarSlider,
      MembersDialog,
      DeleteProjectDialog,
      Avatar
      // sample
    }
  }
</script>
