<template>
    <div id="project-setting-dialog" class="hidden tab-ring" v-esc="closeDialog" tabindex="-1" data-luna1-event-id="6">
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
                                <a class="tabView-tabName">Advanced</a>
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
                                                        <tr v-for="member in this.$store.state.currentProjectMember" v-bind:key="member" class="user invite active--grayHover">
                                                            <td>
    
                                                                <div class="picture">
                                                                    <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners ">
                                                                        <div class="photoView-reactMount">
                                                                            <div class="Avatar Avatar--medium Avatar--color11" style='background-image: url("https://s3.amazonaws.com/profile_photos/329633778653756.1pmLUlVhFA8h81mZ3biR_128x128.png");'>
                                                                                <!-- react-text: 2 -->
                                                                                <!-- /react-text -->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="name pad-top no-email">{{member.name}}</div>
                                                            </td>
                                                            <td>
                                                                <div class="email">{{member.email}}</div>
                                                            </td>
                                                            <td>
                                                                <div class="external-label">
                                                                    <a :id="'role-selection-'+member.user_id" @click="showRole(member)" tabindex="-1" class="dropdown-menu-link  floatingSelectView-anchor workspaceGuestnessSelect manageMembers-workspaceGuestnessSelect">
                                                                        <span class="floatingSelectView-label">Member
                                                                            <svg class="svgIcon  svgIcon-dropdownarrow " viewBox="0 0 32 32" title="dropdownarrow">
                                                                                <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <a class="manageMembers-removeLink">Cancel Invite</a>
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
    
        <span id="roleDialog" class="hidden dropdown-style-default" @mouseleave="hideRoleDialog" style="position:relative">
            <div class="dropdown " id="workspace_guestness_select_381642285954276_dropdown_menu" style="min-width: 60.7366px;z-index: 5000;">
                <div class="dropdown-menu some-items-are-selected ">
                    <a class="menu-item" title="">
                        <span class="dropdown-menu-item-label">
                            <span class="workspaceGuestnessSelect-guestOption">Guest</span>
                        </span>
                    </a>
                    <a class="menu-item selected" title="">
                        <svg class="svgIcon dropdownMenuItem-selectedIcon" viewBox="0 0 32 32" title="selected">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                        </svg>
                        <span class="dropdown-menu-item-label">
                            <span class="workspaceGuestnessSelect-memberOption">Member</span>
                        </span>
                    </a>
                </div>
            </div>
        </span>

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
            members: this.$store.state.currentProjectMember
        }
    },
    methods: {
        closeDialog() {
           // console.log("closed dialog");
            $("#project-setting-dialog").addClass("hidden");
        },showRole(member){
             var pos = $('#role-selection-'+member.user_id).offset();
            // console.log("mouse down event(x,y)", pos,"member.id:",member.user_id);
            var top = pos.top-44;
            var left = pos.left;
            $("#roleDialog").removeClass("hidden");
            $("#roleDialog").css({"top":+top+"px","left":+left+"px"})
        },
        /**
         * Hide role select dialog 
         * 
         * */
        hideRoleDialog(){
             $("#roleDialog").addClass("hidden");
        }
    }

}
</script>
<style>

</style>

