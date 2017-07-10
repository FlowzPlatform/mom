<template id="modal-template">
    <div class="my-dialog">
        <div class="ModalLayer-topBuffer"></div>
        <div class="modal-mask" @click="close" v-show="show" data-toggle="modal" transition="modal">
            <div class="modal-container" @click.stop>
                <div class="modal-header">

                    <div class="Dialog-headerTitle">
                        New Project
                    </div>
                    <a class="CloseButton" @click="close">
                        <svg class="Icon XIcon CloseButton-xIcon" title="XIcon" viewBox="0 0 32 32">
                            <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                        </svg>
                    </a>

                </div>

                <div class="modal-body scrollable scrollable--vertical NewProjectForm">
                    <!-- Project name -->
                    <div class="NewProjectForm-nameAndTeamRow">
                        <div class="NewProjectFormRowStructure--labelPlacementTop NewProjectFormRowStructure NewProjectForm-name">
                            <div class="NewProjectFormRowStructure-label">
                                <label class="Label" for="new_project_dialog_content_name_input">Project Name</label>
                            </div>
                            <div class="NewProjectFormRowStructure-contents">
                                <input type="text" @keyup.esc="close" v-model="projectName" id="new_project_dialog_content_name_input" class="textInput textInput--large NewProjectForm-nameInput" value="" name="">
                            </div>
                            <div class="NewProjectFormRowStructure-label">
                                <label class="LabelError">{{ createProjectError}}</label>
                            </div>
                        </div>
                    </div>
                    <!-- Project description -->
                    <div class="NewProjectForm-description is-descriptionShowing">
                        <div class="NewProjectFormRowStructure--labelPlacementTop NewProjectFormRowStructure">
                            <div class="NewProjectFormRowStructure-label--labelPlacementTop NewProjectFormRowStructure-label">
                                <label class="Label NewProjectForm-label">Description</label>
                            </div>
                            <div class="NewProjectFormRowStructure-contents">
                                <div class="NewProjectForm-descriptionInput textEditor-container">
                                    <div class="textEditor-placeholder"></div>
                                     <textarea class="quill-container" v-model="description" @keyup.esc="close">
                                       
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Privacy -->
                    <div class="NewProjectFormRowStructure-label--labelPlacementTop NewProjectFormRowStructure-label">
                        <label class="Label NewProjectForm-label">Privacy</label>
                    </div>
                    <div class="NewProjectFormRowStructure-label">
                        <label class="LabelError">{{privacyMsg}}</label>
                    </div>
                    <div class="NewProjectFormRowStructure-contents">
                        <div class="NewProjectForm-privacyOptions NewProjectForm-privacyOptions--noBorder">
                            <label class="NewProjectForm-privacyOption">
                                <div class="NewProjectForm-radioButton">
                                    <input type="radio" v-model="privacyOption" name="privacy" value="0" class="NewProjectForm-publicRadio">
                                </div>
                                <svg class="Icon UsersIcon NewProjectForm-privacyIcon" title="UsersIcon" viewBox="0 0 32 32">
                                    <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                                    <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                                </svg>
                                <div class="NewProjectForm-privacyOptionLabel">
                                    <div class="NewProjectForm-privacyOptionText">
                                        <!-- react-text: 65 -->Public to all
                                        <!-- /react-text -->
                                    </div>
                                </div>
                            </label>
                            <!--<label class="NewProjectForm-privacyOption">
                                <div class="NewProjectForm-radioButton">
                                    <input type="radio" v-model="privacyOption" value="1" name="privacy" class="NewProjectForm-privateToMembersRadio" disabled="">
                                </div>
                                <svg class="Icon LockIcon NewProjectForm-privacyIcon" title="LockIcon" viewBox="0 0 32 32">
                                    <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                                </svg>
                                <div class="NewProjectForm-privacyOptionLabel">
                                    <div class="NewProjectForm-privacyOptionText NewProjectForm-privacyOptionDisabled">Private to project members</div>
                                    <div class="NewProjectForm-privacyOptionSubtext">
                                        <a class="NewProjectForm-upsellLink NewProjectForm-upsellLinkColored">Upgrade to create private projects.</a>
                                    </div>
                                </div>
                            </label>-->
                             <label class="NewProjectForm-privacyOption">
                                <div class="NewProjectForm-radioButton">
                                    <input type="radio" v-model="privacyOption" value="1" name="privacy" class="NewProjectForm-privateToUserRadio">
                                </div>
                               <svg class="Icon UsersIcon NewProjectForm-privacyIcon" title="UsersIcon" viewBox="0 0 32 32">
                                    <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                                    <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                                </svg>
                                <div class="NewProjectForm-privacyOptionLabel">
                                    <div class="NewProjectForm-privacyOptionText">Private to Team</div>
                                </div>
                            </label>
                            <label class="NewProjectForm-privacyOption">
                                <div class="NewProjectForm-radioButton">
                                    <input type="radio" v-model="privacyOption" value="2" name="privacy" class="NewProjectForm-privateToUserRadio">
                                </div>
                                <svg class="Icon UserIcon NewProjectForm-privacyIcon" title="UserIcon" viewBox="0 0 32 32">
                                    <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                </svg>
                                <div class="NewProjectForm-privacyOptionLabel">
                                    <div class="NewProjectForm-privacyOptionText">Private to me</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Create project -->

                    <div class="CreateBlankProjectRow NewProjectForm-buttonRow">
                         <a class="Button Button--medium Button--primary CreateBlankProjectRow-button NewProjectForm-createButton" aria-role="button" @click="savePost">Create Project</a>
                    </div>

                </div>

                <div class="modal-footer text-right">

                </div>
            </div>
        </div>
        <div class="ModalLayer-bottomBuffer"></div>
    </div>
