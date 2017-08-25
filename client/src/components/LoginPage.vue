<template>
    <div class="login-pages">
        <div class="container">
            <div class="box"></div>
            <div class="container-forms">
                <div class="container-info">
                    <div class="info-item">
                        <div class="table">
                            <div class="table-cell">
                                <p>
                                    Have an account?
                                </p>
                                <div class="btn" id="back_btn" @click="btnBackClicked()">
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="table">
                            <div class="table-cell">
                                <p>
                                    Don't have an account?
                                </p>
                                <div class="btn" id="signup_btn" @click="btnSignUpClicked()">
                                    Sign up
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-form">
                    <div class="form-item log-in">
                        <div class="table">
                            <div class="table-cell">
                                <g-signin-button class="buttonView buttonView--primary buttonView--large" id="google_auth_button" :params="googleSignInParams"
                                    @success="onSignInSuccess" @error="onSignInError">
                                    <p>Use Google Account</p>
                                </g-signin-button>
                                <div class="dialog--nux-seperator" id="seprator"> or </div>
                                <input placeholder="Email" tabindex="1" type="email" name="e" id="email_input" value="" v-model="emailId" v-on:change="enableButtons()">
                                <input placeholder="Password" tabindex="2" type="password" name="p" id="password_input" v-model="pwd" @keyup.enter="btnLogInClicked()">
                                <div tabindex="3" class="btn" id="login_btn" @click="btnLogInClicked()" @keyup.enter="btnLogInClicked()">Log in</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item sign-up">
                        <div class="table">
                            <div class="table-cell">
                                <input placeholder="Email" tabindex="4" type="email" name="e" id="email_input" value="" v-model="emailId" v-on:change="enableButtons()">
                                <input placeholder="Password" tabindex="5" type="password" name="p" id="password_input" v-model="pwd">
                                <input placeholder="Confirm Password" tabindex="6" type="password" v-model="confPwd">
                                <div tabindex="7" class="btn" id="signup_btn" @click="btnSubmitClicked()">
                                    Submit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </form> -->
