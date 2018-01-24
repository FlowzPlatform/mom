<template>
    <div class="resetpassword">

        <div class="lhed">
            <a href="#">
                <img src="../assets/ob_logo.svg"> </a>
        </div>

        <div class="lcontended">
            <div class="lundcon lundconreset">
                <div class="lconun">
                    <div class="lther" style="margin-top:9px;margin-bottom: 40px;">
                        <span class="resetPasswordText">Reset Password</span>
                    </div>
                </div>

                <form v-on:submit.prevent="resetPassword" action="#" method="post">
                    <div class="lconun">
                        <div class="lrinp">
                            <label>New Password</label>
                            <input type="password" class="" v-model="reset.newpassword" placeholder="New password (Required) ">
                        </div>
                    </div>
                    <div class="lconun">
                        <div class="lrinp">
                            <label>Re-Enter New Password</label>
                            <input type="password" class="" v-model="reset.renewpassword" placeholder="Re-enter new password (Required) ">
                        </div>
                    </div>

                    <div class="lconun lconunresetbutton">
                        <el-button type="success" size="small" class="signupButton" @click="resetPassword()" :loading="saveFileLoading">Reset Password</el-button>
                    </div>
                    <button type="submit" style="display:none"></button>

                </form>
            </div>
        </div>
    </div>
</template>
<script>

    import Vue from 'vue'
    import axios from 'axios'

    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'

    import VueSession from 'vue-session'
    import config from '../../config/customConfig'
    var psl = require('psl');
    Vue.use(VueSession)

    Vue.use(ElementUI)
    Vue.use(psl)

    let baseUrl = config.feathersServiceBaseUrl;
    let facebookSuccessCallbackUrl = config.facebookSuccessCallbackUrl;
    let location = psl.parse(window.location.hostname)
    export default {
        name: 'resetpassword',
        data() {
            return {
                saveFileLoading: false,
                reset: {
                    newpassword: "",
                    renewpassword: "",
                },
                token: ''
            }
        },
        created() {
            var url_string = window.location.href;
            var url = new URL(url_string);
            location = location.domain === null ? location.input : location.domain;
            this.token = this.getParameterByName("forget_token", url_string)
            //   if(token){
            //     //   this.$cookie.set('auth_token', token, {expires: 1, domain: location});
            //   }
        },
        methods: {

            resetPassword: async function (e) {
                let self = this;
                if (self.reset.newpassword == "") {
                    self.$message.warning("New password is required");
                } else if (self.reset.renewpassword == "") {
                    self.$message.warning("re-type password is required");
                } else if (self.reset.newpassword != self.reset.renewpassword) {
                    self.$message.warning("Password dosen't match");
                } else {
                    self.saveFileLoading = true;
                    axios.post(config.resetpassword, {
                        new_password: self.reset.renewpassword.trim(),
                        token: self.token
                    })
                        .then(function (response) {
                            self.saveFileLoading = false;
                            if (response.data.code == 200) {
                                //alert(response.data.message+", please check your email for password")
                                self.$message({
                                    message: response.data.message,
                                    type: 'success'
                                });
                                self.$router.push('/');
                            } else {

                                self.$message({
                                    message: response.data.error,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log("Eroor:-->", error);
                            self.saveFileLoading = false;
                            self.$message.error("invalid token");
                        });
                }
            },
            validateEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
        }
    }
</script>

<style>
    .fb {
        background-color: #337ab7;
        color: #fff !important;
        padding: 12px 12px 3px 10px;
        border-radius: 50%;
    }

    .signupButton {

        background: #8ec622;
        /* line-height: 21px; */
        color: #fff;
        font-size: 17px;
        padding: 10px 25px;
        font-family: Helvetica-N-Md;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.8);
    }

    .google {
        background-color: #dd4b39;
        color: white;
        padding: 12px 12px 3px 10px;
        border-radius: 50%;
    }

    .linkdin {
        background: #007bb5;
        color: white;
        padding: 12px 12px 3px 10px;
        border-radius: 50%;
    }

    .lundconreset {
        max-width: 340px !important;
    }

    .lconunresetbutton {
        margin-top: 25px;
    }

    .resetPasswordText {
        font-size: 19px;
    }
</style>