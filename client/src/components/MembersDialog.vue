<template>
    <div id="project-setting-dialog" class="hidden tab-ring" v-show="this.$store.state.currentProjectMember.length>0" v-esc="closeDialog" tabindex="-1" data-luna1-event-id="6">
        <div class="fullscreen-harness dialog2-fullscreen" style="">
            <div class="dialog2-background"></div>
        </div>
        <div class="fullscreen-harness dialog2-fullscreen" style="">
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
                            <li class="hidden settings tab unselected ">
                                <a class="tabView-tabName">General</a>
                            </li>
                            <li class="members tab selected ">
                                <a class="tabView-tabName">Members</a>
                            </li>
                            <li class="hidden advanced tab unselected ">
                                <a class="tabView-tabName">Advansced</a>
                            </li>
                        </ul>
                    </div>
                    <div class="content">
                        <div class="hidden loading-boundary  manageWorkspaceDialog-headersViewBoundary">
                            <div class="manageWorkspaceMembersHeaderView">
                                <div class="organizations-upgrade-prompt manageMembers-upgradeBanner">
                                    <span class="upgrade-text">
                                        <div>4 of 15 members invited.
                                            <a class="upgrade-link">Upgrade to add more members.</a>
                                        </div>
                                    </span>
                                    <div class="buttonView new-button new-primary-button buttonView--primary buttonView--default organizations-upgrade-prompt-button" style="">
                                        <span class="left-button-icon"></span>
                                        <span class="new-button-text">Upgrade</span>
                                        <span class="right-button-icon"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                        <tr v-show="member.is_deleted == false" v-for="member in this.$store.state.currentProjectMember" v-bind:key="member.id" class="user invite active--grayHover">
                                                         
                                                            <td>
                                                                <div class="picture">
                                                                    <!-- <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners ">
                                                                        <div class="photoView-reactMount">

                                                                            <div v-if="member.url" class="Avatar Avatar--medium Avatar--color11"  v-bind:style="{ 'background-image': 'url(' + member.url + ')' }" >
                                                                            </div>

                                                                            <div v-else class="Avatar Avatar--medium Avatar--color11">
                                                                                               {{getLetters(member.email)}}
                                                                            </div>
                                                                        </div>
                                                                    </div> -->
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
                        <div class="hidden workspace-users-footer">
                            <div class="separator"></div>
                            <div class="invite-user-view wide">
                                <div class="invite-form-header section-header">INVITE MORE MEMBERS</div>
                                <div class="invite-form-body">
                                    <div class="invite-form-field">
                                        <div class="field-name">Email</div>
                                        <table class="inviteUserView-emailForm">
                                            <tr>
                                                <td>
                                                    <input autocomplete="off" class="email generic-input showing" type="text" data_type="text" id="invite_user_view.invite_form_email" tabindex="0">
                                                </td>
                                                <td class="field-status"></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="invite-form-field">
                                        <div class="field-name">Name (optional)</div>
                                        <input autocomplete="off" class="name generic-input showing" type="text" data_type="text" id="invite_user_view.invite_form_name" tabindex="0">
                                    </div>
    
                                </div>
                                <div class="inviteUserView-buttonRow">
                                    <label class="guest-option-content" id="luna3">
                                        <div id="invite_user_view.guest_checkbox" class="checkboxWidget checkboxWidget--unchecked inviteUserView-guestOption-checkbox"></div>
                                        <span class="guest-option-explanation">
                                            <span class="guest-invite-text">
                                                <span class="guest-invite-text-primary">Invite as Guest</span>
                                            </span>
                                        </span>
                                    </label>
                                    <div id="invite_user_view.invite_form_send" class="buttonView new-button new-primary-button buttonView--primary disabled is-disabled buttonView--default  inviteUserView-sendButton" style="" tabindex="-1">
                                        <span class="left-button-icon"></span>
                                        <span class="new-button-text">Send Invite</span>
                                        <span class="right-button-icon"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="message"></div>
                        </div>
                    </div>
                </div>
                <div class="post-spacer"></div>
            </div>
        </div>
        
        <!-- Project role dialog-->
        <span id="roleDialog" @mouseleave="hideRoleDialog" class="hidden dropdown-style-default" style="position:relative">
            <div class="dropdown " id="workspace_guestness_select_381642285954276_dropdown_menu" style="min-width: 60.7366px;z-index: 5000;">
                <div class="dropdown-menu some-items-are-selected " >
                     <!-- <a title="">
                        <span class="dropdown-menu-item-label">
                            <span class="workspaceGuestnessSelect-guestOption">Guest</span>
                        </span>
                    </a>   -->
                    <a  :id="'role-'+roleId(role)" v-show="role.name !== 'Owner' " class="menu-item selected"  v-for="role in $store.state.userRoles" v-bind:key="role.id" @click="roleSelect(role)">
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
/* 
* Drop down menu
*/
.dropdown-menu.some-items-are-selected{
        display: inline-grid;   
}
.dropdown-menu.some-items-are-selected .menu-item {
    padding: 0px 27px;
}
.dropdown .dropdown-menu .menu-item:hover:not(.disabled), .dropdown .dropdown-menu .menu-item.hovered:not(.disabled), .dropdown .dropdown-menu .item:hover:not(.disabled), .dropdown .dropdown-menu .item.hovered:not(.disabled) {
    background-color: #14aaf5;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
}
.dropdown .dropdown-menu {
    min-width: 215px;
}
.dropdown-menu.some-items-are-selected .menu-item .dropdownMenuItem-selectedIcon {
    height: 12px;
    margin-left: -17px;
    margin-right: 5px;
    width: 12px;
}
.dropdown .menu-item, .dropdown .item, .dropdown .menu-widget {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -moz-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    -ms-flex-align: center;
    color: #151b26;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 100%;
    font-size: 13px;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: visible;
    padding: 0 10px;
}
.menu-item {
    margin-bottom: 1px;
}
.dialog2-fullscreen {
    z-index: 900;
}

