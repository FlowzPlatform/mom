<template>
	<!-- <section class="todoapp"> -->
		<!-- <div data-reactroot="" id="top-bar" class="circularMenu">
			<div class="PageHeaderStructure-left">
				<circular-nav-bar v-on:eventChangeMenu="changeMenu"></circular-nav-bar>
			</div>
		</div> -->
		<!-- removed class row asanaView-body and added class main-container-class-->
		<div id="main-container" class="asanaView-body main-container-class pt-page-moveFromLeft" >
			<div class="asanaView-paneGutter"></div>
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
									<div class="trashcan-empty gridPaneSearchEmptyView-noProjectItems">
										<span class="fa fa-file-text-o fa-5x" @click="openCreateDialogs" />
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
				<div :id="'slot-' + n.level" class="right_pane_container split split-horizontal" v-for="(n, index) in parentIdList">
					<div id="right_pane">
						<main-right-section v-show="!n.show_type" :id="n.level" :pholder="subtaskPholder" :todoObject="n" :a="n"></main-right-section>
						<SubComment v-show="n.show_type==='subcomment'" :commentTaskId="n.task_id" :commentParentId="n.id" :commentName="n.comment"></SubComment>
					</div>
				</div>
			</div>	
			<div class="asanaView-paneGutter"></div>
			<create-project-dialog :show="isNewProjectDialogShow" v-on:updateDialog='updateDialogShow'></create-project-dialog>
		</div>
		<!-- <div id="roleAccess" class="pt-page-moveFromRight" v-show="isRoleAccess">
			<role-access></role-access>
		</div>
		<div id="search" class="row asanaView-body pt-page-moveFromRight" v-show="isSearch">
			<search></search>
		</div> -->
	<!-- </section> -->
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
	import RoleAccess from './RoleAccess.vue'
	import 'bootstrap/dist/css/bootstrap.css'
	import 'bootstrap-vue/dist/bootstrap-vue.css'
	import { mapGetters, mapActions } from 'vuex'
	import CircularNavBar from './CircularNavBar.vue'
	import Search from './Search.vue'
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

	function getQueryString(field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	}
	export default {
		props: ['passData'],
		data: function () {
			return {
				eventIndex: 0,
				taskPholder: 'Task',
				subtaskPholder: 'Subtask',
				username: '',
				role: '',
				aboutme: '',
				dob: '',
				datepicker: null,
				picker10Max: new Date(),
				image: '',
				imageURlProfilePic: this.$store.state.userObject.image_url,
				loading: false,
				todolist: [],
				visibility: 'completed',
				filters: filters,
				url_parentId: '',
				url_level: 0,
				isCopyLink: false,
				isNewProjectDialogShow: false,
				isRoleAccess: false,
				isMyTask: true,
				isSearch: false,
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
			// ...mapActions([
			//         'getAllTodos'
			//     ])

			// get loaded URL to get querystring param
			//  var url = window.location.href;
			//  this.url_parentId = getQueryString('task', url)

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
			// this.getProjectWiseTodo;
			var projects = this.getProjectWiseTodo;
			var projectId = this.$store.state.currentProjectId
			console.log("projectId:--", projectId)
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


			// if(this.$store.state.deleteItemsSelected)
			// {
			//   this.$store.dispatch('getDeleteTask');
			// }else {
			//   this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '' });
			// }

			// this.$store.dispatch('getAllTodos', {'parentId': ''});
			// let self = this;
			// socket.on('feed-change', function(item){
			//          if(item.new_val){
			//            var result = $.grep(self.taskById, function(e){ return e.id == item.new_val.id; })
			//             if (result.length == 0) {
			//               if(item.new_val.parentId.length == 0){
			//             // self.taskById.push(item.new_val)
			//               self.taskById.splice(self.taskById.length - 1, 0, item.new_val);
			//               // self.$store.state.todolist.push(item.new_val)
			//               }else{
			//               }
			//             }else if(item.old_val){
			//               if(item.new_val.parentId.length == 0){
			//               let index = _.findIndex(self.taskById,function(d){return d.id == item.new_val.id})
			//               if(index > -1){
			//                 self.taskById[index].taskName = item.new_val.taskName
			//               }
			//             }else{
			//                // console.log("Sub Task Updated")
			//             }
			//             } 
			//          }else if(item.old_val){
			//            // var index = self.taskById.indexOf(item.old_val);
			//            if(item.old_val.parentId.length == 0){
			//            let index = _.findIndex(self.taskById,function(d){return d.id == item.old_val.id})
			//            if(index > -1){
			//             self.taskById.splice(index, 1);
			//            }
			//            }else{
			//            // console.log("Sub Task Deleted")
			//            }
			//            //self.taskById.splice(index, 1);
			//          }
			//        })
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
									let tempArr = [];
									let totalPercent = 0
									for (var size in this.sizes){
										// console.log('containerWidth:', containerWidth)
										// console.log('containerNewWidth:',containerNewWidth)
										// let sectionWidth = (containerNewWidth * this.sizes[size]) / 100
										// console.log('sectionWidth:', sectionWidth)
										// let sectionPercent = (sectionWidth * 100) / containerWidth
										// console.log('sectionPercent:', sectionPercent)

										// sizeArray.push(sectionPercent)
										// console.log('tempArr:', tempArr)
										// totalPercent += sectionPercent
										// console.log('totalPercent:', totalPercent)

										// if(size == this.sizes.length-1){
										// 	totalPercent = 100 - totalPercent
										// 	let valLastIndex = sizeArray[size]
										// 	valLastIndex += totalPercent
										// 	console.log('valueLast:', valLastIndex)
										// 	sizeArray[size] = valLastIndex
										// 	console.log('tempArr1:', tempArr)
										// }
										sizeArray.push(100 / this.sizes.length)
									}
									localStorage.setItem('split-sizes', JSON.stringify(sizeArray));
								}else{
									let totalPercent = 0
									for (var size in this.sizes) {
										//conversion of percentage into pixel(width) of section
										let sectionWidth = (containerWidth * this.sizes[size]) / 100

										//conversion of width(pixel) into percentage
										let sectionPercent = (sectionWidth * 100) / containerNewWidth

										sizeArray.push(sectionPercent)
										totalPercent += sectionPercent
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
							this.instance = Split(ids, {sizes: sizeArray, minSize: 225,
								onDragEnd: function () {
									//save splitter size array in local storage.
									localStorage.setItem('split-sizes', JSON.stringify(self.instance.getSizes()));
									self.isSplitterDrag = true
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
				// userSettings: 'user_setting',
				todoObjectById: 'getObjectById',
				// projectName:'getCurrentProjectName',

				// deletedTasks:'getDeletedTaskById'
			}),
			getProjectWiseTodo() {
				//   var projectList= this.projectListData;
				//   var projectId=this.$store.state.currentProjectId
				// if(!projectId && projectList.length>0){
				//     // projectId=this.$store.state.projectlist[0].id
				//     this.$store.state.currentProjectId=projectList[0].id
				//     this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '' ,project_id:projectId});
				// }else{
				//   console.log("cant set projectc id")
				// }

				return this.$store.state.projectlist;
			},
			taskById() {
				var insertPermssion = CmnFunc.isCreatePermission(15);
				let taskArray = this.todoById(this.url_parentId ? this.url_parentId : '', this.url_level)
				if (insertPermssion) {
					taskArray.push({
						id: '-1',
						parentId: this.url_parentId,
						taskName: '',
						taskDesc: '',
						level: this.url_level,
						//  level: 0,
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
			},
			uname: function () {
				var str = this.$store.state.userObject.email
				var n = str.indexOf("@")
				var res = str.substr(0, n)
				return res
			},
			capitalizeLetters: function () {
				var str = this.$store.state.userObject.email
				var firstLetters = str.substr(0, 2)
				return firstLetters.toUpperCase()
			}
		},
		methods: {
			parentIdMethod: function () {
				let array = this.parentIdArray;
				this.parentIdList = array;
			},
			changeMenu(isMainTask, isRoleAccess, isSearch) {
				this.isRoleAccess = isRoleAccess
				this.isMyTask = isMainTask
				this.isSearch = isSearch
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
			openCreateDialogs() {
				this.isNewProjectDialogShow = true;
			},
			updateDialogShow(isDialogVal) {
				this.isNewProjectDialogShow = isDialogVal
			},
			getAllUsers() {
				var self = this
				this.$store.dispatch('getAllUsersList')
					.catch(function (error) {
						if (error.response.status === 401) {
							CmnFunc.deleteAutheticationDetail()
							self.$router.replace('/')
							return
						}
						$.notify.defaults({ className: "error" })
						$.notify(error.message, { globalPosition: "top center" })
					})
			},

			// btnUpdateProfileClicked() {
			//   var bucket = new AWS.S3({params: {Bucket: 'obexpense'}});
			//   var fileChooser = document.getElementById('file');
			//   var file = fileChooser.files[0];
			//   if (file) {
			//     console.log('file type: ', file.type)
			//     console.log('body: ', file)
			//     var params = {Key: file.name, ContentType: file.type, Body: file};
			//     bucket.upload(params).on('httpUploadProgress', function(evt) {
			//     console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total)+'%');
			//     }).send(function(err, data) {
			//       alert("File uploaded successfully.");
			//       console.log('data: ', data)
			//       console.log('error: ', err)
			//     });
			// }
			// return false;

			// this.$store.state.userObject.username = this.username
			// this.$store.state.userObject.role = this.role
			// if (this.dob) {
			//   this.$store.state.userObject.dob = this.dob
			// }
			// this.$store.state.userObject.aboutme = this.aboutme
			// this.$store.commit('userData')
			// this.$http.post('/updateUserProfile', {
			//   email: this.$store.state.userObject.email,
			//   username: this.username,
			//   role: this.role,
			//   dob: this.dob,
			//   aboutme: this.aboutme,
			//   signup_type: this.$store.state.userObject.signup_type,
			//   image_url: this.imageURlProfilePic
			// }).then(response => response.json())
			// .then(json => {
			//   if (json.replaced) {
			//     $.notify.defaults({ className: "success" })
			//     $.notify("Profile updated successfully.", { globalPosition:"top center"})
			//   }
			//   var self = this
			//   this.$store.dispatch('updateUserProfile', {
			//     'fullname': this.username,
			//     'role': this.role,
			//     'dob': this.dob,
			//     'aboutme': this.aboutme,
			//     //'signup_type': this.$store.state.userObject.signup_type,
			//     'image_url': this.imageURlProfilePic
			//   })
			//     .then(function () {
			//       self.$store.state.userObject.fullname = self.username
			//       self.$store.state.userObject.role = self.role
			//       //if (this.dob) {
			//       self.$store.state.userObject.dob = self.dob
			//       //}
			//       self.$store.state.userObject.aboutme = self.aboutme
			//       self.$store.commit('userData')
			//     })
			//     .catch(function (error) {
			//       // $.notify.defaults({ className: "error" })
			//       // $.notify(error.message, { globalPosition:"top center"})
			//     });
			// },
			// btnProfileClicked() {
			//   console.log('UserName', this.$store.state.userObject.fullname)
			//   this.username = this.$store.state.userObject.fullname,
			//   console.log('UserName11', this.username)
			//     this.role = this.$store.state.userObject.role,
			//     this.aboutme = this.$store.state.userObject.aboutme,
			//     this.imageURlProfilePic = this.$store.state.userObject.image_url
			//   if (this.$store.state.userObject.dob) {
			//     this.datepicker = new Date(this.$store.state.userObject.dob)
			//   }
			//   this.enableUpdateProfileBtn()
			// },
			// picker9Formatter(date) {
			//   this.dob = Vue.moment(date).format('L');
			//   return this.dob
			// },
			// updateProfileImage() {
			//   this.loading = true
			//   let self = this
			//   var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
			//   var fileChooser = document.getElementById('file');
			//   var file = fileChooser.files[0];
			//   var imageKey = self.$store.state.userObject.image_name

			//   if (file) {
			//     var params = { Key: file.name, ContentType: file.type, Body: file };
			//     bucket.upload(params).on('httpUploadProgress', function (evt) {
			//       console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
			//     }).send(function (err, data) {
			//       console.log('file: ', file.name)
			//       self.imageURlProfilePic = data.Location
			//       self.$store.state.userObject.image_url = self.imageURlProfilePic
			//       self.$store.state.userObject.image_name = file.name
			//       self.$store.commit('userData')
			//       //Delete image from amazon
			//       console.log('data: ', data.Location)
			//       console.log('key: ', self.$store.state.userObject.image_name)
			//       var bucketInstance = new AWS.S3();
			//       var params = {
			//         Bucket: 'airflowbucket1/obexpense/expenses',
			//         Key: imageKey
			//       }
			//       bucketInstance.deleteObject(params, function (err, data) {
			//         if (data) {
			//           self.$http.post('/updateImageURL', {
			//             email: self.$store.state.userObject.email,
			//             signup_type: self.$store.state.userObject.signup_type,
			//             image_url: self.imageURlProfilePic,
			//             image_name: file.name
			//           }).then(response => {
			//             if (response.body.replaced) {
			//               self.loading = false
			//             }
			//           })
			//         }
			//         else {
			//           console.log("Check if you have sufficient permissions : ", err.stack);
			//         }
			//       });
			//     });
			//   }
			//   return false;
			// },
			// onFileChange() {
			//   this.loading = true;
			//   let self = this;
			//   var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
			//   var fileChooser = document.getElementById('file');
			//   var file = fileChooser.files[0];
			//   if (file) {
			//     var params = { Key: file.name, ContentType: file.type, Body: file };
			//     bucket.upload(params).on('httpUploadProgress', function (evt) {
			//       console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
			//     }).send(function (err, data) {
			//       // console.log("Amazon-data :: ", err);
			//       // self.$http.post('/updateImageURL', {
			//       // email: self.$store.state.userObject.email,
			//       // signup_type: self.$store.state.userObject.signup_type,
			//       // image_url: data.Location,
			//       // image_name: file.name
			//       // }).then(response => {
			//       //     if (response.body.replaced) {
			//       //         self.imageURlProfilePic = data.Location
			//       //         self.$store.state.userObject.image_url = self.imageURlProfilePic
			//       //         self.$store.state.userObject.image_name = file.name
			//       //         self.$store.commit('userData')
			//       //         self.loading = false
			//       //     }
			//       self.$store.dispatch('updateUserProfile', {
			//         image_url: data.Location,
			//         image_name: file.name
			//       })
			//         .then(function () {
			//           self.imageURlProfilePic = data.Location
			//           self.$store.state.userObject.image_url = self.imageURlProfilePic
			//           self.$store.state.userObject.image_name = file.name
			//           self.$store.commit('userData')
			//           self.loading = false
			//         })
			//         .catch(function (error) {
			//           // $.notify.defaults({ className: "error" })
			//           // $.notify(error.message, { globalPosition:"top center"})
			//         });
			//     });
			//   }
			//   return false;
			// },
			// createImage(file) {
			//   var image = new Image();
			//   var reader = new FileReader();
			//   reader.onload = (e) => {
			//     this.image = e.target.result;
			//   };
			//   reader.readAsDataURL(file);
			// },
			// removeImage: function (e) {
			//   this.loading = true
			//   this.imageURlProfilePic = null
			//   let self = this
			//   //Delete image from amazon
			//   var bucketInstance = new AWS.S3();
			//   var params = {
			//     Bucket: 'airflowbucket1/obexpense/expenses',
			//     Key: self.$store.state.userObject.image_name
			//   }
			//   bucketInstance.deleteObject(params, function (err, data) {
			//     if (data) {

			//       // self.$http.post('/updateImageURL', {
			//       //   email: self.$store.state.userObject.email,
			//       //   signup_type: self.$store.state.userObject.signup_type,
			//       //   image_url: self.imageURlProfilePic,
			//       //   image_name: ''
			//       //   }).then(response => {
			//       //       if (response.body.replaced) {
			//       //           self.$store.state.userObject.image_url = self.imageURlProfilePic
			//       //           self.$store.state.userObject.image_name = ''
			//       //           self.$store.commit('userData')
			//       //           self.loading = false
			//       //       }
			//       self.$store.dispatch('updateUserProfile', {
			//         image_url: self.imageURlProfilePic,
			//         image_name: ''
			//       })
			//         .then(function () {
			//           self.imageURlProfilePic = data.Location
			//           self.$store.state.userObject.image_url = self.imageURlProfilePic
			//           self.$store.state.userObject.image_name = ''
			//           self.$store.commit('userData')
			//           self.loading = false
			//         })
			//         .catch(function (error) {
			//           // $.notify.defaults({ className: "error" })
			//           // $.notify(error.message, { globalPosition:"top center"})
			//         });
			//     }
			//     else {
			//       console.log("Check if you have sufficient permissions : ", err.stack);
			//     }
			//   });
			// },
			// enableUpdateProfileBtn() {
			//   var trimmedusername = this.username.trim()
			//   if (trimmedusername.length >= 1) {
			//     $('#updateprofile_btn').removeClass('is-disabled')
			//     $("#updateprofile_btn").attr('disabled', false);
			//   } else {
			//     $('#updateprofile_btn').addClass('is-disabled')
			//     $("#updateprofile_btn").attr('disabled', true);
			//   }
			// }
			updateProjectName() {
				if (this.pName && this.pName.length > 0) {
					this.$store.dispatch('renameProjectName', this.pName)
				} else {
					$.notify.defaults({ className: "error" })
					$.notify("Project name can't blank.", { globalPosition: "top center" })
				}
			}
		},
		components: {
			MainLeftSection,
			MainRightSection,
			LeftToolbar,
			CreateProjectDialog,
			SubComment,
			RoleAccess,
			CircularNavBar,
			Search
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
  /* height: calc(100vh - 28vh); */
  /* overflow-y: scroll */
}
</style>