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
        <div class="projectLable">
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
            <!-- <div class="SidebarReportsItemRow" @click="showDeleteTasks">
                            <span class="SidebarReportsItemRow-name" title="Deleted Items">Deleted Items</span>
                        </div> -->
            <div class="SidebarReportsItemRow">
                <span class="SidebarReportsItemRow-name" title="Deleted Items">
                    <router-link class="NavigationLink Topbar-myTasksButton is-selected" v-on:click.native="showDeleteTasks" to="/navbar/mainapp">
                        Deleted Items
                    </router-link>
                </span>
            </div>
            <hr>
        </div>
        <!-- Project list -->
        <div class="SidebarTeamDetailsProjectsList">
            <!-- Project list -->
            <div class="DragContainer">
                <draggable v-model="myProjectList">
                    <div v-show="project.is_deleted==false" v-bind:key="project.id" v-for="(project, index) in projectList">
                        <Collapse v-bind:key="project.id" v-if="project.project_privacy!=2">
                            <Panel>

                                <!-- Project name header -->
                                <span :id="'panelProjectName-'+project.id" @click="projectSelect(project)" @mouseleave="hideOption(project.id)" @mouseover="showOption(project.id)" class="spanPanel">
                                    <a class="DeprecatedNavigationLink">
                                        <span class="panelProjectName">{{projectNameElipse(project.project_name,17)}}</span>

                                        <!-- Project setting menu  -->
                                        <span :id="'ItemRowMenu-'+project.id" class="ItemRowMenu" @click="showProjectSetting(project)" style="fill:transparent">
                                            <svg class="Icon MoreIcon SidebarItemRow-icon SidebarItemRow-defaultIcon" title="MoreIcon" viewBox="0 0 32 32">
                                                <circle cx="3" cy="16" r="3"></circle>
                                                <circle cx="16" cy="16" r="3"></circle>
                                                <circle cx="29" cy="16" r="3"></circle>
                                            </svg>
                                        </span>
                                        <a id="add-member"  @click="addMemberClick(project.id)" class="inviteMember CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                            <div class="CircularButton-label">
                                                <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                    <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                </svg>
                                            </div>
                                        </a>                                   
                                        <span :id="'ItemRowPrivacy-'+project.id" v-show="project.project_privacy == 2" class="SidebarItemRow-statusIcon pull-right">
                                            <svg class="Icon LockIcon" title="LockIcon" viewBox="0 0 32 32">
                                                <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                                            </svg>
                                        </span>

                                    </a>
                                </span>

                                <!-- Collapse content -->
                                <!-- Invite team member -->
                                <p class="teamList" slot="content">
                                    <!--Added Member list -->
                                    <span v-show="false" :id="'itemRow-'+project.id" class="SidebarItemRow-name">
                                        <div class="SidebarTeamMembersList">
                                            <div class="SidebarTeamMembersList-facepileRow">
                                                <div class="Facepile Facepile--small SidebarTeamMembersList-facepile">
                                                    <!-- Member 1 -->
                                                    <div v-if="isMemberAvailable(project,0) && project.members[0].is_deleted !== true" @click="showMemberDetail($event)" class="Avatar Avatar--small Avatar--color1 Facepile-avatar">
                                                        <img v-if="project.members[0].url" v-bind:src="project.members[0].url" />
                                                        <span v-else>{{getLetters(project.members[0].email)}}</span>
                                                    </div>
                                                    <a id="member1" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                        <div class="CircularButton-label">
                                                            <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <!--Member 2 -->
                                                    <div v-if="isMemberAvailable(project,1) && project.members[1].is_deleted !== true" @click="showMemberDetail($event)" class="Avatar Avatar--small Avatar--color2 Facepile-avatar">
                                                        <img v-if="project.members[1].url" v-bind:src="project.members[1].url" />
                                                        <span v-else>{{getLetters(project.members[1].email)}}</span>
                                                    </div>
                                                    <a id="member2" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                        <div class="CircularButton-label">
                                                            <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <!--Member 3-->
                                                    <div v-if="isMemberAvailable(project,2) && project.members[2].is_deleted !== true" @click="showMemberDetail($event)" class="Avatar Avatar--small Avatar--color3 Facepile-avatar">
                                                        <img v-if="project.members[2].url" v-bind:src="project.members[2].url" />
                                                        <span v-else>{{getLetters(project.members[2].email)}}</span>
                                                    </div>
                                                    <a id="member3" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                        <div class="CircularButton-label">
                                                            <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <!--Member 4-->
                                                    <div v-if="isMemberAvailable(project,3) && project.members[3].is_deleted !== true" @click="showMemberDetail($event)" class="Avatar Avatar--small Avatar--color4 Facepile-avatar">
                                                        <img v-if="project.members[3].url" v-bind:src="project.members[1].url" />
                                                        <span v-else>{{getLetters(project.members[3].email)}}</span>
                                                    </div>
                                                    <a id="member4" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                        <div class="CircularButton-label">
                                                            <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <!--Member 5 -->
                                                    <div v-if="isMemberAvailable(project,4) && project.members[4].is_deleted !== true" @click="showMemberDetail($event)" class="Avatar Avatar--small Avatar--color5 Facepile-avatar">
                                                        <img v-if="project.members[4].url" v-bind:src="project.members[4].url" />
                                                        <span v-else>{{getLetters(project.members[4].email)}}</span>
                                                    </div>
                                                    <a id="member5" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                        <div class="CircularButton-label">
                                                            <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <!--Member 6 -->
                                                    <div v-if="isMemberAvailable(project,5) && project.members[0].is_deleted !== true" @click="showMemberDetail($event)" class="Avatar Avatar--small Avatar--color6 Facepile-avatar">
                                                        <img v-if="project.members[5].url" v-bind:src="project.members[5].url" />
                                                        <span v-else>{{getLetters(project.members[5].email)}}</span>
                                                    </div>
                                                    <a id="member6" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
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
                                        <div :id="'expandableList'+project.id" class="SidebarTeamMembersExpandedList">
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
                                                <span :id="'value-'+project.id" @click="closedMemberSearch(project.id)" class="SidebarTeamMembersExpandedList-closeButton">
                                                    <svg class="Icon XIcon" title="XIcon" viewBox="0 0 32 32">
                                                        <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="ser-dro-lis TeamInviteTypeahead">
                                                <!-- Search text box -->
                                                <input :id="'input-'+project.id" @keyup="showList(project.id)" type="text" v-model="inputValue" class="textInput textInput--medium TeamInviteTypeahead-input" value="" name="">
                                                <!-- Drop down list -->
                                                <div :id="'layerPositioner-'+project.id" class="hidden layerPositioner layerPositioner--offsetLeft layerPositioner--alignLeft layerPositioner--below">
                                                    <ul class="TypeaheadView-scrollable">
                                                        <li v-for="member in searchItems" v-bind:key="member.id" class="TypeaheadView-item" @click="selectMember(project,member)">
                                                            <div class="TypeaheadItem">
                                                                <div class="TypeaheadItem-content">
                                                                    <div class="TypeaheadItem-icon">
                                                                        <div v-if="member?true:false" class="Avatar Avatar--small Avatar--color2 Facepile-avatar">
                                                                            <img v-if="member.image_url" v-bind:src="member.image_url" />
                                                                            <span v-else>{{getLetters(member.fullname)}}</span>
                                                                        </div>
                                                                        <a id="member2" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                                            <div class="CircularButton-label">
                                                                                <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                                    <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                                                </svg>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                    <div class="TypeaheadItem-textWrapper">
                                                                        <div class="TypeaheadItem-title">
                                                                            <span>{{member.fullname}}</span>
                                                                        </div>
                                                                        <div class="TypeaheadItem-subtitle">
                                                                            <span>{{member.email}}</span>
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
                                                                    <input type="text" class="textInput textInput--medium QuickInvitePopup-input QuickInvitePopup-emailInput" v-model="email">
                                                                    <div class="validatedTextInput-message">{{emailValidationError}}</div>
                                                                </div>
                                                            </div>
                                                            <div class="projectRole">
                                                                <div class="QuickInvitePopup-inputArea QuickInvitePopup-emailInputArea">
                                                                    <label class="Label">Role</label>
                                                                    <div class="validatedTextInput validatedTextInput--invalid QuickInvitePopup-emailInputValidator">
                                                                        <select class="textInput textInput--medium QuickInvitePopup-input" v-model="selected">
                                                                            <option class="textInput textInput--medium" value="" disabled selected hidden>Select Role</option>
                                                                            <option v-show="role.name != 'Owner'" class="textInput textInput--medium" v-for="role in roles" v-bind:key="role.id" v-bind:value="role.name">
                                                                                {{ role.name }}
                                                                            </option>
                                                                        </select>
                                                                        <div class="validatedTextInput-message">{{roleValidationError}}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="hidden QuickInvitePopup-inputArea">
                                                                <label class="Label">Name (Optional)</label>
                                                                <input type="text" class="textInput textInput--medium QuickInvitePopup-input QuickInvitePopup-nameInput" v-model="name">
                                                            </div>
                                                        </div>
                                                        <div class="QuickInvitePopup-buttonRow">
                                                            <a class="Button Button--small Button--secondary QuickInvitePopup-cancelButton" tabindex="0" aria-role="button" @click="closeInvite(project.id)">Cancel</a>
                                                            <a class="Button  Button--small Button--primary QuickInvitePopup-shareButton" aria-role="button" @click="inviteUserSubmit(project.id)">Send Invite</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--project wise member list-->
                                            <div :id="'listContent-'+project.id" class="SidebarTeamMembersExpandedList-contents">
                                                <div v-for="member in project.members" v-bind:key="member.id" class="SidebarTeamMembersExpandedMember-itemRow">
                                                    <!--<div v-if="member.url" class="Avatar Avatar--small Avatar--color1 Facepile-avatar">
                                                                    <img v-if="project.members[0].url" v-bind:src="project.member.url" />
                                                                    <span v-else>{{getLetters(member.name)}}</span>
                                                                </div>
                                                                <a id="member1" v-else @click="showMemberDetail($event)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                                    <div class="CircularButton-label">
                                                                        <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </a>-->
                                                    <a class="DeprecatedNavigationLink SidebarItemRow SidebarTeamMembersExpandedMember-itemRow" href="javascript:void(0)">
                                                        <div class="SidebarItemRow-avatar">
                                                            <div v-if="member" class="Avatar Avatar--small Avatar--color1 Facepile-avatar">
                                                                <img v-if="member.url" v-bind:src="member.url" />
                                                                <span v-else>{{getLetters(member.email)}}</span>
                                                            </div>
                                                        </div>
                                                        <span class="SidebarItemRow-name" title="member.name">{{member.email}}</span>
                                                        <span class="SidebarItemRowMenu-button">
                                                            <svg class="Icon MoreIcon SidebarItemRow-icon SidebarItemRow-defaultIcon" title="MoreIcon" viewBox="0 0 32 32">
                                                                <circle cx="3" cy="16" r="3"></circle>
                                                                <circle cx="16" cy="16" r="3"></circle>
                                                                <circle cx="29" cy="16" r="3"></circle>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </p>
                            </Panel>
                        </Collapse>
                        <!-- Project name header -->
                        <span v-else :id="'panelProjectName-'+project.id" @click="projectSelect(project)" @mouseleave="hideOption(project.id)" @mouseover="showOption(project.id)" class="spanPanel privateProject">
                            <a class="DeprecatedNavigationLink">
                                <span class="panelProjectName">{{projectNameElipse(project.project_name,15)}}</span>
                                <span :id="'ItemRowMenu-'+project.id" class="ItemRowMenu" style="fill:transparent" @click="showProjectSetting(project)">
                                    <svg class="Icon MoreIcon SidebarItemRow-icon SidebarItemRow-defaultIcon" title="MoreIcon" viewBox="0 0 32 32">
                                        <circle cx="3" cy="16" r="3"></circle>
                                        <circle cx="16" cy="16" r="3"></circle>
                                        <circle cx="29" cy="16" r="3"></circle>
                                    </svg>
                                </span>
                                <span :id="'ItemRowPrivacy-'+project.id" v-show="project.project_privacy == 2"  class="SidebarItemRow-statusIcon pull-right">
                                    <svg class="Icon LockIcon" title="LockIcon" viewBox="0 0 32 32">
                                        <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                                    </svg>
                                </span>
                            </a>
                        </span>
                    </div>
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
                isOpen: false,
                isNewProjectDialogShow: false,
                // projectList: [{id:"1",name:"project 1"},{id:"2",name:"project 2"}, 
                // {id:"3",name:"project 3"},{id:"4",name:"project 4"}],
                members: [],
                users: this.$store.state.arrAllUsers,
                searchText: '', // If value is falsy, reset searchText & searchItem 
                item: {
                    value: '',
                    text: ''
                },
                inputValue: '',
                email: '',
                name: '',
                lastOpenDialogId: '',
                lastProjectSelected: '',
                selected: '',
                roles:this.$store.state.userRoles,
                emailValidationError: '',
                roleValidationError: '',
                memberListShow: true,
                isAddMemberPermission:false,
                // projectList:this.$store.state.projectlist
             
            }
        },

    created() {
        this.$store.dispatch('getUsersRoles');
        this.$store.dispatch("getAllUsersList", this.callAllProjectList)
        // var self = this;
        // setTimeout(function() {
        //         self.$store.dispatch('getAllProjects', self.$store.state.userObject._id);
        //         self.$store.state.projectSettingId = "";    
        // }, 5000);

    },
    computed: {
        ...mapGetters({
            getProjectList: 'getProjectList',
            // memberProfile:'getMemberProfile',
            memberName: 'getMemberName'
        }),
        myProjectList: {
            get() {
                return this.$store.state.projectlist
            },
            set(value) {
                this.$store.commit('updateProjectList', value)
            }
        },
        searchItems: function() {

            var self = this
            var sameMatch = false;
            // console.log("userList:--", self.users)
            var itemList = self.users.filter(function(item) {
                if (!sameMatch) {
                    if (item.fullname != null) {
                        sameMatch = (item.fullname.toLowerCase() == self.inputValue.toLowerCase())
                        return item.fullname.toLowerCase().indexOf(self.inputValue.toLowerCase()) != -1
                    }
                    else if (item.emil != null) {
                        sameMatch = (item.email.toLowerCase() == self.inputValue.toLowerCase())
                        return item.email.toLowerCase().indexOf(self.inputValue.toLowerCase()) != -1
                    }
                }

                // return item.fullname.toLowerCase().indexOf(self.inputValue.toLowerCase()) != -1
            })
            // console.log("itemList", itemList)
            if (!sameMatch)
                itemList.push({ "id": "0", "name": self.inputValue });
            return itemList;
        },
        projectList: function() {
            //console.log("projectlist", this.getProjectList)
            // this.memberProfileDetail
            var projects = this.$store.state.projectlist;
            this.memberProfileDetail(projects)
            return this.getProjectList;
        },
        silderClosedValue(){
            return this.$store.state.isSliderOpen;
        }
    },
    watch:{
        silderClosedValue: function(){
           // this.isOpen = this.$store.state.isSliderOpen;
            console.log("NavBarSlider watcher method call")
            this.closeNav()
        }
    },
    mounted: function() {
        var self = this;
        $(".search").on('keyup', function() {
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
        callAllProjectList: function() {
            this.$store.dispatch('getPermissions');
            this.$store.dispatch('getAllProjects', this.$store.state.userObject._id);
            this.$store.state.projectSettingId = "";
        },
        isMemberAvailable: function(project, index) {

            // console.log("Project index:--", project && project.members && project.members[index]);
            return project && project.members && project.members[index]
        },
        getMemberProfile: function(uId, member) {
            // console.log("member id:",member);
            var userRoleId = member.user_role_id;
            let userIndex = _.findIndex(this.users, function(user) { return user._id === uId })
            // console.log("member userIndex:",userIndex);
            if (userIndex < 0) {
                return { user_id: uId }
            } else {
                //            console.log("Role roleId:--",userRoleId);
                // If userRole is black then asume it is a "Owner"
                var roleindex = _.findIndex(this.$store.state.userRoles, function(role) { return role.id == userRoleId })
                //              console.log("Role Index:--",roleindex);
                var roleId = "";
                var roleName = "";
                if (roleindex > -1) {
                    roleId = this.$store.state.userRoles[roleindex].id
                    // console.log("userRoleId:",userRoleId)
                    // console.log("roleId:",roleId)

                    // console.log("this.$store.state.userRoles[roleindex]",this.$store.state.userRoles[roleindex]);
                    // console.log("this.$store.state.userRoles[roleindex]",this.$store.state.userRoles[roleindex].name);
                    roleName = this.$store.state.userRoles[roleindex].name

                    return { user_id: uId, url: this.users[userIndex].image_url, name: this.users[userIndex].name, email: this.users[userIndex].email, role: this.users[userIndex].role, user_role_id: member.user_role_id, roleName: roleName, is_deleted: member.is_deleted, id: member.id }
                } else {
                    return { user_id: uId, url: this.users[userIndex].image_url, name: this.users[userIndex].name, email: this.users[userIndex].email, role: this.users[userIndex].role, user_role_id: '', roleName: 'Owner', is_deleted: member.is_deleted, id: member.id }
                }

            }

        },
        memberProfileDetail: function(projects) {

            projects.forEach(function(project) {
                var members = project.members;
                if (members) {
                    members.forEach(function(member) {
                        //                            console.log("Member :--->",member)
                        var uId = member.user_id;
                        var memberDetail = this.getMemberProfile(uId, member);
                        let memberIndex = _.findIndex(members, function(m) { return m.user_id === uId })
                        // console.log("MemberIndex :--->",memberDetail)
                        if (memberIndex < 0) {
                            project.members.push(memberDetail);
                        }
                        else {
                            project.members[memberIndex] = memberDetail;
                        }

                    }, this);
                } else {

                }

            }, this);
            // console.log("<----Project Member:-->", projects)
        },
        inviteUserSubmit: function(projectId) {
            var inviteEmail = this.email;
            if (!inviteEmail || inviteEmail.length == 0 || !CmnFunc.checkValidEmail(inviteEmail)) {
                this.emailValidationError = "Invalid user email"
                return;
            } else {
                this.emailValidationError = "";
            }
            var roleSelect = this.selected;
            if (!roleSelect || roleSelect.length == 0) {
                this.roleValidationError = "Select role"
                return;
            } else {
                this.roleValidationError = ""
            }

            // var roleId=this.roles.filter(role=> role.name ==roleSelect);
            let index = _.findIndex(this.roles, function(d) { return d.name == roleSelect })
            let indexUser = _.findIndex(this.users, function(d) { return d.email == inviteEmail })

            var insertInvite = {
                project_id: projectId,
                user_id: indexUser > -1 ? this.$store.state.arrAllUsers[indexUser]._id : '',
                create_by: this.$store.state.userObject._id,
                user_email: this.$store.state.userObject.email,
                user_role_id: this.roles[index].id,
                invitation_status: "p",
                invited_date: new Date(),
                is_deleted: false,
                created_at: new Date()
            }
            this.$store.dispatch('insertProjectInvite', insertInvite)
            this.closeInvite(projectId);
            // Hide member list
            $("#layerPositioner-" + projectId).addClass("hidden");
            this.selected = '';

        },
        closeNav: function() {
            document.getElementById("top-bar").style.marginLeft = "0px";
            document.getElementById('mySidenav').style.width = "0px"
            $('.Topbar-navButton').css('margin-left', '0px');
            document.getElementById("main-container").style.marginLeft = "0px";
            this.isOpen = true;
            this.$store.commit('UPDATE_SLIDER_VALUE', this.isOpen)
        },
        projectSelect(project) {
            // Show project visibility option (like public to all, private to me)
            $("div#projectVisible").removeClass('hidden');
            
            this.$store.commit('showMyTasks')
            // console.log('Project', project.id)
            this.$store.state.currentProjectName = project.project_name;
            this.$store.state.currentProjectId = project.id;
            this.$store.state.currentProject = project;

            this.$store.state.currentProjectPrivacy = project.project_privacy;
            this.$store.state.todolist = []
            this.$store.commit('CLOSE_DIV', '')
            this.$store.dispatch('getAllTodos', { 'parentId': '', project_id: project.id });
            // Close last open dialog
            if (this.lastProjectSelected !== '') {
                // console.log(this.lastProjectSelected);
                $("#panelProjectName-" + this.lastProjectSelected).removeClass("project-selected");
                this.closedMemberSearch(this.lastProjectSelected);
            }
            // Clear text
            this.inputValue = '';
            // Open Invite member dialog
            $("#panelProjectName-" + project.id).addClass("project-selected");
            this.lastProjectSelected = project.id;
            // Todo  remove line
            this.$store.state.accessRight = {}
            // this.memberProfileDetail()
        },
        // This method show when user mouse hover on project name
        showOption(id) {
          //   console.log("showOption");
            $("#ItemRowMenu-" + id).removeClass("hidden");
            $("#ItemRowMenu-" + id).css({ "fill": "white" });
        },
        hideOption(id) {
            // $("#ItemRowMenu-" + id).addClass("hidden");
            var pid = this.$store.state.projectSettingId;
            var cid = this.$store.state.currentProjectId;
            $("#ItemRowMenu-" + cid).css({ "fill": "transparent" });
            if (pid != id) {
                $("#ItemRowMenu-" + id).css({ "fill": "transparent" });
            }
        },
        showList(id) {
            // Show search member list
            $("#layerPositioner-" + id).removeClass("hidden");
            this.memberListShow = false;
        },
        closeExpandableList(id) {
            console.log("on blur closeExpandableList:", id);
            // Hide expandable list
            //  $("#layerPositioner-"+id).addClass("hidden");
            //  $("#listContent-"+id).removeClass("hidden");
            this.memberListShow = true;
        },
        selectMember: function(project, item) {

            let index = _.findIndex(project.members, function(d) { return d.email == item.email })
            if (index < 0) {
                this.email = item.email
                this.name = item.name


                // Hide header 
                $("#listHeader" + project.id).addClass("hidden");
                    // Hide header 
                    $("#listHeader" + project.id).addClass("hidden");
                    // Close last open dialog
                    if (this.lastOpenDialogId !== '') {
                        $("#popup-" + this.lastOpenDialogId).addClass("hidden");
                        // Show already added member list
                        $("#listContent-" + this.lastOpenDialogId).removeClass("hidden");
                      
                    }
                    this.roles=this.$store.state.userRoles; 
                    // Open Invite member dialog
                    $("#popup-" + project.id).removeClass("hidden");
                    this.lastOpenDialogId = project.id;
                }
                // Hide member search list 
                $("#layerPositioner-" + project.id).addClass("hidden");
            },
            selectNonMember(id) {
                this.email = this.inputValue;
                this.name = this.inputValue;

                // Hide header 
                $("#listHeader" + id).addClass("hidden");
                // Hide member search list 
                $("#layerPositioner-" + id).addClass("hidden");
                // Open Invite member dialog
                $("#popup-" + id).removeClass("hidden");
                this.roles=this.$store.state.userRoles; 
            },
            displayToolTips: function () {
                $('.CircularButton').tooltip({ title: "Create a project", placement: "bottom" });
            },
            createProject: function () {
                this.isNewProjectDialogShow = true;
            },
            updateDialogShow(isDialogVal) {
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
            closedMemberSearch(id) {
                // Hide expandable list
                //  $(".SidebarTeamMembersExpandedList").addClass("hidden");
                $("#expandableList" + id).addClass("hidden");
                // Show horizontal member list
                // $(".SidebarItemRow-name").removeClass("hidden");
                $("#itemRow-" + id).removeClass("hidden");
                $("#layerPositioner-" + id).addClass("hidden");
                // Clear value
                $("#input-"+id).val("");
            },
            closeInvite(id) {

                // Close last open dialog
                if (this.lastOpenDialogId !== '') {
                    $("#popup-" + this.lastOpenDialogId).addClass("hidden");
                    // Show already added member list
                    $("#listContent-" + this.lastOpenDialogId).removeClass("hidden");
                }
                // Open Invite member dialog
                $("#popup-" + project.id).removeClass("hidden");
                this.lastOpenDialogId = project.id;
            // }
            // Hide member search list 
            $("#layerPositioner-" + project.id).addClass("hidden");
        },
        selectNonMember(id) {
            this.email = this.inputValue;
            this.name = this.inputValue;
            // Hide header 
            $("#listHeader" + id).addClass("hidden");
            // Hide member search list 
            $("#layerPositioner-" + id).addClass("hidden");
            // Open Invite member dialog
            $("#popup-" + id).removeClass("hidden");
        },
        displayToolTips: function() {
            $('.CircularButton').tooltip({ title: "Create a project", placement: "bottom" });
        },
        createProject: function() {
            this.isNewProjectDialogShow = true;
        },
        updateDialogShow(isDialogVal) {
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
        closedMemberSearch(id) {
            // Hide expandable list
            // $(".SidebarTeamMembersExpandedList").addClass("hidden");
            // $("#expandableList" + id).addClass("hidden");
            // Show horizontal member list
            // $(".SidebarItemRow-name").removeClass("hidden");
            // $("#itemRow-" + id).removeClass("hidden");
            $("#layerPositioner-" + id).addClass("hidden");
            // Clear value
            $("#input-" + id).val("");
        },
        closeInvite(id) {

            // Open Invite member dialog
            $("#popup-" + id).addClass("hidden");
            // Hide header 
            $("#listHeader" + id).removeClass("hidden");

            // Show already added member list
            $("#listContent-" + this.lastOpenDialogId).removeClass("hidden");

            // Clear search value
            this.inputValue = "";

        },
        showMemberDetail(event) {
            var targetId = event.currentTarget.id;
        },
        addMemberClick(id) {
            // Hide member horizontal list
            $("#itemRow-" + id).addClass("hidden");
            $("#expandableList" + id).removeClass("hidden");
            //$(".SidebarTeamMembersExpandedList").removeClass("hidden");
        },
        getLetters(name) {
            var str = name;
            if (!str || str.length == 0)
                return "X";

            var firstLetters = str.substr(0, 2);
            return firstLetters;
        },
        openMenu: function(e) {
            this.viewMenu = true;

            Vue.nextTick(function() {
                this.$$.right.focus();

                this.setMenu(e.y, e.x)
            }.bind(this));
            e.preventDefault();
        },
        showProjectSetting: function(project) {
            console.log("click", project.members)
            // Show option icon white
            $("#ItemRowMenu-" + project.id).css({ "fill": "white" });
            this.$store.state.projectSettingId = project.id;
            //  $("#ItemRowMenu-" + project.id).css({"fill":"red"});
            var pos = $('#ItemRowMenu-' + project.id + '').offset();
            this.$store.state.projectSettingMenuOffset = pos;
            var top = pos.top - 32;
            var left = pos.left;
            $("div.project-setting").removeClass("hidden");
            $("div.project-setting").css({ "margin-top": +top + "px", "margin-left": +left + "px" })

            this.$store.state.currentProjectMember = project.members;
            this.$store.state.currentProjectCreatedBy = project.create_by;
        },
        async addMemberPermission() {
            this.isAddMemberPermission = await CmnFunc.checkActionPermision(this, this.todoObject.type_id, Constant.USER_ACTION.MEMBER, Constant.PERMISSION_ACTION.CREATE)
            console.log("Member Add permission.",this.isAddMemberPermission);
        },
        projectNameElipse(str, max){
            return str.length > (max - 3) ? str.substring(0,max-3) + '...' : str; 
        }

    },
    components: {
        CreateProjectDialog,
        draggable,
        ProjectItem,
    }
}

</script>