</template>
<script src="https://apis.google.com/js/api:client.js" async defer></script>
<script>
    /* eslint-disable*/
    import Vue from 'vue'
    import Resource from 'vue-resource'
    import CmnFunc from './CommonFunc.js'
    import notify from './notify.js'
    import * as services from '../services'
    import VueRouter from 'vue-router'

    Vue.use(Resource)
    Vue.use(VueRouter)
    $(document).ready(function () {

        $("#login_btn").attr('disabled', true);
    });

    export default {
        //   el: '#loginPage',
        data: function () {
            return {
                emailId: '',
                pwd: '',
                confPwd: '',
                passData: 'Send to next vue..',
                /**
                 * The Auth2 parameters, as seen on
                 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
                 * As the very least, a valid client_id must present.
                 * @type {Object}
                 */
                googleSignInParams: {
                    client_id: '121571575113-vcsgo986qvvimdpgll6febunvvjqmcog.apps.googleusercontent.com'
                }
            }
        },
        computed: {
            //  getUserEmail: function()
            //  {  
            //     this.$http.post('/getUserEmail', {
            //             email: 'uhirani@officebrain.com',
            //             signup_type: 'email'
            //         }).then(response => {
            //         });
            //  },
            uname: function () {
                return this.$store.state.userObject.email
            }
        },
        methods: {
            login() {
                $(".container").toggleClass("log-in");
            },
            onSignInSuccess(googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
                // See https://developers.google.com/identity/sign-in/web/reference#users 
                var profile = googleUser.getBasicProfile() // etc etc 
                console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
                this.$http.post('/getUserDetail', {
                    email: profile.getEmail(),
                    signup_type: 'gmail'
                }).then(response => {
                        CmnFunc.resetProjectDefault()                    
                    if (response.data[0]) {
                        //  this.$store.state.userObject = {id:profile.getId(), email:profile.getEmail(), username:profile.getName()}
                        this.$store.state.userObject = response.data[0]
                        this.$store.state.isAuthorized = true
                        this.$store.commit('userData')
                        this.$store.commit('authorize')
                        this.$router.replace('/navbar/mainapp')
                        
                    } else {
                        this.insertUserData(profile.getEmail(), '', 'gmail', profile.getImageUrl(), profile.getName())
                        //this.$store.state.userObject = {id:profile.getId(), email:profile.getEmail(), username:profile.getName(), role:'', aboutme:'', dob: new Date()}
                        this.$store.state.userObject = { id: profile.getId(), email: profile.getEmail(), username: profile.getName(), role: '', aboutme: '', signup_type: 'gmail', image_url: profile.getImageUrl() }
                        this.$store.state.isAuthorized = true
                        this.$store.commit('userData')
                        this.$store.commit('authorize')
                        this.$router.replace('/navbar/mainapp')
                    }

                })

            },
            onSignInError(error) {
                // `error` contains any error occurred. 
                console.log('OH NOES', error)
            },
            btnSignUpClicked() {
                this.emailId = ''
                this.pwd = ''
                this.confPwd = ''
                $(".container").toggleClass("log-in");
            },
            btnSubmitClicked() {
                var trimmedEmail = this.emailId.trim()
                var trimmedPwd = this.pwd.trim()
                var trimmedConfPwd = this.confPwd.trim()

                var validateEmail = CmnFunc.checkBlankField(trimmedEmail)
                if (!validateEmail) {
                    $("#email_input").notify("Email address field should not be blank")
                    return
                }

                var validEmail = CmnFunc.checkValidEmail(trimmedEmail)
                if (!validEmail) {
                    $("#email_input").notify("Please enter valid email address")
                    return
                }

                var validatePwd = CmnFunc.checkBlankField(trimmedPwd)
                if (!validatePwd) {
                    $("#password_input").notify("Password should not be blank")
                    return
                }
                var validateConfPwd = CmnFunc.checkBlankField(trimmedConfPwd)
                if (!validateConfPwd) {
                    $("#confirmpwd").notify("Confirm password field should not be blank")
                    return
                }
                var matchPwd = CmnFunc.matchPassword(trimmedPwd, trimmedConfPwd)
                if (!matchPwd) {
                    $("#confirmpwd").notify("Password and Confirm password fields do not match")
                    return
                }
                var self = this
                this.$store.dispatch('userRegistrationProcess', { 'email': trimmedEmail, 'password': trimmedPwd, 'signup_type': 'email', 'image_url': '' })
                    .then(function (response) {
                        console.log('response successful')
                        self.emailId = ''
                        self.pwd = ''
                        self.confPwd = ''
                        $('#confirmpwd').hide();
                        $('#login_btn').show()
                        $('.title').text('Log In')
                        $('#signup_btn').text('Sign Up')
                        $('#google_auth_button').show()
                        $('#seprator').show()
                        $('#back_btn').hide()
                        $("#login_btn").attr('disabled', true);
                    })
                    .catch(function (error) {
                        console.log('error with signup')
                        $("#email_input").notify(error.message)
                    })
                $(".container").toggleClass("log-in");
            },
            insertUserData(emailID, pwd, usertype, profilePic, uname) {
                //insert user into rethink db
                this.$http.post('/insertUsers', {
                    email: emailID,
                    password: pwd,
                    username: uname,
                    role: '',
                    aboutme: '',
                    firstname: '',
                    signup_type: usertype,
                    image_url: profilePic,
                    image_name: ''
                    // dob: new Date()
                }).then(response => response.json())
                    .then(json => {
                        if (json.inserted) {
                            console.log('data successfully inserted')
                            $('#confirmpwd').hide();
                            $('#login_btn').show()
                            $('.title').text('Log In')
                            $('#signup_btn').text('Sign Up')
                            this.emailId = ''
                            this.pwd = ''
                            this.confPwd = ''
                        }
                    })
            },
            btnLogInClicked() {
                var trimmedEmail = this.emailId.trim()
                var trimmedPwd = this.pwd.trim()

                var validateEmail = CmnFunc.checkBlankField(trimmedEmail)
                if (!validateEmail) {
                    $("#email_input").notify("Email address field should not be blank")
                    return
                }

                var validEmail = CmnFunc.checkValidEmail(trimmedEmail)
                if (!validEmail) {
                    $("#email_input").notify("Please enter valid email address")
                    return
                }

                var validatePwd = CmnFunc.checkBlankField(trimmedPwd)
                if (!validatePwd) {
                    $("#password_input").notify("Password should not be blank")
                    return
                }
                var self = this
                CmnFunc.resetProjectDefault()                
                this.$store.dispatch('userLoginProcess', {'email':trimmedEmail, 'password':trimmedPwd})         
                .then(function () {             
                    self.$store.state.isAuthorized = true             
                    self.$store.commit('authorize')      
                    self.$store.dispatch('getUserDetail')             
                    //  self.$store.dispatch('getUserRegister')                           
                    .then(function () {                 
                         self.$router.replace('/navbar/mainapp')   
                    })             
                    .catch(function(error) {      
                       if (error.response.status === 401) { 
                           return 
                        }              
                        $.notify.defaults({ className: "error" })                 
                        $.notify(error.message, { globalPosition:"top center"})             
                    })       
                })       
                .catch(function (error) {             
                    $.notify.defaults({ className: "error" })             
                    $.notify(error.message, { globalPosition:"top center"})       
                });
                
            },
            btnBackClicked() {
                $(".container").toggleClass("log-in");
                // $('#confirmpwd').hide()
                // $('#back_btn').hide()
                // $('.title').text('Log In')
                // $('#signup_btn').text('Sign Up')
                // $('#login_btn').show()
                // $('#google_auth_button').show()
                // $('#seprator').show()
                // $('#signup_btn').removeClass('is-disabled')
                // $("#signup_btn").attr('disabled', false)
                // $('#login_btn').addClass('is-disabled')
                // $("#login_btn").attr('disabled', true)
                this.emailId = ''
                this.pwd = ''
                this.confPwd = ''
            },
            enableButtons() {
                var trimmedEmail = this.emailId.trim()
                if (trimmedEmail.length >= 1) {
                    $('#login_btn').removeClass('is-disabled')
                    $("#login_btn").attr('disabled', false);

                    $('#signup_btn').removeClass('is-disabled')
                    $("#signup_btn").attr('disabled', false);
                } else {
                    if ($('#signup_btn').text() == "Submit") {
                        $('#signup_btn').addClass('is-disabled')
                        $("#signup_btn").attr('disabled', true);
                    }
                    $('#login_btn').addClass('is-disabled')
                    $("#login_btn").attr('disabled', true);
                }
            }
        }
    }

</script>
<style>
    .g-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }

    .login-pages {
        background-color: #5356ad;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>