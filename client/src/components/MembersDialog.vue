<template>
    <div id="project-setting-dialog" class="hidden tab-ring" v-show="(this.$store.state.currentProjectMember && this.$store.state.currentProjectMember.length>0)" v-esc="closeDialog" tabindex="-1" data-luna1-event-id="6">
        <div class="fullscreen-harness dialog2-fullscreen">
            <div class="dialog2-container">
                <div class="pre-spacer"></div>
                <div id="" class="dialog2 manage_workspace_dialog manage-workspace-members-tab" tabindex="-1" style="max-height: 592.2px;">
                    <div class="header">
                        <div class="title">
                            <div class="loading-boundary">
                                <span class="primary-title">Project Settings</span>
                                <span class="secondary-title"></span>
                            </div>
                        </div>
                        <div class="dialogView2-closeX borderless-button" @click='closeDialog'>
                            <svg class="svgIcon " viewBox="0 0 32 32" title="close dialog">
                                <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                            </svg>
                        </div>
                        <ul class="tab-view ">
                            <li class="members tab selected ">
                                <a class="tabView-tabName">Members</a>
                            </li>
                        </ul>
                    </div>
                    <div class="content">
                        <div class="vertical-scroller members-selected">
                            <div class="loading-boundary">
                                <div class="loading-boundary">
                                    <div class="workspace-users-body">
                                        <div class="scrolling-users organization-style">
                                            <div class="loading-boundary">
                                                <table>
                                                    <colgroup span="4">
                                                        <col class="name-only">
                                                        <col class="email">
                                                        <col class="guest">
                                                        <col class="button">
                                                    </colgroup>
                                                    <tbody>
                                                        <tr  v-show="member.is_deleted == false" v-for="member in $store.state.currentProjectMember" v-bind:key="member.id" class="user invite active--grayHover">
                                                            <td>
                                                                <div class="picture">
                                                                    <div v-if="member.email">
                                                                        <avatar v-if="member.url" :username="member.email" :src="member.url" :size="30"></avatar>
                                                                        <avatar v-else :username="member.email" :size="30" color="#fff"></avatar>
                                                                    </div>
                                                                </div>
                                                                <div class="name pad-top no-email">{{member.name}}</div>
                                                            </td>
                                                            <td>
                                                                <div class="email">{{member.email}}</div>
                                                            </td>
                                                            <td>
                                                                <div class="external-label">
                                                                    <a :id="'role-selection-'+member.user_id"  @click="showRoleDialog(member)" tabindex="-1" class="dropdown-menu-link  floatingSelectView-anchor workspaceGuestnessSelect manageMembers-workspaceGuestnessSelect">
                                                                        <span class="floatingSelectView-label">{{showRoleName(member)}}
                                                                            <svg v-show="showRoleName(member) !== 'Owner' " class="svgIcon  svgIcon-dropdownarrow " viewBox="0 0 32 32" title="dropdownarrow">
                                                                                <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <a class="manageMembers-removeLink" v-show="showRoleName(member) !== 'Owner' " @click="removeProjectMember(member)">Remove</a>
                                                                <a class="hidden manageMembers-removeLink" @click="removeProjectMember(member)">Cancel Invite</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <noscript></noscript>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Project role dialog-->
        <span id="roleDialog" @mouseleave="hideRoleDialog" class="hidden dropdown-style-default" style="position:relative">
            <div class="dropdown " id="workspace_guestness_select_381642285954276_dropdown_menu" style="min-width: 60.7366px;z-index: 5000;">
                <div class="dropdown-menu some-items-are-selected " >
                    <a  :id="'role-'+roleId(role)" v-show="role.name !== 'Owner' " class="menu-item-privacy  selected"  v-for="role in $store.state.userRoles" v-bind:key="role.id" @click="roleSelect(role)">
                        <svg :id="'select-icon-'+roleId(role)" v-show='selectedRole == role.name'  class="svgIcon dropdownMenuItem-selectedIcon" viewBox="0 0 32 32" title="selected">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                        </svg>
                        <span class="dropdown-menu-item-label">
                            <span class="workspaceGuestnessSelect-memberOption">{{role.name}}</span>
                        </span>
                    </a>
                </div>
            </div>
        </span>
         <div id="remove-member-dialog" class="hidden tab-ring" v-esc="closeRemoveMemberDialog" >
            <div class="fullscreen-harness dialog2-fullscreen" >
                <div class="dialog2-container">
                    <div class="pre-spacer"></div>
                    <div id="" class="dialog2 widget-extras" tabindex="-1" style="max-height: 592.2px;">
                        <div class="header">
                            <div class="title">
                                <div class="loading-boundary">
                                    <span class="primary-title">Remove member from the Project?</span>
                                       
                                    <span class="secondary-title"></span>
                                </div>
                            </div>
                            <div class="dialogView2-closeX borderless-button" @click="closeRemoveMemberDialog">
                                <svg class="svgIcon " viewBox="0 0 32 32" title="close dialog">
                                    <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                                </svg>
                            </div>
                        </div>
                        <div class="content">
                            <div class="confirmation-view confirmationView--is-danger">
                                <div class="confirmation-text">Only choose this option if you want to remove {{this.$store.state.removeMember.email}} from all tasks.</div>
                                <div class="footer">
                                    <div id="cancel" class="buttonView new-button new-default-button buttonView--secondary buttonView--large cancel footer-button" style="" tabindex="0" @click="closeRemoveMemberDialog">
                                        <span class="left-button-icon"></span>
                                        <span class="new-button-text">Cancel</span>
                                        <span class="right-button-icon"></span>
                                    </div>
                                    <div id="confirm" class="buttonView new-button new-primary-button buttonView--primary buttonView--large confirm footer-button" style="" tabindex="0" @click="removeMemberProject">
                                        <span class="left-button-icon"></span>
                                        <span class="new-button-text">Remove</span>
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
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue'
import VueEsc from 'vue-esc';
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar/dist/Avatar'
Vue.use(VueEsc);

