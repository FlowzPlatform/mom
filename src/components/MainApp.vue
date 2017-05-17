<template>
	<section class="todoapp">
    <div data-reactroot="" class="Topbar">
      <div class="Topbar-navButtonContainer">
        <a class="Topbar-navButton">
          <svg class="Icon HamburgerIcon Topbar-sidebarToggleIcon" title="HamburgerIcon" viewBox="0 0 32 32"><rect x="2" y="4" width="28" height="4"></rect><rect x="2" y="14" width="28" height="4"></rect><rect x="2" y="24" width="28" height="4"></rect></svg>
        </a>
      </div>
      <a class="NavigationLink Topbar-myTasksButton is-selected" href="">
      My Tasks
      </a>
      <a class="NavigationLink Topbar-notificationsButton" href="">
      Inbox</a>
      <a class="NavigationLink Topbar-myDashboardButton" href="">
      Dashboard</a>
      <div class="Topbar-accountInfo">
      <a class="Button Button--small Button--primary topbarContingentUpgradeButton-button" tabindex="0" aria-role="button">
        Upgrade</a>
      <a class="Topbar-settingsMenuButton">
      <span class="Topbar-settingsMenuDomainName"><span>UserName</span></span>
      <div class="Avatar Avatar--medium Avatar--color4 Topbar-settingsMenuAvatar"><!-- react-text: 28 -->UN<!-- /react-text --></div>
      </a>
    </div>
  </div>
      
      <div data-reactroot="" class="PageHeaderStructure MyTasksPageHeader">
        <div class="PageHeaderStructure-center">
          <div class="PageHeaderStructure-titleRow">
            <div class="PageHeaderStructure-titleLeftElement">
              <div class="Avatar Avatar--small Avatar--color4 MyTasksPageHeader-ownAvatar MyTasksPageHeader-avatar">
              </div>
            </div>
            <div class="PageHeaderStructure-title MyTasksPageHeader-title">My Tasks</div>
            </div>
          </div>
          <div class="PageHeaderStructure-right">
          </div>
        </div>
    <div class="row asanaView-body" style="padding-top: 15px; margin: 10px 10px 10px 10px;">
      <div class="asanaView-paneGutter"></div>
    <div id="center_pane_container" class="known-list">
        <div id="center_pane">
          <left-toolbar></left-toolbar>
		      <main-left-section :pholder="taskPholder" :parentIdArr="parentIdArr" :filtered-todos="filteredTodos" :eventIndex="eventIndex" ></main-left-section>
        </div>
    </div>
    
    <div id="right_pane_container" class="known-list" v-for="n in parentIdArr">
      <div id="right_pane">
        <main-right-section :pholder="subtaskPholder" :id="n.id" :level="n.level" :parentTaskName="n.parentTaskName" :parentTaskDesc="n.parentTaskDesc" :parentTaskComment="n.parentTaskComment" :parentIdArr="parentIdArr" :filtered-todos="filteredTodos" :eventIndex="eventIndex" ></main-right-section>
      </div>
    </div>
    <div class="asanaView-paneGutter"></div>
    </div>
	</section> 
</template>
<script>
/* eslint-disable*/
import store from './store.js'
import MainLeftSection from './MainLeftSection.vue'
import MainRightSection from './MainRightSection.vue'
import LeftToolbar from './LeftToolbar.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  props: [],
  data: function () {
    return {
        sharedState: store.state,
        eventIndex: 0,
        taskPholder: 'Task',
        subtaskPholder: 'Subtask',
        parentIdArr : []
    }
  },
  computed: {
    filteredTodos: function () {
      return store.filter[this.sharedState.visibility](this.sharedState.todo1('', -1))
    }
  },
  components: {
    MainLeftSection,
    MainRightSection,
    LeftToolbar
  }
}
</script>
