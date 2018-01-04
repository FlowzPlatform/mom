<template>
	<!-- removed class row asanaView-body and added class main-container-class-->
	<div id="main-container" class="asanaView-body main-container-class pt-page-moveFromLeft">
		<!-- removed class center_pane_container -->
		<div id="split-container" class="main-split-container" style="height: calc(100vh - 60px);">
			<div id="left_container" class="scrollbar split split-horizontal">
				<div id="center_pane">
					<div v-if="$store.state.currentProjectId && $store.state.currentProjectId.length>0">
						<left-toolbar v-if="!isCopyLink" :filters="filters">
						</left-toolbar>
						<main-left-section id="todoTask" :isCopyLink="isCopyLink" :todoObject="todoObjectById" :pholder="taskPholder" :filtered-todos="taskById"></main-left-section>
					</div>
					<div class="outer" v-else>
						<div class="middle">
							<div class="inner">
								<div class="trashcan-empty gridPaneSearchEmptyView-noProjectItems" v-show="isProjectAvailable">
									<span class="fa fa-file-text-o fa-5x" data-target="#createProject" data-toggle="modal"/>
									<div class="text gridPaneSearchEmptyView-noProjectItemsTitleText">Add New Project
									</div>
									<div class="text gridPaneSearchEmptyView-noProjectItemsText" v-show="$store.state.projectlist.length==0">You have no project created.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div :id="'slot-' + index" class="right_pane_container split split-horizontal" v-for="(n, index) in parentIdList">
				<div id="right_pane">
					<component :is="currentView(n.show_type)" :id="index" :pholder="subtaskPholder" :todoObject="n" :a="n" :commentTaskId="n.task_id"
					 :commentParentId="n.id" :commentName="n.comment">
					</component>
				</div>
			</div>
		</div>
		<div class="asanaView-paneGutter"></div>
		<create-project-dialog></create-project-dialog>
	</div>