export default {

 props: ['members'],
    data: function () {
        return {
            selectedRole:'',
            selectedRoleId:'',
            userId:'',
            memberItem:''
        }
    },
    methods: {
        closeDialog() {
           // console.log("closed dialog");
            $("#project-setting-dialog").addClass("hidden");
            this.selectedRole = '';
        },
        /**
        * Show role dialog
        **/
        showRoleDialog(member){
            // If member is owner then do no show dialog

            if(member.roleName !== 'Owner'){
                this.memberItem = member;
                this.userId = member.user_id;
                this.selectedRole = member.roleName;
                var pos = $('#role-selection-'+member.user_id).offset();
                // console.log("mouse down event(x,y)", pos,"member.id:",member.user_id);
                var top = pos.top-44;
                var left = pos.left;
                $("#roleDialog").removeClass("hidden");
                $("#roleDialog").css({"top":+top+"px","left":+left+"px"})
            }
        },
        /**
         * Hide role select dialog 
         * 
         **/
        hideRoleDialog(){
            this.selectedRole = '';
            var roles = this.$store.state.userRoles;
            roles.forEach(function(role) {
               var name = $.trim(role.name).replace(' ','');
                //role.name
                $("#select-icon-"+name).css({"display":"none"});
            }, this);
             $("#roleDialog").addClass("hidden");
        },
        /**
         * Remove member from project
         */
        removeProjectMember(member){
            this.memberItem = member;

            this.$store.state.removeMember = member;
            this.$store.commit("removeMember");
            //Show dialog
            $("#remove-member-dialog").removeClass("hidden");
        },
        getLetters(name) {
            var str = name;
            if (!str || str.length == 0)
                return "X";

            var firstLetters = str.substr(0, 2);
            return firstLetters.toUpperCase();
        },
        showRoleName(member){

          //  console.log("current project member:",this.$store.state.currentProjectMember);
          //  console.log("member user_id",member.user_id);
            // var userId = this.$store.state.currentProjectCreatedBy;
            var user =  _.find(this.$store.state.currentProjectMember, ['user_id', member.user_id])
          //  console.log("user:",user);
            if(user && user.roleName === ''){
                 user.roleName = "Owner"
            }
            // if(member.roleName === ''){
            //    member.roleName = "Admin"
            // }
            
            return member.roleName;
        },
        roleId(role){
        var name = $.trim(role.name).replace(' ','');
        return name;
        },
        /***
        * Role select from dropdown menu
        */
        roleSelect(role){
            
            console.log("Selected role:",role)
            // Hide selected icon 
            var roles = this.$store.state.userRoles;
            roles.forEach(function(role) {
               var name = $.trim(role.name).replace(' ','');
                //role.name
                $("#select-icon-"+name).css({"display":"none"});
            }, this);

            var id = $.trim(role.name).replace(' ','');
            // Show selection icon 
            $("#select-icon-"+id).css({"display":"list-item"});
            // Update project member role into database 
            var projectID = this.$store.state.currentProjectId;
            this.$store.dispatch('changeUserRole',{"roleId":role.id,"projectId":projectID,"userId":this.userId})
        },
         /**
         * Close project delete dialog 
         */
        closeRemoveMemberDialog(){
            // Remove member from globle
            this.$store.state.removeMember = ''
            this.$store.commit("removeMember");
            $("#remove-member-dialog").addClass("hidden");
        },
        /***
         * Remove member from project 
         */
        removeMemberProject(){
           // console.log("removeMember:",this.$store.state.removeMember);
            this.$store.dispatch('deleteProjectMember')
            this.closeRemoveMemberDialog();
            this.$forceUpdate();
        }
    },
    components:{
        Avatar
    }
}
</script>
<style>
td {
    padding: 0;
}
input {
    line-height: normal;
}
</style>

