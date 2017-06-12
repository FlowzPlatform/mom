<template lang="html">
  <div>
    <div data-reactroot="" class="Topbar">
      <div class="Topbar-navButtonContainer">
        <a class="Topbar-navButton">
          <svg class="Icon HamburgerIcon Topbar-sidebarToggleIcon" title="HamburgerIcon" viewBox="0 0 32 32">
            <rect x="2" y="4" width="28" height="4"></rect>
            <rect x="2" y="14" width="28" height="4"></rect>
            <rect x="2" y="24" width="28" height="4"></rect>
          </svg>
        </a>
      </div>
      <router-link class="NavigationLink Topbar-myTasksButton is-selected" to="/navbar/mainapp">
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
            <li>
              <a id="settings" class="menu-item" title="">
                <span class="dropdown-menu-item-label" @click="settings_menu = true">Settings</span>
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
    <settings-menu :showModal="settings_menu" :closeAction="closeDialog"></settings-menu>
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
                  <label>Name</label>
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
  <!--Profile dialog end-->
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
        settings_menu: false
      }
    },
    created() {
      this.$store.dispatch('getUserSetting')
    },
    computed: {
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
      closeDialog() {
        this.settings_menu = false
      },
      btnLogoutClicked() {
        this.$store.state.userObject = {}
        this.$store.state.isAuthorized = false
        this.$store.commit('userData')
        this.$store.commit('authorize')
        window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000"
      },
      btnUpdateProfileClicked() {
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
              $.notify("Profile updated successfully.", { globalPosition: "top center" })
            }
          })
      },
      btnProfileClicked() {
        this.username = this.$store.state.userObject.username,
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
      onFileChange(e) {
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
     SettingsMenu
  }
  }

</script>