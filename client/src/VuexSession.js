import Vue from 'vue'
/* eslint-disable*/
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'
import * as services from './services'
import axios from 'axios'

Vue.use(Vuex)

function setProgressBar(state, todoObject) {
  var p_id = todoObject.parentId
  var totalSubtask = state.todolist.find(todo => todo.id === p_id).subtask_count ? state.todolist.find(todo => todo.id === p_id).subtask_count : 0
  var completedSubtask = state.todolist.find(todo => todo.id === p_id).completed_subtask_count ? state.todolist.find(todo => todo.id === p_id).completed_subtask_count : 0
  state.todolist.find(todo => todo.id === p_id).progress_count = completedSubtask + " / " + totalSubtask;
  if (totalSubtask > 0) {
    var percentage = (completedSubtask / totalSubtask) * 100
    state.todolist.find(todo => todo.id === p_id).progress = percentage
  }
  else {
    state.todolist.find(todo => todo.id === p_id).progress = 0
  }
}

function uploadFileOnAmazonS3(file, fileTimeStamp, cb) {
  var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
  if (file) {
    var params = { Key: fileTimeStamp, ContentType: file.type, Body: file };
    bucket.upload(params).on('httpUploadProgress', function (evt) {
      store.state.progress = parseInt((evt.loaded * 100) / evt.total)
      store.commit('progressVal')
    }).send(function (err, data) {
      cb(data.Location)
    });
  }
  return false;
}

function setCheckboxColor(state) {
  var todoLength = state.todolist
  for (var i = 0; i < todoLength.length; i++) {
    if (state.isDueDate) {
      var d = new Date()
      d.setDate(d.getDate() + 2)
      if (todoLength[i].dueDate) {
        if (moment(todoLength[i].dueDate).isBetween(new Date(), d)) {
          $('#' + todoLength[i].id).removeClass('DueDate--future').removeClass('DueDate--overdue').addClass('DueDate--soon')
        } else if (moment(todoLength[i].dueDate).isBefore(new Date())) {
          $('#' + todoLength[i].id).removeClass('DueDate--future').removeClass('DueDate--soon').addClass('DueDate--overdue')
        } else if (moment(todoLength[i].dueDate).isAfter(new Date())) {
          $('#' + todoLength[i].id).removeClass('DueDate--overdue').removeClass('DueDate--soon').addClass('DueDate--future')
        }
      } else {
        $('#' + todoLength[i].id).removeClass('DueDate--soon')
        $('#' + todoLength[i].id).removeClass('DueDate--overdue')
        $('#' + todoLength[i].id).removeClass('DueDate--future')
      }
    } else {
      $('#' + todoLength[i].id).removeClass('DueDate--soon')
      $('#' + todoLength[i].id).removeClass('DueDate--overdue')
      $('#' + todoLength[i].id).removeClass('DueDate--future')
    }
  }
}

function updateTaskCount(state, todoObject){
  if(todoObject.isDelete){
    if (todoObject.parentId) {
      let tempObj = state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count
      state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count = tempObj - 1
      if (todoObject.completed) {
        let completedObj = state.todolist.find(todo => todo.id === todoObject.parentId).completed_subtask_count
        state.todolist.find(todo => todo.id === todoObject.parentId).completed_subtask_count = completedObj - 1
      }
      setProgressBar(state, todoObject)
    }
  }else {
      let tempObj = state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count
      state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count = tempObj + 1
  }
}
function updateObject(oldObject, newObject) {
  var keys = Object.keys(oldObject)
  for (var i = 0; i < keys.length; i++) {
    if(newObject[keys[i]]){
       oldObject[keys[i]] = newObject[keys[i]];
    }
  }
}

