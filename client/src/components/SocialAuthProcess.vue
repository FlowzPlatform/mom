<template>
    <div class="registration">
        <div class="container">
            <div class="box"></div>
        </div>
        <div class="social-auth">
            <div class="social-header">
                <label>Registration Process</label>
            </div>
            <div class="form-input">
                <label>Email</label>
                <span class="pro-part">
                    <input type="Email" v-model='emailId' id="email_input">
                </span>
            </div>
            <div class="form-input">
                <label>About me</label>
                <span class="pro-part">
                    <textarea class="generic-input showing about-me" v-model='aboutme' id="" style="height: 100px;" placeholder="" maxlength="200"></textarea>
                </span>
            </div>
            <div>
                <button class="social-auth-btn" @click="btnRegisterClicked()">Register</button>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable*/
    import CmnFunc from './CommonFunc.js'
    export default {
        data: function () {
            return {
                emailId: '',
                aboutme: ''
            }
        },
        methods: {
            btnRegisterClicked() {
                var trimmedEmail = this.emailId.trim()
                var trimmedAboutMe = this.aboutme.trim()

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
                var self = this;
                this.$store.dispatch('socialAuthRegistration', { 'email': trimmedEmail, 'aboutme': trimmedAboutMe })
                    .then(function () {
                        self.$store.state.isAuthorized = true
                        self.$store.commit('authorize')
                        self.userDetail(self)
                    })
                    .catch(function (error) {
                        $.notify.defaults({ className: "error" })
                        $.notify(error.message, { globalPosition: "top center" })
                    });
            },
            userDetail(self) {
                self.$store.dispatch('getUserDetail')
                    .then(function () {
                        self.$router.replace('/navbar/mainapp')

                    })
                    .catch(function (error) {
                        if (error.response.status === 401) {
                            CmnFunc.deleteAutheticationDetail()
                            self.$router.replace('/')
                            return
                        }
                        $.notify.defaults({ className: "error" })
                        $.notify(error.message, { globalPosition: "top center" })
                    })
            }
        }
    }
</script>