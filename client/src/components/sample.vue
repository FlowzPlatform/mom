<template>
    <div>
        <div id="drag-2" v-draggable>
            <ul id="menu">
                <a class="menu-button fa fa-bars" href="#menu" title="Show navigation"></a>
                <a class="menu-button fa fa-times" href="#" title="Hide navigation"></a>
                <li class="menu-item icon-picture"><a class="menu-item-back" @click="showRoleAccess" href="#roleAccess"></a></li>
                <li class="menu-item fa fa-tasks"><a class="menu-item-back" @click="showMainTask" href="#main-container"></a></li>
                <li class="menu-item glyphicon glyphicon-trash"><a class="menu-item-back" href="#menu" @click="showDeleteTasks"></a></li>
                <li class="menu-item fa fa-plus-square-o"><a class="menu-item-back" href="#menu" @click="createProject"></a></li>
                <Poptip class="menu-item icon-heart" placement="bottom-end">
                    <li></li>
                    <div slot="title"><i style="color:black; font-size:large;">Projects</i></div>
                    <div slot="content" v-show="project.is_deleted==false" v-bind:key="project.id" v-for="(project, index) in projectList">
                        <Collapse v-bind:key="project.id" accordion v-if="project.project_privacy!=2">
                        <Panel>
                        <span :id="'panelProjectName-'+project.id" @click="projectSelect(project)" @mouseleave="hideOption(project.id)" @mouseover="showOption(project.id)" class="spanPanel">
                            <a class="DeprecatedNavigationLink">
                                <span class="panelProjectName">{{projectNameElipse(project.project_name,17)}}</span>
                                <!-- Project setting menu  -->
                                <div :id="'ItemRowMenu-'+project.id" class="ItemRowMenu">
                                  <svg @click="showMemberDialog(project)" title="UserIcon" viewBox="0 0 32 32" class="Icon UserIcon projectHeaderFacepile-privacySummaryDropdownLeftIcon">
                                    <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                                    <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                                  </svg>
                                  <i @click="showDeleteProjectDialog" class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                              </div>
                                <a id="add-member" v-show="project.project_privacy != 2"  @click="addMemberClick(project.id)" class="inviteMember" tabindex="0" aria-role="button">
                                    <div v-if="$store.state.userObject.email" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                      <avatar v-if="$store.state.userObject.image_url" :username="$store.state.userObject.email" :src="$store.state.userObject.image_url" :size="30"></avatar>
                                      <avatar v-else :username="$store.state.userObject.email" :size="30" color="#fff"></avatar>
                                    </div>
                                </a>                                   
                                <span :id="'ItemRowPrivacy-'+project.id" v-show="project.project_privacy == 2" class="SidebarItemRow-statusIcon pull-right">
                                    <svg class="Icon LockIcon" title="LockIcon" viewBox="0 0 32 32">
                                        <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                                    </svg>
                                </span>

                            </a>
                        </span>
                        <p class="teamList" slot="content">
                            <!--Added Member list -->
                            <span :id="'itemRow-'+project.id" class="SidebarItemRow-name">
                                <div class="SidebarTeamMembersList">
                                    <div class="SidebarTeamMembersList-facepileRow">
                                        <div class="Facepile Facepile--small SidebarTeamMembersList-facepile">
                                            <!-- Member 1 -->
                                            <div v-if="isMemberAvailable(project,0) && project.members[0].is_deleted !== true" @click="showMemberDetail($event)" class="taskRow">
                                                <div v-if="project.members[0].email">
                                                  <avatar v-if="project.members[0].url" :username="project.members[0].email" :src="project.members[0].url" :size="25"></avatar>
                                                  <avatar v-else :username="project.members[0].email" :size="25" color="#fff"></avatar>
                                                </div>
                                            </div>
                                            <a id="member1" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                                                <div class="CircularButton-label">
                                                    <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                                                        <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                            <!--Member 2 -->
                                            <div v-if="isMemberAvailable(project,1) && project.members[1].is_deleted !== true" @click="showMemberDetail($event)" class="taskRow">
                                              <div v-if="project.members[1].email">
                                                <avatar v-if="project.members[1].url" :username="project.members[1].email" :src="project.members[1].url" :size="25"></avatar>
                                                <avatar v-else :username="project.members[1].email" :size="25" color="#fff"></avatar>
                                              </div>
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
                                              <div v-if="project.members[2].email">
                                                <avatar v-if="project.members[2].url" :username="project.members[2].email" :src="project.members[2].url" :size="25"></avatar>
                                                <avatar v-else :username="project.members[2].email" :size="25" color="#fff"></avatar>
                                              </div>
                                            </div>
                                            <a id="member3" v-else @click="addMemberClick(project.id)" class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
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
                                        <input :id="'input-'+project.id" @keyup="showList(project.id)" type="text" v-model="inputValue" class="textInput textInput--medium TeamInviteTypeahead-input" value="" name="" placeholder="Invite People">
                                        <!-- Drop down list -->
                                        <div :id="'layerPositioner-'+project.id" class="hidden layerPositioner layerPositioner--offsetLeft layerPositioner--alignLeft layerPositioner--below">
                                            <ul class="TypeaheadView-scrollable">
                                                <li v-for="member in searchItems" v-bind:key="member.id" class="TypeaheadView-item" @click="selectMember(project,member)">
                                                    <div class="TypeaheadItem">
                                                        <div class="TypeaheadItem-content">
                                                            <div class="TypeaheadItem-icon">
                                                                <div v-if="member.email">
                                                                    <avatar v-if="member.image_url" :username="member.email" :size="25" :src="member.image_url"></avatar>
                                                                    <avatar v-else :username="member.email" color="#fff" :size="25"></avatar>
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
                                            <a class="DeprecatedNavigationLink SidebarItemRow SidebarTeamMembersExpandedMember-itemRow" href="javascript:void(0)">
                                              <div class="SidebarItemRow-avatar">
                                              <div v-if="member.email">
                                                <avatar v-if="member.url" :username="member.email" :size="25" :src="member.url"></avatar>
                                                <avatar v-else :username="member.email" color="#fff" :size="25"></avatar>
                                              </div>
                                            </div>
                                            <span class="SidebarItemRow-name" title="email">{{member.email}}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </p>
                        </Panel>
                        </Collapse>
                        <span v-else :id="'panelProjectName-'+project.id" @click="projectSelect(project)" @mouseleave="hideOption(project.id)" @mouseover="showOption(project.id)" class="spanPanel privateProject">
                            <a class="DeprecatedNavigationLink">
                                <span class="panelProjectName">{{projectNameElipse(project.project_name,15)}}</span>
                                <span :id="'ItemRowMenu-'+project.id" class="ItemRowMenu" style="fill:transparent" @click="showProjectSetting(project)">
                                    <i @click="showDeleteProjectDialog" class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                                </span>
                                <span :id="'ItemRowPrivacy-'+project.id" v-show="project.project_privacy == 2"  class="SidebarItemRow-statusIcon pull-right">
                                    <svg class="Icon LockIcon" title="LockIcon" viewBox="0 0 32 32">
                                        <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                                    </svg>
                                </span>  
                            </a>
                        </span>
                    </div>
                </Poptip>
              </ul>
        </div>
        <create-project-dialog :show="isNewProjectDialogShow" v-on:updateDialog='updateDialogShow'></create-project-dialog>
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import CmnFunc from './CommonFunc.js'
import ProjectItem from './ProjectItem.vue'
import CreateProjectDialog from './CreateProjectDialog.vue'
import Avatar from 'vue-avatar/dist/Avatar'
Vue.directive('draggable', {
  bind: function (el) {
    el.style.position = 'fixed';
    var startX, startY, initialMouseX, initialMouseY;

    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      el.style.top = startY + dy + 'px';
      el.style.left = startX + dx + 'px';
      return false;
    }

    function mouseup() {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    }

    el.addEventListener('mousedown', function(e) {
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
      return false;
    });
  }
})

