<template>
    <div id="project-delete-dialog" class="hidden  tab-ring" v-esc="closeDeleteDialog" >
            <div class="fullscreen-harness dialog2-fullscreen" style="">
                <div class="dialog2-background"></div>
            </div>
            <div class="fullscreen-harness dialog2-fullscreen" style="">
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
                                <svg class="svgIcon " viewBox="0 0 32 32" title="close dialog">
                                    <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                                </svg>
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
                    <div class="post-spacer"></div>
                </div>
            </div>
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue'
import VueEsc from 'vue-esc';

Vue.use(VueEsc);

export default {

    data: function () {
        return {

        }
    },
    methods: {
        /**
         * Close project delete dialog 
         */
        closeDeleteDialog(){
            $("#project-delete-dialog").addClass("hidden");
        },
        /***
         * Delete project 
         */
        deleteProject(){
            // Show project visibility option (like public to all, private to me)
            $("div#projectVisible").addClass('hidden');
            this.$store.dispatch('deleteProject',this.$store.state.currentProject)
            this.closeDeleteDialog();
        }

    }

}
</script>

