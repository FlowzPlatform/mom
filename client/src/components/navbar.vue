<template lang="html">
  <div>
     <div id="mySidenav" class="sidenav">
        <nav-bar-slider></nav-bar-slider>
     </div>
     <div >
        <div data-reactroot="" id="top-bar" class="Topbar">
          <div class="Topbar-navButtonContainer">
            <a class="Topbar-navButton" @click="openCloseNav">
              <svg class="Icon HamburgerIcon Topbar-sidebarToggleIcon" title="HamburgerIcon" viewBox="0 0 32 32">
                <rect x="2" y="4" width="28" height="4"></rect>
                <rect x="2" y="14" width="28" height="4"></rect>
                <rect x="2" y="24" width="28" height="4"></rect>
              </svg>
            </a>
          </div>
          <router-link class="NavigationLink Topbar-myTasksButton is-selected"  v-on:click.native="showMyTasks" to="/navbar/mainapp">
            My Tasks
          </router-link>
          <router-link class="NavigationLink Topbar-myTasksButton is-selected" to="/navbar/inbox">
            Inbox
          </router-link>
          <router-link class="NavigationLink Topbar-myTasksButton is-selected" to="/navbar/mainapp">
            Dashboard
          </router-link>
          <router-link class="NavigationLink Topbar-myTasksButton is-selected" to="/navbar/roleaccess">
            Role Access
          </router-link>
          <!--<div class="PageHeaderStructure-center PageHeaderStructure-title MyTasksPageHeader-title">My Tasks</div>-->
          <div class="Topbar-accountInfo">
            <a class="Button Button--small Button--primary topbarContingentUpgradeButton-button" tabindex="0" aria-role="button">
            Upgrade</a>
            <a class="Topbar-settingsMenuButton">
              <span class="Topbar-settingsMenuDomainName"><span>Welcome {{ uname }}</span></span>

              <div class="dropdown-toggle Avatar Avatar--medium Avatar--color4 Topbar-settingsMenuAvatar" data-toggle="dropdown" role="button"
                aria-haspopup="true" aria-expanded="false">
                <!-- react-text: 28 -->
                <!-- /react-text -->
                <span v-if="imageURlProfilePic"><img v-bind:src="imageURlProfilePic" /></span>
                <span v-else>{{ capitalizeLetters }}</span>
              </div>
              <ul class="dropdown-menu">
                <li><a data-toggle="modal" data-target="#myModal2" @click="btnProfileClicked()">Profile</a></li>
                <hr>
                <li @click="settings_menu = true">
                  <a id="settings" class="menu-item" title="">
                    <span class="dropdown-menu-item-label" >Settings</span>
                  </a>
                </li>
                <hr>
                <li><a href="#" @click="btnLogoutClicked()">Sign out</a></li>
              </ul>
              </li>
            </a>
          </div>

        </div>
        <section class="">
          <div class="">
            <router-view></router-view>
          </div>
        </section>
    <!--Profile dialog start-->
    <settings-menu :settingArr="settingArr" :showModal="settings_menu" :closeAction="closeDialog">

    </settings-menu>
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
                id="updateprofile_btn" @click="btnUpdateProfileClicked()"><span>Update Profile
                </span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <!--Profile dialog end-->
  <!-- Project setting menu  -->
      <div class="hidden project-setting" @mouseleave="hideProjectSetting">
        <div data-reactroot="" class="layerPositioner-project-setting layerPositioner--offsetLeft layerPositioner--alignLeft layerPositioner--below" data-layerid="1">
            <div class="layerPositioner-layer">
              <div class="Dropdown-project-setting SidebarItemRowMenu-dropdown">
                  <ul class="menu menu--default">
                    <li class="hidden menu-item" >
                        <div class="is-highlighted DropdownItem DropdownItem--small">
                          <a class="menuItem-button is-highlighted menuItem--small">
                              <span class="menuItem-label">
                                <div class="ColorPickerMenuItem-setHighlightColorMenuItem">
                                    <button class="ColorPickerCell ColorPickerMenuItem-menuItemHighlightCell ColorPickerMenuItem-menuItemHighlightCell--colorNone ColorPickerCell--colorNone" role="button" aria-label="None" aria-pressed="false"></button><!-- react-text: 11 -->Set Highlight Color<!-- /react-text -->
                                </div>
                              </span>
                          </a>
                          <svg class="Icon rightIcon DropdownItem-disclosureIcon" title="rightIcon" viewBox="0 0 32 32">
                              <path d="M12.686,27.314l9.9-9.899c0.781-0.781,0.781-2.047,0-2.828l-9.9-9.9l-2.475,2.475L19.05,16l-8.839,8.839L12.686,27.314z"></path>
                          </svg>
                        </div>
                    </li>
                    <li class="hidden menu-item">
                        <div class="menuSeparator"></div>
                    </li>
                    <li class="hidden menu-item"><a class="menuItem-button menuItem--small SidebarItemRowMenu-toggleFavorite"><span class="menuItem-label">Add to Favorites</span></a></li>
                    <li class="hidden menu-item"><a class="menuItem-button menuItem--small SidebarItemRowMenu-removeRecent"><span class="menuItem-label">Remove from Recents</span></a></li>
                    <li class="hidden menu-item"><a class="menuItem-button menuItem--small SidebarItemRows-addToDashboard"><span class="menuItem-label">Add to Dashboard</span></a></li>
                    <li class="hidden menu-item"><a class="menuItem-button menuItem--small SidebarItemRows-copyProjectMenuItem"><span class="menuItem-label">Copy Project…</span></a></li>
                    <li class="hidden menu-item"><a class="menuItem-button menuItem--small SidebarItemRows-projectToggleIsArchived"><span class="menuItem-label">Archive Project</span></a></li>
                    <li class="menu-item" @click="showMemberDialog"><a class="menuItem-button menuItem--small SidebarItemRows-deletePotMenuItem"><span class="menuItem-label">Members</span></a></li>
                    <li class="menu-item"><a class="menuItem-button menuItem--small SidebarItemRows-deletePotMenuItem"><span class="menuItem-label">Delete Project</span></a></li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Member setting dialog  -->
        <members-dialog></members-dialog>
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
    }
  },
  methods: {
    ...mapMutations([
      'showMyTasks'
    ]),
    openCloseNav: function () {
      // console.log("Opennav")
      // console.log('==>',$('#center_pane'));
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
      window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000"
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
    hideProjectSetting(){
              this.$store.state.projectSettingId
              $("div.project-setting").addClass("hidden");
    },
    /***
     * Show project member dialog
     * 
     * */
     showMemberDialog(){
       // Hide project setting menu
        $("div.project-setting").addClass("hidden");
        $("#project-setting-dialog").removeClass("hidden");

     }

  },
  components: {
    SettingsMenu,
    NavBarSlider,
    MembersDialog
  }
}
</script>
<style>
#center_pane {
  transition: margin-left .5s;
  padding: 16px;
}

  .layerPositioner-project-setting {
      -webkit-box-align: start;
      -webkit-align-items: flex-start;
      -ms-flex-align: start;
      align-items: flex-start;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      font-size: 13px;
      height: 0;
      position: absolute;
      width: 100vw;
      z-index: 10000;
  }

.Dropdown-project-setting {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #d5dce0;
}
.menu {
    font-size: 13px;
    max-width: 300px;
    min-width: 215px;
    padding: 5px 0;
}
.menuSeparator {
    border-top: 1px solid #e0e6e8;
    margin: 5px 0;
}
.menuItem-button.menuItem--small {
    height: 30px;
}
.menuItem-button {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #151b26;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 30px;
    padding: 0 10px;
    position: relative;
}
.menuItem-button:hover {
    background-color: #14aaf5;
    color: #fff;
    fill: #fff;
    text-decoration: none;
}
</style>