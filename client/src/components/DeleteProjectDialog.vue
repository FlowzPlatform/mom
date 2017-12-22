<template>
    <div id="project-delete-dialog" class="hidden  tab-ring" >
            <div class="fullscreen-harness dialog2-fullscreen" >
                <div class="dialog2-background"></div>
            </div>
            <div class="fullscreen-harness dialog2-fullscreen">
                <div class="dialog2-container">
                    <div class="pre-spacer"></div>
                    <div id="" class="dialog2 widget-extras" tabindex="-1" style="max-height: 592.2px;">
                        <div class="header">
                            <div class="title">
                                <div class="loading-boundary">
                                    <span class="primary-title">Delete the "{{this.$store.state.currentProject.project_name}}" project?</span>
                                       
                                    <span class="secondary-title"></span>
                                </div>
                            </div>
                            <div class="dialogView2-closeX borderless-button" @click="closeDeleteDialog">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="content">
                            <div class="confirmation-view confirmationView--is-danger">
                                <div class="confirmation-text">This will delete the project and any unassigned tasks that are only in this project.</div>
                                <div class="footer">
                                    <div id="cancel" class="buttonView new-button new-default-button buttonView--secondary buttonView--large cancel footer-button" style="" tabindex="0" @click="closeDeleteDialog">
                                        <span class="left-button-icon"></span>
                                        <span class="new-button-text">Cancel</span>
                                        <span class="right-button-icon"></span>
                                    </div>
                                    <div id="confirm" class="buttonView new-button new-primary-button buttonView--primary buttonView--large confirm footer-button" style="" tabindex="0" @click="deleteProject">
                                        <span class="left-button-icon"></span>
                                        <span class="new-button-text">Delete {{this.$store.state.currentProject.project_name}}</span>
                                        <span class="right-button-icon"></span>
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
export default {
    methods: {
        closeDeleteDialog(){
            $("#project-delete-dialog").addClass("hidden");
        },
        deleteProject(){
            this.$store.dispatch('deleteProject',this.$store.state.currentProject)
            this.closeDeleteDialog();
        }
    }
}
</script>