.fullscreen-harness {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.01);
}

.fullscreen-harness>* {
    width: 100%;
    height: 100%;
}

.dialog2-background {
    background: #646f79;
    opacity: 0.7;
}

.fullscreen-harness>* {
    width: 100%;
    height: 100%;
}

.dialog2-container {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    flex-direction: column;
    -ms-flex-direction: column;
    -moz-box-align: center;
}

.dialog2-container .pre-spacer {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1 1 auto;
    -moz-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-height: 150px;
}

.dialog2 {
    background-color: white;
    border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    flex-direction: column;
    -ms-flex-direction: column;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    font-size: 13px;
    outline: none;
    width: 580px;
    margin-left: auto;
    margin-right: auto;
}

.dialog2 .header {
    border-bottom: 1px solid #e0e6e8;
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    flex-direction: column;
    -ms-flex-direction: column;
    -webkit-flex-shrink: 0;
    -moz-flex-shrink: 0;
    flex-shrink: 0;
    -ms-flex-negative: 0;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
    position: relative;
}

.dialog2 .header .title {
    color: #151b26;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 500;
    line-height: 1.2;
}

.dialog2 .header .title .secondary-title {
    margin-left: 7px;
    color: #848f99;
}

.borderless-button {
    fill: #d5dce0;
    cursor: pointer;
}

.dialogView2-closeX {
    position: absolute;
    top: 15px;
    right: 15px;
}

.dialog2 .tab-view {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1 0 auto;
    -moz-flex: 1 0 auto;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    margin-bottom: -11px;
    margin-top: 15px;
}

.tab-view {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -moz-box-align: end;
    box-align: end;
    -webkit-align-items: flex-end;
    -moz-align-items: flex-end;
    -ms-align-items: flex-end;
    -o-align-items: flex-end;
    align-items: flex-end;
    -ms-flex-align: end;
    border-bottom: 1px solid #e0e6e8;
    font-size: 13px;
    width: 100%;
}

.tab {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    color: #848f99;
    margin-right: 30px;
    padding-bottom: 8px;
    transition-duration: .2s;
    transition-property: box-shadow, color;
}

.tab.selected {
    box-shadow: inset 0 -3px #ff5263;
    -moz-box-shadow: inset 0 -3px #ff5263;
    -webkit-box-shadow: inset 0 -3px #ff5263;
    color: #151b26;
    cursor: default;
}

.tab {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    color: #848f99;
    margin-right: 30px;
    padding-bottom: 8px;
    transition-duration: .2s;
    transition-property: box-shadow, color;
}

a.tabView-tabName {
    color: inherit;
}

a {
    background-color: transparent;
}

a {
    color: #14aaf5;
    cursor: pointer;
    text-decoration: none;
}

.tab:last-child {
    margin-right: 0;
}

.manageMembers-upgradeBanner {
    -webkit-box-align: center;
    -moz-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    -ms-flex-align: center;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: #fffede;
    color: #646f79;
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    line-height: 16px;
    min-height: 40px;
    margin: 2px;
    padding: 15px 30px;
}

.organizations-upgrade-prompt {
    fill: #fcbd01;
    -webkit-box-align: center;
    -moz-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    -ms-flex-align: center;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: #fffede;
    color: #646f79;
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    line-height: 16px;
    min-height: 30px;
    margin: 2px;
    padding: 15px;
}

.organizations-upgrade-prompt .organizations-upgrade-prompt-button.buttonView--primary {
    background: #fcbd01;
    border-color: #fcbd01;
}

.organizations-upgrade-prompt .organizations-upgrade-prompt-button {
    margin-left: auto;
}

