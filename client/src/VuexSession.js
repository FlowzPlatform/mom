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
      console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
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

function updateObject(oldObject, newObject) {
  var keys = Object.keys(oldObject)
  // console.log("Keys-->", keys);
  for (var i = 0; i < keys.length; i++) {

    oldObject[keys[i]] = newObject[keys[i]];
  }
}

export const store = new Vuex.Store({
  state: {
    userObject: {},
    isAuthorized: false,
    todolist: [],
    parentIdArr: [],
    progress_count: '',
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
    currentProjectId:""
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
          // console.log('index', index)
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
          // console.log('Inside forloop', data)
          let index = _.findIndex(state.todolist, function (d) { return d.id == data[i].id })
          // console.log('index', index)
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
      // console.log('todolist', state.todolist)
    },
    // ADD_NEW_TODOS(state,todo)     
    // {       
    //   console.log('Add TODO', state.todolist)
    //   state.todolist.push(todo)    
    // },
    async SHOW_DIV(state, payload) {
      // console.log('payload.level', payload)

      // var x = document.getElementById('right_pane_container');
      // x.style.visibility="visible"; 
      console.log('SHOW_DIV')
      var parentTaskId = payload.id ? payload.id : '';
      if (parentTaskId != -1) {
        // window.history.pushState("", "Title", "http://localhost:3000/navbar/task/" + (payload.level + 1) + "/" + payload.id);
        await store.dispatch('getAllTodos', { 'parentId': payload.id,project_id:state.currentProjectId });
        await store.dispatch('getAttachmentFromDB', payload.id)
        await store.dispatch('getAllTaskTags', payload.id);
        await store.dispatch('getTaskComment', payload.id)

        var parentIdArrObj = payload
        var tempParentIds = _.chain([]).union(state.parentIdArr).sortBy([function (o) { return o.level; }]).value();
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
        // console.log('parentIdArr', state.parentIdArr)
      }
    },
    CLOSE_DIV(state, payload) {
      //  console.log('CLOSE_DIV', payload)
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
        // console.log('parentIdArr', state.parentIdArr)
      }
    },
    REMOVE_PARENT_ID_ARRAY(state) {
      state.parentIdArr.splice(0, state.parentIdArr.length)
      state.todolist.splice(0, state.todolist.length)
      state.arrAttachment.splice(0, state.arrAttachment.length)
      // state.settingsObject.splice(0, state.settingsObject.length)
      state.taskComment.splice(0, state.taskComment.length)
      state.taskTags.splice(0, state.taskTags.length)
      state.tagsList.splice(0, state.tagsList.length)
      // state.deletedTaskArr.splice(0, state.deletedTaskArr.length)
      // state.userObject={}
    },
    changeFilters(state, key) {
      state.visibility = key
    },
    UPDATE_TODO(state, item) {
      // console.log('Update TODO')
      let updateTodoIndex = _.findIndex(state.todolist, function (d) { return d.id == item.id })
      //  console.log('item Before:', updateTodoIndex) 
      // updateObject(state.todolist[updateTodoIndex], item)
      // state.todolist.filter(todo => todo.id === item.id) == item
      // console.log('Todolist Obj After:', state.todolist)
      //console.log('new obj', obj)

      if (updateTodoIndex < 0) {
        if (state.todoObjectByID)
          updateObject(state.todoObjectByID, item)
        if(!item.isDelete){
          let deleteTodoIndex = _.findIndex(state.deletedTaskArr, function (d) { return d.id == item.id })
          state.todolist.push(item)
          state.deletedTaskArr.splice(deleteTodoIndex, 1)
        }
      } else {
        var isValueAvailable = state.todolist[updateTodoIndex].isDelete
        updateObject(state.todolist[updateTodoIndex], item)
        if(isValueAvailable !== item.isDelete){
          if(item.isDelete){
            state.deletedTaskArr.push(item)
            state.todolist.splice(updateTodoIndex, 1)
          }
        }
      }

      var isObjectAvailable = state.todolist.find(todo => todo.id === item.parentId)
      if (isObjectAvailable) {
        if (item.parentId) {
          var p_id = item.parentId
          var completedSubtaskCount = state.todolist.find(todo => todo.id === p_id).completed_subtask_count
          var subtask_count = state.todolist.find(todo => todo.id === p_id).subtask_count
          if (item.completed) {
            state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount + 1
          }
          else {
            state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount - 1
          }
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

      if (state.currentModified) {
        console.log('modified true', state.currentTodoObj)
        state.todolist.push(state.currentTodoObj)
        // state.currentTodoObj = {}
        state.isDeleteObj = true
      }

      // console.log("add todo")
      var isObjectAvailable = state.todolist.find(todo => todo.id === todoObject.parentId)
      if (isObjectAvailable) {
        if (todoObject.parentId) {
          // console.log("add todo element",state.todolist.find(todo => todo.id === todoElement.parentId) )
          let tempObj = state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count
          state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count = tempObj + 1
          setProgressBar(state, todoObject)
        }
      }
    },
    deleteTodo(state, todoObject) {
      let removeTodoIndex = _.findIndex(state.deletedTaskArr, function (d) { return d.id == todoObject.id })
      state.deletedTaskArr.splice(removeTodoIndex, 1)
      var isObjectAvailable = state.todolist.find(todo => todo.id === todoObject.parentId)
      if (isObjectAvailable) {
        if (todoObject.parentId) {
          let tempObj = state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count
          state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count = tempObj - 1
          if (todoObject.completed === true) {
            let completedObj = state.todolist.find(todo => todo.id === todoObject.parentId).completed_subtask_count
            state.todolist.find(todo => todo.id === todoObject.parentId).completed_subtask_count = completedObj - 1
          }
          setProgressBar(state, todoObject)
        }
      }
    },
    // toggleTodo(state, todoObject) {
    //   if (todoObject.todo.parentId) {
    //     var p_id = todoObject.todo.parentId
    //     var completedSubtaskCount = state.todolist.find(todo => todo.id === p_id).completed_subtask_count
    //     var subtask_count = state.todolist.find(todo => todo.id === p_id).subtask_count
    //     if (todoObject.isCheck) {
    //       state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount + 1
    //     }
    //     else {
    //       state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount - 1
    //     }
    //     setProgressBar(state, todoObject)
    //     // var totalSubtask= subtask_count ? subtask_count : 0
    //     // var completedSubtask = state.todolist.find(todo => todo.id === p_id).completed_subtask_count ? state.todolist.find(todo => todo.id === p_id).completed_subtask_count : 0
    //     // state.progress_count = completedSubtask + " / " + totalSubtask;
    //     // if (totalSubtask > 0) {
    //     //     var percentage = (completedSubtask / totalSubtask) * 100
    //     //     state.todolist.find(todo => todo.id === p_id).progress = percentage
    //     // }
    //   }
    // },
    SELECT_FILE(state, fileObject) {
      if (fileObject instanceof Array) {
        _.forEach(fileObject, function (object) {
          let index = _.findIndex(state.arrAttachment, function (d) { return d.id == object.id })
          // console.log('index: ', index)
          if (index < 0) {
            state.arrAttachment.push(object)
          }
        });
      }
      else if (fileObject instanceof Object) {
        // console.log("File:-->", fileObject);
        // console.log("state.arrAttachment before:-->", state.arrAttachment.length)
        // if(fileObject.id){
        //   // Replacing array to display name when uploading started
        //    console.log("<--Replace--->");
        //   var start_index = state.arrAttachment.length - 1
        //   var number_of_elements_to_remove = 1
        //   state.arrAttachment.splice(start_index, number_of_elements_to_remove, fileObject)
        // }else{
        //   console.log("<--Firstime--->");
        //   state.arrAttachment.push(fileObject)
        // }
        state.arrAttachment.push(fileObject)
        // console.log("state.arrAttachment after:-->", state.arrAttachment)
      }
    },
    DELETE_ATTACHMENT(state, deleteAttachment) {
      let removeAttachementIndex = _.findIndex(state.arrAttachment, function (d) { return d.id == deleteAttachment.id })
      // console.log("removeAttachementIndex Index-->", removeAttachementIndex)
      state.arrAttachment.splice(removeAttachementIndex, 1)
    },
    DELETE_ATTACHMENTS(state) {
      state.arrAttachment = []
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
          // console.log('Inside forloop', data)
          let index = _.findIndex(state.taskComment, function (d) { return d.id == data[i].id })
          // console.log('index', index)
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
        createdAt: new Date().toJSON()
      })
    },
    updateTodo(state, todoObject) {
      // setCheckboxColor(state, todoObject)
    },
    SETTING_UPDATE(state, todoObject) {

      for   (var i = 0; i < state.settingsObject.length; i++) {
        let index = _.findIndex(state.settingsObject, function (d) { return d.id == todoObject.settings_id })
        if (state.settingsObject[index].id === todoObject.settings_id) {
          console.log(state.settingsObject[index].user_setting[0] = todoObject)
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
      // console.log('Insert tags-----------: ', tagObject);
      state.tagsList.push(tagObject); // this line added by hemant
      // state.taskTags.push(tagObject)
      // console.log('arrTags: ', state.taskTags);
    },
    DELETE_ALLTAGS(state) {
      state.taskTags = []
    },
    GET_TASK_TAGS(state, datas) {
      // console.log('before state.taskTags:',state.taskTags.length);
      // console.log('TASK_TAGS before', datas)
      // state.taskTags.push(datas)
      if (datas instanceof Array) {
        _.forEach(datas, function (data) {
          let index = _.findIndex(state.taskTags, function (d) { return d.id == data.id })
          // console.log('index: ', index)
          if (index < 0) {
            state.taskTags.push(data)
          }
        });
      } else if (datas instanceof Object) {
        state.taskTags.push(datas)
      }
      // console.log('TASK_TAGS', state.taskTags)
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
      console.log("todoObject By Id:--", todoObject)
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
      console.log('slider value', sliderVal)
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
    GET_PROJECT_LIST(state,data){
      console.log("Projectc List:--",data);
      state.projectlist=data;
    },
    showDeleteTasks(state){
      state.deleteItemsSelected = true
      state.parentIdArr.splice(0, state.parentIdArr.length)
    },
    showMyTasks(state){
      state.deleteItemsSelected = false
      state.parentIdArr.splice(0, state.parentIdArr.length)
    },
    DELETED_TASKS(state, deletedArray){
      console.log(deletedArray)
      state.deletedTaskArr = deletedArray
    }
  },
  actions: {

    getUsersRoles({commit})
    {
      services.roleService.find().then(response => {
        console.log("Role list->>",response)
        commit('GET_ROLES', response)
      });
    },
    eventListener({ commit }) {
      console.log("<-----addMessage:-->")
      // A new message has been created on the server, so dispatch a mutation to update our state/view
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
      })
    },
    getAllTodos({ commit }, payload) {

      console.log('getAllTodos-->', payload);
  
            services.tasksService.find({ query:{ $or: [
              {  parentId: payload.parentId,project_id:payload.project_id,created_by:store.state.userObject._id},
              {  parentId: payload.parentId,project_id:payload.project_id,assigned_to: store.state.userObject._id }
                ]}}).then(response => {
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
        services.tasksService.patch(dbId, { taskName: insertElement.taskName, taskDesc: '' }, { query: { 'id': dbId } }).then(response => {
          console.log("Reesponse patch::", response);
          // commit('UPDATE_TODO', insertElement)
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
          console.log("Reesponse create::---->", response);
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
      console.log(editObject.selectedDate)
      if (editObject.todo.id) {
        services.tasksService.patch(editObject.todo.id, {
          taskName: editObject.todo.taskName,
          taskDesc: editObject.todo.taskDesc,
          dueDate: editObject.selectedDate,
          estimatedTime: editObject.estimatedTime,
          priority: editObject.taskPriority,
          assigned_by: editObject.assigned_by,
          assigned_to: editObject.assigned_to
        }, { query: { 'id': editObject.todo.id } }).then(response => {
          console.log("Reesponse editTaskName::", response);
           if(editObject.isAssigned){
            console.log('is assigned called')
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
        services.tasksService.patch(dbId, {isDelete: true }).then(response => {
          console.log("Response deleteTodp Flag Update:", response)
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
            //console.log("Reesponse dragtodo::",response);
          });

        }
      }
    },
    toggleTodo({ commit }, changeTodo) {
      // console.log(changeTodo)
      let dbId = changeTodo.id
      if (dbId) {
        services.tasksService.patch(dbId, {
          id: dbId,
          completed: changeTodo.completed
        }, { query: { 'id': dbId } }).then(response => {
          console.log("Reesponse toggleTodo::", response);
          //  commit('UPDATE_TODO', insertElement)
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
      console.log('Task ID', fileObject.taskId)
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
          // console.log("Reesponse Attachment create::", response);
          // console.log("Attachment Remove Before---->::", store.state.arrAttachment.length);
          store.state.arrAttachment.splice(store.state.arrAttachment.indexOf(attachArr), 1)
          // console.log("Attachment Remove After---->::", store.state.arrAttachment.length);
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
      console.log('deleted Task ID', deleteObject)
      store.commit('deleteAttachmentProgress', { 'id': deleteObject.task_id, 'isProgress': true })
      //Delete image from amazon
      var bucketInstance = new AWS.S3();
      console.log('timestamp_before', deleteObject.file_name_timestamp)
      var params = {
        Bucket: 'airflowbucket1/obexpense/expenses',
        Key: deleteObject.file_name_timestamp
      }
      console.log('timestamp_after', deleteObject.file_name_timestamp)
      bucketInstance.deleteObject(params, function (err, data) {
        if (data) {
          //Update attachment fields in DB
          services.taskAttachmentService.remove(deleteObject.id, {
            // isDeleted: true,
            // file_url: '',
            // deletedBy: store.state.userObject.id
          }, { query: { 'id': deleteObject.id } }).then(response => {
            console.log("Reesponse deleteAttachment::", response);
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
        console.log("Reesponse remove permission::", response);
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
        console.log("Reesponse remove permission::", response);
        // if(response.data.length > 0){
        // commit('SELECT_FILE', response.data) 
        // }
      });
    },
    getAttachmentFromDB({ commit }, taskId) {
      console.log('get attachment called: ', taskId)
      services.taskAttachmentService.find({
        query: {
          task_id: taskId,
        }
      }).then(response => {
        console.log("Reesponse getAttachmentFromDB::", response.data);
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
      console.log("UserId",payload)
      services.settingService.find({
        query: {
          'user_id': payload
        }
      }).then(response => {
        // console.log("Reesponse getSettings From DB::", response);
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
        console.log("true", setting.arr.user_setting[0].id)
        services.settingService.patch(setting.arr.user_setting[0].id,
          { setting_value: setting.event }, {
            query: { 'settings_id': setting.arr.id, 'user_id': setting.uId }
          }).then(response => {
            console.log("Reesponse SETTING_UPDATE From DB::", response);
            commit('SETTING_UPDATE', response)
          });
      } else {
        console.log("false", setting.arr.user_setting[0])
        services.settingService.create({
          settings_id: setting.arr.id,
          user_id: setting.uId,
          setting_value: setting.event
        }).then(response => {
          console.log("Reesponse SETTING_INSERT From DB::", response);
          commit('SETTING_UPDATE', response)
        });
      }
    },
    getTaskComment({ commit }, payload) {
      services.taskHistoryLogs.find({ query: { task_id: payload } }).then(response => {
        console.log("Reesponse getCommnets From DB::", response);
        commit('GET_TASK_COMMENT', response)
      });
      // Vue.http.get('/getComment').then(function (response) {
      //   commit('GET_TASK_COMMENT', response.data)
      // });
    },
    insertTaskComment({ commit }, payload) {
      console.log('payload', payload)
      if (!(payload.comment && payload.comment.trim()))
        return
      services.taskHistoryLogs.create({
        task_id: payload.id,
        commentBy: payload.commentBy,
        comment: payload.comment,
        createdAt: new Date().toJSON()
      }).then(function (response) {
        console.log("Reesponse create Commnets From DB::", response);
        // commit('ADD_COMMENT', response)
      })
    },
     insertProjectInvite({ commit }, inviteDetail) {
      console.log('inviteDetail-->', inviteDetail)



      services.projectMemberService.create(inviteDetail).then(function (response) {
        console.log("Reesponse create Invite Member  From DB::", response);
        // commit('ADD_COMMENT', response)
      })
    },
    getAllTaskTags({ commit }, taskId) {
      console.log("getAllTaskTags tsakId::", taskId);
      services.taskTagsService.find({ query: { task_id: taskId, is_deleted: false } }).then(response => {
        console.log("Reesponse TaskTag::", response);
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
        console.log("Reesponse Tag Find::", response);
        commit('GET_TAGS_LIST', response)
      });
      // Vue.http.get('/getTags').then(function(response) {
      //       commit('GET_TAGS_LIST', response.data)
      //   });
    },
    insertTagsInDB({ commit }, tagObject) {
      console.log('tagObj: ', tagObject)
      services.tagsService.create({
        name: tagObject.tagName,
        created_by_user_id: store.state.userObject.id
      }).then(response => {
        console.log("Reesponse Tag Cerate::", response);
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
      console.log("taskTagObject", taskTagObject)
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
      console.log('TAsk tags', taskTagObject)
      services.taskTagsService.patch(null, {
        is_deleted: true, deleted_by_user_id: store.state.userObject.id
      }, { query: { "task_id": taskTagObject.task_id, "tag_id": taskTagObject.tag_id } }).then(response => {
        console.log("Reesponse update task tags:", response);
        //  commit('UPDATE_TODO', insertElement)
      });
      // Vue.http.post('/deleteTaskTags', {
      //     task_id: taskTagObject.task_id,
      //     tag_id: taskTagObject.id
      // }).then(response => {
      //     if (response.ok) {
      //         console.log("deleteTaskTags api response:", response.bodyText);
      //         commit('REMOVE_TASKTAG', taskTagObject)
      //     }
      // })
    },
    getTodoObject({ commit }, todoObjectId) {
      services.tasksService.get(todoObjectId).then(function (response) {
        console.log("get Id response", response)
        commit('GET_OBJECT_BYID', response)
      })
    },
    userRegistrationProcess({ commit }, regObject) {
      // axios.post('https://recipehub-backend-mmquqjzpbv.now.sh/api/setup', {
      return axios.post('http://172.16.120.64:3000/api/setup', {
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
      // axios.post('https://recipehub-backend-mmquqjzpbv.now.sh/api/login', {
      return axios.post('http://172.16.120.64:3000/api/login', {
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
      return axios.get('http://172.16.120.64:3000/api/userdetails', {
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
      var url = ('http://172.16.120.64:3005/updateuserdetails/' + store.state.userObject._id)
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
        console.log('Token', store.state.userToken)
      let {data}  = await axios.get('http://172.16.120.64:3005/alluserdetails',{
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
              { project_privacy: '2', create_by: userId }
            ]
          }
        }).then(response => {
          commit('GET_PROJECT_LIST', response)
        });
        // Vue.http.post('/tasks_parentId', { parentId: payload.parentId }).then(function (response) {
        //   commit('GET_TODO', response.data)
        // });
      },
      insertProject({commit},object){
      console.log("call back::", object.data);
       var self=this;
         services.projectService.create(object.data).then(response => {
          console.log("Response Project create::", response);
          object.callback(response);
          //  commit('addTodo', {"data":response, "todo": insertElement})
        });
    },
    // getDeleteTask({ commit }, payload){
    //   services.tasksService.find({ query: { isDelete: true } }).then(response => {
    //     commit('DELETED_TASKS', response)
    //   });
    // },
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
        return state.taskComment.filter(comment => comment.task_id === id)
      }
    },
    // getTaskTags: state => state.taskTags,
    getTaskTagsById: (state, getters) => {
      return function (id) {
        console.log(state.taskTags.filter(tags => tags.task_id === id))
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
  },
  
  plugins: [createPersistedState()]
})

