<template>
        <div class="todoapp">
            <div data-reactroot="" id="top-bar" class="circularMenu">
                <div class="PageHeaderStructure-left">
                    <circular-nav-bar v-on:eventChangeMenu="changeMenu"></circular-nav-bar>
                </div>
            </div>
            <!-- removed class row asanaView-body and added class main-container-class-->
            <component :is="currentView">
          </component>
        </div>
    </template>
    <script>
        import MainApp from './MainApp.vue'
        import RoleAccess from './RoleAccess.vue'
        import Search from './Search.vue'
        import CircularNavBar from './CircularNavBar.vue'
        export default{
            data:function () {
                return {
                    currentView: MainApp
                }
            },
            methods: {
                changeMenu(isMainTask, isRoleAccess, isSearch) {
                    if(isMainTask){
                        this.currentView = MainApp
                    }
                    if(isRoleAccess){
                        this.currentView = RoleAccess
                    }
                    if(isSearch){
                        this.currentView = Search
                    }
				// this.isRoleAccess = isRoleAccess
				// this.isMyTask = isMainTask
				// this.isSearch = isSearch
			    }
            },
            components: {
			MainApp,
			RoleAccess,
            Search,
            CircularNavBar
		}
	}
    </script>