.buttonView.buttonView--primary {
    color: #fff;
    fill: #fff;
}

.buttonView.buttonView--default {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
}

.buttonView.buttonView--primary {
    background: #14aaf5;
    border-color: #14aaf5;
}

.dialog2 .primary.button,
.dialog2 .buttonView--primary {
    float: right;
}

.organizations-upgrade-prompt a {
    margin-left: 0.5em;
    font-weight: normal;
}

.buttonView {
    -webkit-box-align: center;
    -moz-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    -ms-flex-align: center;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -webkit-transition: background 200ms, border 200ms, box-shadow 200ms, color 200ms;
    -moz-transition: background 200ms, border 200ms, box-shadow 200ms, color 200ms;
    transition: background 200ms, border 200ms, box-shadow 200ms, color 200ms;
    cursor: pointer;
    display: -webkit-inline-box;
    display: -moz-inline-box;
    display: inline-box;
    display: -webkit-inline-flex;
    display: -moz-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-flex-shrink: 0;
    -moz-flex-shrink: 0;
    flex-shrink: 0;
    -ms-flex-negative: 0;
    font-size: 13px;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    box-pack: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    -ms-flex-pack: center;
    line-height: 1;
    min-width: 60px;
}

.workspace-users-body .scrolling-users.organization-style table {
    table-layout: fixed;
}