</template>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script>
	/* eslint-disable*/
	import CreateProjectDialog from './CreateProjectDialog.vue'
	import MainLeftSection from './MainLeftSection.vue'
	import MainRightSection from './MainRightSection.vue'
	import LeftToolbar from './LeftToolbar.vue'
	import SubComment from './SubComment.vue'
	import CmnFunc from './CommonFunc.js'
	import Vue from 'vue'
	import BootstrapVue from 'bootstrap-vue'
	Vue.use(BootstrapVue)
	import 'bootstrap/dist/css/bootstrap.css'
	import 'bootstrap-vue/dist/bootstrap-vue.css'
	import { mapGetters, mapActions } from 'vuex'
	import CircularNavBar from './CircularNavBar.vue'
	import iView from 'iview';
	import locale from 'iview/dist/locale/en-US';
	import Split from 'split.js'

	Vue.use(iView, { locale });
	Vue.use(require('vue-moment'))

	const filters = {
		all: todos => todos,
		active: todos => todos.filter(todo => !todo.completed),
		completed: todos => todos.filter(todo => todo.completed)
	}

	export default {
		data: function () {
			return {
				taskPholder: 'Task',
				subtaskPholder: 'Subtask',
				todolist: [],
				filters: filters,
				url_parentId: '',
				url_level: 0,
				isCopyLink: false,
				parentIdList: this.parentIdMethod(),
				instance: null,
				sizes: [],
				isSplitterDrag: false,
				parentIdNum: 0
			}
		},
		created() {

			localStorage.setItem('split-sizes', JSON.stringify([50, 50]));
			this.$store.dispatch('getSettings', this.$store.state.userObject._id);
			this.$store.dispatch('removeAllEventListners');
			this.$store.dispatch('eventListener');
			this.getAllUsers()
			var url = window.location.href;
			if (url.indexOf('task') > -1) {
				url = url.split('task/')
				var split_url = url[1].split('/')
				this.url_level = split_url[0] ? split_url[0] : ''
				this.url_parentId = split_url[1] ? split_url[1] : 0
				this.isCopyLink = true
				this.$store.dispatch('getTodoObject', this.url_parentId);
				this.$store.dispatch('getAttachmentFromDB', this.url_parentId)
				this.$store.dispatch('getAllTaskTags', this.url_parentId);
				this.$store.dispatch('getTaskComment', this.url_parentId)
			}
			this.$store.dispatch('removeParentIdArray') // flush showDiv object from the memory when page refresh
			this.$store.commit('DELETE_ALLTAGS')
			this.$store.dispatch('getTaskStaus')
			this.$store.dispatch('getTaskTypes')

			this.$store.state.todolist = []
			var projects = this.getProjectWiseTodo;
			var projectId = this.$store.state.currentProjectId
			if (!projectId && projects.length > 0) {
				projectId = projects[0].id
				this.$store.state.currentProjectId = projects[0].id
				this.$store.state.currentProjectName = projects[0].project_name
				this.$store.state.currentProjectMember = projects[0].members;
				this.$store.state.currentProjectPrivacy = projects[0].project_privacy
				this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '', project_id: projectId });

			} else {
				console.log("Can't set projectc id")
			}
			this.parentIdMethod();
		},
		watch: {
			todolist: function (todo) {
				//  console.log('test');
			},
			parentIdList: function () {
				let ids = ['#left_container'];
				let containerWidth = ($(window).width())
				let containerNewWidth = ($(window).width());

				if(this.parentIdList.length == 0){
					containerNewWidth = $(window).width()
					let widthPixel = containerNewWidth + 'px'
					$('.main-split-container').css('width', widthPixel)

					localStorage.setItem('split-sizes', JSON.stringify([50, 50]));
				}

				if (this.parentIdList) {
					
					//create new splitter section and increase total width accordingly when section added.
					for (let i = 0; i <= this.parentIdList.length - 1; ++i) {
						ids.push('#slot-' + i);
						if (this.parentIdList.length > 1) {
							containerWidth = ($(window).width() / 2) * (this.parentIdList.length);
							containerNewWidth = ($(window).width() / 2) * (this.parentIdList.length + 1);
							
						}else{
							containerNewWidth = $(window).width()
						}
						let widthPixel = containerNewWidth + 'px'
						$('.main-split-container').css('width', widthPixel)
					}

					if (ids.length > 0) {
						
						let sizeArray = []
						let me = this
						setTimeout(function () {
							if (this.instance) {

								//fetches value of splitter size array from local storage
								this.sizes = localStorage.getItem('split-sizes')
								this.sizes = JSON.parse(this.sizes)
								//following if condition is applicable when user closes sections
								if(me.parentIdNum > me.parentIdList.length && me.parentIdList.length > 0){
									this.sizes.length = me.parentIdList.length + 1
									let totalPercent = 0
									let totalWidth = 0
									let index = 0
									for (var size in this.sizes){
										
										let extendedWidth = containerNewWidth + ($(window).width() / 2)
										index++
										let sectionWidth = (extendedWidth * this.sizes[size]) / 100
										totalWidth += sectionWidth
					
										if(index === this.sizes.length){
											let extraWidth = containerNewWidth - totalWidth
											sectionWidth = extraWidth + sectionWidth
										}
										let sectionPercent = (sectionWidth * 100) / containerNewWidth
										sizeArray.push(sectionPercent)

									 	//sizeArray.push(100 / this.sizes.length)
									}
									localStorage.setItem('split-sizes', JSON.stringify(sizeArray));
								}else{
									let totalPercent = 0
									for (var size in this.sizes) {
										
										//When comment section is closed following if condition exectes
										if(this.sizes.length > 2 && ids.length === this.sizes.length){
											let sectionWidth = (containerNewWidth * this.sizes[size]) / 100
											let sectionPercent = (sectionWidth * 100) / containerNewWidth
											sizeArray.push(sectionPercent)
											totalPercent += sectionPercent
										}else{
											//conversion of percentage into pixel(width) of section
											let sectionWidth = (containerWidth * this.sizes[size]) / 100
											
											//conversion of width(pixel) into percentage
											let sectionPercent = (sectionWidth * 100) / containerNewWidth
											
											sizeArray.push(sectionPercent)
											totalPercent += sectionPercent
										}
										
									}
									totalPercent = 100 - totalPercent
									if (totalPercent > 0) {
										//added last index to array for splitting.
										sizeArray.push(totalPercent)
									}
									localStorage.setItem('split-sizes', JSON.stringify(sizeArray));
								}
								me.parentIdNum = me.parentIdList.length
								
								if (this.isSplitterDrag) {
									this.isSplitterDrag = false
								}
								this.instance.destroy()
								this.instance = null
							}
							//splitter logic goes here
							let self = this;
							this.instance = Split(ids, {sizes: sizeArray, minSize: 420,
								onDragEnd: function () {
									//save splitter size array in local storage.
									localStorage.setItem('split-sizes', JSON.stringify(self.instance.getSizes()));
									self.isSplitterDrag = true
									
									let arrSize = localStorage.getItem('split-sizes')
									arrSize = JSON.parse(arrSize)
									me.$store.commit('setSplitWidth',arrSize)
								},
								onDrag: function (){
									// console.log('on drag called')
								}
							});
						}, 5);
					}
				}
			}
		},
		computed: {
			...mapGetters({
				todoById: 'getTodoById',
				parentIdArray: 'parentIdArr',
				todoObjectById: 'getObjectById',
				isProjectAvailable: 'isProjectAvailable'
			}),
			getProjectWiseTodo() {
				return this.$store.state.projectlist;
			},
			taskById() {
				var insertPermssion = CmnFunc.isCreatePermission(15);
				let taskArray = this.todoById(this.url_parentId ? this.url_parentId : '', this.url_level)
				if (insertPermssion  && !this.$store.state.deleteItemsSelected) {
					taskArray.push({
						id: '-1',
						parentId: this.url_parentId,
						taskName: '',
						taskDesc: '',
						level: this.url_level,
						index: taskArray.length,
						completed: false,
						dueDate: '',
						createdAt: new Date().toJSON(),
						updatedAt: new Date().toJSON(),
						project_id: this.$store.state.currentProjectId
					})
				}
				this.todolist = taskArray
				this.userDetail(this.todolist)
				return filters[this.$store.state.visibility](taskArray)

			},
			todos: function () {
				return this.$store.getters.getTodoById('', 0)
			}
		},
		methods: {
			parentIdMethod: function () {
				let array = this.parentIdArray;
				this.parentIdList = array;
			},
			currentView(type) {
				return type === 'subcomment' ? SubComment : MainRightSection
			},
			userDetail(deletedTasks) {
				deletedTasks.forEach(function (c) {
					let userId
					if (c.deletedBy) {
						userId = c.deletedBy
					} else {
						userId = c.assigned_to
					}
					let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
					if (userIndex < 0) {
					} else {
						c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
							c.email = this.$store.state.arrAllUsers[userIndex].email
					}
				}, this)

			},
			getAllUsers() {
				var self = this
				this.$store.dispatch('getAllUsersList')
					.catch(function (error) {
						if (error.response.status === 401 || error.response.status === 403) {
							CmnFunc.deleteAutheticationDetail()
							self.$router.replace('/')
							return
						}

						$.notify.defaults({ className: "error" })
						$.notify(error.message, { globalPosition: "top center" })
					})
			}
		},
		components: {
			MainLeftSection,
			MainRightSection,
			LeftToolbar,
			CreateProjectDialog,
			SubComment,
			CircularNavBar,
		}
	}

