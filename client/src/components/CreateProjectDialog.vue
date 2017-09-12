<template id="modal-template">
    <div class="my-dialog">
        <div class="hidden ModalLayer-topBuffer"></div>
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
                                <input type="text"  @keyup.esc="close" v-model="projectName" tabindex="0" id="new_project_dialog_content_name_input" class="textInput textInput--large NewProjectForm-nameInput" value="" name="">
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
                                    <input type="radio"  v-model="privacyOption" name="privacy" value="0" class="NewProjectForm-publicRadio">
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
                                    <div class="NewProjectForm-privacyOptionText">Private to project members</div>
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

                <div class="hidden modal-footer text-right">

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
                privacyMsg: '',
                focused: true
            }
        },
        mounted: function () {

               // this.$refs.projectName.focus();

            },
            created: function () {
                $("#new_project_dialog_content_name_input").focus();
            },
        methods: {
            projectResponse: function (response) {
                if (!response.error) {
                    var insertInvite = {
                        project_id: response.id,
                        user_id: this.$store.state.userObject._id,
                        create_by: this.$store.state.userObject._id,
                        user_email: this.$store.state.userObject.email,
                        invited_date: new Date(),
                        is_deleted:false,
                        user_role_id:''
                    }
                    this.$store.dispatch('insertProjectInvite', insertInvite)

                    this.projectName = ''
                    this.description = ''
                    this.privacyOption = ''
                    // this.$store.state.projectlist.push(response)
                    this.$store.state.currentProjectId = response.id
                    this.$store.state.currentProjectName=response.project_name
                    this.$store.state.currentProjectMember = response.members; 
                    
                    this.close();

                } else {
                    this.createProjectError = response.error;
                }
            },
            // getOwernerId(){
            //     this.$store.state.userRoles
                
            //     let owner = _.find(this.$store.state.userRoles, ['name', "Owner"])

            //     return owner.id;
            // },
            close: function () {
               this.$emit('updateDialog', this.show != this.show);
                this.projectName = ''
                this.description = ''
                this.privacyOption = ''
            },
            savePost: function () {
                if (!this.projectName || this.projectName.length == 0) {
                    this.createProjectError = "Invalid project name";
                    return;
                } else {
                    this.createProjectError = ""    ;
                }
                if (!this.privacyOption || this.privacyOption.length == 0) {
                    this.privacyMsg = "Select privacy";
                    return;
                } else {
                    this.privacyMsg = "";
                }

                var request = {
                    data: { project_name: this.projectName, project_description: this.description, project_privacy: this.privacyOption, create_by: this.$store.state.userObject._id, created_at: new Date(),is_deleted:false },
                    callback: this.projectResponse
                }
                this.$store.dispatch('insertProject', request)
                  this.close();

            }
        }
    }

</script>
<style>
    
</style>