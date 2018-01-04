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
                        <div class="table" v-if="!isForgotPasswordShow">
                            <div class="table-cell">
                                <form action="http://auth.flowz.com/auth/Gplus" method="post">
                                    <input type="hidden" name="success_url" value="http://mom.flowz.com">
                                    <button class="googleAuthBtn" type="submit">Use Google Account</button>
                                </form>
                                <div class="dialog--nux-seperator" id="seprator"> or </div>
                                <div>
                                    <Tabs type="card" value="1" @on-click=tabsClicked>
                                        <TabPane label="Standard" name="1">
                                            <input placeholder="Email" tabindex="1" type="email" name="e" id="email_input" value="" v-model="emailId" v-on:change="enableButtons()">
                                            <input placeholder="Password" tabindex="2" type="password" name="p" id="password_input" v-model="pwd" @keyup.enter="btnLogInClicked()">
                                            <div tabindex="3" @click="btnForgotClicked()" class="" style="
                                                text-align:  -webkit-right;
                                                padding-right: 106px;
                                            ">Forgot password?</div>
                                            <div tabindex="3" class="btn" id="login_btn" @click="btnLogInClicked()" @keyup.enter="btnLogInClicked()">Log in
                                                <img v-if="showLoginActivity" src="../assets/activity.svg" style="margin-left: 10px; width:25px; height:25px;"/>
                                            </div>
                                        </TabPane>
                                        <TabPane label="LDAP" name="2">
                                            <input placeholder="LDAP Username" tabindex="4" type="email" name="e" id="ldap_username" value="" v-model="emailId" v-on:change="enableButtons()">
                                            <input placeholder="Password" tabindex="5" type="password" name="p" id="password_input_ldap" v-model="pwd" @keyup.enter="btnLogInClicked()">
                                            <div tabindex="3" @click="btnForgotClicked()" class="" style="
                                                text-align:  -webkit-right;
                                                padding-right: 106px;
                                            ">Forgot password?</div>
                                            <div tabindex="6" class="btn" id="login_btn" @click="btnLogInClicked()" @keyup.enter="btnLogInClicked()">Log in
                                                <img v-if="showLoginActivity" src="../assets/activity.svg" style="margin-left: 10px; width:25px; height:25px;"/>
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                        <div class="table" v-else>
                            <span id="close" class="destroy" style="padding : 25px; text-align: right" @click="btnForgotClicked()">
                                <i class="fa fa-arrow-left"></i>
                            </span>
                            <div class="table-cell">
                                <div tabindex="3" class="" style="text-align:  -webkit-left;display:  inline-block;">
                                    <font size="5">Forgot password?</font>

                                </div>
                                <div style="padding-top:  20px;">
                                    <input placeholder="Email" tabindex="1" type="email" name="e" id="email_input" value="" v-model="forgotEmailId">
                                    <div tabindex="3" class="btn" id="login_btn" @click="btnLogInClicked()" @keyup.enter="btnLogInClicked()">Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item sign-up">
                        <div class="table">
                            <div class="table-cell">
                                <input placeholder="First Name" tabindex="7" type="firstname" id="firstnameInput" v-model="fname">
                                <input placeholder="Last Name" tabindex="8" type="lastname" id="lastnameInput" v-model="lname">
                                <input placeholder="Email" tabindex="9" type="email" name="e" id="emailInput" value="" v-model="emailId" v-on:change="enableButtons()">
                                <input placeholder="Password" tabindex="10" type="password" name="p" id="passwordInput" v-model="pwd">
                                <input placeholder="Confirm Password" tabindex="11" type="password" v-model="confPwd" id="confirmpwd" @keyup.enter="btnSubmitClicked()">
                                <div tabindex="12" class="btn" id="signup_btn" @click="btnSubmitClicked()" @keyup.enter="btnSubmitClicked()">
                                    Submit
                                    <img v-if="showSignUpActivity" src="../assets/activity.svg" style="margin-left: 10px; width:25px; height:25px;"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable*/
    import Vue from 'vue'
    import Resource from 'vue-resource'
    import CmnFunc from './CommonFunc.js'
    import notify from './notify.js'
    import VueRouter from 'vue-router'
    import iView from 'iview';
    import 'iview/dist/styles/iview.css';
    import locale from 'iview/dist/locale/en-US';
    Vue.use(iView, { locale });
    Vue.use(iView);
    Vue.use(Resource)
    Vue.use(VueRouter)
    var VueCookie = require('vue-cookie')
    Vue.use(VueCookie)
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
                selectedTabIndex: 1,
                fname: '',
                lname: '',
                showSignUpActivity: false,
                showLoginActivity: false,
                isForgotPasswordShow: false,
                forgotEmailId: ''
            }
        },
        mounted() {
            var self = this
            if (this.$cookie.get('auth_token') !== null) {
                self.$store.state.isAuthorized = true
                self.$store.commit('authorize')
                //self.userDetail(self)
                self.$store.dispatch('getUserDetail')
                    .then(function () {
                    })
                    .catch(function (error) {
                        if (error.response.status === 401) {
                            return
                        }
                        $.notify.defaults({ className: "error" })
                        $.notify(error.message, { globalPosition: "top center" })
                    })
            }
        },
        created() {
            console.log("AUTH_TOKEN:", localStorage.getItem('auth_token'))
            var url_string = window.location.href;
            var url = new URL(url_string);

            var token = url.searchParams.get('token')
            if (token) {
                console.log('TOKEN exist:', token)
                this.$store.commit('SAVE_USERTOKEN', token)
                this.$router.replace('/loadProcess')
                this.userDetail(this)
                //this.getAccessTokenAPI(code)
            }

            var id = url.searchParams.get('ob_id')
            if (id) {
                this.$store.state.googleId = id
                this.$store.commit('googleId')
                this.$router.replace('/socialAuth')
            }
        },
        computed: {
            uname: function () {
                return this.$store.state.userObject.email
            }
        },
        methods: {
            btnForgotClicked() {
                console.log("-------------Btn forgot password click-------")
                this.isForgotPasswordShow = !this.isForgotPasswordShow;
            },
            login() {
                $(".container").toggleClass("log-in");
            },
            tabsClicked(val) {
                this.emailId = ''
                this.pwd = ''
                this.confPwd = ''
                this.selectedTabIndex = val;
            },
            btnSignUpClicked() {
                this.emailId = ''
                this.pwd = ''
                this.confPwd = ''
                this.fname = ''
                this.lname = ''
                $(".container").toggleClass("log-in");
            },
            btnSubmitClicked() {
                let trimmedFname = this.fname.trim()
                let trimmedLname = this.lname.trim()
                let trimmedEmail = this.emailId.trim()
                let trimmedPwd = this.pwd.trim()
                let trimmedConfPwd = this.confPwd.trim()

                let validateFname = CmnFunc.checkBlankField(trimmedFname)
                if (!validateFname) {
                    $("#firstnameInput").notify("First name should not be blank")
                    return
                }

                let validateLname = CmnFunc.checkBlankField(trimmedLname)
                if (!validateLname) {
                    $("#lastnameInput").notify("Last name should not be blank")
                    return
                }

                let validateEmail = CmnFunc.checkBlankField(trimmedEmail)
                if (!validateEmail) {
                    $("#emailInput").notify("Email address should not be blank")
                    return
                }

                let validEmail = CmnFunc.checkValidEmail(trimmedEmail)
                if (!validEmail) {
                    $("#emailInput").notify("Please enter valid email address")
                    return
                }

                let validatePwd = CmnFunc.checkBlankField(trimmedPwd)
                if (!validatePwd) {
                    $("#passwordInput").notify("Password should not be blank")
                    return
                }
                let validateConfPwd = CmnFunc.checkBlankField(trimmedConfPwd)
                if (!validateConfPwd) {
                    $("#confirmpwd").notify("Confirm password field should not be blank")
                    return
                }
                let matchPwd = CmnFunc.matchPassword(trimmedPwd, trimmedConfPwd)
                if (!matchPwd) {
                    $("#confirmpwd").notify("Password and Confirm password fields do not match")
                    return
                }

                let fullname = CmnFunc.capitalizeFirstLetter(trimmedFname) + ' ' + CmnFunc.capitalizeFirstLetter(trimmedLname)
                
                this.showSignUpActivity = true

                let self = this
                this.$store.dispatch('userRegistrationProcess', { 'email': trimmedEmail, 'password': trimmedPwd, 'signup_type': 'email', 'image_url': '', 'fullname': fullname })
                    .then(function (response) {
                        self.emailId = ''
                        self.pwd = ''
                        self.confPwd = ''
                        self.fname = ''
                        self.lname = ''
                        $('#confirmpwd').hide();
                        $('#login_btn').show()
                        $('.title').text('Log In')
                        $('#signup_btn').text('Sign Up')
                        $('#google_auth_button').show()
                        $('#seprator').show()
                        $('#back_btn').hide()
                        $("#login_btn").attr('disabled', true);
                        self.showSignUpActivity = false
                        $(".container").toggleClass("log-in");
                        $.notify.defaults({ className: "success" })
                        $.notify("You are successfully registered", { globalPosition: "top center" })
                        
                    })
                    .catch(function (error) {
                        $.notify.defaults({ className: "error" })
                        $.notify(error, { globalPosition: "top center" })
                        self.showSignUpActivity = false
                    })
            },
            btnLDAPPressed() {
                let self = this
                // CmnFunc.resetProjectDefault()
                this.$store.dispatch('signInWithLDAP', { 'userid': 'xxxx', 'passwd': 'xxxx' })
                    .then(function (response) {
                        console.log('LOG IN--> response', response)
                        self.$store.state.isAuthorized = true
                        self.$store.commit('authorize')
                        self.userDetail(self)
                    })
                    .catch(function (error) {
                        $.notify.defaults({ className: "error" })
                        $.notify(error.message, { globalPosition: "top center" })
                    });
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
                    if (this.selectedTabIndex == 1) {
                        $("#email_input").notify("Email address should not be blank")
                    } else {
                        $("#ldap_username").notify("LDAP username should not be blank")
                    }
                    return
                }

                var validEmail = CmnFunc.checkValidEmail(trimmedEmail)
                if (!validEmail && this.selectedTabIndex == 1) {
                    $("#email_input").notify("Please enter valid email address")
                    return
                }

                var validatePwd = CmnFunc.checkBlankField(trimmedPwd)
                if (!validatePwd) {
                    if (this.selectedTabIndex == 1) {
                        $("#password_input").notify("Password should not be blank")
                    } else {
                        $("#password_input_ldap").notify("Password should not be blank")
                    }
                    return
                }

                this.showLoginActivity = true
                var self = this
                CmnFunc.resetProjectDefault()

                this.$store.dispatch('userLoginProcess', { 'email': trimmedEmail, 'password': trimmedPwd, 'userType': this.selectedTabIndex })
                    .then(function () {
                        self.$store.state.isAuthorized = true
                        self.$store.commit('authorize')
                        self.userDetail(self)
                        self.showSignUpActivity = false
                    })
                    .catch(function (error) {
                        console.log('error:', error.message)
                        $.notify.defaults({ className: "error" })
                        $.notify(error.message, { globalPosition: "top center" })
                        self.showLoginActivity = false
                    });

            },
            userDetail(self) {
                self.$store.dispatch('getUserDetail')
                    //  self.$store.dispatch('getUserRegister')                           
                    .then(function () {
                        self.$router.replace('/navbar/mainapp')
                    })
                    .catch(function (error) {
                        if (error.response.status === 401) {
                            return
                        }
                        if (error.response.status === 403) {
                            return
                        }
                        
                        $.notify.defaults({ className: "error" })
                        $.notify(error.message, { globalPosition: "top center" })
                    })
            },
            btnBackClicked() {
                $(".container").toggleClass("log-in");

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
    .login-pages {
        background-color: #5356ad;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>