export default {
  data: function(){
    return {
      isRoleAccess: false,
      isMyTask:true,
      isNewProjectDialogShow: false,
      inputValue: '',
      users: this.$store.state.arrAllUsers,
      roleValidationError: '',
      emailValidationError: '',
      email: '',
      name: '',
      selected: '',
      roles:this.$store.state.userRoles,
      isAddMemberPermission:false,
      searchText: '', // If value is falsy, reset searchText & searchItem 
      item: {
        value: '',
        text: ''
      },
      lastOpenDialogId: '',
      lastProjectSelected: '',
      memberListShow: true,
      members: [],
    }
    },
    created(){
      this.$store.dispatch('getUsersRoles');
      this.$store.dispatch("getAllUsersList", this.callAllProjectList)
    },
    computed:{
      ...mapGetters({
        getProjectList: 'getProjectList',
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
      searchItems: function () {
        var self = this
        var sameMatch = false;
        var itemList = self.users.filter(function (item) {
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
        })
        if (!sameMatch)
          itemList.push({ "id": "0", "name": self.inputValue });
        return itemList;
      },
      projectList: function () {
        var projects = this.$store.state.projectlist;
        this.memberProfileDetail(projects)
        return this.getProjectList;
      },
      silderClosedValue() {
        return this.$store.state.isSliderOpen;
      }
    },
    watch:{
      silderClosedValue: function(){
        this.closeNav()
      }
    },
    mounted: function() {
      var self = this;
      $(".search").on('keyup', function() {
      if ($(this).val().length > 0) {
        this.searchText = "data:" + $(this).val();
        }
      })
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
      showRoleAccess(){
        this.isRoleAccess = true
        this.isMyTask = false
        this.$emit('eventChangeMenu',  this.isMyTask, this.isRoleAccess)
      },
      showMainTask(){
        this.$store.state.deleteItemsSelected = false
        this.isRoleAccess = false
        this.isMyTask = true
        this.$emit('eventChangeMenu',  this.isMyTask, this.isRoleAccess)
      },
      projectNameElipse(str, max) {
        return str.length > (max - 3) ? str.substring(0, max - 3) + '...' : str;
      },
      getMemberProfile: function (uId, member) {
        var userRoleId = member.user_role_id;
        let userIndex = _.findIndex(this.users, function (user) { return user._id === uId })
        if (userIndex < 0) {
          return { user_id: uId }
        } else {
          var roleindex = _.findIndex(this.$store.state.userRoles, function (role) { return role.id == userRoleId })
          var roleId = "";
          var roleName = "";
          if (roleindex > -1) {
            roleId = this.$store.state.userRoles[roleindex].id
            roleName = this.$store.state.userRoles[roleindex].name
            return { user_id: uId, url: this.users[userIndex].image_url, name: this.users[userIndex].name, email: this.users[userIndex].email, role: this.users[userIndex].role, user_role_id: member.user_role_id, roleName: roleName, is_deleted: member.is_deleted, id: member.id }
          } else {
            return { user_id: uId, url: this.users[userIndex].image_url, name: this.users[userIndex].name, email: this.users[userIndex].email, role: this.users[userIndex].role, user_role_id: '', roleName: 'Owner', is_deleted: member.is_deleted, id: member.id }
          }
        }
      },
      memberProfileDetail: function(projects) {
        projects.forEach(function (project) {
        var members = project.members;
        if (members) {
          members.forEach(function (member) {
            var uId = member.user_id;
            var memberDetail = this.getMemberProfile(uId, member);
            let memberIndex = _.findIndex(members, function (m) { return m.user_id === uId })
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
        
      },
      showOption(id) {
        $("#ItemRowMenu-" + id).removeClass("hidden");
        $("#ItemRowMenu-" + id).css({ "fill": "white" });
      },
      hideOption(id) {
        var pid = this.$store.state.projectSettingId;
        var cid = this.$store.state.currentProjectId;
        $("#ItemRowMenu-" + cid).css({ "fill": "transparent" });
        if (pid != id) {
          $("#ItemRowMenu-" + id).css({ "fill": "transparent" });
        }
      },
      projectSelect(project) {
        // Show project visibility option (like public to all, private to me)
        $("div#projectVisible").removeClass('hidden');
        this.$store.commit('showMyTasks')
        this.$store.state.currentProjectName = project.project_name;
        this.$store.state.currentProjectId = project.id;
        this.$store.state.currentProject = project;
        this.$store.state.currentProjectPrivacy = project.project_privacy;
        this.$store.state.todolist = []
        this.$store.commit('CLOSE_DIV', '')
        this.$store.dispatch('getAllTodos', { 'parentId': '', project_id: project.id });
        // Close last open dialog
        if (this.lastProjectSelected !== '') {
          $("#panelProjectName-" + this.lastProjectSelected).removeClass("project-selected");
          this.closedMemberSearch(this.lastProjectSelected);
        }
        this.inputValue = '';
        // Open Invite member dialog
        $("#panelProjectName-" + project.id).addClass("project-selected");
        this.lastProjectSelected = project.id;
        // Todo  remove line
        this.$store.state.accessRight = {}
      },
      closedMemberSearch(id) {
        // Hide expandable list
        $("#expandableList" + id).addClass("hidden");
        // Show horizontal member list
        $("#itemRow-" + id).removeClass("hidden");
        $("#layerPositioner-" + id).addClass("hidden");
        // Clear value
        $("#input-"+id).val("");
      },
      addMemberClick(id) {
        // Hide member horizontal list
        $("#itemRow-" + id).addClass("hidden");
        $("#expandableList" + id).removeClass("hidden");
      },
      createProject: function () {
        this.isNewProjectDialogShow = true;
      },
      updateDialogShow(isDialogVal) {
        this.isNewProjectDialogShow = isDialogVal
      },
      showProjectSetting: function (project) {
        // Show option icon white
        $("#ItemRowMenu-" + project.id).css({ "fill": "white" });
        this.$store.state.projectSettingId = project.id;
        var pos = $('#ItemRowMenu-' + project.id + '').offset();
        this.$store.state.projectSettingMenuOffset = pos;
        var top = pos.top - 32;
        var left = pos.left;
        $("div.project-setting").removeClass("hidden");
        $("div.project-setting").css({ "margin-top": +top + "px", "margin-left": +left + "px" })
        this.$store.state.currentProjectMember = project.members;
        this.$store.state.currentProjectCreatedBy = project.create_by;
      },
      isMemberAvailable: function(project, index) {
        return project && project.members && project.members[index]
      },
      getLetters(name) {
        var str = name;
        if (!str || str.length == 0)
          return "X";
        var firstLetters = str.substr(0, 2);
        return firstLetters;
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
        this.roles = this.$store.state.userRoles;
      },
      showList(id) {
        // Show search member list
        $("#layerPositioner-" + id).removeClass("hidden");
        this.memberListShow = false;
      },
      selectMember: function (project, item) {
        let index = _.findIndex(project.members, function (d) { return d.email == item.email })
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
          this.roles = this.$store.state.userRoles;
            // Open Invite member dialog
          $("#popup-" + project.id).removeClass("hidden");
          this.lastOpenDialogId = project.id;
        }
          // Hide member search list 
        $("#layerPositioner-" + project.id).addClass("hidden");
      },
      inviteUserSubmit: function (projectId) {
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
        let index = _.findIndex(this.roles, function (d) { return d.name == roleSelect })
        let indexUser = _.findIndex(this.users, function (d) { return d.email == inviteEmail })
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
      async addMemberPermission() {
        this.isAddMemberPermission = await CmnFunc.checkActionPermision(this, this.todoObject.type_id, Constant.USER_ACTION.MEMBER, Constant.PERMISSION_ACTION.CREATE)
        console.log("Member Add permission.",this.isAddMemberPermission);
      },
      onSelect(item) {
        this.item = item
      },
      reset() {
        this.item = {}
      },
      selectOption() {
        this.item = this.options[0]
      },
      showProjectList(){
        this.isProjectList = true
      },
      showMemberDialog(project) {
        // Hide project setting menu
        console.log("========================",project)
        this.$store.state.projectSettingId = project.id;
        this.$store.state.currentProjectMember = project.members;
        this.$store.state.currentProjectCreatedBy = project.create_by;

        $("div.project-setting").addClass("hidden");
        $("#project-setting-dialog").removeClass("hidden");
      },
      showDeleteProjectDialog(){
         this.hideProjectSetting();
         $("#project-delete-dialog").removeClass("hidden");
     },
     hideProjectSetting() {
        this.$store.state.projectSettingId
        $("div.project-setting").addClass("hidden");
      },
    },
    components: {
      CreateProjectDialog,
      ProjectItem,
      Avatar
    }
}
</script>
<style>
@import url(https://netdna.bootstrapcdn.com/font-awesome/2.0/css/font-awesome.css);
#drag-2 {
  /* min-height: 6.5em; */
  /* margin: 10%; */
  color: white;
  border-radius: 0.75em;
  padding: 2%;
  -webkit-transform: translate(0px, 0px);
          transform: translate(0px, 0px);
}
#drag-me::before {
  content: "#" attr(id);
  font-weight: bold;
}
* {
  Box-sizing: Border-box;
}
html, body {
  background: #e0e0e0;
  overflow: hidden;
}
#menu {
  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;
  border-radius: 500px;
  border-radius: 50%;
  position: fixed;
  left: 50%;
  top: 50%;
  list-style: none;
  font-size: 200%;
  transition: width 500ms, height 500ms, margin 500ms;
  overflow: hidden;
}
#menu:target {
  width: 300px;
  height: 300px;
  margin: -150px 0 0 -150px;
}
.menu-button {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -25px 0 0 -25px;
  background: #fff;
  box-shadow: 0 0 0 1px #000;
  border-radius: 500px;
  border-radius: 50%;
  opacity: 0;
  z-index: 0;
}
.fa-bars:before, .fa-times:before {
  color: #000;
  position: relative;
  top: 25%;
  /* left: 42%; */
  transition: opacity 500ms ease-in;
  text-decoration: none;
  z-index: 2;
}
#menu:not(:target) > a:first-of-type, #menu:target > a:last-of-type {
  opacity: 1;
  z-index: 1;
}
.menu-item-back {
  background: #000;
  width: 175px;
  height: 150px;
  position: absolute;
  transform-origin: 0px 150px;
  margin-top: -150px;
  left: 50%;
  top: 50%;
  border: 1px solid whitesmoke;
}
.menu-item-back:hover {
  background: #000;
}
.menu-item {
  position: absolute;
  text-decoration: none;
  top: 50%;
  left: 50%;
  display: none;
}
.menu-item:before {
  color: #fff;
  position: absolute;
  text-decoration: none;
  top: -12px;
  left: 30px;
  z-index: 1;
}
.menu-item:nth-child(3) {
  display: block;
}
.menu-item:nth-child(3) .menu-item-back {
  transform: rotate(-54deg) skew(-18deg);
}
.menu-item:nth-child(3):before {
  /* margin: sin(-90deg) * 110px 0 0 cos(-90deg) * 110px; */
  margin: -90px 0 0 -5px;
}
.menu-item:nth-child(4) {
  display: block;
}
.menu-item:nth-child(4) .menu-item-back {
  transform: rotate(18deg) skew(-18deg);
}
.menu-item:nth-child(4):before {
  /* margin: sin(-18deg) * 110px 0 0 cos(-18deg) * 110px; */
  margin: -25.99187px 0 0 48.61622px;
}
.menu-item:nth-child(5) {
  display: block;
}
.menu-item:nth-child(5) .menu-item-back {
  transform: rotate(90deg) skew(-18deg);
}
.menu-item:nth-child(5):before {
  /* margin: sin(54deg) * 110px 0 0 cos(54deg) * 110px; */
  margin: 72.99187px 0 0 10.65638px;
}
.menu-item:nth-child(6) {
  display: block;
}
.menu-item:nth-child(6) .menu-item-back {
  transform: rotate(162deg) skew(-18deg);
}
.menu-item:nth-child(6):before {
  /* margin: sin(126deg) * 110px 0 0 cos(126deg) * 110px; */
  margin: 69.99187px 0 0 -94.65638px;
}
.menu-item:nth-child(7) {
  display: block;
}
.menu-item:nth-child(7) .menu-item-back {
  transform: rotate(234deg) skew(-18deg);
}
.menu-item:nth-child(7):before {
  /* margin: sin(198deg) * 110px 0 0 cos(198deg) * 110px; */
  margin: -25.99187px 0 0 -126.61622px;
}

.menu-item:nth-child(7) .ivu-poptip-rel {
    /* -webkit-transform: rotate(244.28571deg) skew(-38.57143deg); */
    transform: rotate(234deg) skew(-18deg);
}
.ivu-poptip-rel {
background: #000;
    width: 175px;
    height: 150px;
    position: absolute;
    -webkit-transform-origin: 0px 150px;
    transform-origin: 0px 150px;
    margin-top: -150px;
    left: 50%;
    top: 50%;
    border: 1px solid whitesmoke;
}
.ivu-poptip-popper{
  min-width: 400px;
}
.fa-trash-o:before {
    -webkit-text-fill-color: #b9bcc0;
}
</style>