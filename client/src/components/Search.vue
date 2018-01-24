<template>
    <div>
    <div id="main-container" class="main-container-class pt-page-moveFromLeft">
        <div id="split-container" class="main-split-container" style="height: calc(100vh - 60px);">
            <div id="left_search_container" class="scrollbar split split-horizontal">
                <div id="center_pane">
                    <div class="TopbarSearch dropdown row">
                        <i class="fa fa-search Icon MagnifyerIcon TopbarSearch-icon" />
                        <div class="TopbarSearchTypeahead">
                            <input type="text" autocomplete="off" data-toggle="dropdown" class="textInput textInput--medium TopbarSearchTypeahead-input TopbarSearch-input"
                                placeholder="Search" id="topbar-search-input" rows="1" value="">
                            <ul class="dropdown-menu">
                                <li>
                                    <a @click="showTaskCreatedBy">
                                        Tasks I've created
                                    </a>
                                </li>
                                <li>
                                    <a @click="recentlyCompletedTasks">
                                        Recently Completed Tasks
                                    </a>
                                </li>
                                <li>
                                    <a @click="taskToAssignOther">
                                        Tasks I've Assigned to Others
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="PageHeaderStructure-title ProjectPageHeader-projectName--colorNone ProjectPageHeader-projectName">{{$store.state.searchView}}</div>
                    </div>
                    <main-left-section id="searchTask" :filtered-todos="searchList"></main-left-section>
                </div>
            </div>
            <div :id="'search-' + index" class="right_pane_container split split-horizontal" v-for="(n, index) in splitIdList">
                <div id="right_pane">
                    <main-right-section id="searchTask" pholder="Subtask" :todoObject="n"></main-right-section>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    /* eslint-disable*/
    import Vue from 'vue'
    import MainLeftSection from './MainLeftSection.vue'
    import MainRightSection from './MainRightSection.vue'
    import { mapGetters } from 'vuex'
    import Split from 'split.js'
    export default {
        data: function () {
            return {
                splitIdList: this.splitIdSearchMethod(),
                instanceSearch: null
            }
        },
        mounted() {
            this.splitIdSearchMethod();
        },
        watch: {
            splitIdList: function () {
                let ids = ['#left_search_container'];
                if (this.splitIdList) {
                    for (let i = 0; i <= this.splitIdList.length - 1; ++i) {
                        ids.push('#search-' + i);
                    }

                    if (ids.length > 0) {
                        setTimeout(function () {
                            if (this.instanceSearch) {
                                this.instanceSearch.destroy()
                                this.instanceSearch = null
                            }
                            this.instanceSearch = Split(ids, { minSize: 225, gutterSize: 4 });
                        }, 20);
                    }
                }
            }
        },
        methods: {
            showTaskCreatedBy: function () {
                this.$store.state.searchView = "Tasks I've Created"
                this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
                this.$store.commit('showMyTasks')
                this.$store.dispatch('getTaskCreatedBy', { 'project_id': this.$store.state.currentProjectId, 'userID': this.$store.state.userObject._id })
            },
            recentlyCompletedTasks: function () {
                this.$store.state.searchView = "Recently Completed Tasks"
                this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
                this.$store.dispatch('getRecentlyCompletedTasks', { 'project_id': this.$store.state.currentProjectId, 'userID': this.$store.state.userObject._id })
            },
            taskToAssignOther: function () {
                this.$store.state.searchView = "Tasks I've Assigned to Others"
                this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
                this.$store.dispatch('getTaskToAssignOthers', { 'project_id': this.$store.state.currentProjectId, 'userID': this.$store.state.userObject._id })
            },
            splitIdSearchMethod: function () {
                let array = this.searchPId;
                this.splitIdList = array;
            },
            userDetail(tasks) {
				tasks.forEach(function (c) {
					let userId
					userId = c.assigned_to
					let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
					if (userIndex < 0) {
					} else {
						c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
						c.email = this.$store.state.arrAllUsers[userIndex].email
					}
				}, this)

			},
        },
        computed: {
            ...mapGetters({
                searchPId: 'parentIdArr'
            }),
            ...mapGetters([
                'getTaskLists',
                'getRecentlyCompletedLists',
                'getTaskAssignedToOthers'
            ]),
            searchList() {
                var list = []
                if (this.$store.state.searchView === "Tasks I've Created") {
                    list = this.getTaskLists
                } else if (this.$store.state.searchView === "Recently Completed Tasks") {
                    list = this.getRecentlyCompletedLists
                } else if (this.$store.state.searchView === "Tasks I've Assigned to Others") {
                    list = this.getTaskAssignedToOthers
                }
                this.userDetail(list)
                return list
            }
        },
        components: {
            MainLeftSection,
            MainRightSection
        }
    }
</script>
<style>
    .layer-container .search-layer.active {
        background: #3a4ba9;
    }

    .search-layer.activating {
        display: block;
    }

    .search-layer.active {
        visibility: visible;
        z-index: 1300;
    }

    .search-layer {
        display: none;
        position: fixed;
        left: 81px;
        top: 80px;
        background: 0 0;
        width: calc(100% - 81px);
        height: 100%;
        visibility: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        z-index: 11;
        -webkit-transition: background 500ms cubic-bezier(.35, 0, .25, 1)250ms;
        transition: background 500ms cubic-bezier(.35, 0, .25, 1)250ms;
    }

    .search-layer.active .search {
        -webkit-transition-delay: 250ms;
        transition-delay: 250ms;
        visibility: visible;
        opacity: 1;
    }

    .search-layer .search {
        width: 100%;
        padding: 65px 30px 30px 30px;
        opacity: 0;
        visibility: hidden;
        -webkit-transition: all 500ms cubic-bezier(.35, 0, .25, 1)0ms;
        transition: all 500ms cubic-bezier(.35, 0, .25, 1)0ms;
    }

    .form-group {
        position: relative;
        margin-bottom: 15px;
    }

    .search-layer .search .form-control {
        background: 0 0;
        border: none;
        box-shadow: none;
        height: 80px;
        font-size: 50px;
        color: #fff;
        padding: 6px 80px 6px 0;
    }

    .search-layer .search .btn {
        position: absolute;
        right: 0;
        top: 15px;
        background: 0 0;
        border: none;
        color: #fff;
        font-size: 40px;
        padding: 0 10px 0 25px;
    }
</style>