</template>
<script>
    /* eslint-disable*/
    import Vue from 'vue'
     import { focus } from 'vue-focus';
    export default {
        props: ['show'],
         directives: { focus: focus },
        data: function () {
            return {
                projectName: '',
                description: '',
                privacyOption: '',
                createProjectError: '',
                privacyMsg: ''
            }
        },
        mounted: function () {

                // this.$refs.projectName.focus();

            },
            created: function () {
                console.log("show:", this.show);
                $("#new_project_dialog_content_name_input").focus();
            },
        methods: {
            projectResponse: function (response) {
                if (!response.error) {
                    console.log("-->", response)

                    var insertInvite = {
                        project_id: response.id,
                        user_id: this.$store.state.userObject._id,
                        create_by: this.$store.state.userObject._id,
                        user_email: this.$store.state.userObject.email,
                        invited_date: new Date()
                    }
                    console.log("Insert Invite:-->", insertInvite);
                    this.$store.dispatch('insertProjectInvite', insertInvite)

                    this.projectName = ''
                    this.description = ''
                    this.privacyOption = ''
                    this.$store.state.projectlist.push(response)
                    this.$store.state.currentProjectId = response.id
                    this.$store.state.currentProjectName=response.project_name
                    this.close();

                } else {
                    // console.log("-->",response.error)
                    this.createProjectError = response.error;
                }
            },
            close: function () {
               this.$emit('updateDialog', this.show != this.show);
                this.projectName = ''
                this.description = ''
                this.privacyOption = ''
            },
            savePost: function () {
                console.log("projectName:", this.projectName)
                console.log("description:", this.description)
                console.log("privacyOption:", this.privacyOption)


                if (!this.projectName || this.projectName.length == 0) {
                    this.createProjectError = "Invalid project name";
                    return;
                } else {
                    this.createProjectError = "";
                }
                if (!this.privacyOption || this.privacyOption.length == 0) {
                    this.privacyMsg = "Select privacy";
                    return;
                } else {
                    this.privacyMsg = "";
                }

                var request = {
                    data: { project_name: this.projectName, project_description: this.description, project_privacy: this.privacyOption, create_by: this.$store.state.userObject._id, created_at: new Date() },
                    callback: this.projectResponse
                }
                this.$store.dispatch('insertProject', request)
                  this.close();

            }
        }
    }

