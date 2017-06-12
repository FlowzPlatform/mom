import Vue from 'vue'
/* eslint-disable*/
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'

Vue.use(Vuex)

function setProgressBar(state, todoObject) {
  var p_id = todoObject.todo.parentId
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

function uploadFileOnAmazonS3(file, cb) {
  var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
  if (file) {
    var params = { Key: file.name, ContentType: file.type, Body: file };
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

function setCheckboxColor(state, todoObject) {
  var todoLength = state.todolist

  for (var i = 0; i < todoLength.length; i++) {
    // if (state.userSetting[1].setting_value) {
    var d = new Date()
    d.setDate(d.getDate() + 2)
    if (todoLength[i].dueDate) {
      if (moment(todoLength[i].dueDate).isBetween(new Date(), d)) {
        $('#' + todoLength[i].id).removeClass('DueDate--overdue').removeClass('DueDate--future').addClass('DueDate--soon')
      } else if (moment(todoLength[i].dueDate).isBefore(new Date())) {
        $('#' + todoLength[i].id).removeClass('DueDate--soon').removeClass('DueDate--future').addClass('DueDate--overdue')
      } else if (moment(todoLength[i].dueDate).isAfter(new Date())) {
        $('#' + todoLength[i].id).removeClass('DueDate--overdue').removeClass('DueDate--soon').addClass('DueDate--future')
      } else {
        $('#' + todoLength[i].id).removeClass('DueDate--soon')
        $('#' + todoLength[i].id).removeClass('DueDate--overdue')
        $('#' + todoLength[i].id).removeClass('DueDate--future')
      }
    }
    // } else {
    //   $('#' + todoLength[i].id).removeClass('DueDate--soon')
    //   $('#' + todoLength[i].id).removeClass('DueDate--overdue')
    //   $('#' + todoLength[i].id).removeClass('DueDate--future')
    // }
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
    isProgress: false,
    isLoading: false,
    settingsObject: [],
    userSetting: [],
    taskComment: []
  },
  mutations: {
    userData: state => state.userObject,
    authorize: state => state.isAuthorized,
    progressVal: state => state.progress,
    showProgress: state => state.isProgress,
    showLoader: state => state.isLoading,
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
    async SHOW_DIV(state, payload) {
      console.log('payload.level', payload)

      var parentTaskId = payload.id ? payload.id : '';
      if (parentTaskId) {
        // window.history.pushState("", "Title", "http://localhost:3000/navbar/task/" + (payload.level + 1) + "/" + payload.id);
        await store.dispatch('getAllTodos', { 'parentId': payload.id });
        await store.dispatch('getAttachmentFromDB', payload.id)
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
    REMOVE_PARENT_ID_ARRAY(state) {
      state.parentIdArr.splice(0, state.parentIdArr.length)
      state.todolist.splice(0, state.todolist.length)
      // state.arrAttachment.splice(0,state.arrAttachment.length)
    },
    changeFilters(state, key) {
      state.visibility = key
    },
    UPDATE_TODO(state, item) {
      console.log('Todolist Obj Before:', state.todolist)
      state.todolist.filter(todo => todo.id === item.id) == item
      console.log('Todolist Obj After:', state.todolist)
      //console.log('new obj', obj)
    },
    addTodo(state, todoObject) {
      let todoElement = todoObject.todo
      let temp_id = todoObject.data.generated_keys[0]
      state.todolist.push({
        id: temp_id,
        parentId: todoElement.parentId,
        taskName: todoElement.taskName,
        taskDesc: '',
        level: todoElement.level,
        completed: false,
        index: todoElement.index,
        dueDate: '',
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
        subtask_count: 0,
        completed_subtask_count: 0,
        progress_count: ''
      })
      // console.log("add todo")
      if (todoElement.parentId) {
        // console.log("add todo element",state.todolist.find(todo => todo.id === todoElement.parentId) )
        let tempObj = state.todolist.find(todo => todo.id === todoElement.parentId).subtask_count
        state.todolist.find(todo => todo.id === todoElement.parentId).subtask_count = tempObj + 1
        setProgressBar(state, todoObject)
      }
    },
    deleteTodo(state, todoObject) {
      state.todolist.splice(state.todolist.indexOf(todoObject.todo), 1)
      if (todoObject.todo.parentId) {
        let tempObj = state.todolist.find(todo => todo.id === todoObject.todo.parentId).subtask_count
        state.todolist.find(todo => todo.id === todoObject.todo.parentId).subtask_count = tempObj - 1
        if (todoObject.todo.completed === true) {
          let completedObj = state.todolist.find(todo => todo.id === todoObject.todo.parentId).completed_subtask_count
          state.todolist.find(todo => todo.id === todoObject.todo.parentId).completed_subtask_count = completedObj - 1
        }
        setProgressBar(state, todoObject)
      }
    },
    toggleTodo(state, todoObject) {
      if (todoObject.todo.parentId) {
        var p_id = todoObject.todo.parentId
        var completedSubtaskCount = state.todolist.find(todo => todo.id === p_id).completed_subtask_count
        var subtask_count = state.todolist.find(todo => todo.id === p_id).subtask_count
        if (todoObject.isCheck) {
          state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount + 1
        }
        else {
          state.todolist.find(todo => todo.id === p_id).completed_subtask_count = completedSubtaskCount - 1
        }
        setProgressBar(state, todoObject)
        // var totalSubtask= subtask_count ? subtask_count : 0
        // var completedSubtask = state.todolist.find(todo => todo.id === p_id).completed_subtask_count ? state.todolist.find(todo => todo.id === p_id).completed_subtask_count : 0
        // state.progress_count = completedSubtask + " / " + totalSubtask;
        // if (totalSubtask > 0) {
        //     var percentage = (completedSubtask / totalSubtask) * 100
        //     state.todolist.find(todo => todo.id === p_id).progress = percentage
        // }
      }
    },
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
        if (fileObject.id) {
          // Replacing array to display name when uploading started
          var start_index = state.arrAttachment.length - 1
          var number_of_elements_to_remove = 1
          state.arrAttachment.splice(start_index, number_of_elements_to_remove, fileObject)
        } else {
          state.arrAttachment.push(fileObject)
        }
      }
    },
    DELETE_ATTACHMENT(state, deleteAttachment) {
      state.arrAttachment.splice(state.arrAttachment.indexOf(deleteAttachment), 1)
    },
    DELETE_ATTACHMENTS(state) {
      state.arrAttachment = []
    },
    GET_SETTINGS(state, data) {
      state.settingsObject = data
    },
    GET_USER_SETTING(state, data) {
      state.userSetting = data
    },
    GET_TASK_COMMENT(state, data) {
      state.taskComment = data
    },
    ADD_COMMENT(state, data){
      let temp_id = data.response.generated_keys[0]
      state.taskComment.push({
                id:temp_id,
                task_id: data.payload.id,
                commentBy: data.payload.commentBy,
                comment: data.payload.comment,
                createdAt: new Date().toJSON()
      })
    },
    updateTodo(state, todoObject) {
      setCheckboxColor(state, todoObject)
    },
    toggleSetting(state, todoObject) {
      console.log('Toggle setting called', todoObject)
      state.userSetting.find(setting => setting.settings_id === todoObject.settings_id).setting_value = todoObject.setting_value
      setCheckboxColor(state, todoObject)
    }
  },
  actions: {
    getAllTodos({ commit }, payload) {
      console.log('parentId', payload.parentId);
      Vue.http.post('/tasks_parentId', { parentId: payload.parentId }).then(function (response) {
        commit('GET_TODO', response.data)
      });
    },
    removeParentIdArray({ commit }) {
      commit('REMOVE_PARENT_ID_ARRAY')
    },
    insertTodo({ commit }, insertElement) {
      let dbId = insertElement.id
      if (!(insertElement.taskName && insertElement.taskName.trim()))
        return
      if (dbId) {
        Vue.http.post('/updatetasks', {
          id: dbId,
          taskName: insertElement.taskName,
          taskDesc: '',
        }).then(response => {
          commit('UPDATE_TODO', insertElement)
          // console.log('task update', response.data)
        })
      } else {
        Vue.http.post('/tasks', {
          parentId: insertElement.parentId,
          taskName: insertElement.taskName,
          taskDesc: '',
          level: insertElement.level,
          completed: false,
          index: insertElement.index,
          dueDate: '',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON()
        })
          .then(function (response) {
            commit('addTodo', { "data": response.data, "todo": insertElement })
            // console.log("Response:", response)
          })
      }
    },
    editTaskName({ commit }, editObject) {
      if (editObject.todo.id) {
        Vue.http.post('/updatetasks', {
          id: editObject.todo.id,
          taskName: editObject.todo.taskName,
          taskDesc: editObject.todo.taskDesc,
          dueDate: editObject.selectedDate ? editObject.selectedDate.toJSON() : '',
          estimatedTime: editObject.estimatedTime,
          priority: editObject.taskPriority
        }).then(response => {
          // console.log('task updated', response.data)
          commit('updateTodo', editObject)
        })
      }
    },
    deleteTodo({ commit }, deleteElement) {
      console.log(deleteElement)
      let dbId = deleteElement.id
      if (dbId) {
        Vue.http.delete('/deteletask/' + dbId, {
        }).then(response => {
          commit('deleteTodo', { "data": response.data, "todo": deleteElement })
          console.log('task deleted', response.data)
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
        })
      }
    },
    toggleTodo({ commit }, changeTodo) {
      // console.log(changeTodo)
      let dbId = changeTodo.todo.id
      if (dbId) {
        Vue.http.post('/updatetasks', {
          id: dbId,
          completed: changeTodo.todo.completed
        }).then(response => {
          commit('toggleTodo', changeTodo)
          // console.log('task updated', response.data)
        })
      }
    },
    selectFile({ commit }, fileObject) {
      var file = fileObject.file.files[0];

      var attachArr = {
        file_name: file.name,
        task_id: fileObject.taskId,
        level: fileObject.level
      }
      commit('SELECT_FILE', attachArr)

      store.state.isProgress = true
      store.commit('showProgress')
      uploadFileOnAmazonS3(file, function (src) {
        store.state.isProgress = false
        store.commit('showProgress')
        store.state.progress = 0
        store.commit('progressVal')

        //Insert Attachment detail in DB
        Vue.http.post('/addAttachment', {
          task_id: fileObject.taskId,
          file_name: file.name,
          file_url: src,
          uploadedBy: store.state.userObject.id,
          level: fileObject.level,
          isDeleted: false
        }).then(response => {
          var tempArr = {
            id: response.data.generated_keys[0],
            task_id: fileObject.taskId,
            file_name: file.name,
            file_url: src,
            uploadedBy: store.state.userObject.id,
            level: fileObject.level,
            isDeleted: false
          }
          commit('SELECT_FILE', tempArr)
          fileObject.cb()
        })
      })
    },
    deleteAttachmentFromDB({ commit }, deleteObject) {

      store.state.isLoading = true
      store.commit('showLoader')
      //Delete image from amazon
      var bucketInstance = new AWS.S3();
      var params = {
        Bucket: 'airflowbucket1/obexpense/expenses',
        Key: deleteObject.image_name
      }
      bucketInstance.deleteObject(params, function (err, data) {
        if (data) {
          //Update attachment fields in DB
          Vue.http.post('/deleteAttachment', {
            id: deleteObject.objAttachment.id,
            isDeleted: true,
            file_url: '',
            deletedBy: store.state.userObject.id
          }).then(response => {
            commit('DELETE_ATTACHMENT', deleteObject.objAttachment)
            store.state.isLoading = false
            store.commit('showLoader')
          })
        }
        else {
          console.log("Check if you have sufficient permissions : ", err.stack);
        }
      });
    },
    getAttachmentFromDB({ commit }, taskId) {
      console.log('get attachment called: ', taskId)
      Vue.http.post('/getAttachments', {
        task_id: taskId,
        isDeleted: false
      }).then(response => {
        if (response.data.length > 0) {
          commit('SELECT_FILE', response.data)
        }
      })
    },
    getUserSetting({ commit }) {
      Vue.http.get('/getUserSetting').then(function (response) {
        // console.log("data", response.data)
        commit('GET_USER_SETTING', response.data)
      });
    },
    getSettings({ commit }, payload) {
      Vue.http.post('/getSttings', {
        user_id: payload
      }).then(response => {
        commit('GET_SETTINGS', response.data)
        console.log("Get Settings", response.data)
      })
    },
    toggleSetting({ commit }, setting) {
      Vue.http.post('/updateUserSetting', {
        settings_id: setting.settings_id,
        setting_value: setting.setting_value
      }).then(response => {
        // commit('toggleSetting', changeSetting)
        console.log('setting update', response.data)
        commit('toggleSetting', setting)
      })
    },
    getTaskComment({ commit }) {
      Vue.http.get('/getComment').then(function (response) {
        commit('GET_TASK_COMMENT', response.data)
      });
    },
    insertTaskComment({ commit }, payload) {
      console.log(payload)
      Vue.http.post('/insertComment', {
        'task_id': payload.id,
        'commentBy': payload.commentBy,
        'comment': payload.comment,
        'createdAt': new Date().toJSON()
      })
        .then(function (response) {
          commit('ADD_COMMENT',{"payload": payload, "response":response.data})
          console.log("Response:", response)
        })
    }
  },
  getters: {
    getTodoById: (state, getters) => {
      return function (id, level) {
        return state.todolist.filter(todo => todo.parentId === id, todo => todo.level === level)
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
    user_setting: state => state.userSetting,
    getCommentById: (state, getters) => {
      return function (id) {
        return state.taskComment.filter(comment => comment.task_id === id)
      }
    }
  },
  plugins: [createPersistedState()]
})