</script>
<style>
/* animation sets */
.pt-page-moveFromLeft {
	-webkit-animation: moveFromLeft .6s ease both;
	animation: moveFromLeft .6s ease both;
}
.pt-page-moveFromRight {
	-webkit-animation: moveFromRight .6s ease both;
  animation: moveFromRight .6s ease both;
  overflow: hidden;
}
/********************************* keyframes **************************************/
@-webkit-keyframes moveFromLeft {
	from { -webkit-transform: translateX(-100%); }
}
@keyframes moveFromLeft {
	from { -webkit-transform: translateX(-100%); transform: translateX(-100%); }
}
@-webkit-keyframes moveFromRight {
	from { -webkit-transform: translateX(100%); }
}
@keyframes moveFromRight {
	from { -webkit-transform: translateX(100%); transform: translateX(100%); }
}
.scrollbar
{
  overflow-y: scroll;
  cursor: pointer;
}
.asanaView-body {
  overflow-x: scroll;
  cursor: pointer;
}
#left_container::-webkit-scrollbar-track, #main-container::-webkit-scrollbar-track
, #rightContainer::-webkit-scrollbar-track, #left_type_container::-webkit-scrollbar-track,
#left_task_container::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}
#left_container::-webkit-scrollbar
, #rightContainer::-webkit-scrollbar, #left_type_container::-webkit-scrollbar,
#left_task_container::-webkit-scrollbar
{
	width: 7px;
	background-color: #F5F5F5;
}
#main-container::-webkit-scrollbar{
  height: 7px;
  background-color: #F5F5F5;
}
#left_container::-webkit-scrollbar-thumb, #main-container::-webkit-scrollbar-thumb
, #rightContainer::-webkit-scrollbar-thumb, #left_type_container::-webkit-scrollbar-thumb,
#left_task_container::-webkit-scrollbar-thumb
{
	background-color: #acacac;
	border: 1px solid #acacac;
}
.rightscroll{
  width: 100%;
}
</style>