</script>
<style>
    * {
        box-sizing: border-box;
    }

    .my-dialog .ModalLayer-topBuffer {
        height: 75px;
    }

    .Dialog-header {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        padding: 10px 30px;
        position: relative;
    }

    .Dialog-headerTitle {
        -webkit-align-self: center;
        -ms-flex-item-align: center;
        align-self: center;
        color: #1b2432;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.2;
    }

    .Dialog-closeButton {
        position: absolute;
        right: 15px;
        top: 15px;
    }

    .CloseButton {
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        fill: #cdcfd2;
    }

    a {
        color: #1aafd0;
        cursor: pointer;
        text-decoration: none;
    }

    .CloseButton:hover {
        fill: #02ceff;
    }

    a.CloseButton.Dialog-closeButton {
        position: absolute;
        top: 89px;
        right: 100px;
    }

    a:hover,
    a:focus {
        color: #02ceff;
        text-decoration: underline;
    }

    .my-dialog .modal-mask {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 0;
        -webkit-flex: 0 1 auto;
        -ms-flex: 0 1 auto;
        flex: 0 1 auto;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        min-height: 1px;
        width: 100%;
    }

    .my-dialog .modal-container {
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 3px;
        color: #1b2432;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        font-size: 13px;
        font-weight: 400;
        margin-top: 75px;
        margin-bottom: 75px;
        min-height: 1px;
        text-align: left;
        width: 580px;
        padding: 0px;
    }

    .my-dialog .modal-header {
        color: #42b983;
        background-color: transparent;
        padding: 0px;
        margin-top: -5px;
        color: #42b983;
        background-color: transparent;
        margin-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
    }

    .my-dialog .modal-footer {
        border-color: transparent;
        background-color: transparent;
    }


    .my-dialog .modal-body {
        margin: 0px 0;
    }

    .NewProjectForm {
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 15px 30px 0;
    }

    .scrollable--vertical {
        min-height: 1px;
        overflow-y: auto;
    }

    .dialog>.text-right {
        text-align: right;
    }

    .dialog>.form-label {
        display: block;
        margin-bottom: 1em;
    }

    .form-label>.form-control {
        margin-top: 0.5em;
    }

    .form-control {
        display: block;
        width: 100%;
        padding: 0.5em 1em;
        line-height: 1.5;
        border: 1px solid #ddd;
    }

    .modal-enter,
    .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .NewProjectForm-nameAndTeamRow {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }

    .NewProjectFormRowStructure {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-width: 1px;
    }

    .Label {
        color: #898e95;
        display: inline-block;
        font-size: 11px;
        margin-right: 10px;
        padding-top: 2px;
        text-align: right;
        text-transform: uppercase;
    }

    .LabelError {
        color: red;
        display: inline-block;
        font-size: 8px;
        margin-right: 10px;
        padding-top: 2px;
        text-align: right;
        text-transform: uppercase;
    }

    .NewProjectFormRowStructure-contents {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 1px;
        margin-top: -5px;
    }

    .textInput.textInput--invalid,
    .textInput.textInput--invalid:hover,
    .textInput.textInput--invalid:focus {
        border-color: #fc636b;
    }
    /* Description */

    .NewProjectFormRowStructure--labelPlacementTop {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .NewProjectFormRowStructure {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-width: 1px;
    }

    .NewProjectFormRowStructure-label--labelPlacementTop {
        margin-top: 10px;
    }

    .NewProjectFormRowStructure-label {
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        cursor: default;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
    }

    .NewProjectForm-description.is-descriptionShowing {
        margin-top: 5px;
    }

    .NewProjectForm-description {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        margin-top: 15px;
    }

    .NewProjectForm-descriptionInput .ql-editor {
        max-height: 70px;
        -webkit-transition: min-height 0.2s;
        transition: min-height 0.2s;
    }

    .NewProjectForm-descriptionInput .ql-editor {
        min-height: 70px;
        padding: 9px 9px;
    }

    .NewProjectForm-descriptionInput {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
    }

    .NewProjectForm-nameInput,
    .NewProjectForm-descriptionInput {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
    }

    .textEditor-container,
    .textEditor-container .quill-container {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .textEditor-container .ql-editor {
        outline: 0;
        white-space: pre-wrap;
    }

    .textEditor-container .quill-container,
    .textEditor-container .ql-editor {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-height: 1px;
    }

    .NewProjectForm-descriptionInput .ql-editor {
        max-height: 70px;
        -webkit-transition: min-height 0.2s;
        transition: min-height 0.2s;
    }

    .NewProjectForm-descriptionInput .ql-editor {
        min-height: 70px;
        padding: 9px 9px;
    }

    .textEditor-container .ql-editor {
        outline: 0;
        white-space: pre-wrap;
    }

    .textEditor-container .quill-container,
    .textEditor-container .ql-editor {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-height: 1px;
    }

    .textEditor-container,
    .textEditor-container .quill-container {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .textEditor-container {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        border: 1px solid #cdcfd2;
        border-radius: 3px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 9px;
        overflow-y: auto;
        padding: 0;
        position: relative;
        word-wrap: break-word;
    }

    .NewProjectForm-descriptionInput .textEditor-placeholder {
        margin: 9px 9px;
    }

    .textEditor-placeholder {
        color: #b9bcc0;
        pointer-events: none;
        position: absolute;
    }

    .textEditor-container .quill-container,
    .textEditor-container .ql-editor {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-height: 1px;
    }

    .NewProjectForm-privacy {
        margin-top: 30px;
    }

    .NewProjectFormRowStructure--labelPlacementTop {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .NewProjectFormRowStructure {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-width: 1px;
    }

    .NewProjectForm-privacyOptions.NewProjectForm-privacyOptions--noBorder {
        margin-top: 5px;
    }

    .NewProjectForm-privacyOptions {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-width: 1px;
    }

    .NewProjectForm-privacyOption:first-child {
        margin-top: 0;
    }

    .NewProjectForm-privacyOption {
        -webkit-box-align: start;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        margin-top: 15px;
    }

    input[type="radio"] {
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
    }

    .NewProjectForm-publicRadio,
    .NewProjectForm-privateToMembersRadio,
    .NewProjectForm-privateToUserRadio {
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
    }

    .NewProjectForm-privacyIcon {
        fill: #cdcfd2;
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        margin-left: 10px;
        margin-right: 5px;
    }

    .NewProjectForm-privacyOptionText,
    .NewProjectForm-privacyOptionTextWithDropdown {
        white-space: nowrap;
    }

    .NewProjectForm-privacyOptionLabel {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-width: 1px;
    }

    .NewProjectForm-privacyOptionText {
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .NewProjectForm-privacyOptionText,
    .NewProjectForm-privacyOptionTextWithDropdown {
        white-space: nowrap;
    }

    button[disabled],
    html input[disabled] {
        cursor: default;
    }

    .NewProjectForm-privacyOptionDisabled {
        color: #b9bcc0;
    }

    .NewProjectForm-privacyOptionText {
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .NewProjectForm-privacyOptionText,
    .NewProjectForm-privacyOptionTextWithDropdown {
        white-space: nowrap;
    }

    .NewProjectForm-privacyOptionSubtext {
        color: #898e95;
        font-size: 11px;
        padding-top: 5px;
    }

    a:not([href]):not([tabindex]) {
        color: inherit;
        text-decoration: none;
    }

    .Icon {
        height: 16px;
        width: 16px;
    }

    svg:not(:root) {
        overflow: hidden;
    }

    .NewProjectForm-upsellLink.NewProjectForm-upsellLinkColored {
        border-bottom: 1px dotted #fd9a00;
        color: #fd9a00;
        cursor: pointer;
        fill: #fd9a00;
    }



    .Button.Button--medium {
        height: 40px;
        line-height: 40px;
        padding: 0 14px;
    }

    .Button.Button--primary:not(.Button--disabled) {
    background: #1aafd0;
    border-color: #1aafd0;
    color: #fff;
    fill: #fff;
}
a.Button.Button--medium.Button--primary.CreateBlankProjectRow-button.NewProjectForm-createButton:hover {
    background: #02ceff;
    border-color: #02ceff;
    box-shadow: 0 0 0 3px #80e6ff;
    color: #fff;
    fill: #fff;
}

    .Button.Button--disabled.Button--primary {
        background: #eff0f1;
        color: #b9bcc0;
        border: 1px solid #e1e2e4;
    }

    .Button.Button--disabled {
        box-shadow: none;
        color: #b9bcc0;
        cursor: default;
        fill: #b9bcc0;
    }

    .NewProjectForm-buttonRow {
        padding-bottom: 15px;
        text-align: right;
    }
</style>