export const store = new Vuex.Store({
  state: {
    userObject: {},
    isAuthorized: false,
    todolist: [],
    parentIdArr: [],
    // progress_count: '',
    visibility: 'active',
    arrAttachment: [],
    isLoading: false,
    settingsObject: [],
    taskComment: [],
    taskTags: [],
    tagsList: [],
    isProgress: false,
    isDueDate: false,
    todoObjectByID: {},
    userToken: '',
    isSliderOpen: false,
    currentTodoObj: {},
    currentModified: false,
    isDeleteObj: false,
    deleteItemsSelected: false,
    deletedTaskArr: [],
    arrAllUsers: [],
    projectlist:[],
    userRoles:[],
    currentProjectId:"",
    currentProjectName:"",
    currentProjectPrivacy: '',
    projectSettingId:0,
    currentProjectMember:'',
    createdByTaskList: [],
    recentlyCompletedTasks: [],
    searchView: '',
    assignedToOthers: [],
    task_types_list: [],
    task_status_list: []
  },
  mutations: {
    userData: state => state.userObject,
    authorize: state => state.isAuthorized,
    progressVal: state => state.progress,
    // showProgress: state => state.isProgress,
    // showLoader: state => state.isLoading,
    showAttachmentProgress(state, data) {
      let index = _.findIndex(state.todolist, function (d) { return d.id == data.id })
      state.todolist[index].attachmentprogress = data.isProgress
    },
    deleteAttachmentProgress(state, data) {
      let index = _.findIndex(state.todolist, function (d) { return d.id == data.id })
      state.todolist[index].deleteprogress = data.isProgress
    },
    GET_ROLES(state,data)
    {
      if(data)
      {
        for (var i = 0; i < data.length; i++) {
          let index = _.findIndex(state.userRoles, function (d) { return d.id == data[i].id })
          if (index <0) {
             state.userRoles.push(data[i])
          }
        }

      }
    },
    GET_TODO(state, data) {
      // state.todolist = data
      if (state.todolist.length > 0) {

        for (var i = 0; i < data.length; i++) {
          let index = _.findIndex(state.todolist, function (d) { return d.id == data[i].id })
          if (index > -1) {
            state.todolist.splice(index, 1, data[i]);
          } else {
            state.todolist.push(data[i])
          }
        }
      }
      else {
        state.todolist = data
      }
    },
    async SHOW_DIV(state, payload) {
      // START scroll to last opened right div 
      var children = document.getElementById('main-container').children;
      var totalWidth = 0;
      for (var i = 0; i < children.length; i++) {
          totalWidth += children[i].offsetWidth;
      }
      var leftPos = $('#main-container').scrollLeft();
      $("div#main-container").animate({
        scrollLeft: totalWidth
      }, 800)
      
      // END scroll to last opened right div 
      var parentTaskId = payload.id ? payload.id : '';
      if (parentTaskId != -1) {
        // window.history.pushState("", "Title", "http://localhost:3000/navbar/task/" + (payload.level + 1) + "/" + payload.id);
        await store.dispatch('getAllTodos', { 'parentId': payload.id,project_id:state.currentProjectId });
        await store.dispatch('getAttachmentFromDB', payload.id)
        await store.dispatch('getAllTaskTags', payload.id);
        await store.dispatch('getTaskComment', payload.id)

        var parentIdArrObj = payload
        var tempParentIds = _.chain([]).union(state.parentIdArr).sortBy([function (o) { return o.level; }]).value();
        if(state.deleteItemsSelected || state.createdByTaskList.length > 0 || state.recentlyCompletedTasks.length > 0 || state.assignedToOthers.length > 0){
            state.parentIdArr.splice(0, state.parentIdArr.length);
            state.parentIdArr.push(parentIdArrObj);
        } else {
          if (state.parentIdArr.length > 0) {
            state.parentIdArr.splice(0, state.parentIdArr.length);
            for (var i = 0; i < tempParentIds.length; i++) {
              if (tempParentIds[i].level < parentIdArrObj.level) {
                state.parentIdArr.push(tempParentIds[i]);
              }
            }
            state.parentIdArr.push(parentIdArrObj);
          }
          else {
            state.parentIdArr.push(parentIdArrObj);
          }
        }
      }
    },
    CLOSE_DIV(state, payload) {
      var parentTaskId = payload.id ? payload.id : '';
      if (parentTaskId != -1) {
        var parentIdArrObj = payload
        var tempParentIds = _.chain([]).union(state.parentIdArr).sortBy([function (o) { return o.level; }]).value();
        if (state.parentIdArr.length > 0) {
          state.parentIdArr.splice(0, state.parentIdArr.length);
          for (var i = 0; i < tempParentIds.length; i++) {
            if (tempParentIds[i].level < parentIdArrObj.level) {
              state.parentIdArr.push(tempParentIds[i]);
            }
          }
        }
      }
    },
    REMOVE_PARENT_ID_ARRAY(state) {
      state.parentIdArr.splice(0, state.parentIdArr.length)
      state.todolist.splice(0, state.todolist.length)
      state.arrAttachment.splice(0, state.arrAttachment.length)
      state.taskComment.splice(0, state.taskComment.length)
      state.taskTags.splice(0, state.taskTags.length)
      state.tagsList.splice(0, state.tagsList.length)
      state.createdByTaskList.splice(0, state.createdByTaskList.length)
      state.recentlyCompletedTasks.splice(0, state.recentlyCompletedTasks.length)
      state.assignedToOthers.splice(0, state.assignedToOthers.length)
      state.task_types_list.splice(0, state.task_types_list.length)
      state.task_status_list.splice(0, state.task_status_list.length)
      // state.userObject={}
           state.currentProjectId = ""
      state.currentProjectName = ""
      state.currentProjectPrivacy = ''
    },
    CLEAR_PROJECT_DEFAULT(state)
    {
      state.userObject = {}
        state.isAuthorized = false
      state.todolist = []
      state.parentIdArr = []
      // state.progress_count = ''
      state.visibility = 'active'
      state.arrAttachment = []
      state.isLoading = false
      state.settingsObject = []
      state.taskComment = []
      state.taskTags = []
      state.tagsList = []
      state.isProgress = false
      state.isDueDate = false
      state.todoObjectByID = {}
      state.userToken = ''
      state.isSliderOpen = false
      state.currentTodoObj = {}
      state.currentModified = false
      state.isDeleteObj = false
      state.deleteItemsSelected = false
      state.deletedTaskArr = []
      state.arrAllUsers = []
      state.projectlist = []
      state.userRoles = []
      state.currentProjectId = ""
      state.currentProjectName = ""
      state.currentProjectPrivacy = ''
    },
    changeFilters(state, key) {
      state.visibility = key
    },
    UPDATE_TODO(state, item) {
      let updateTodoIndex = _.findIndex(state.todolist, function (d) { return d.id == item.id })
      if (updateTodoIndex < 0) {
        if (state.todoObjectByID)
          updateObject(state.todoObjectByID, item)
        if(!item.isDelete){
          let deleteTodoIndex = _.findIndex(state.deletedTaskArr, function (d) { return d.id == item.id })
          state.todolist.push(item)
          state.deletedTaskArr.splice(deleteTodoIndex, 1)
          if(state.parentIdArr.length > 0) {
            state.parentIdArr.find(todo => todo.id === item.id).isDelete = item.isDelete
          }
          updateTaskCount(state, item)
        }
      } else {
        var isValueAvailable = state.todolist[updateTodoIndex].isDelete
        updateObject(state.todolist[updateTodoIndex], item)
        // show if any updates found for TODO
        if(item.updatedBy !== state.userObject._id){
          state.todolist[updateTodoIndex].isTaskUpdate = true
        }
        if(isValueAvailable !== item.isDelete){
          if(item.isDelete){
            state.deletedTaskArr.push(item)
            state.todolist.splice(updateTodoIndex, 1)
            state.parentIdArr.find(todo => todo.id === item.id).isDelete = item.isDelete  
          }else{
            let deleteTodoIndex = _.findIndex(state.deletedTaskArr, function (d) { return d.id == item.id })
            state.deletedTaskArr.splice(deleteTodoIndex, 1)
            state.parentIdArr.find(todo => todo.id === item.id).isDelete = item.isDelete
          }
          updateTaskCount(state, item)
        }
      }

      //For subtask total count and completed subtask count update
      var isObjectAvailable = state.todolist.find(todo => todo.id === item.parentId)
      if (isObjectAvailable) {
        if (item.parentId) {
          var p_id = item.parentId
          var totalCount = state.todolist.filter(function(todo){
            return todo.parentId === p_id && todo.completed
          }).length
          state.todolist.find(todo => todo.id === p_id).completed_subtask_count = totalCount          
          setProgressBar(state, item)
        }
      }
      setCheckboxColor(state)
    },
    ADD_NEW_TODOS(state, todoObject) {
      todoObject.subtask_count = 0
      todoObject.completed_subtask_count = 0
      todoObject.progress_count = ''
      todoObject.isDelete = false

      // Manage code for the real-time data from multi browser for the new todo created on same index
      if (state.isDeleteObj) {
        state.todolist.splice(state.todolist.length - 1)
        state.isDeleteObj = false
      }
      state.todolist.push(todoObject)

      // if (state.currentModified) {
      //   state.todolist.push(state.currentTodoObj)
      //   // state.currentTodoObj = {}
      //   state.isDeleteObj = true
      // }      
      var isObjectAvailable = state.todolist.find(todo => todo.id === todoObject.parentId)
      if (isObjectAvailable) {
        if (todoObject.parentId) {
          let tempObj = state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count
          state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count = tempObj + 1
          setProgressBar(state, todoObject)
        }
      }
    },
    deleteTodo(state, todoObject) {
      let removeTodoIndex = _.findIndex(state.deletedTaskArr, function (d) { return d.id == todoObject.id })
      state.deletedTaskArr.splice(removeTodoIndex, 1)
    },
    // TOGGLE_TODO(state, todoObject) {
    //   if (todoObject.todo.parentId) {
    //     var p_id = todoObject.todo.parentId
    //     var completedSubtaskCount = state.todolist.find(todo => todo.id === p_id).completed_subtask_count
    //     var subtask_count = state.todolist.find(todo => todo.id === p_id).subtask_count
    //     if (todoObject.todo.completed) {
    //       state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount + 1
    //     }
    //     else {
    //       state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount - 1
    //     }
    //     setProgressBar(state, todoObject)
    //   }
    // },
    SELECT_FILE(state, fileObject) {
      if (fileObject instanceof Array) {
        _.forEach(fileObject, function (object) {
          let index = _.findIndex(state.arrAttachment, function (d) { return d.id == object.id })
          if (index < 0) {
            state.arrAttachment.push(object)
          }
        });
      }
      else if (fileObject instanceof Object) {
        state.arrAttachment.push(fileObject)
      }
    },
    DELETE_ATTACHMENT(state, deleteAttachment) {
      let removeAttachementIndex = _.findIndex(state.arrAttachment, function (d) { return d.id == deleteAttachment.id })
      state.arrAttachment.splice(removeAttachementIndex, 1)
    },
    DELETE_ATTACHMENTS(state) {
      state.arrAttachment = []
    },
    DELETE_PROJECT_LIST(state) {
      state.projectlist = []
    },
    GET_SETTINGS(state, data) {
      state.settingsObject = data
      for (var i = 0; i < data.length; i++) {
        let index = _.findIndex(state.settingsObject, function (d) { return d.id == data[i].id })
        if (state.settingsObject[index].user_setting > 0) {
        if (state.settingsObject[index].type === "progress") {
          state.isProgress = state.settingsObject[index].user_setting[0].setting_value
        }
        if (state.settingsObject[index].type === "duedate") {
          state.isDueDate = state.settingsObject[index].user_setting[0].setting_value
        }
      }
      }
    },
    GET_TASK_COMMENT(state, data) {
        for (var i = 0; i < data.length; i++) {
          let index = _.findIndex(state.taskComment, function (d) { return d.id == data[i].id })
          if (index < 0) {
           state.taskComment.push(data[i])
          }
        }
    },
    ADD_COMMENT(state, data) {
      state.taskComment.push({
        id: data.id,
        task_id: data.task_id,
        commentBy: data.commentBy,
        comment: data.comment,
        createdAt: new Date().toJSON(),
        username:state.userObject.fullname,
        image_url:state.userObject.image_url
      })
    },
    DELETE_COMMENT(state, data){
      let removeTaskComments = _.findIndex(state.taskComment, function (d) { return d.id == data.id })
      state.taskComment.splice(removeTaskComments, 1)
    },
    updateTodo(state, todoObject) {
      // setCheckboxColor(state, todoObject)
    },
    SETTING_UPDATE(state, todoObject) {

      for   (var i = 0; i < state.settingsObject.length; i++) {
        let index = _.findIndex(state.settingsObject, function (d) { return d.id == todoObject.settings_id })
        if (state.settingsObject[index].id === todoObject.settings_id) {
          state.settingsObject[index].user_setting[0] = todoObject
        }
      }

      var checkedObject = state.settingsObject.find(setting => setting.id === todoObject.settings_id)
      if (checkedObject.type === "progress" && todoObject.setting_value) {
        state.isProgress = true
      } else if (checkedObject.type === "progress") {
        state.isProgress = false
      }

      if (checkedObject.type === "duedate" && todoObject.setting_value) {
        state.isDueDate = true
      } else if (checkedObject.type === "duedate") {
        state.isDueDate = false
      }

      setCheckboxColor(state)
    },
    INSERT_TAG(state, tagObject) {
      state.tagsList.push(tagObject); // this line added by hemant
    },
    DELETE_ALLTAGS(state) {
      state.taskTags = []
    },
    GET_TASK_TAGS(state, datas) {
      
      if (datas instanceof Array) {
        _.forEach(datas, function (data) {
          let index = _.findIndex(state.taskTags, function (d) { return d.id == data.id })
          if (index < 0) {
            state.taskTags.push(data)
          }
        });
      } else if (datas instanceof Object) {
        state.taskTags.push(datas)
      }
    },
    GET_TAGS_LIST(state, data) {
      state.tagsList = data
    },
    INSERT_TASKTAGS(state, taskTagObject) {
      // state.taskTags.push({ "id": taskTagObject.id, "name": taskTagObject.name, "task_id": taskTagObject.task_id })
      state.taskTags.push(taskTagObject)
    },
    REMOVE_TASKTAG(state, taskTagObject) {
      let removeTodoIndex = _.findIndex(state.taskTags, function (d) { return d.id == taskTagObject.tag_id })
      state.taskTags.splice(removeTodoIndex, 1)
    },
    GET_OBJECT_BYID(state, todoObject) {
      state.todoObjectByID = todoObject
    },
    SAVE_USERTOKEN(state, token) {
      state.userToken = token
    },
    GET_USERDETAIL(state, userdetail) {
      state.userObject = userdetail
    },
    DELETE_USERTOKEN(state) {
      state.userToken = ''
    },
    UPDATE_SLIDER_VALUE(state, sliderVal) {
      state.isSliderOpen = sliderVal
    },
    GET_ALL_USERS(state, objAllUsers) {
      _.forEach(objAllUsers, function (object) {
        let index = _.findIndex(state.arrAllUsers, function (d) { return d._id == object._id })
        if (index < 0) {
          state.arrAllUsers.push(object)
        }
      });
    },
    DELETE_ALLUSERSLIST(state) {
      state.arrAllUsers = []
    },
    updateProjectList(state,value){
      let updateProjectIndex = _.findIndex(state.projectlist, function (d) { return d.id == value.id })
      if (updateProjectIndex >= 0) {
           state.projectlist[updateProjectIndex].project_privacy = value.project_privacy;
      }
    },
    updateDragableProjectList(state,value){
        state.projectlist = value
    },
    async GET_PROJECT_LIST(state,data){
      state.projectlist=data;
      if(!state.currentProjectId && data.length>0){
       state.currentProjectId=data[0].id
       state.currentProjectName=data[0].project_name
         await store.dispatch('getAllTodos', { 'parentId': "",project_id:state.currentProjectId });
      }
    },
    async showDeleteTasks(state){
      state.deleteItemsSelected = true
      state.parentIdArr.splice(0, state.parentIdArr.length)
      // state.createdByTaskList.splice(0, state.createdByTaskList.length)
      await store.dispatch('getDeleteTask', state.currentProjectId )
    },
    showMyTasks(state){
      state.deleteItemsSelected = false
      state.parentIdArr.splice(0, state.parentIdArr.length)
    },
    DELETED_TASKS(state, deletedArray){
      state.deletedTaskArr = deletedArray
    },
    showTasksList(state, payload){
      state.createdByTaskList = payload
    },
    showRecentlyCompletedTasks(state, payload){
      state.recentlyCompletedTasks = payload
    },
    showTaskToAssignOthers(state, payload){
      state.assignedToOthers = payload
    },
    GET_TASK_TYPE(state, payload){
      state.task_types_list = payload
    },
    ADD_TASK_TYPE(state, payload){
    state.task_types_list.push(payload)
      console.log(state.task_types_list)
    },
    DELETE_TASK_TYPE(state, payload){
      let removeIndex = _.findIndex(state.task_types_list, function (d) { return d.id == payload.id })
      state.task_types_list.splice(removeIndex, 1)
    },
    GET_TASK_STATUS(state, payload){
      state.task_status_list = payload
    },
    ADD_TASK_STATUS(state, payload){
      state.task_status_list.push(payload)
    },
    DELETE_TASK_STATUS(state, payload){
      let removeIndex = _.findIndex(state.task_status_list, function (d) { return d.id == payload.id })
      state.task_status_list.splice(removeIndex, 1)
    }
  },
  actions: {
    getUsersRoles({commit})
    {
      services.roleService.find().then(response => {
        // console.log("Role list->>",response)
        commit('GET_ROLES', response)
      });
    },
    eventListener({ commit }) {
      // A new message has been created on the server, so dispatch a mutation to update our state/view
      services.tasksService.on('toggleTodoTask', message => {
        console.log("Message Toggle Todo Event:-->", message)
      })
      services.tasksService.on('created', message => {
        console.log("Message Cretaed:-->", message)
        commit('ADD_NEW_TODOS', message)
      })
      services.tasksService.on('removed', message => {
        console.log("Message Removed:-->", message)
        commit('deleteTodo', message)
      })

      services.tasksService.on('patched', message => {
        console.log("Message Update:-->", message)
        commit('UPDATE_TODO', message)
      })

      services.taskAttachmentService.on('created', message => {
        console.log("Message Attachement Cretaed:-->", message)
        commit('SELECT_FILE', message)
      })

      services.taskAttachmentService.on('removed', message => {
        console.log("Message Attachement removed:-->", message)
        commit('DELETE_ATTACHMENT', message)
      })

      services.tagsService.on('created', message => {
        console.log("Message Tag Cretaed:-->", message)
        commit('INSERT_TAG', message)
      })

      services.taskTagsService.on('created', message => {
        console.log("Message Task Tag Cretaed:-->", message)
        var object = message
        commit('INSERT_TASKTAGS', message)
      })
      services.taskTagsService.on('patched', message => {
        console.log("Message Task Tag updated:-->", message)
        commit('REMOVE_TASKTAG', message)
      })
      services.taskHistoryLogs.on('created', message => {
        console.log("Message history Logs Cretaed:-->", message)
        commit('ADD_COMMENT', message)
      }),
      services.taskHistoryLogs.on('removed', message => {
        console.log("Message History log Removed:-->", message)
        commit('DELETE_COMMENT', message)
      })
      services.projectService.on('patched', message => {
         console.log("Project updated:-->", message)
          commit('updateProjectList', message)
      })
      services.taskTypesService.on('created', message => {
        console.log("Task Type Services:---", message)
        commit('ADD_TASK_TYPE', message)
      })
      services.taskTypesService.on('removed', message => {
        console.log("Delete Task Type Service:--", message)
        commit('DELETE_TASK_TYPE', message)
      }),
      services.taskStatusService.on('created', message => {
        console.log("Delete Task Staus Service:--", message)
        commit('ADD_TASK_STATUS', message)
      })
      services.taskStatusService.on('removed', message => {
        console.log("Delete Task Status Service:--", message)
        commit('DELETE_TASK_STATUS', message)
      })
    },
    getAllTodos({ commit }, payload) {
      services.tasksService.find({
        query: {
          $or: [
            { parentId: payload.parentId, project_id: payload.project_id, created_by: store.state.userObject._id },
            { parentId: payload.parentId, project_id: payload.project_id, assigned_to: store.state.userObject._id }
          ]
        }
      }).then(response => {
        commit('GET_TODO', response)
      });
      // Vue.http.post('/tasks_parentId', { parentId: payload.parentId }).then(function (response) {
      //   commit('GET_TODO', response.data)
      // });
    },
    removeParentIdArray({ commit }) {
      commit('REMOVE_PARENT_ID_ARRAY')
    },
    insertTodo({ commit }, insertElement) {
      let dbId = insertElement.id
      if (!(insertElement.taskName && insertElement.taskName.trim()))
        return
      if (dbId != -1) {
        services.tasksService.patch(dbId, { taskName: insertElement.taskName, taskDesc: '', updatedBy: store.state.userObject._id }, { query: { 'id': dbId } }).then(response => {
          console.log("Response patch::", response);
        });
        // Vue.http.post('/updatetasks', {
        //   id: dbId,
        //   taskName: insertElement.taskName,
        //   taskDesc: '',
        // }).then(response => {
        //   commit('UPDATE_TODO', insertElement)
        //   // console.log('task update', response.data)
        // })
      } else {
        services.tasksService.create({
          parentId: insertElement.parentId,
          taskName: insertElement.taskName,
          taskDesc: '',
          level: insertElement.level,
          completed: false,
          index: insertElement.index,
          dueDate: '',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
          created_by: store.state.userObject._id,
          assigned_by: store.state.userObject._id,
          assigned_to: store.state.userObject._id,
          isDelete: false,
          project_id:insertElement.project_id
        }).then(response => {
          console.log("Response create::---->", response);
          //  commit('addTodo', {"data":response, "todo": insertElement})
        });
        // Vue.http.post('/tasks', {
        //   parentId: insertElement.parentId,
        //   taskName: insertElement.taskName,
        //   taskDesc: '',
        //   level: insertElement.level,
        //   completed: false,
        //   index: insertElement.index,
        //   dueDate: '',
        //   createdAt: new Date().toJSON(),
        //   updatedAt: new Date().toJSON()
        // })
        //   .then(function (response) {
        //     commit('addTodo', { "data": response.data, "todo": insertElement })
        //     // console.log("Response:", response)
        //   })
      }
    },
    editTaskName({ commit }, editObject) {
      if (editObject.todo.id) {
        services.tasksService.patch(editObject.todo.id, {
          taskName: editObject.todo.taskName,
          taskDesc: editObject.todo.taskDesc,
          dueDate: editObject.selectedDate,
          estimatedTime: editObject.estimatedTime,
          priority: editObject.taskPriority,
          assigned_by: editObject.assigned_by,
          assigned_to: editObject.assigned_to,
          updatedBy: store.state.userObject._id
        }, { query: { 'id': editObject.todo.id } }).then(response => {
          console.log("Response editTaskName::", response);
           if(editObject.isAssigned){
            editObject.callback()
          }
          //  commit('UPDATE_TODO', insertElement)
        });
        // Vue.http.post('/updatetasks', {
        //   id: editObject.todo.id,
        //   taskName: editObject.todo.taskName,
        //   taskDesc: editObject.todo.taskDesc,
        //   dueDate: editObject.selectedDate ? editObject.selectedDate.toJSON() : '',
        //   estimatedTime: editObject.estimatedTime,
        //   priority: editObject.taskPriority
        // }).then(response => {
        //   // console.log('task updated', response.data)
        //   commit('updateTodo', editObject)
        // })
      }
    },
    delete_Todo({ commit }, deleteElement) {
      console.log(deleteElement)
      let dbId = deleteElement.id
      if (dbId) {
        services.tasksService.patch(dbId, { isDelete: true, deletedBy: store.state.userObject._id }).then(response => {
          console.log("Response deleteTodo Flag Update:", response)
        })
        // Vue.http.delete('/deteletask/' + dbId, {
        // }).then(response => {
        //   commit('deleteTodo', { "data": response.data, "todo": deleteElement })
        //   console.log('task deleted', response.data)
        // if(this.filteredTodos.length-1 > 0)
        // {
        //   console.log('ID-Level:', this.filteredTodos[0].parentId, "===", this.filteredTodos[0].level);
        //   var todoList = store.state.todo1(this.filteredTodos[0].parentId, (this.filteredTodos[0].level-1)); 
        //   console.log('todoList:', todoList);
        //   for(var i=0; i < todoList.length-1 ; i++)
        //   {
        //     if(todoList[i].id)
        //       {
        //         this.$http.post('/updatetasks', {
        //         id: todoList[i].id,
        //         index: i
        //         }).then(response => {
        //           console.log('index updated after remove task', response.data)
        //       })
        //       }
        //   }
        // }
        // })
      }
    },
    dragTodo({ commit }, dragTodo) {
      for (var i = 0; i < dragTodo.length - 1; i++) {
        if (dragTodo[i].id) {
          services.tasksService.patch(dragTodo[i].id, {
            id: dragTodo[i].id,
            index: i
          }, { query: { 'id': dragTodo[i].id } }).then(response => {
          });

        }
      }
    },
    toggleTodo({ commit }, changeTodo) {
      let dbId = changeTodo.id
      if (dbId) {
        services.tasksService.patch(dbId,{
          id: dbId,
          completed: changeTodo.completed,
          updatedBy: store.state.userObject._id,
        }, { query: { 'id': dbId } }).then(response => {
          console.log("Response toggleTodo::", response);
        });
        // Vue.http.post('/updatetasks', {
        //   id: dbId,
        //   completed: changeTodo.todo.completed
        // }).then(response => {
        //   commit('toggleTodo', changeTodo)
        //   // console.log('task updated', response.data)
        // })
      }
    },
    selectFile({ commit }, fileObject) {
      var file = fileObject.file.files[0];
      var fileTimeStamp = + new Date() + '_' + file.name
      var attachArr = {
        id: new Date().valueOf(),
        file_name: file.name,
        task_id: fileObject.taskId,
        level: fileObject.level,
        file_name_timestamp: fileTimeStamp
      }

      store.state.arrAttachment.push(attachArr);
      // commit('SELECT_FILE', attachArr)

      //store.state.isProgress = true
      store.commit('showAttachmentProgress', { 'isProgress': true, 'id': fileObject.taskId })
      uploadFileOnAmazonS3(file, fileTimeStamp, function (src) {
        // store.state.isProgress = false
        store.commit('showAttachmentProgress', { 'isProgress': false, 'id': fileObject.taskId })
        // store.commit('showProgress')
        store.state.progress = 0
        store.commit('progressVal')

        //Insert Attachment detail in DB
        services.taskAttachmentService.create({
          task_id: fileObject.taskId,
          file_name: file.name,
          file_url: src,
          uploadedBy: store.state.userObject.id,
          level: fileObject.level,
          file_name_timestamp: fileTimeStamp
        }).then(response => {
          store.state.arrAttachment.splice(store.state.arrAttachment.indexOf(attachArr), 1)
          var tempArr = {
            id: response.id,
            task_id: fileObject.taskId,
            file_name: file.name,
            file_url: src,
            uploadedBy: store.state.userObject.id,
            level: fileObject.level,
            file_name_timestamp: fileTimeStamp
          }
          // state.arrAttachment.filter(attachement => attachement.id === attachArr.id)

          // commit('SELECT_FILE', tempArr)
          fileObject.cb()
        });

        //   Vue.http.post('/addAttachment', {
        //     task_id: fileObject.taskId,
        //     file_name: file.name,
        //     file_url: src,
        //     uploadedBy: store.state.userObject.id,
        //     level: fileObject.level,
        //     isDeleted: false
        //   }).then(response => {
        //     var tempArr = {
        //       id: response.data.generated_keys[0],
        //       task_id: fileObject.taskId,
        //       file_name: file.name,
        //       file_url: src,
        //       uploadedBy: store.state.userObject.id,
        //       level: fileObject.level,
        //       isDeleted: false
        //     }
        //     commit('SELECT_FILE', tempArr)
        //     fileObject.cb()
        //   })
      })
    },
    deleteAttachmentFromDB({ commit }, deleteObject) {
      //store.state.isLoading = true
      store.commit('deleteAttachmentProgress', { 'id': deleteObject.task_id, 'isProgress': true })
      //Delete image from amazon
      var bucketInstance = new AWS.S3();
      var params = {
        Bucket: 'airflowbucket1/obexpense/expenses',
        Key: deleteObject.file_name_timestamp
      }
      bucketInstance.deleteObject(params, function (err, data) {
        if (data) {
          //Update attachment fields in DB
          services.taskAttachmentService.remove(deleteObject.id, {
            // isDeleted: true,
            // file_url: '',
            // deletedBy: store.state.userObject.id
          }, { query: { 'id': deleteObject.id } }).then(response => {
            console.log("Response deleteAttachment::", response);
            // commit('DELETE_ATTACHMENT', deleteObject.objAttachment)
            // store.state.isLoading = false
            store.commit('deleteAttachmentProgress', { 'id': deleteObject.task_id, 'isProgress': false })
          });
          // Vue.http.post('/deleteAttachment', {
          //   id: deleteObject.objAttachment.id,
          //   isDeleted: true,
          //   file_url: '',
          //   deletedBy: store.state.userObject.id
          // }).then(response => {
          //   commit('DELETE_ATTACHMENT', deleteObject.objAttachment)
          //   store.state.isLoading = false
          //   store.commit('showLoader')
          // })
        }
        else {
          console.log("Check if you have sufficient permissions : ", err.stack);
        }
      });
    },
    removeAccessPermision({ commit }, data) {
      services.roleAccessService.remove(data.id, {
        query: {
          pId: data.pId,
          rId: data.rId
        }
      }).then(response => {
        console.log("Response remove permission::", response);
        // if(response.data.length > 0){
        // commit('SELECT_FILE', response.data) 
        // }
      });
    },
    addAccessPermision({ commit }, data) {
      services.roleAccessService.create({
        pId: data.pId,
        rId: data.rId
      }).then(response => {
        console.log("Response remove permission::", response);
        // if(response.data.length > 0){
        // commit('SELECT_FILE', response.data) 
        // }
      });
    },
    getAttachmentFromDB({ commit }, taskId) {
      services.taskAttachmentService.find({
        query: {
          task_id: taskId,
        }
      }).then(response => {
        console.log("Response getAttachmentFromDB::", response.data);
        if (response.data.length > 0) {
          commit('SELECT_FILE', response.data)
        }
      });
      // Vue.http.post('/getAttachments', {
      //   task_id: taskId,
      //   isDeleted: false
      // }).then(response => {
      //   if (response.data.length > 0) {
      //     commit('SELECT_FILE', response.data)
      //   }
      // })
    },
    getSettings({ commit }, payload) {
      // Vue.http.post('/getSttings', {
      //   user_id: payload
      // }).then(response => {
      //   commit('GET_SETTINGS', response.data)
      //   console.log("Get Settings", response.data)
      // })
      services.settingService.find({
        query: {
          'user_id': payload
        }
      }).then(response => {
        console.log("Response getSettings From DB::", response);
        commit('GET_SETTINGS', response)
      });
    },
    toggleSetting({ commit }, setting) {
      // console.log("setting", setting)
      // Vue.http.post('/updateUserSetting', {
      //   settings_id: setting.arr.id,
      //   setting_value: setting.event,
      //   user_id: setting.uId
      // }).then(response => {
      //   console.log('setting update', response.data)
      //   commit('SETTING_UPDATE', setting)
      // })
      if (setting.arr.user_setting[0]) {
        services.settingService.patch(setting.arr.user_setting[0].id,
          { setting_value: setting.event }, {
            query: { 'settings_id': setting.arr.id, 'user_id': setting.uId }
          }).then(response => {
            console.log("Response SETTING_UPDATE From DB::", response);
            commit('SETTING_UPDATE', response)
          });
      } else {
        services.settingService.create({
          settings_id: setting.arr.id,
          user_id: setting.uId,
          setting_value: setting.event
        }).then(response => {
          console.log("Response SETTING_INSERT From DB::", response);
          commit('SETTING_UPDATE', response)
        });
      }
    },
    getTaskComment({ commit }, payload) {
      services.taskHistoryLogs.find({ query: { task_id: payload } }).then(response => {
        console.log("Response getCommnets From DB::", response);
        commit('GET_TASK_COMMENT', response)
      });
      // Vue.http.get('/getComment').then(function (response) {
      //   commit('GET_TASK_COMMENT', response.data)
      // });
    },
    insertTaskComment({ commit }, payload) {
      if (!(payload.comment && payload.comment.trim()))
        return
      services.taskHistoryLogs.create({
        task_id: payload.id,
        commentBy: payload.commentBy,
        comment: payload.comment.trim(),
        createdAt: new Date().toJSON()
      }).then(function (response) {
        console.log("Reesponse create Commnets From DB::", response);
      })
    },
     insertProjectInvite({ commit }, inviteDetail) {
      services.projectMemberService.create(inviteDetail).then(function (response) {
        console.log("Reesponse create Invite Member  From DB::", response);
        // commit('ADD_COMMENT', response)
      })
    },
    getAllTaskTags({ commit }, taskId) {
      services.taskTagsService.find({ query: { task_id: taskId, is_deleted: false } }).then(response => {
        console.log("Response TaskTag::", response);
        commit('GET_TASK_TAGS', response)
      });
      // Vue.http.post('/getTaskTags', {
      //     task_id:taskId
      // }).then(function(response) {
      //     commit('GET_TASK_TAGS', response.data)
      //   })
    },
    getTagsList({ commit }) {
      services.tagsService.find().then(response => {
        console.log("Response Tag Find::", response);
        commit('GET_TAGS_LIST', response)
      });
      // Vue.http.get('/getTags').then(function(response) {
      //       commit('GET_TAGS_LIST', response.data)
      //   });
    },
    insertTagsInDB({ commit }, tagObject) {
      services.tagsService.create({
        name: tagObject.tagName,
        created_by_user_id: store.state.userObject.id
      }).then(response => {
        console.log("Response Tag Cerate::", response);
        services.taskTagsService.create({
          tag_id: response.id,
          task_id: tagObject.taskId,
          created_by_user_id: store.state.userObject.id,
          is_deleted: false,
          name: tagObject.name
        }).then(response => {
          console.log("Reesponse Tag_Tsak create::", response);
        });
      });
      // Vue.http.post('/insert_tag', {
      //     name: tagObject.tagName,
      //     task_id: tagObject.taskId,
      //     created_by_user_id: store.state.userObject.id
      // }).then(response => {
      //     console.log("response:", response);
      //     var id;
      //     if (response.ok) {
      //         id = response.body.tag_id;
      //         console.log("response", id);
      //         var tagArr = {
      //           "id": id,
      //           "name": tagObject.tagName,
      //           "task_id": tagObject.taskId
      //         }
      //         // Add tag into tags array
      //         commit('INSERT_TAG', tagArr)
      //     }
      // })
    },
    insertIntoTaskTags({ commit }, taskTagObject) {
      services.taskTagsService.create({
        tag_id: taskTagObject.tag.id,
        task_id: taskTagObject.taskId,
        is_deleted: false,
        created_by_user_id: store.state.userObject.id
      }).then(response => {
        console.log("Response Tag Find::", response);
      });
      // Vue.http.post('/insert_taskTag', {
      //     tag_id: taskTagObject.tag.id,
      //     task_id: taskTagObject.taskId,
      //     created_by_user_id: store.state.userObject.id
      // }).then(response => {
      //     console.log("response:", response);
      //     var id;
      //     if (response.ok) {
      //         // Add tag into tags array
      //         commit('INSERT_TASKTAGS', taskTagObject)
      //     }
      // })
    },
    removeTaskTagsFromDB({ commit }, taskTagObject) {
      services.taskTagsService.patch(null, {
        is_deleted: true, deleted_by_user_id: store.state.userObject.id
      }, { query: { "task_id": taskTagObject.task_id, "tag_id": taskTagObject.tag_id } }).then(response => {
        console.log("Response update task tags:", response);
        //  commit('UPDATE_TODO', insertElement)
      });
    },
     changeProjectPrivacy({ commit }, privacy_id) {
      services.projectService.patch(null, {
        project_privacy : privacy_id 
      }, { query: { "id": store.state.currentProjectId} }).then(response => {
        console.log("Response update Project privacy:", response);
      });
    },
    getTodoObject({ commit }, todoObjectId) {
      services.tasksService.get(todoObjectId).then(function (response) {
        console.log("get Id response", response)
        commit('GET_OBJECT_BYID', response)
      })
    },
    userRegistrationProcess({ commit }, regObject) {
      return axios.post(process.env.USER_AUTH+'/api/setup', {
        email: regObject.email,
        password: regObject.password,
        username: regObject.email,
        fullname: '',
        role: '',
        aboutme: '',
        dob: '',
        signup_type: regObject.signup_type,
        image_url: regObject.image_url,
        image_name: '',
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON()
      }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then(function (response) {
          console.log('resp: ', response);
        })
        .catch(function (error) {
          if (error.response.status === 409) {
            throw new Error('Email id already exists...')
          }
        });
    },
    userLoginProcess({ commit }, loginObj) {
      return axios.post(process.env.USER_AUTH+'/api/login', {
        email: loginObj.email,
        password: loginObj.password
      }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then(function (response) {
          commit('SAVE_USERTOKEN', response.data.logintoken)
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            throw new Error('You have entered wrong credentials...')
          }
        });
    },
    getUserDetail({ commit }) {
      console.log('token: ', store.state.userToken)
        console.log('env-USER_AUTH', process.env.USER_AUTH+'/api/userdetails')
        return axios.get(process.env.USER_AUTH+'/api/userdetails', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': store.state.userToken
          },
        })
        .then(function (response) {
          commit('GET_USERDETAIL', response.data.data)
        })
        .catch(function (error) {
          throw error
        })
    },
    updateUserProfile({ commit }, objProfile) {
      var url = (process.env.USER_DETAIL+'/updateuserdetails/' + store.state.userObject._id)
      console.log('profile', objProfile)
      return axios.put(url, {
        fullname: objProfile.fullname,
        role: objProfile.role,
        aboutme: objProfile.aboutme,
        dob: objProfile.dob,
        image_url: objProfile.image_url,
        image_name: objProfile.image_name,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON()
      }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': store.state.userToken
          }
        })
        .then(function (response) {

        })
        .catch(function (error) {
          throw error 
        })
    },
    async getAllUsersList({ commit }) {
      try{
        // console.log('Token', store.state.userToken)
      let {data}  = await axios.get(process.env.USER_DETAIL+'/alluserdetails',{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization': store.state.userToken
        }
      })
      commit('GET_ALL_USERS', data.data)
      return data.data 
      }catch(error){
        throw error
      }
        // .then(function (response) {
        //   console.log('resp: ', response)
        //   return response
        // })
        // .catch(function (error) {
        //   console.log('error: ', error)
        //   if (error.response.status === 403) {
        //     throw new Error('Token is invalid')
        //   }
        // })
    },
    getAllProjects({ commit }, userId) {
        services.projectService.find({
          query: {
            $or: [
              { project_privacy: '0' },
              { project_privacy: '1' },
              { project_privacy: '2', create_by: userId }
            ]
          }
        }).then(response => {
          console.log("Response from Project", response)
          commit('GET_PROJECT_LIST', response)
        });
        // Vue.http.post('/tasks_parentId', { parentId: payload.parentId }).then(function (response) {
        //   commit('GET_TODO', response.data)
        // });
      },
      insertProject({commit},object){
       var self=this;
         services.projectService.create(object.data).then(response => {
          console.log("Response Project create::", response);
          object.callback(response);
          //  commit('addTodo', {"data":response, "todo": insertElement})
        });
    },
    getDeleteTask({ commit }, payload){
      // services.tasksService.find({ query: { isDelete: true } }).then(response => {
      //   commit('DELETED_TASKS', response)
      // });
      services.tasksService.find({
        query: {
          $or: [
            { isDelete: true, project_id: payload, created_by: store.state.userObject._id },
            { isDelete: true, project_id: payload, assigned_to: store.state.userObject._id }
          ]
        }
      }).then(response => {
        commit('DELETED_TASKS', response)
      });
    },
      undelete({commit}, undeleteElement){
      let dbId = undeleteElement.id
      if (dbId) {
        services.tasksService.patch(dbId, {isDelete: false }).then(response => {
          console.log("Response unDeteleTodo Flag Update:", response)
        })
      }
    },
    deletePermently({commit}, deletePermentlyEle){
      let dbId = deletePermentlyEle.id
      services.tasksService.remove(dbId, { query: { 'id': dbId } }).then(response => {
          console.log("Reesponse deleteTodo::", response);
      });
    },
    delete_Comment({commit}, deleteCommentObj){
      let commentId = deleteCommentObj.id
      services.taskHistoryLogs.remove(commentId, {query: { 'id' : commentId}}).then(response => {
        console.log("Response To Delete Comment:--", response)
      })
    },
    getTaskCreatedBy({commit}, payload){
      services.tasksService.find({
        query: {
          $or: [
            {  created_by: payload.userID, isDelete: false, project_id: payload.project_id }
          ]}
        }).then(response => {
          console.log("Response To Find Created by User Tasks List:--", response)
          commit('showTasksList', response)
        });
    },
    getRecentlyCompletedTasks({commit}, payload){
      services.tasksService.find({ query: {project_id: payload.project_id, created_by: payload.userID, completed:true } }).then(response => {
        console.log("Response To Find Created by Recently Completed Tasks List:--", response)
        commit('showRecentlyCompletedTasks', response)
      });
    },
    getTaskToAssignOthers({commit}, payload){
      services.tasksService.find({ query: { project_id: payload.project_id, assigned_by: payload.userID, isDelete: false}
      }).then(response => {
        console.log("Response To Tasks I've assigned To Others:--", response)
        commit('showTaskToAssignOthers', response)
      })
    },
    insertNewRole({commit}, payload){
      services.roleServicePermission.create({
        name:payload.name,
        index:payload.index
      }).then(response => {
        console.log("Response To Add New Role:--", response)
      })
    },
    removeNewRole({commit}, payload){
      services.roleServicePermission.remove(payload.id,
      {query: {'id': payload.id}}
      ).then(response => {
        console.log("Delete Role Access: --", response)
      })
    },
    getTaskTypes({ commit }) {
      services.taskTypesService.find().then(response => {
        console.log("Response task type Find::", response);
        commit('GET_TASK_TYPE', response)
      });
    },
    addTask_Type({ commit }, payload) {
      if (payload.id != -1) {
        services.taskTypesService.patch(payload.id, { type: payload.type, typeDesc: payload.typeDesc, updatedBy: store.state.userObject._id }, { query: { 'id': payload.id } }).then(response => {
          console.log("Response patch Task Type::", response);
        });
      } else {
        services.taskTypesService.create({
          type: payload.type,
          createdAt: new Date().toJSON()
        }).then(response => {
          console.log("Insert Task Type in DB:", response)
        })
      }
    },
    deleteTaskType({ commit }, payload) {
      services.taskTypesService.remove(payload.id,
        { query: { 'id': payload.id } }
      ).then(response => {
        console.log("Delete Task Type: --", response)
      })
    },
    getTaskStaus({ commit }) {
      services.taskStatusService.find().then(response => {
        console.log("Response task Staus Find::", response);
        commit('GET_TASK_STATUS', response)
      });
    },
    addTask_Status({ commit }, payload) {
      console.log(payload)
      if (payload.status.id) {
        services.taskStatusService.patch(payload.status.id,
          { status: payload.status.status, statusDesc: payload.status.statusDesc, color: payload.color }, {
            query: { 'id': payload.id }
          }).then(response => {
            console.log("Patch respnse Task Status Updated: ", response)
          })
      } else {
        services.taskStatusService.create({
          status: payload.status.status,
          createdAt: new Date().toJSON()
        }).then(response => {
          console.log("Insert Taks Status:--", response)
        })
      }
    },
    deleteTaskStatus({ commit }, payload) {
      services.taskStatusService.remove(payload.id,
        {
          query: { 'id': payload.id }
        }).then(response => {
          console.log("Remove From Task Status", response)
        })
    },
    editTypes({ commit }, payload) {
      services.taskTypesService.patch(payload.id, {
        type: payload.type, 
        typeDesc: payload.typeDesc
      }).then(response => {
        console.log("Edit Type from Right:-", response)
      })
    },
    editStatus({ commit }, payload) {
      services.taskStatusService.patch(payload.id, {
        status: payload.status, 
        statusDesc: payload.statusDesc
      }).then(response => {
        console.log("Edit Status from Right:-", response)
      })
    }
  },
  getters: {
    // getTodoById: (state, getters) => {
    //   return function (id, level) {
    //     var todolist = state.todolist.filter(todo => todo.parentId === id, todo => todo.level === level)
    //     todolist = _.sortBy(todolist, 'index')
    //     //return _todolist.sortBy([function (o) { return o.index; }]).value();
    //     return todolist
    //   }
    // },
      getTodoById: (state, getters) => {
      if(state.deleteItemsSelected){
        return function (id, level) {
          // console.log('deleted task getter')
          var todolist = state.deletedTaskArr
          todolist = _.sortBy(todolist, 'index')        
          return todolist
        }  
      } else {
        return function (id, level) {
          var todolist = state.todolist.filter(function(todo){
              return !todo.isDelete && todo.parentId === id
          })
          todolist = _.sortBy(todolist, 'index')
          return todolist
        }
      }
    },
    parentIdArr: state => state.parentIdArr,
    // getAttachment: state => state.arrAttachment,
    getAttachment: (state, getters) => {
      return function (id, level) {
        var attachment = state.arrAttachment.filter(attachment => attachment.task_id === id)
        return attachment
      }
    },
    settingArr: state => state.settingsObject,
    getCommentById: (state, getters) => {
        return function (id) {
          var comment = state.taskComment.filter(c => c.task_id === id)
          return comment
        }
    }, 
    // getTaskTags: state => state.taskTags,
    getTaskTagsById: (state, getters) => {
      return function (id) {
        // console.log(state.taskTags.filter(tags => tags.task_id === id))
        return state.taskTags.filter(tags => tags.task_id === id)
      }
    },
    getMemberProfiledETAIL:(state,getters) => {
      return function (uId) {
        let userIndex = _.findIndex(state.arrAllUsers, function (user) { return user._id === uId })
        console.log("User Detail",state.arrAllUsers);
        if (userIndex < 0) {
          return { user_id: uId }
        } else {
          return { user_id: uId, url: state.arrAllUsers[userIndex].image_url, name: state.arrAllUsers[userIndex].name }
        }
      }
    },
    getMemberName:(state,getters) => {
      return function(uId){
        let userIndex= _.findIndex(state.arrAllUsers,function(user){ return user_id===uId})
         return  state.arrAllUsers[userIndex].fullname
        }
    },    
    getObjectById: state => state.todoObjectByID,
    getAllUserList: state => state.arrAllUsers,
    getProjectList: state=> state.projectlist,
    getdeleteArray: state => state.deletedTaskArr,
    getTaskLists: state => state.createdByTaskList,
    getRecentlyCompletedLists: state => state.recentlyCompletedTasks,
    getTaskAssignedToOthers: state => state.assignedToOthers,
    getTaskTypeList: state => state.task_types_list,
    getTaskStausList : state => state.task_status_list
  },
  
  plugins: [createPersistedState()]
})
