<template>
    <div class="Sidebar">
    
        <!--Company logo-->
        <div class="SidebarHeader-companyLogo">
            <a class="CloseButton SidebarHeader-closeIcon">
                <svg class="Icon XIcon CloseButton-xIcon" title="XIcon" viewBox="0 0 32 32" @click="closeNav">
                    <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                </svg>
            </a>
        </div>
        <!-- Project list -->
        <div class="SidebarTeamDetailsProjectsList">
            <div class="text-left SidebarTeamDetailsProjectsList-header">Projects
                <a @click="createProject" class="CircularButton CircularButton--enabled CircularButton--xxsmall SidebarTeamDetailsProjectsList-addProjectButton" tabindex="0" aria-role="button">
                    <div class="CircularButton-label">
                        <svg class="Icon PlusIcon" title="PlusIcon" viewBox="0 0 32 32">
                            <polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18"></polygon>
                        </svg>
                    </div>
                </a>
            </div>
            <div class="SidebarTeamDetailsProjectsList-emptyTeam">
                <span class="SidebarTeamDetailsProjectsList-emptFText">Get started with a project</span>
                <svg class="Icon UpSwoopArrowIcon SidebarTeamDetailsProjectsList-upSwoopArrowIcon" title="UpSwoopArrowIcon" viewBox="0 0 32 32">
                    <path d="M19.976,1c-0.365-0.009-0.509,0.288-0.762,0.611L9.701,12.297C9.5,12.703,9.58,12.993,9.947,13h5   c0.428,2.583,0.674,6.494-1.772,10.603c-3.737,6.276-11.228,6.64-11.228,6.64l0.77,0.154c0,0,9.032,2.668,16.058-3.228   c5.887-4.94,6.495-11.399,6.172-14.17h4c0.537,0.016,0.787-0.172,0.671-0.64L20.746,1.712C20.48,1.378,20.339,1.006,19.976,1z"></path>
                </svg>
            </div>
            <div class="SidebarReportsItemRow"><span class="SidebarReportsItemRow-name" title="Deleted Items" @click="showDeleteTasks">Deleted Items</span></div>
            <hr>
            <!-- Project list -->
            <div class="DragContainer">
                <draggable v-model="projectList">
                    <Collapse v-for="project in projectList">
                        <Panel>
                            <!-- Project name header -->
                            <span :id="'panelProjectName-'+project.id" @click="projectSelect(project.id)" @mouseleave="hideOption(project.id)" @mouseover="showOption(project.id)" class="spanPanel">
                                <a class="DeprecatedNavigationLink">
                                    <span  class="panelProjectName">{{project.project_name}}</span>
                                    <span :id="'ItemRowMenu-'+project.id" class="hidden ItemRowMenu">
                                        <svg class="Icon MoreIcon SidebarItemRow-icon SidebarItemRow-defaultIcon" title="MoreIcon" viewBox="0 0 32 32">
                                            <circle cx="3" cy="16" r="3"></circle>
                                            <circle cx="16" cy="16" r="3"></circle>
                                            <circle cx="29" cy="16" r="3"></circle>
                                        </svg>
                                    </span>
                                </a>
                            </span>
                            <!-- Collapse content -->
                            <!-- Invite team member -->
                            
                            <p class="teamList" slot="content">
                                <!--Added Member list -->
                                <span :id="'itemRow-'+project.id" class="SidebarItemRow-name">
                                    <div  class="SidebarTeamMembersList" >
                                        <div class="SidebarTeamMembersList-facepileRow">
                                            <div class="Facepile Facepile--small SidebarTeamMembersList-facepile">
                                                <!-- Member 1 -->
                                                <div v-if="isMemberAvailable(project,0)" class="Avatar Avatar--small Avatar--color1 Facepile-avatar">
            
                                                    <img v-if="project.members[0].url" v-bind:src="project.members[0].url" />
                                                    <span v-else>{{getLetters(project.members[0].name)}}</span>
                                                </div>
                                                <a id="member1" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                    <div class="CircularButton-label">
                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                        </svg>
                                                    </div>
                                                </a>
    
                                                <!--Member 2 -->
                                                 <div v-if="isMemberAvailable(project,1)" class="Avatar Avatar--small Avatar--color2 Facepile-avatar">
                                                    <img v-if="project.members[1].url" v-bind:src="project.members[1].url" />
                                                    <span v-else>{{getLetters(project.members[1].name)}}</span>
                                                </div>
                                                <a id="member2" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                    <div class="CircularButton-label">
                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                        </svg>
                                                    </div>
                                                </a>
                                                <!--Member 3-->
                                               <div v-if="isMemberAvailable(project,2)" class="Avatar Avatar--small Avatar--color3 Facepile-avatar">
                                                    <img v-if="project.members[2].url" v-bind:src="project.members[2].url" />
                                                    <span v-else>{{getLetters(project.members[2].name)}}</span>
                                                </div>
                                                <a id="member3" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                    <div class="CircularButton-label">
                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                        </svg>
                                                    </div>
                                                </a>
                                                <!--Member 4-->
                                                <div v-if="isMemberAvailable(project,3)" class="Avatar Avatar--small Avatar--color4 Facepile-avatar">
                                                    <img v-if="project.members[3].url" v-bind:src="project.members[1].url" />
                                                    <span v-else>{{getLetters(project.members[3].name)}}</span>
                                                </div>
                                                <a id="member4" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                    <div class="CircularButton-label">
                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                        </svg>
                                                    </div>
                                                </a>
                                                <!--Member 5 -->
                                               <div v-if="isMemberAvailable(project,4)" class="Avatar Avatar--small Avatar--color5 Facepile-avatar">
                                                    <img v-if="project.members[4].url" v-bind:src="project.members[4].url" />
                                                    <span v-else>{{getLetters(project.members[4].name)}}</span>
                                                </div>
                                                <a id="member5" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                    <div class="CircularButton-label">
                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                        </svg>
                                                    </div>
                                                </a>
                                                <!--Member 6 -->
                                                <div v-if="isMemberAvailable(project,5)" class="Avatar Avatar--small Avatar--color6 Facepile-avatar">
                                                    <img v-if="project.members[5].url" v-bind:src="project.members[5].url" />
                                                    <span v-else>{{getLetters(project.members[5].name)}}</span>
                                                </div>
                                                <a id="member6" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                    <div class="CircularButton-label">
                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                        </svg>
                                                    </div>
                                                </a>
                                                <!--Add new member button-->
                                                <a id="member7" @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small SidebarTeamMembersList-addButton" tabindex="0" aria-role="button">
                                                    <div class="CircularButton-label">
                                                        <svg class="Icon PlusIcon" title="PlusIcon" viewBox="0 0 32 32">
                                                            <polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18"></polygon>
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
    
                                    </div>
                                </span>
                                <!-- Search member list -->
                                <span id="">
                                    <div :id="'expandableList'+project.id" class="hidden SidebarTeamMembersExpandedList">
                                        <!-- Search member header -->
                                        <div :id="'listHeader'+project.id" class="SidebarTeamMembersExpandedList-header">
                                            <span class="SidebarTeamMembersExpandedList-editHeader">
                                                <span class="SidebarTeamMembetransitionrsExpandedList-headerText">People</span>
                                                <div class="SidebarTeamMembersExpandedList-pencilButton">
                                                    <svg class="Icon PencilIcon" title="PencilIcon" viewBox="0 0 32 32">
                                                        <path d="M28,4c-2.209-2.209-5.791-2.209-8,0v0L5,19L2,30l11-3l15-15C30.209,9.791,30.209,6.209,28,4z M6.326,21.74l3.934,3.934L4.85,27.15L6.326,21.74z M26.586,10.586L12.293,24.878l-5.172-5.172L21.414,5.414c1.426-1.426,3.746-1.426,5.172,0C28.012,6.84,28.012,9.16,26.586,10.586z"></path>
                                                    </svg>
                                                </div>
                                            </span>
                                            <span @click="closedMemberSearch(project.id)" class="SidebarTeamMembersExpandedList-closeButton">
                                                <svg class="Icon XIcon" title="XIcon" viewBox="0 0 32 32">
                                                    <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="ser-dro-lis">
                                        <!-- Search text box -->
                                        
                                    <input @blur="closeExpandableList(project.id)" @keyup="showList(project.id)" type="text" v-model="inputValue" class="textInput textInput--medium TeamInviteTypeahead-input" value="" name="">
                                        <!-- Drop down list -->
                                        <div :id="'layerPositioner-'+project.id" class="hidden layerPositioner layerPositioner--offsetLeft layerPositioner--alignLeft layerPositioner--below">
                                            <ul class="TypeaheadView-scrollable">
                                                <li v-for="member in searchItems" class="TypeaheadView-item" @click="selectMember(project.id,member)">
                                                    <div class="TypeaheadItem">
                                                        <div class="TypeaheadItem-content">
                                                            <div class="TypeaheadItem-icon">
                                                                <div v-if="member?true:false" class="Avatar Avatar--small Avatar--color2 Facepile-avatar">
                                                                    <img v-if="member.image_url" v-bind:src="member.image_url" />
                                                                    <span v-else>{{getLetters(member.fullname)}}</span>
                                                                </div>
                                                                <a id="member2" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder"
                                                                    tabindex="0" aria-role="button">
                                                                    <div class="CircularButton-label">
                                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div class="TypeaheadItem-textWrapper">
                                                                <div class="TypeaheadItem-title">
                                                                    <span>
                                                                        <!-- react-text: 42 -->{{member.fullname}}
                                                                        <!-- /react-text -->
                                                                    </span>
                                                                </div>
                                                                <div class="TypeaheadItem-subtitle">
                                                                    <span>
                                                                        <!-- react-text: 45 -->{{member.email}}
                                                                        <!-- /react-text -->
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="TypeaheadView-item" @click="selectNonMember(project.id)">
                                                    <div class="TypeaheadItem TeamInviteTypeahead-inviteItem">
                                                        <div class="TypeaheadItem-content">
                                                            <div class="TypeaheadItem-textWrapper">
                                                                <div class="TypeaheadItem-title">Invite</div>
                                                                <div class="NonmemberName TypeaheadItem-subtitle">{{inputValue}}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        </div>
                                        <!-- Invite member popup-->
                                        <div :id="'popup-'+project.id" class="hidden popup popup--alignundefined popup--popupundefined QuickInvitePopup TeamInviteTypeahead-invitePopup" tabindex="-1">
                                            <div class="popup-body">
                                                <div class="QuickInvitePopup-content">
                                                    <a class="CloseButton QuickInvitePopup-closeButton" @click="closeInvite(project.id)">
                                                        <svg class="Icon XIcon CloseButton-xIcon" title="XIcon" viewBox="0 0 32 32">
                                                            <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                                                        </svg>
                                                    </a>
                                                    <div class="QuickInvitePopup-inputFields">
                                                        <div class="QuickInvitePopup-inputArea QuickInvitePopup-emailInputArea">
                                                            <label class="Label">Email</label>
                                                            <div class="validatedTextInput validatedTextInput--invalid QuickInvitePopup-emailInputValidator">
                                                                <input type="text" class="validatedTextInput-input textInput textInput--medium QuickInvitePopup-input QuickInvitePopup-emailInput" :value="email">
                                                                
                                                                <div class="validatedTextInput-message">{{emailValidationError}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="projectRole">

                                                            <div class="QuickInvitePopup-inputArea QuickInvitePopup-emailInputArea">
                                                                <label class="Label">Role</label>
                                                                <div class="validatedTextInput validatedTextInput--invalid QuickInvitePopup-emailInputValidator">
                                                                    <select class="textInput textInput--medium QuickInvitePopup-input" v-model="selected">
                                                                                    <option value="" disabled selected hidden>Select Role</option>
                                                                                    <option v-for="role in roles" v-bind:value="role.name">
                                                                                        {{ role.name }}
                                                                                    </option>
                                                                            </select>
                                                                    <div class="validatedTextInput-message">{{roleValidationError}}</div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div class="QuickInvitePopup-inputArea">
                                                            <label class="Label">Name (Optional)</label>
                                                            <input type="text" class="textInput textInput--medium QuickInvitePopup-input QuickInvitePopup-nameInput" :value="name">
                                                        </div>
                                                    </div>
                                                    <div class="QuickInvitePopup-buttonRow">
                                                        <a class="Button Button--small Button--secondary QuickInvitePopup-cancelButton" tabindex="0" aria-role="button" @click="closeInvite(project.id)">Cancel</a>
                                                        <a class="Button Button--disabled Button--small Button--primary QuickInvitePopup-shareButton" aria-role="button" @click="inviteUserSubmit(project.id)">Send Invite</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--project wise member list-->
                                        <div :id="'listContent-'+project.id" class="hidden SidebarTeamMembersExpandedList-contents">
    
                                            <a class="DeprecatedNavigationLink SidebarItemRow SidebarTeamMembersExpandedMember-itemRow is-selected" href="#">
                                                <div class="SidebarItemRow-avatar">
                                                    <div class="Avatar Avatar--small Avatar--color3">
                                                        <!-- react-text: 225 -->he
                                                        <!-- /react-text -->
                                                    </div>
                                                </div>
                                                <span class="SidebarItemRow-name" title="hemant">hemant</span>
                                            </a>
                                            <a class="DeprecatedNavigationLink SidebarItemRow SidebarTeamMembersExpandedMember-itemRow" href="https://app.asana.com/0/370951534419683/370951534419683">
                                                <div class="SidebarItemRow-avatar">
                                                    <div class="Avatar Avatar--small Avatar--color2" style="background-image: url(&quot;https://s3.amazonaws.com/profile_photos/313005078195995.bbPK2BmmbsdpblbUzYT1_60x60.png&quot;);">
                                                        <!-- react-text: 230 -->
                                                        <!-- /react-text -->
                                                    </div>
                                                </div>
                                                <span class="SidebarItemRow-name" title="Kandarp">Kandarp</span>
                                                <span class="hidden SidebarItemRowMenu-button">
                                                    <svg class="Icon MoreIcon SidebarItemRow-icon SidebarItemRow-defaultIcon" title="MoreIcon" viewBox="0 0 32 32">
                                                        <circle cx="3" cy="16" r="3"></circle>
                                                        <circle cx="16" cy="16" r="3"></circle>
                                                        <circle cx="29" cy="16" r="3"></circle>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </span>
                            </p>
                        </Panel>
                    </Collapse>
                </draggable>
            </div>
    
        </div>
        <create-project-dialog :show="isNewProjectDialogShow" v-on:updateDialog='updateDialogShow'></create-project-dialog>
    </div>
</template>

<script>
/* eslint-disable*/
import Vue from 'vue'
import CreateProjectDialog from './CreateProjectDialog.vue'
import draggable from 'vuedraggable'
import ProjectItem from './ProjectItem.vue'
import iView from 'iview';
import { mapGetters, mapMutations } from 'vuex'
 import CmnFunc from './CommonFunc.js'

import 'iview/dist/styles/iview.css';

Vue.use(iView);

export default {
    data: function () {
        return {
            isOpen: this.$store.state.isSliderOpen,
            isNewProjectDialogShow: false,
            // projectList: [{id:"1",name:"project 1"},{id:"2",name:"project 2"}, 
            // {id:"3",name:"project 3"},{id:"4",name:"project 4"}],
            members: [],
            users:this.$store.state.arrAllUsers,
            searchText: '', // If value is falsy, reset searchText & searchItem 
            item: {
                value: '',
                text: ''
            },
            inputValue: '',
            email:'',
            name:'',
            lastOpenDialogId:'',
            lastProjectSelected:'',
            selected: '',
            roles: this.$store.state.userRoles,
            emailValidationError:'',
            roleValidationError:'',
            // projectList:this.$store.state.projectlist

        }
    },
    created(){
             this.$store.dispatch("getAllUsersList")        
          this.$store.dispatch('getAllProjects',this.$store.state.userObject._id);
            this.$store.dispatch('getUsersRoles');
    },
    computed: {
        ...mapGetters({
            getProjectList: 'getProjectList',
            // memberProfile:'getMemberProfile',
            memberName:'getMemberName'
        }),
        searchItems: function () {
            
            var self = this
            var sameMatch = false;
            console.log("userList:--",self.users)
            var itemList = self.users.filter(function (item) {
                if (!sameMatch) {
                    sameMatch = (item.fullname.toLowerCase() == self.inputValue.toLowerCase())
                }

                return item.fullname.toLowerCase().indexOf(self.inputValue.toLowerCase()) != -1
            })
            console.log("itemList", itemList)
            if (!sameMatch)
                itemList.push({ "id": "0", "name": self.inputValue });
            return itemList;
        },
        projectList:function(){
            console.log("projectlist")
            // this.memberProfileDetail
            var projects=this.getProjectList;
            var projects=this.$store.state.projectlist;            
            this.memberProfileDetail(projects)
            return projects;
        }
    },
    mounted: function () {
        var self = this;
        $(".search").on('keyup', function () {
            console.log("on load:", $(this).val())
            if ($(this).val().length > 0) {
                this.searchText = "data:" + $(this).val();
            }
        })
    },
    beforeMount() {
        this.displayToolTips()
    },
    methods: {
        ...mapMutations([
            'showDeleteTasks'
        ]),
        isMemberAvailable:function(project,index)
        {

            console.log("Project index:--",project && project.members && project.members[index]);
            return project && project.members && project.members[index]
        },
        getMemberProfile:function(uId) {
        let userIndex = _.findIndex(this.users, function (user) { return user._id === uId })
        if (userIndex < 0) {
          return { user_id: uId }
        } else {
          return { user_id: uId, url: this.users[userIndex].image_url, name: this.users[userIndex].email }
        }
      
    },
        memberProfileDetail:function(projects)        {

          projects.forEach(function(project) {
                    var members = project.members;
                    if (members) {
                       members.forEach(function(member) {
                           
                                var uId = member.user_id;
                                var memberDetail = this.getMemberProfile(uId);
                                let memberIndex = _.findIndex(members, function (m) { return m.user_id === uId })
                                if (memberIndex < 0) {
                                    project.members.push(memberDetail);
                                } else {
                                    project.members[memberIndex]=memberDetail;
                                }

                        }, this);
                    }else{
                       
                    }

           }, this);
             console.log("<----Project Member:-->",projects)
        },
        inviteUserSubmit:function(projectId){
            var inviteEmail = this.email;
            console.log("Selected:-->", inviteEmail);
            if (!inviteEmail || inviteEmail.length == 0 || !CmnFunc.checkValidEmail(inviteEmail)) {
                this.emailValidationError = "Invalid user email"
                return;
            }
            var roleSelect = this.selected;
            if (!roleSelect || roleSelect.length == 0) {
                this.roleValidationError = "Select role"
                return;
            }

            // var roleId=this.roles.filter(role=> role.name ==roleSelect);
            let index = _.findIndex(this.roles, function (d) { return d.name == roleSelect })
             let indexUser = _.findIndex(this.users, function (d) { return d.email == inviteEmail })
            console.log("Selected:-->", index);

            var insertInvite={
                project_id:projectId,
                user_id:this.$store.state.arrAllUsers[indexUser]._id,
                create_by:this.$store.state.userObject._id,
                user_email:this.$store.state.userObject.email,
                user_role_id:this.roles[index].id,
                invitation_status:"p",
                invited_date:new Date()
            }
            console.log("Insert Invite:-->", insertInvite);
            
             this.$store.dispatch('insertProjectInvite',insertInvite)  
        },
        closeNav: function () {

            document.getElementById("top-bar").style.marginLeft = "0px";
            document.getElementById('mySidenav').style.width = "0px"
            $('.Topbar-navButton').css('margin-left', '0px');
            document.getElementById("main-container").style.marginLeft = "0px";

            this.isOpen = false;
            this.$store.commit('UPDATE_SLIDER_VALUE', this.isOpen)

        },
        projectSelect(id){
             this.$store.state.currentProjectId=id;
             this.$store.state.todolist=[] 
             this.$store.commit('CLOSE_DIV','')
             this.$store.dispatch('getAllTodos', { 'parentId':'' ,project_id:id});
              // Close last open dialog
            if(this.lastProjectSelected !==''){
                console.log(this.lastProjectSelected);
                 $("#panelProjectName-"+this.lastProjectSelected).removeClass("project-selected");
            }
            // Open Invite member dialog
            $("#panelProjectName-"+id).addClass("project-selected");
            this.lastProjectSelected = id;


            // this.memberProfileDetail()
        },
        // This method show when user mouse hover on project name
        showOption(id){
            $("#ItemRowMenu-"+id).removeClass("hidden");
        },
        hideOption(id){
            $("#ItemRowMenu-"+id).addClass("hidden");
        },
        showList(id) {
                // Show search member list
                $("#layerPositioner-"+id).removeClass("hidden");
        },
        closeExpandableList(id){
                console.log("on blur closeExpandableList:",id);
                // Hide expandable list
                // $("#layerPositioner-"+id).addClass("hidden");
                // $("#listContent-"+id).removeClass("hidden");
                 
        },
        selectMember: function (id,item) {
            console.log("selectMember method call--------------------", this.lastOpenDialogId)
            this.email = item.email
            this.name = item.name
            // Hide header 
            $("#listHeader"+id).addClass("hidden");
            // Hide member search list 
            $("#layerPositioner-"+id).addClass("hidden");
            // Close last open dialog
            if(this.lastOpenDialogId !==''){
                console.log("if ");
                $("#popup-"+this.lastOpenDialogId).addClass("hidden");
                // Show already added member list
                $("#listContent-"+this.lastOpenDialogId).removeClass("hidden");
            }
            // Open Invite member dialog
            $("#popup-"+id).removeClass("hidden");
            this.lastOpenDialogId = id;
        },
        selectNonMember(id) {
            console.log("selectNonMember method call--------------------",this.inputValue)
            this.email = "";
            this.name = this.inputValue;

             // Hide header 
            $("#listHeader"+id).addClass("hidden");
            // Hide member search list 
            $("#layerPositioner-"+id).addClass("hidden");
            // Open Invite member dialog
            $("#popup-"+id).removeClass("hidden");
        },
        displayToolTips: function () {
            $('.CircularButton').tooltip({ title: "Create a project", placement: "bottom" });
        },
        createProject: function () {
            console.log("createProject")
            this.isNewProjectDialogShow = true;
        },
        updateDialogShow(isDialogVal) {
            console.log('dialog val: ', isDialogVal)
            this.isNewProjectDialogShow = isDialogVal
        },
        onSelect(item) {
            this.item = item
        },
        reset() {
            this.item = {}
        },
        selectOption() {
            // select option from parent component 
            this.item = this.options[0]
        },
        closedMemberSearch(id){
                // Hide expandable list
              //  $(".SidebarTeamMembersExpandedList").addClass("hidden");
                $("#expandableList"+id).addClass("hidden");
                // Show horizontal member list
                // $(".SidebarItemRow-name").removeClass("hidden");
                 $("#itemRow-"+id).removeClass("hidden");
        },
        closeInvite(id) {

            // Open Invite member dialog
            $("#popup-"+id).addClass("hidden");
            // Hide header 
            $("#listHeader"+id).removeClass("hidden");
           
           // Show already added member list
            $("#listContent-"+this.lastOpenDialogId).removeClass("hidden");

            // Clear search value
            this.inputValue = "";

        },
        showMemberDetail(event){
            var targetId = event.currentTarget.id;
            console.log(targetId);
        },
        addMemberClick(id) {
            console.log("project_",id);
           // Hide member horizontal list
           $("#itemRow-"+id).addClass("hidden");
           $("#expandableList"+id).removeClass("hidden");
           //$(".SidebarTeamMembersExpandedList").removeClass("hidden");
        },
        getLetters(name) {
             var str = name;
             if(!str || str.length==0)
                return "X";      

             var firstLetters = str.substr(0, 2);     
              return firstLetters ;
      }

    },
    components: {
        CreateProjectDialog,
        draggable,
        ProjectItem,
    }
}

</script>

<style>
.ser-dro-lis {
margin-left: 10px;
display: inline-block;
width: 100%;
}
.ser-dro-lis > input{width:100%;border-radius: 0;margin-bottom: 1px;}
div#mySidenav .Sidebar .SidebarHeader-companyLogo {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: #2e3c54;
    height: 46px;
    padding-bottom: 10px;
}
/* Scroll bar*/
.CustomScrollbarContainer {
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
    min-height: 1px;
    overflow: hidden;
    position: relative;
}
.Sidebar:hover .CustomScrollbarContainer-thumb {
    visibility: visible;
}
.CustomScrollbarContainer-thumb {
    background-color: #a2b4bc;
    border-radius: 25px;
    position: absolute;
    width: 100%;
}