.workspace-users-body table {
    width: 100%;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

colgroup {
    display: table-column-group;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

.manage_workspace_dialog.manage-workspace-members-tab .content tr.user {
    height: 40px;
}

.workspace-users-body .scrolling-users .user {
    border-bottom: 2px solid transparent;
    border-top: 2px solid transparent;
    line-height: normal;
}

.workspace-users-body .scrolling-users.organization-style td:nth-of-type(1) {
    padding-left: 28px;
}

.workspace-users-body .scrolling-users.organization-style tr td {
    vertical-align: middle;
    white-space: nowrap;
    font-size: 11px;
}

.workspace-users-body .scrolling-users .user td {
    height: 35px;
}

td,
th {
    padding: 0;
}

td {
    padding: 0;
}

.workspace-users-body .scrolling-users .user .picture {
    float: left;
    padding-right: 10px;
}

.photo-view.inbox-size {
    height: 30px;
    width: 30px;
}

.photo-view {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: inline-block;
}

.workspace-users-body .scrolling-users.organization-style tr.user div {
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.Avatar.Avatar--medium.Avatar--color11 {
    background-color: #37c5ab;
}

.Avatar.Avatar--medium {
    font-size: 11px;
    height: 30px;
    line-height: 30px;
    width: 30px;
}

.Avatar {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background: center/cover #d5dce0;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    vertical-align: top;
}

.workspace-users-body .scrolling-users.organization-style tr.user .name,
.workspace-users-body .scrolling-users.organization-style tr.user .external-label,
.workspace-users-body .scrolling-users.organization-style tr.user .manageMembers-removeLink {
    font-size: 13px;
}

.name.pad-top.no-email {
    text-align: left;
}

.workspace-users-body .scrolling-users.organization-style tr td .no-email {
    padding-top: 8px;
}

.workspace-users-body .scrolling-users.organization-style tr.user .email {
    color: #848f99;
}

.workspace-users-body .scrolling-users .user.active--grayHover:hover,
.workspace-users-body .scrolling-users .user.invite--grayHover:hover {
    background-color: #f6f8f9;
    color: #000;
}

.manage_workspace_dialog .workspace-users-footer {
    -webkit-flex-shrink: 0;
    -moz-flex-shrink: 0;
    flex-shrink: 0;
    -ms-flex-negative: 0;
    padding: 15px 28px;
}

.manage_workspace_dialog .separator {
    height: 3px;
    width: 100%;
    background-color: #e0e6e8;
}

.manage_workspace_dialog .workspace-users-footer .invite-user-view {
    margin-bottom: 0px;
}

.invite-user-view {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -moz-box-align: stretch;
    box-align: stretch;
    -webkit-align-items: stretch;
    -moz-align-items: stretch;
    -ms-align-items: stretch;
    -o-align-items: stretch;
    align-items: stretch;
    -ms-flex-align: stretch;
    -webkit-flex-flow: column nowrap;
    -moz-flex-flow: column nowrap;
    flex-flow: column nowrap;
}

.manage_workspace_dialog .workspace-users-footer .section-header {
    border-radius: 0;
    margin-bottom: 5px;
    text-align: left;
}

.invite-form-header.section-header {
    padding-top: 10px;
    padding-bottom: 6px;
}

.dialog2 .section-header {
    font-size: 11px;
    font-weight: 500;
    color: #646f79;
    text-transform: uppercase;
}

.invite-user-view .invite-form-body {
    -webkit-box-align: start;
    -moz-box-align: start;
    box-align: start;
    -webkit-align-items: flex-start;
    -moz-align-items: flex-start;
    -ms-align-items: flex-start;
    -o-align-items: flex-start;
    align-items: flex-start;
    -ms-flex-align: start;
}

.invite-user-view .invite-form-body,
.invite-user-view .inviteUserView-buttonRow {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    justify-content: space-between;
    -ms-flex-pack: justify;
    -webkit-flex-flow: row wrap;
    -moz-flex-flow: row wrap;
    flex-flow: row wrap;
}

.invite-user-view.wide .invite-form-field:first-child {
    margin-right: 15px;
}

.invite-user-view .invite-form-field {
    -webkit-flex-grow: 1;
    -moz-flex-grow: 1;
    flex-grow: 1;
    -ms-flex-positive: 1;
    margin-bottom: 15px;
}

.invite-user-view .field-name {
    padding-bottom: 5px;
    text-align: left;
    text-transform: uppercase;
}

.field-name {
    text-align: right;
    padding: 0 10px 0 0;
    vertical-align: middle;
}

.field-name,
.invite-header {
    font-size: 11px;
    color: #848f99;
    padding-right: 14px;
    padding-bottom: 5px;
    text-transform: uppercase;
}

.workspace-users-body .scrolling-users.organization-style tr.user.active--grayHover:hover .manageMembers-workspaceGuestnessSelect:hover,
.workspace-users-body .scrolling-users.organization-style tr.user.active--grayHover:hover .manageMembers-workspaceGuestnessSelect:focus,
.workspace-users-body .scrolling-users.organization-style tr.user.invite--grayHover:hover .manageMembers-workspaceGuestnessSelect:hover,
.workspace-users-body .scrolling-users.organization-style tr.user.invite--grayHover:hover .manageMembers-workspaceGuestnessSelect:focus {
    border-bottom: 1px solid #848f99;
    color: #848f99;
    fill: #848f99;
}

.workspace-users-body .scrolling-users .user:not(:hover) .manageMembers-removeLink,
.workspace-users-body .scrolling-users .user:not(:hover) .manageMembers-workspaceGuestnessSelect,
.workspace-users-body .scrolling-users .user:not(:hover) .you-reminder-text {
    visibility: visible;
}

.workspace-users-body .scrolling-users.organization-style tr.user .manageMembers-removeLink {
    border-bottom: 1px dotted #848f99;
    color: #848f99;
    fill: #848f99;
}

.buttonView.buttonView--primary.is-disabled {
    background: #edf1f2;
    border: 1px solid #e0e6e8;
    box-shadow: inset 0 0 transparent, 0 0 0 0 transparent;
    -moz-box-shadow: inset 0 0 transparent, 0 0 0 0 transparent;
    -webkit-box-shadow: inset 0 0 transparent, 0 0 0 0 transparent;
    color: #848f99;
    fill: #848f99;
}

.checkboxWidget:not(.checkboxWidget--disabled).checkboxWidget--unchecked {
    background-color: #fff;
    border-color: #848f99;
}

.invite-user-view .inviteUserView-guestOption-checkbox {
    margin-right: 5px;
    position: relative;
}

.checkboxWidget:not(.checkboxWidget--disabled).checkboxWidget--checked {
    background-color: #14aaf5;
}

.buttonView.buttonView--primary {
    background: #14aaf5;
    border-color: #14aaf5;
}

.checkboxWidget:not(.checkboxWidget--disabled) {
    cursor: pointer;
}

.checkboxWidget {
    -webkit-box-align: center;
    -moz-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    -ms-flex-align: center;
    display: -webkit-inline-box;
    display: -moz-inline-box;
    display: inline-box;
    display: -webkit-inline-flex;
    display: -moz-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-flex-flow: row nowrap;
    -moz-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    box-pack: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    -ms-flex-pack: center;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 2px;
    height: 14px;
    width: 14px;
}

.scrolling-users.organization-style .loading-boundary {
    max-height: 202px;
    overflow: auto;
    margin-bottom: 25px;
}

.invite-user-view .inviteUserView-emailForm {
    width: 100%;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

.invite-user-view .field-status {
    display: none;
}

.invite-user-view .field-status {
    width: 100%;
    min-width: 19px;
    padding: 4px 10px 4px 4px;
    vertical-align: middle;
}

input[type=text].generic-input,
input[type=password].generic-input {
    height: 30px;
}

.invite-user-view .generic-input {
    width: 100%;
}

.generic-input.showing,
textarea.showing,
.recurly input[type=text].showing,
.recurly .recurly-hosted-field.showing {
    border: 1px solid #d5dce0;
}

.generic-input,
textarea,
.recurly input[type=text],
.recurly .recurly-hosted-field {
    border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #151b26;
    padding-left: 10px;
    border: 1px solid transparent;
}

input {
    line-height: normal;
}
</style>

