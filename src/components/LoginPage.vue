<template>
<div class="dialog--nux-container" id="dialog-container">
    <div class="dialog--nux-content">
    <h1 class="title">Log In</h1>
    <!--<form id="dialog_form" class="dialog--nux-inner">-->
        <!--<input type="hidden" name="u" value="https://app.asana.com/">
        <input type="hidden" name="i" value="password">
        <input type="hidden" name="src" value="login">
        <input type="hidden" name="auth">
        <input type="hidden" name="xsrf_token" value="7667ad4ff008dad1ea5ae0aded44aadd:1493360953132">-->
        <div id="normal_login_contents">
            <!--<div class="buttonView--center">
                <div tabindex="0" class="buttonView buttonView--primary buttonView--large" id="google_auth_button" onclick="return Dialog.Login.loginWithGoogle(false, 'https://app.asana.com/-/oauth2callback', 'https:\/\/app.asana.com\/')"><span>Use Google Account</span></div>
            </div>
            <div class="dialog--nux-seperator">or</div>-->
            <div class="form-input">
                <label>Email Address</label>
                <input tabindex="1" type="email" name="e" id="email_input" value="" v-model="emailId">
            </div><span class="field-no-status"></span>
            <div class="form-input">
                <label>Password</label>
                <input tabindex="2" type="password" name="p" id="password_input" v-model="pwd"><span class="input--help">
                <!--<a href="/-/forgot_password" tabindex="-1">Forgot your password?</a>-->
                </span>
            </div>
            <div class="form-input" id="confirmpwd" style="display:none">
                <label>Confirm Password</label>
                <input tabindex="3" type="password" v-model="confPwd">
            </div>
            <div class="form-input form-input--button">
                <button tabindex="4" id="signup_btn" @click="btnSignUpClicked()" class="buttonView buttonView--default buttonView--primary buttonView--large"><span>Sign Up</span></button>
                <button tabindex="5" class="buttonView buttonView--default buttonView--primary buttonView--large" id="login_btn" @click="btnLogInClicked()"><span>Log In</span></button>
            </div>
        </div>
        <!--<script>
            Dialog.makeElementSubmit('email_input');
            Dialog.makeElementSubmit('password_input');
            Dialog.makeElementSubmit('submit_button');
        </script>-->
    <!--</form>-->
</div>
</div>
</template>
    

<script>
    /* eslint-disable*/
import Vue from 'vue'
import Resource from 'vue-resource'
import CmnFunc from './CommonFunc.js' 

Vue.use(Resource)

export default {
//   el: '#loginPage',
  data: function () {
    return {
      emailId: '',
      pwd: '',
      confPwd: ''
    }
  },
  methods: {
      btnSignUpClicked () {
          if($('#signup_btn').text() == "Sign Up") {
            $('#confirmpwd').show();
            $('#login_btn').hide()
            $('.title').text('Sign Up')
            $('#signup_btn').text('Submit')
            this.emailId = ''
            this.pwd = ''
            this.confPwd = ''
          } else if ($('#signup_btn').text() == "Submit") {
            var trimmedEmail = this.emailId.trim()
            var trimmedPwd = this.pwd.trim()
            var trimmedConfPwd = this.confPwd.trim()

            var validateEmail = CmnFunc.checkBlankField(trimmedEmail)
            if (!validateEmail) {
                console.log ('Please enter your email address')
                return
            }

            var validEmail = CmnFunc.checkValidEmail(trimmedEmail)
            if (!validEmail) {
                console.log ('Please enter valid email address')
                return
            }

            this.$http.post('/getUserEmail', {
                username: trimmedEmail
            }).then(response => response.json())
            .then(json => {
                if(json.length > 0) {
                    console.log ('This email id already exists')
                    return
                } else {
                    var validatePwd = CmnFunc.checkBlankField(trimmedPwd)
                    if (!validatePwd) {
                        console.log ('Please enter your password')
                        return
                    }

                    var matchPwd = CmnFunc.matchPassword(trimmedPwd, trimmedConfPwd)
                    if(!matchPwd) {
                        console.log ('Password and Cofirm password fields do not match')
                        return
                    }

                    //insert user into rethink db
                    this.$http.post('/insertUsers', {
                        username: trimmedEmail,
                        password: trimmedPwd
                    }).then(response => response.json())
                    .then(json => {
                        if(json.inserted) {
                            console.log('data successfully inserted')
                            $('#confirmpwd').hide();
                            $('#login_btn').show()
                            $('.title').text('Log In')
                            $('#signup_btn').text('Sign Up')
                            this.emailId = ''
                            this.pwd = ''
                            this.confPwd = ''
                        }else{
                            console.log('condition not satisfied')
                        }
                    })
                }
            })
          }
      },
      btnLogInClicked () {
        var trimmedEmail = this.emailId.trim()
        var trimmedPwd = this.pwd.trim()

        var validateEmail = CmnFunc.checkBlankField(trimmedEmail)
        if (!validateEmail) {
            console.log ('Please enter your email address')
            return
        }

        var validEmail = CmnFunc.checkValidEmail(trimmedEmail)
        if (!validEmail) {
            console.log ('Please enter valid email address')
            return
        }

        var validatePwd = CmnFunc.checkBlankField(trimmedPwd)
        if (!validatePwd) {
            console.log ('Please enter your password')
            return
        }
        this.$http.post('/getUser', {
            username: trimmedEmail,
            password: trimmedPwd
        }).then(response => response.json())
        .then(json => {
            if (json.length === 1) {
                location.href = '/main-app'
            } else {
                this.$http.post('/getUserEmail', {
                username: trimmedEmail
                }).then(response => response.json())
                .then(json => {
                    if(json.length == 0) {
                        console.log ('This email id does not exist')
                        return
                    } else {
                        console.log ('Please enter correct password')
                    }
                })
            }
        })
      }
  }
}
</script>