/* Invite pop up start */

a.CloseButton.QuickInvitePopup-closeButton {
    float: right;
}

.TeamInviteTypeahead-invitePopup {
    left: 0;
}

.QuickInvitePopup {
    top: 0;
}

.popup.popup--alignundefined.popup--popupundefined.QuickInvitePopup.TeamInviteTypeahead-invitePopup {
    width: inherit;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #cdcfd2;
    display: inline-block;
    padding: 15px;
    position: relative;
    top: 1px;
}

.QuickInvitePopup-content {
    width: 220px;
}

QuickInvitePopup-closeButton {
    position: absolute;
    right: 10px;
    top: 10px;
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

.QuickInvitePopup-inputFields {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    font-weight: 300;
}

.QuickInvitePopup-inputArea {
    margin-bottom: 10px;
    width: 100%;
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

.validatedTextInput-message {
    color: #fc636b;
    font-size: 11px;
    line-height: 17px;
    margin-top: 5px;
    word-wrap: break-word;
}

.validatedTextInput--invalid .validatedTextInput-input,
.validatedTextInput--invalid .validatedTextInput-input:hover,
.validatedTextInput--invalid .validatedTextInput-input:focus {
    border-color: #fc636b;
}

.textInput.textInput--medium {
    height: 30px;
    padding-bottom: 4px;
    padding-top: 4px;
}

.QuickInvitePopup-input {
    display: block;
    margin-top: 10px;
}

.QuickInvitePopup-inputArea {
    margin-bottom: 10px;
    width: 100%;
}

.validatedTextInput-input {
    width: 100%;
}

.textInput {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    border: 1px solid #cdcfd2;
    border-radius: 3px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 9px;
}

.textInput.textInput--medium {
    height: 30px;
    padding-bottom: 4px;
    padding-top: 4px;
}

.QuickInvitePopup-nameInput {
    width: 100%;
}

.QuickInvitePopup-input {
    display: block;
    margin-top: 10px;
}

a {
    color: #1aafd0;
    cursor: pointer;
    text-decoration: none;
}

a {
    background-color: transparent;
}

.QuickInvitePopup-buttonRow {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}

.Button.Button--secondary:not(.Button--disabled) {
    background: #fff;
    border-color: #1aafd0;
    color: #1aafd0;
    fill: #1aafd0;
}

.Button.Button--small {
    height: 30px;
    line-height: 30px;
    padding: 0 9px;
}

.Button {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    font-size: 13px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 1;
    min-width: 50px;
    text-align: center;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-property: background, border, box-shadow, color;
    transition-property: background, border, box-shadow, color;
}

.Button.Button--disabled.Button--primary {
    background: #eff0f1;
    border: 1px solid #e1e2e4;
}

.Button.Button--small {
    height: 30px;
    line-height: 30px;
    padding: 0 9px;
}

.Button.Button--disabled {
    box-shadow: none;
    color: #b9bcc0;
    cursor: default;
    fill: #b9bcc0;
}



/* Invite pop up end*/

.layerPositioner {}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.TypeaheadItem-title {
    color: #1b2432;
    font-size: 13px;
}

.TypeaheadItem-title,
.TypeaheadItem-subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.TypeaheadItem-subtitle {
    color: #b9bcc0;
    font-size: 11px;
}

.TeamInviteTypeahead-inviteItem {
    background: #f8f8f9;
    height: inherit;
    padding: 0;
}

.TypeaheadItem {
    border-bottom: 1px solid #e1e2e4;
    cursor: pointer;
    height: 50px;
    overflow: hidden;
    position: relative;
    -webkit-transition-property: border-bottom, height, opacity;
    transition-property: border-bottom, height, opacity;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    background: #f8f8f9;
}

.layerPositioner.layerPositioner--offsetLeft.layerPositioner--alignLeft.layerPositioner--below {
    max-height: 189px;
    -webkit-box-flex: 0;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    min-height: 1px;
    overflow-x: hidden;
    overflow-y: auto;
}

.TypeaheadItem.TypeaheadItem--highlighted {
    background: #1aafd0;
    color: #fff;
    fill: #fff;
}

.TypeaheadItem-content {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 50px;
    padding: 0 15px;
}

.Avatar.Avatar--small.Avatar--color1.Facepile-avatar {
    background-color: #8c3208;
}
.Avatar.Avatar--small.Avatar--color2.Facepile-avatar {
    background-color: #e362e3;
}
.Avatar.Avatar--small.Avatar--color3.Facepile-avatar {
    background-color: #fc91ad;
}
.Avatar.Avatar--small.Avatar--color4.Facepile-avatar{
    background-color: #4186e0;
}
.Avatar.Avatar--small.Avatar--color5.Facepile-avatar{
    background-color: #cc3580;
}
.Avatar.Avatar--small.Avatar--color6.Facepile-avatar {
    background-color: #7a6ff0;
}

.TypeaheadItem-textWrapper {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    min-width: 1px;
}



.TypeaheadItem--highlighted .TypeaheadItem-subtitle {
    color: #fff;
}

.TypeaheadItem--highlighted .TypeaheadItem-icon {
    fill: #fff;
}





/* Invite Expandable  list */

.ui.fluid.dropdown>.dropdown.icon[data-v-3ea70128] {
    float: right;
    color: transparent;
}

.TeamInviteTypeahead {
    margin: 0 15px 15px 20px;
}

.textInput .textInput--medium {
    height: 30px;
    padding-bottom: 4px;
    padding-top: 4px;
}

.TeamInviteTypeahead-input {
    border: 1px solid #1b2432;
    border-radius: 3px;
    height: 30px;
    padding-left: 10px;
    width: 200px;
}

.textInput {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    border: 1px solid #cdcfd2;
    border-radius: 3px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 9px;
}

.SidebarItemRow .is-selected {
    text-decoration: none;
}

.SidebarItemRow.is-selected {
    background-color: #1b2432;
    color: #fff;
}

.SidebarItemRow-avatar .Avatar {
    margin-right: 10px;
    overflow: hidden;
}

.teamList .Avatar--color3 {
    background-color: #fc91ad;
}

.teamList a .SidebarItemRow-name {
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.SidebarTeamMembersExpandedList-pencilButton {
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    fill: #a2b4bc;
}

.SidebarTeamMembersExpandedList-pencilButton:hover {
    fill: #fff;
}

.SidebarTeamMembersExpandedList {
    margin-bottom: 5px;
}

.SidebarTeamMembersExpandedList-header {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-left: 20px;
    /*margin-right: -5px; close button margin */
    padding-bottom: 10px;
    padding-top: 0;
}

.SidebarTeamMembersExpandedList-editHeader {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.SidebarTeamMembersExpandedList-headerText {
    color: #a2b4bc;
    font-size: 11px;
    font-weight: 500;
    margin-right: 10px;
    text-transform: uppercase;
}

.SidebarTeamMembersExpandedList-closeButton {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    fill: #a2b4bc;
}







/* Invite team member css start */

.SidebarTeamMembersList-facepileRow {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin: 0 10px 15px 15px;
}

.Facepile {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
}

.SidebarTeamMembersList-facepile .Facepile-placeholder {
    background: rgba(175, 64, 64, 0);
}

.SidebarTeamMembersList-facepile .Facepile-placeholder {
    background: rgba(175, 64, 64, 0);
}

.SidebarTeamMembersList-facepile .Avatar--color2 {
    background-color: #e362e3;
}

.SidebarTeamMembersList-facepile .Avatar--color3 {
    background-color: #fc91ad;
}








/* Add new invite button */

.teamList .SidebarTeamMembersList-addButton {
    background: transparent;
    border: 1px solid #a2b4bc;
    color: transparent;
    fill: #a2b4bc;
}

.teamList .SidebarTeamMembersList-addButton.CircularButton--enabled:hover {
    background-color: transparent;
    border-color: transparent;
    box-shadow: 0 0 0 3px #fff;
    color: #fff;
    fill: #fff;
}

.SidebarTeamMembersList-facepile .Facepile-avatar,
.SidebarTeamMembersList-facepile .Facepile-placeholder {
    margin-right: 6.9px;
}

.SidebarTeamMembersList-facepile .Facepile-avatar {
    cursor: pointer;
}

.Facepile-avatar,
.Facepile-avatar--clickable,
.Facepile-empty,
.Facepile-placeholder,
.Facepile-loadingPlaceholder {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 5px;
}


.Avatar--small {
    font-size: 11px;
    height: 24px;
    line-height: 24px;
    width: 24px;
}

.Avatar {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background: center/cover #cdcfd2;
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

.CircularButton.CircularButton--enabled:hover {
    background-color: #fff;
    border-color: #fff;
    box-shadow: 0 0 0 3px #02ceff;
    color: #02ceff;
    fill: #02ceff;
}

.CircularButton.CircularButton--small .Icon {
    height: 14px;
    width: 14px;
}

.CircularButton-label {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    height: 100%;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
}

.CircularButton.CircularButton--small {
    font-size: 11px;
    height: 24px;
    line-height: 22px;
    width: 24px;
}








/* Invite team css end */


/* collapse view css */

.ivu-collapse>.ivu-collapse-item {
    text-align: left;
}

.DragContainer .ivu-collapse {
    background-color: #2e3c54;
    border-radius: none;
    border: none;
    margin-left: -17px;
}

.teamList {
    margin-left: -5px;
}

.ivu-collapse-content>.ivu-collapse-content-box {
    background-color: #2e3c54;
    /*margin-left: -1px;
    margin-right: -16px;*/
}








/* Content background color */

.ivu-collapse .ivu-collapse-content {
    overflow: hidden;
    color: #495060;
    padding: 0 16px;
    background-color: transparent;
}

.spanPanel {
    width: 95%;
    display: inline-block;
}

.project-selected {
    background-color: #1b2432;
    color: #fff;
}

.spanPanel:hover {
    background-color: #179dba;
}

.DeprecatedNavigationLink {
    width: 100%;
}

.panelProjectName {
    margin-left: 10px;
    color: #fff;
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}








/* Arrow icon color */

i.ivu-icon.ivu-icon-arrow-right-b {
    color: rgba(255, 255, 255, 0.2)
}
span .ItemRowMenu {
    float: right;
    margin-right: 10px;
    text-align: center;
}

.SidebarHeader-closeIcon {
    fill: #a2b4bc;
    padding: 0 10px;
}

.DragContainer {
    margin-bottom: -1px;
    padding-bottom: 1px;
    position: relative;
}

.Sidebar {
    height: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: #2e3c54;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 0 2px;
}


.SidebarHeader-companyLogo,
.SidebarPlaceholder-companyLogo {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-image: url('../assets/ob_logo.png');
    background-position: 13px 10px;
    background-repeat: no-repeat;
    background-size: 110px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 40px;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}

.SidebarTeamDetailsProjectsList-header {
    color: #a2b4bc;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 15px;
    padding-left: 15px;
    padding-right: 10px;
    text-transform: uppercase;
}

.SidebarTeamDetailsProjectsList-emptyTeam {
    webkit-box-align: right;
    -webkit-align-items: right;
    -ms-flex-align: right;
    align-items: right;
    text-align: right;
    color: #a2b4bc;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: inherit;
    fill: #a2b4bc;
    margin: 10px 15px 5px;
    position: relative;
}

.CircularButton-label {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    height: 100%;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
}

.CircularButton.CircularButton--xxsmall .Icon {
    height: 10px;
    width: 10px
}

.Icon {
    height: 16px;
    width: 16px;
}

.SidebarTeamDetailsProjectsList-addProjectButton.CircularButton--enabled:hover {
    background-color: transparent;
    border-color: transparent;
    box-shadow: 0 0 0 3px #fff;
    color: #fff;
    fill: #fff;
}

.CircularButton.CircularButton--xxsmall {
    height: 16px;
    width: 16px;
    background-color: transparent;
    line-height: 13px;
}

.SidebarTeamDetailsProjectsList-addProjectButton {
    background: transparent;
    border: 1px solid #a2b4bc;
    color: #a2b4bc;
    fill: #a2b4bc;
    float: right;
    margin-top: -2px;
}

.CircularButton {
    background: #fff;
    border: 1px solid #b9bcc0;
    border-radius: 50%;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #b9bcc0;
    fill: #b9bcc0;
    font-size: 13px;
    height: 30px;
    line-height: 1;
    -webkit-transition: 200ms box-shadow, 200ms color, 200ms background, 200ms fill;
    transition: 200ms box-shadow, 200ms color, 200ms background, 200ms fill;
    width: 30px;
    display: inline-block;
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.5s;
}

.sidenav>a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidenav>a:hover,
.offcanvas a:focus {
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

#center_pane {
    transition: margin-left .5s;
    padding: 16px;
}

selected {
    text-decoration: none;
}

.SidebarDraggableItemRowStructure-dropTarget--gridItem {
    margin-bottom: 0;
    padding-bottom: 0;
}

.dropTargetRow {
    margin-bottom: -1px;
    padding-bottom: 1px;
    position: relative;
}

.SidebarItemRow-name {
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
}

.SidebarItemRow .is-selected {
    background-color: #1b2432;
    color: #fff;
}

.SidebarItemRow:hover,
.DragContainer--isDragging .SidebarItemRow {
    background-color: #179dba;
}

.SidebarItemRow .SidebarItemRowMenu-button:hover .SidebarItemRow-icon {
    fill: #fff;
    visibility: visible;
}

.SidebarItemRowMenu-button {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

.SidebarItemRow {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-left: 3px solid transparent;
    color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    fill: #a2b4bc;
    height: 28px;
    -webkit-box-pack: right;
    -webkit-justify-content: right;
    -ms-flex-pack: right;
    justify-content: right;
    line-height: 28px;
    padding: 0 10px 0 12px;
}
</style>
