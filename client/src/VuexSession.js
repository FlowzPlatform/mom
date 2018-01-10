import Vue from 'vue'
/* eslint-disable*/
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'
import * as services from './services'
import axios from 'axios'
import * as Constant from './components/Constants.js'
import CmnFunc from './components/CommonFunc.js'
import config from '../config/customConfig'
Vue.use(Vuex)
import psl from 'psl'
var VueCookie = require('vue-cookie')
Vue.use(VueCookie)


services.socket.on("reconnect", function () {
  console.log('-----reconnect fired!-------');
});

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

      if (!isNaN(parseInt((evt.loaded * 100) / evt.total))) {
        store.state.progress = parseInt((evt.loaded * 100) / evt.total)
      } else {
        store.state.progress = 0
      }

      store.commit('progressVal')
    }).send(function (err, data) {
      // console.log('err ===> ', err)
      // console.log('data ===> ', data)
      try {
        cb(data.Location)
      } catch (e) {
        cb("fail")
      }

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

function updateTaskCount(state, todoObject) {
  if (todoObject.isDelete) {
    if (todoObject.parentId) {
      let tempObj = state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count
      state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count = tempObj - 1
      if (todoObject.completed) {
        let completedObj = state.todolist.find(todo => todo.id === todoObject.parentId).completed_subtask_count
        state.todolist.find(todo => todo.id === todoObject.parentId).completed_subtask_count = completedObj - 1
      }
      setProgressBar(state, todoObject)
    }
  } else {
    var todo = state.todolist.find(todo => todo.id === todoObject.parentId);
    if (todo) {
      let tempObj = todo.subtask_count
      state.todolist.find(todo => todo.id === todoObject.parentId).subtask_count = tempObj + 1
    }
  }
}
function updateObject(oldObject, newObject) {
  var keys = Object.keys(oldObject)
  for (var i = 0; i < keys.length; i++) {
    if (newObject[keys[i]] !== undefined) {
      oldObject[keys[i]] = newObject[keys[i]];
    }
  }
}

function findPinnedIndex(element) {
  return element.isPinned !== undefined && element.isPinned === true;
}
// function scrollToLeft() {
//   var children = document.getElementById('main-container').children;
//   var totalWidth = 0;

//   for (var i = 0; i < children.length; i++) {
//     totalWidth += children[i].offsetWidth;
//   }
//   var leftPos = $('#main-container').scrollLeft();
//   $("div#main-container").animate({
//     scrollLeft: totalWidth
//   }, 800)
// }

export const store = new Vuex.Store({
  state: {
    comments: '',
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
    projectlist: [],
    userRoles: [],
    currentProjectId: "",
    currentProjectName: "",
    currentProjectPrivacy: '',
    projectSettingId: 0,
    currentProjectMember: '',
    currentProject: {},
    projectSettingMenuOffset: 0,
    createdByTaskList: [],
    recentlyCompletedTasks: [],
    searchView: '',
    assignedToOthers: [],
    taskIndex: -1,
    task_types_list: [],
    task_state_list: [],
    task_types_state: [],
    googleId: '',
    removeMember: {},
    permissions: {},
    currentProjectRoleid: '',
    commentValue: '',
    taskHistoryLog: [],
    accessRight: {},
    deleteFileName: '',
    splitWidthArr: [],
    isNoProjectShow: false,
  },
  mutations: {
    userData: state => state.userObject,
    authorize: state => state.isAuthorized,
    progressVal: state => state.progress,
    googleId: state => state.googleId,
    removeMember: state => state.removeMember,
    splitWidthArr: state => state.splitWidthArr,

    setSplitWidth(state, data) {
      state.splitWidthArr = data
    },
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
    GET_ROLES(state, data) {
      if (data) {
        state.userRoles = data;
        for (var i = 0; i < data.length; i++) {
          let index = _.findIndex(state.userRoles, function (d) { return d.id == data[i].id })
          if (index < 0) {
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
    SHOW_DIV(state, payload) {

      // Clear history log, attachment, tags
      // state.taskHistoryLog.length = 0
      // state.arrAttachment.length = 0
      // state.tagsList.length = 0

      state.isSliderOpen = false
      // START scroll to last opened right div 
      //set focus on selected TODO Item. 
      //CAUTION:Take care before add any code here. If made any change in focus set code it may interrupt functionality.03/08/2017
      state.taskIndex = payload.id + "_" + payload.level
      setTimeout(function () {
        var el = $('.' + state.taskIndex);
        if (el) {
          el.focus();
        }
      }, 100)
      //****************************************************** */



      var parentTaskId = payload.id ? payload.id : '';
      if (parentTaskId != -1) {
        // window.history.pushState("", "Title", "http://localhost:3000/navbar/task/" + (payload.level + 1) + "/" + payload.id);
        store.dispatch('getAllTodos', { 'parentId': payload.id, project_id: state.currentProjectId });
        // await store.dispatch('getAttachmentFromDB', payload.id)
        // await store.dispatch('getAllTaskTags', payload.id);
        // await store.dispatch('getTaskComment', payload.id)
        store.dispatch('getTypeState', payload.id)
        // await store.dispatch('getHistoryFromDB', payload.id)
        var parentIdArrObj = payload
        var tempParentIds = _.chain([]).union(state.parentIdArr).sortBy([function (o) { return o.level; }]).value();
        if (state.deleteItemsSelected || state.createdByTaskList.length > 0 || state.recentlyCompletedTasks.length > 0 || state.assignedToOthers.length > 0) {
          state.parentIdArr.splice(0, state.parentIdArr.length);
          state.parentIdArr.push(parentIdArrObj);
        } else {
          if (state.parentIdArr.length > 0) {
            state.parentIdArr.splice(0, state.parentIdArr.length);
            for (var i = 0; i < tempParentIds.length; i++) {
              if (tempParentIds[i].level < parentIdArrObj.level && !tempParentIds[i].isPinned) {
                state.parentIdArr.push(tempParentIds[i]);
              }
            }
            if (!parentIdArrObj.isPinned)
              state.parentIdArr.push(parentIdArrObj);

            // Add pinned window at last position
            for (var i = 0; i < tempParentIds.length; i++) {
              if (tempParentIds[i].isPinned) {
                state.parentIdArr.push(tempParentIds[i])
              }
            }
          }
          else {
            state.parentIdArr.push(parentIdArrObj);
          }
        }
      }

      if (payload.taskName) {
        let moveIndex = (state.parentIdArr).findIndex(findPinnedIndex)
        CmnFunc.scrollToLeft(moveIndex - 1)
      }
      // END scroll to last opened right div 
      // const divHeight = $(".task").height() + 40
      // document.getElementById('rightContainer').style.height = 904 - divHeight + "px"
    },

    CLOSE_DIV(state, payload) {
      var parentTaskId = payload.id ? payload.id : '';
      if (parentTaskId != -1) {
        var parentIdArrObj = payload
        var tempParentIds = _.chain([]).union(state.parentIdArr).sortBy([function (o) { return o.level; }]).value();
        if (state.parentIdArr.length > 0) {
          state.parentIdArr.splice(0, state.parentIdArr.length);
          for (var i = 0; i < tempParentIds.length; i++) {
            if (tempParentIds[i].level < parentIdArrObj.level && !tempParentIds[i].isPinned) {
              state.parentIdArr.push(tempParentIds[i]);
            }
          }

          for (var i = 0; i < tempParentIds.length; i++) {
            if (tempParentIds[i].isPinned) {
              state.parentIdArr.push(tempParentIds[i])
            }
          }
        }
      }
      let moveIndex = (state.parentIdArr).findIndex(findPinnedIndex)
      CmnFunc.scrollToLeft(moveIndex - 1)
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
      state.task_state_list.splice(0, state.task_state_list.length)
      state.task_types_state.splice(0, state.task_types_state.length)
      state.currentProjectId = ""
      state.currentProjectName = ""
      state.currentProjectPrivacy = ''

    },
    CLEAR_PROJECT_DEFAULT(state) {
      state.userObject = {}
      state.isAuthorized = false
      state.todolist.length = 0
      state.parentIdArr.length = 0
      // state.progress_count = ''
      // state.visibility = 'active'
      state.arrAttachment.length = 0
      state.isLoading = false
      state.settingsObject.length = 0
      state.taskComment.length = 0
      state.taskTags.length = 0
      state.tagsList.length = 0
      state.isProgress = false
      state.isDueDate = false
      state.todoObjectByID = {}
      state.userToken = ''
      state.isSliderOpen = false
      state.currentTodoObj = {}
      state.currentModified = false
      state.isDeleteObj = false
      state.deleteItemsSelected = false
      state.deletedTaskArr.length = 0
      state.arrAllUsers.length = 0
      state.projectlist.length = 0
      state.userRoles.length = 0
      state.currentProjectId = undefined
      state.currentProjectName = undefined
      state.currentProjectPrivacy = ''
      state.projectSettingId = 0
      state.currentProjectMember = ''
      state.c = {}
      state.projectSettingMenuOffset = 0
      state.createdByTaskList.length = 0
      state.recentlyCompletedTasks.length = 0
      state.searchView = ''
      state.assignedToOthers.length = 0,
        state.taskIndex = -1
      state.task_types_list.length = 0
      state.task_state_list.length = 0
      state.task_types_state.length = 0
      state.googleId = ''
      state.removeMember = {}
      state.permissions = {}
      state.currentProjectRoleid = ''
      state.taskHistoryLog.length = 0
      state.currentProjectCreatedBy = ''
      state.editedValue = ''
    },
    changeFilters(state, key) {
      state.visibility = key
    },
    UPDATE_TODO(state, item) {
      if (item.project_id === state.currentProjectId) {
        let updateTodoIndex = _.findIndex(state.todolist, function (d) { return d.id == item.id })
        if (updateTodoIndex < 0) {
          if (state.todoObjectByID) {
            updateObject(state.todoObjectByID, item)
          }
          if (item.type_id)
            Vue.set(state.todoObjectByID, 'type_id', item.type_id)
          //state.todoObjectByID.type_id=item.type_id;
          if (!item.isDelete) {
            let deleteTodoIndex = _.findIndex(state.deletedTaskArr, function (d) { return d.id == item.id })
            state.todolist.push(item)
            state.deletedTaskArr.splice(deleteTodoIndex, 1)
            if (state.parentIdArr.length > 0) {
              var todo = state.parentIdArr.find(todo => todo.id === item.id);
              if (todo)
                todo.isDelete = item.isDelete
            }
            updateTaskCount(state, item)
          }
        } else {
          var isValueAvailable = state.todolist[updateTodoIndex].isDelete

          updateObject(state.todolist[updateTodoIndex], item)
          // console.log('state.todolist before:', JSON.stringify(state.todolist))
          // let temp = _.sortBy(state.todolist, function(o) { return o.index})
          // console.log('state.todolist after:', temp)

          if (item.type_id)
            Vue.set(state.todolist[updateTodoIndex], 'type_id', item.type_id)
          if (item.type_id) {
            Vue.set(state.accessRight, 0, {})
            // state.accessRight.task_type = item.type_id;
            // Vue.set(state.accessRight, state.accessRight.task_type, item.type_id)
          }
          // show if any updates found for TODO
          if (item.updatedBy !== state.userObject._id) {
            state.todolist[updateTodoIndex].isTaskUpdate = true
          }
          if (isValueAvailable !== item.isDelete) {
            if (item.isDelete) {
              state.deletedTaskArr.push(item)
              state.todolist.splice(updateTodoIndex, 1)
              state.parentIdArr.find(todo => todo.id === item.id).isDelete = item.isDelete
            } else {
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
            var totalCount = state.todolist.filter(function (todo) {
              return todo.parentId === p_id && todo.completed
            }).length
            state.todolist.find(todo => todo.id === p_id).completed_subtask_count = totalCount
            setProgressBar(state, item)
          }
        }
        setCheckboxColor(state)
      }
    },
    ADD_NEW_TODOS(state, todoObject) {

      // Add new created todo object in list if not exist in db
      if (todoObject.project_id === state.currentProjectId) {

        todoObject.subtask_count = 0
        todoObject.completed_subtask_count = 0
        todoObject.progress_count = ''
        todoObject.isDelete = false

        // Manage code for the real-time data from multi browser for the new todo created on same index
        if (state.isDeleteObj) {
          state.todolist.splice(state.todolist.length - 1)
          state.isDeleteObj = false
        }
        console.log('Vuex-add todo-->')
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
        state.arrAttachment.unshift(fileObject)
      }
    },
    HISTORY_LOG(state, historyObject) {
      if (historyObject instanceof Array) {
        _.forEach(historyObject, function (object) {
          let index = _.findIndex(state.taskHistoryLog, function (d) { return d.id == object.id })
          if (index < 0) {
            state.taskHistoryLog.push(object)
          }
        });
      }
      else if (historyObject instanceof Object) {
        state.taskHistoryLog.unshift(historyObject)
      }
    },
    DELETE_ATTACHMENT(state, deleteAttachment) {
      let removeAttachmentIndex = _.findIndex(state.arrAttachment, function (d) { return d.id == deleteAttachment.id })
      state.arrAttachment.splice(removeAttachmentIndex, 1)
    },
    DELETE_ATTACHMENTS(state) {
      state.arrAttachment = []
    },
    DELETE_PROJECT_LIST(state) {
      state.projectlist = []
      // state.isNoProjectShow = true;
    },
    GET_SETTINGS(state, data) {
      state.settingsObject = data
      for (var i = 0; i < data.length; i++) {
        let index = _.findIndex(state.settingsObject, function (d) { return d.id == data[i].id })
        if (state.settingsObject[index].user_setting.length > 0) {
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
        parentId: data.parentId,
        commentBy: data.commentBy,
        comment: data.comment,
        createdAt: new Date().toJSON(),
        username: state.userObject.fullname,
        image_url: state.userObject.image_url
      })
    },
    DELETE_COMMENT(state, data) {
      let removeTaskComments = _.findIndex(state.taskComment, function (d) { return d.id == data.id })
      state.taskComment.splice(removeTaskComments, 1)
      console.log('DELETE_COMMENT', state.taskComment)
    },
    updateTodo(state, todoObject) {
      // setCheckboxColor(state, todoObject)
    },
    SETTING_UPDATE(state, todoObject) {

      for (var i = 0; i < state.settingsObject.length; i++) {
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
      let removeTodoIndex = _.findIndex(state.taskTags, function (d) { return d.id == taskTagObject.id })
      state.taskTags.splice(removeTodoIndex, 1)
    },
    GET_OBJECT_BYID(state, todoObject) {
      state.todoObjectByID = todoObject
    },
    SAVE_USERTOKEN(state, token) {
      state.userToken = token
      // Put user token into storage
      //localStorage.setItem('auth_token', token);
      let location = psl.parse(window.location.hostname)
      location = location.domain === null ? location.input : location.domain
      console.log('Cookie :', Vue.cookie)
      Vue.cookie.set('auth_token', token, { expires: 1, domain: location });

    },
    INSERT_HISTORY_LOG(state, histroyObject) {
      console.log("INSERT_HISTORY_LOG updated", histroyObject)
      if (histroyObject.log_action != 0) {
        try {
          state.taskHistoryLog.unshift(histroyObject)
        } catch (e) {
          state.taskHistoryLog.push(histroyObject)
        }
      }
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
    updateProjectList(state, value) {
      let updateProjectIndex = _.findIndex(state.projectlist, function (d) { return d.id == value.id })
      if (updateProjectIndex >= 0) {
        state.projectlist[updateProjectIndex].project_privacy = value.project_privacy;
        state.projectlist[updateProjectIndex].project_name = value.project_name;
        state.currentProjectId = value.id
        state.currentProjectName = value.project_name
        state.currentProjectPrivacy = value.project_privacy

      }

    },
    updateDragableProjectList(state, value) {
      state.projectlist = value
    },
    updateProjectServiceRoleList(state, value) {
      console.log("updateProjectServiceRoleList value:", value)
      let updateProjectIndex = _.findIndex(state.projectlist, function (d) { return d.id == value.project_id })
      // console.log("updateProjectServiceRoleList:",updateProjectIndex);
      console.log("value:updateProjectIndex", updateProjectIndex)
      if (updateProjectIndex >= 0) {
        // Find user roll name
        var role = _.find(state.userRoles, ['id', value.user_role_id])

        let memberIndex = _.findIndex(state.currentProjectMember, function (member) { return member.user_id == value.user_id })
        state.projectlist[updateProjectIndex].members[memberIndex].roleName = role.name;
        state.projectlist[updateProjectIndex].members[memberIndex].user_role_id = role.id;

        state.currentProjectMember[memberIndex].roleName = role.name;
        state.currentProjectMember[memberIndex].user_role_id = role.id;

        console.log("updateProjectServiceRoleList", state.currentProjectMember)
      }
    },
    /**
    * Update project list deleted by user
    */
    updateDeletedProjectList(state, value) {
      console.log("updateDeletedProjectList:", value);
      let updateProjectIndex = _.findIndex(state.projectlist, function (d) { return d.id == value.id })

      if (updateProjectIndex >= 0) {
        state.projectlist[updateProjectIndex].is_deleted = value.is_deleted;
        state.projectlist.splice(updateProjectIndex, 0)
        console.log("updateDeletedProjectList inside:", value);
      }

      if (value.is_deleted) {
        console.log("updateDeletedProjectList inside delete:", value);
        state.todolist = []
        state.currentProjectId = ""
        state.currentProjectName = ""
        state.currentProjectPrivacy = ''
        state.currentTodoObj = ''
        state.currentProject = ''
        state.userRoles = ''
      }

      if (!state.projectlist && state.projectlist.length > 0) {
        state.isNoProjectShow = false;
      } else {
        state.isNoProjectShow = true;
      }

    },
    /**
    * Update current project member list
    */
    updateProjectMember(state, value) {
      console.log("updateProjectMember()")
      let updateProjectIndex = _.findIndex(state.projectlist, function (d) { return d.id == value.project_id })
      if (updateProjectIndex >= 0) {

        var tempProject = state.projectlist[updateProjectIndex];

        let memberIndex = _.findIndex(tempProject.members, function (member) { return member.user_id == value.user_id })

        if (memberIndex > -1) {
          Vue.delete(tempProject.members, memberIndex)
        }
      }
    },
    updateAccessRight(state, value) {
      console.log("updateAccessRight", value)
      let index = _.findIndex(state.accessRight, function (d) { return d.id == value.id })
      console.log("updateAccessRight index:", index)
      if (index >= 0) {
        Vue.set(state.accessRight, index, value)
      }
      //state.accessRight = {}
    },
    async GET_PROJECT_LIST(state, data) {
      state.projectlist = data;
      if (data.length == 0)
        state.isNoProjectShow = true;
      else
        state.isNoProjectShow = false;
      if (!state.currentProjectId && data.length > 0) {
        state.currentProjectId = data[0].id
        state.currentProjectName = data[0].project_name
        await store.dispatch('getAllTodos', { 'parentId': "", project_id: state.currentProjectId });
      }
    },
    async showDeleteTasks(state) {
      state.deleteItemsSelected = true
      state.parentIdArr.splice(0, state.parentIdArr.length)
      await store.dispatch('getDeleteTask', state.currentProjectId)
    },
    showMyTasks(state) {
      state.deleteItemsSelected = false
      // state.parentIdArr.splice(0, state.parentIdArr.length)
      // state.deletedTaskArr.splice(0, state.deletedTaskArr.length)
    },
    DELETED_TASKS(state, deletedArray) {
      state.deletedTaskArr = deletedArray
    },
    showTasksList(state, payload) {
      state.createdByTaskList = payload
    },
    showRecentlyCompletedTasks(state, payload) {
      state.recentlyCompletedTasks = payload
    },
    showTaskToAssignOthers(state, payload) {
      state.assignedToOthers = payload
    },
    ASSIGN_PROJECT_MEMBER(state, assignMember) {
      console.log("Assign Member:--", assignMember)
      let index = _.findIndex(state.projectlist, function (d) { return d.id == assignMember.project_id })
      if (index > -1) {
        if (!state.projectlist[index].members)
          state.projectlist[index].members = []
        setTimeout(function () {
          let userIndex = _.findIndex(state.arrAllUsers, function (user) { return user._id === assignMember.user_id })
          if (userIndex < 0) {
            state.projectlist[index].members.push({ user_id: assignMember.user_id })
          } else {
            state.projectlist[index].members.push({ user_id: assignMember.user_id, url: state.arrAllUsers[userIndex].image_url, name: state.arrAllUsers[userIndex].name, email: state.arrAllUsers[userIndex].email, user_role_id: assignMember.user_role_id, is_deleted: false, id: assignMember.id })
          }

        }, 2000);

      } else {
        services.projectService.find({
          query: {
            'id': assignMember.project_id, $client: {
              flag: 'projectmember'
            }
          }
        }).then(response => {
          console.log("Project Assign To you:-->", response)
          // 
          var project = response[0];
          var projectMembers = project.members;
          //  projectMembers.forEach(function(member) {
          //      let userIndex = _.findIndex(state.arrAllUsers, function (user) { return user._id === member.user_id })
          //       console.log("User Detail", userIndex);
          //       if (userIndex < 0) {
          //        project.members.push({ user_id: assignMember.user_id  })
          //       } else {
          //        project.members.push({ user_id: assignMember.user_id , url: state.arrAllUsers[userIndex].image_url, name: state.arrAllUsers[userIndex].name,email: state.arrAllUsers[userIndex].email  })
          //       }  
          //       console.log("state.projectlist[index]", state.projectlist[index]);
          //  }, this);

          state.projectlist.push(project);
          state.isNoProjectShow = false;

        })
      }

      // state.deletedTaskArr = deletedArray
    },
    ADD_PROJECT(state, project) {
      state.projectlist.push(project);
      state.isNoProjectShow = false;
    },
    GET_TASK_TYPE(state, payload) {
      state.parentIdArr.splice(0, state.parentIdArr.length)
      state.task_types_list = payload
    },
    ADD_TASK_TYPE(state, payload) {
      Vue.set(state.task_types_list, state.task_types_list.length - 1, payload)
    },
    DELETE_TASK_TYPE(state, payload) {
      let removeIndex = _.findIndex(state.task_types_list, function (d) { return d.id == payload.id })
      // state.task_types_list.splice(removeIndex, 1)
      Vue.delete(state.task_types_list, removeIndex)
    },
    GET_TASK_STATUS(state, payload) {
      state.parentIdArr.splice(0, state.parentIdArr.length)
      state.task_state_list = payload
    },
    ADD_TASK_STATUS(state, payload) {
      Vue.set(state.task_state_list, state.task_state_list.length - 1, payload)
    },
    DELETE_TASK_STATUS(state, payload) {
      let removeIndex = _.findIndex(state.task_state_list, function (d) { return d.id == payload.id })
      Vue.delete(state.task_state_list, removeIndex)
    },
    GET_TYPE_STATE(state, payload) {
      state.task_types_state = payload
    },
    ADD_TASK_STATE(state, payload) {
      state.task_types_state.push(payload)
    },
    DELETE_TASK_STATE(state, payload) {
      let removeIndex = _.findIndex(state.task_types_state, function (d) { return d.id == payload.id })
      Vue.delete(state.task_types_state, removeIndex)
    },
    PERMISSIONS(state, payload) {
      state.permissions = payload;
    },
    roleDelete(state, role) {
      let removeIndex = _.findIndex(state.userRoles, function (d) { return d.id == role.id })
      if (removeIndex > -1)
        Vue.delete(state.userRoles, removeIndex)
    },
    roleCreated(state, role) {
      let lastRole = store.state.userRoles[store.state.userRoles.length - 1];

      Vue.set(store.state.userRoles, store.state.userRoles.length - 1, role)
      // let lastRole=store.state.userRoles[store.state.userRoles.length-1];
      // console.log("LastRole:--",lastRole)
      if (lastRole.name !== role.name) {
        store.state.userRoles.push(lastRole);
      }
      // state.userRoles.push(role)
    },
    roleUpdated(state, role) {
      let roleIndex = _.findIndex(state.userRoles, function (d) { return d.id == role.id })
      if (roleIndex > -1)
        Vue.set(store.state.userRoles, roleIndex, role)
    }
  },
  actions: {
    getUsersRoles({ commit }) {
      services.roleService.find().then(response => {
        console.log("Role list->>", response)
        commit('GET_ROLES', response)
      });
    },
    removeAllEventListners({ commit }) {
      services.tasksService.removeListener("created")
      services.tasksService.removeListener("removed")
      services.tasksService.removeListener('patched')
      services.taskAttachmentService.removeListener('created')
      services.taskAttachmentService.removeListener('removed')
      services.tagsService.removeListener('created')
      services.taskTagsService.removeListener('created')
      services.taskTagsService.removeListener('patched')
      services.taskComments.removeListener('created')
      services.taskComments.removeListener('removed')
      services.projectService.removeListener('patched')
      services.projectService.removeListener('removed')
      services.projectMemberService.removeListener('created')
      services.projectService.removeListener('created')
      services.roleService.removeListener('removed')
      services.roleService.removeListener('created')
      services.roleService.removeListener('patched')
      services.taskHistoryLogs.removeListener('created')

    },
    eventListener({ commit }) {
      // A new message has been created on the server, so dispatch a mutation to update our state/view
      services.tasksService.on('toggleTodoTask', message => {
        console.log("Message Toggle Todo Event:-->", message)
      })


      services.tasksService.on('created', message => {
        console.log("Message Cretaed task:-->", message)
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
        console.log("Message Attachment Cretaed:-->", message)
        commit('SELECT_FILE', message)
      })

      services.taskAttachmentService.on('removed', message => {
        console.log("Message Attachment removed:-->", message)
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

      services.taskComments.on('created', message => {
        console.log("Message commen Logs Cretaed:-->", message)
        commit('ADD_COMMENT', message)
      })

      services.taskComments.on('removed', message => {
        console.log("Message History log Removed:-->", message)
        commit('DELETE_COMMENT', message)
      })
      services.projectService.on('patched', message => {
        console.log("Project patch:", message)

        if (message.is_deleted === true) {
          commit('updateDeletedProjectList', message)
        } else {
          console.log("Path 2------------");
          commit('updateProjectList', message)
        }

      })
      services.taskHistoryLogs.on('created', message => {
        commit('INSERT_HISTORY_LOG', message)
      })
      services.projectMemberService.on('created', message => {
        //  console.log("ASSIGN_PROJECT_MEMBER:-->", message)
        commit('ASSIGN_PROJECT_MEMBER', message)
      })

      services.projectService.on('created', message => {
        message.members = []
        console.log("Project updated:-->", message)
        commit('ADD_PROJECT', message)
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
        services.taskStateService.on('created', message => {
          console.log("Add Task Staus Service:--", message)
          commit('ADD_TASK_STATUS', message)
        })
      services.taskStateService.on('removed', message => {
        console.log("Delete Task state Service:--", message)
        commit('DELETE_TASK_STATUS', message)
      })
      services.roleServicePermission.on('created', message => {
        console.log("Message To create Role permission:--", message)
      })
      services.projectMemberService.on('patched', message => {
        console.log("projectMemberService updated:-->", message)
        if (message.is_deleted === true) {
          services.projectMemberService.get(message.id).then(value => {
            commit('updateProjectMember', value)
          })
        } else {
          commit('updateProjectServiceRoleList', message)
        }

      })
      // Project delete custom patch call
      services.projectService.on('deleteProject', message => {
        commit('updateDeletedProjectList', message)
      })

      services.roleService.on("removed", message => {
        console.log("Role Delete Event:--", message)
        commit('roleDelete', message)
      })

      services.roleService.on("created", message => {
        console.log("Role Created Event:--", message)
        commit('roleCreated', message)
      })

      services.roleService.on("patched", message => {
        console.log("Role Created Event:--", message)
        commit('roleUpdated', message)
      })

      services.roleAccessService.on('patched', message => {
        commit('updateAccessRight', message)
      })

      // Project member delete patch call
      // services.projectMemberService.on('deleteProjectMember', message =>{
      //    console.log("deleteProjectMember updated:-->", message)
      //     services.projectMemberService.get(message).then(value =>{
      //        commit('updateProjectMember', value)
      //     })
      // })  

      // task type 
      services.taskTypeStateService.on("created", message => {
          commit('ADD_TASK_STATE', message)
      })
      services.taskTypeStateService.on("removed", message => {
        commit('DELETE_TASK_STATE', message)
    })
    },
    getAllTodos({ commit }, payload) {
      services.tasksService.find({
        query:
          { parentId: payload.parentId, project_id: payload.project_id }
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
      if (dbId != -1) { // Update existing record
        services.tasksService.patch(dbId, { taskName: insertElement.taskName, taskDesc: '', updatedBy: store.state.userObject._id }, { query: { 'id': dbId } }).then(response => {
          console.log("Update todo list::", response);
          if (response.id) {
            CmnFunc.insertHistoryLog(store, store.state.userObject._id, insertElement.taskName, dbId, Constant.HISTORY_LOG_ACTION.TASK_UPDATE)
          }
        });
      } else {
        let defafultTaskType = store.state.task_types_list.find(type => type.default_Type === 'Todo');
        console.log("Insert new todo::---->", defafultTaskType);
        // Insert new record
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
          project_id: insertElement.project_id,
          type_id: defafultTaskType.id // Default task type is todo 
        }).then(response => {
          console.log("Insert new todo::---->", response);

          CmnFunc.insertHistoryLog(store, store.state.userObject._id, store.state.userObject._id, response.id, Constant.HISTORY_LOG_ACTION.TASK_CREATE)

        });

      }
    },
    editTaskName({ commit }, editObject) {
      if (editObject.todo.id) {
        let self = this
        services.tasksService.patch(editObject.todo.id, {
          taskName: editObject.todo.taskName,
          taskDesc: editObject.todo.taskDesc,
          dueDate: editObject.selectedDate,
          estimatedTime: editObject.estimatedTime,
          priority: editObject.taskPriority,
          assigned_by: editObject.assigned_by,
          assigned_to: editObject.assigned_to,
          updatedBy: store.state.userObject._id,
          type_id: editObject.selectedType,
          state_id: editObject.selectedState
        }, { query: { 'id': editObject.todo.id } }).then(response => {
          console.log("Response editTaskName::", response);
          if (editObject.log_action) {
            CmnFunc.insertHistoryLog(store, store.state.userObject._id, editObject.log_text, response.id, editObject.log_action)
          }
          if (editObject.isAssigned) {
            editObject.callback()
          }
        });
      }
    },
    delete_Todo({ commit }, deleteElement) {
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
            console.log("Resopnse from drag todo", response)
          });

        }
      }
    },
    toggleTodo({ commit }, changeTodo) {
      let dbId = changeTodo.id
      if (dbId) {
        services.tasksService.patch(dbId, {
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


      // commit('SELECT_FILE', attachArr)

      //store.state.isProgress = true
      store.commit('showAttachmentProgress', { 'isProgress': true, 'id': fileObject.taskId })

      uploadFileOnAmazonS3(file, fileTimeStamp, function (src) {
        if (src == "fail") {
          fileObject.cb("fail")
          store.commit('showAttachmentProgress', { 'isProgress': false, 'id': fileObject.taskId })
          return
        }
        commit('SELECT_FILE', attachArr)

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
          uploadedBy: store.state.userObject._id,
          level: fileObject.level,
          file_name_timestamp: fileTimeStamp,
          created_on: new Date()
        }).then(response => {
          store.state.arrAttachment.splice(store.state.arrAttachment.indexOf(attachArr), 1)

          CmnFunc.insertHistoryLog(store, store.state.userObject._id, response.id, fileObject.taskId, Constant.HISTORY_LOG_ACTION.ATTACHMENT_UPLOAD)

          fileObject.cb("success")
        });
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
          CmnFunc.insertHistoryLog(store, store.state.userObject._id, deleteObject.file_name, deleteObject.task_id, Constant.HISTORY_LOG_ACTION.ATTACHMENT_DELETE)
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
    patchAccessPermision({ commit }, data) {
      services.roleAccessService.patch(data.id, {

        access_value: data.access_value
      },
        {
          query: {
            pId: data.pId,
            rId: data.rId,
            task_type: data.taskType
          }
        }
      ).then(response => {
        console.log("Response patch permission::", response);
        // if(response.data.length > 0){
        // commit('SELECT_FILE', response.data) 
        // }
      });
    },
    setAccessPermision(data) {
      console.log("Set permission params:", data);
      return axios.post('http://172.16.160.32:3000' + '/setpermission', {
        resourceId: data.pId,
        roleId: data.rId,
        taskType: data.taskType,
        accessValue: data.access_value,
        app: "todoapp"
      }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then(function (response) {
          console.log("Set permission response:", response);
        })
        .catch(function (error) {
          console.log("Set permission error:", error);
          console.log(error);
        });
    },
    getAllPermissions() {
      axios.get('http://172.16.160.32:3000' + '/getallpermission/todoapp', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      }).then(function (response) {
        console.log("Get all permissions response:", response.data.data);
        return response.data.data
      })
        .catch(function (error) {
          console.log("Get all permissions error:", error);
          console.log(error);
        })
    },
    addAccessPermision({ commit }, data) {
      services.roleAccessService.create({
        pId: data.pId,
        rId: data.rId,
        access_value: data.access_value,
        task_type: data.taskType
      }).then(response => {
        console.log("Response add permission::", response);
        // if(response.data.length > 0){
        // commit('SELECT_FILE', response.data) 
        // }
      });
    },
    getAttachmentFromDB({ commit }, taskId) {
      // services.taskAttachmentService.find({
      //   query: {
      //     task_id: taskId,
      //   }
      // }).then(response => {
      //   if (response.data.length > 0) {
      //     commit('SELECT_FILE', response.data)
      //   }
      // });

      services.taskAttachmentService.find({ query: { task_id: taskId } }).then(response => {
        response.data.sort(function (a, b) {
          return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
        });
        if (response.data.length > 0) {
          commit('SELECT_FILE', response.data)
        }
      })

      // Vue.http.post('/getAttachments', {
      //   task_id: taskId,
      //   isDeleted: false
      // }).then(response => {
      //   if (response.data.length > 0) {
      //     commit('SELECT_FILE', response.data)
      //   }
      // })
    },
    getHistoryFromDB({ commit }, taskId) {
      services.taskHistoryLogs.find({ query: { task_id: taskId } }).then(response => {
        response.sort(function (a, b) {
          return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
        });
        console.log("response:=>", response)
        if (response.length > 0) {
          commit('HISTORY_LOG', response)
        }
      })
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
      services.taskComments.find({ query: { task_id: payload } }).then(response => {
        // console.log("Response getCommnets From DB::", response);
        commit('GET_TASK_COMMENT', response)
      });
      // Vue.http.get('/getComment').then(function (response) {
      //   commit('GET_TASK_COMMENT', response.data)
      // });
    },
    insertTaskComment({ commit }, payload) {

      if (!payload.comment || payload.comment.trim().length == 0)
        return
      payload.createAt = new Date().toJSON();
      if (!payload.parentId)
        payload.parentId = ""
      console.log("Reesponse create Payload From DB::", payload);

      services.taskComments.create(payload).then(function (response) {
        console.log("Response create Comments From DB::", response);
        CmnFunc.insertHistoryLog(store, store.state.userObject._id, response.id, response.task_id, Constant.HISTORY_LOG_ACTION.COMMENT_ADD)
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
      // Create new tag
      services.tagsService.create({
        name: tagObject.tagName,
        created_by_user_id: store.state.userObject._id
      }).then(response => {
        console.log("Response Tag Create::", response);
        // Create new tag log entry
        CmnFunc.insertHistoryLog(store, store.state.userObject._id, response.id, tagObject.taskId, Constant.HISTORY_LOG_ACTION.TAG_CREATE)
        // Add tag into task 
        services.taskTagsService.create({
          tag_id: response.id,
          task_id: tagObject.taskId,
          created_by_user_id: store.state.userObject._id,
          is_deleted: false,
          name: tagObject.name
        }).then(response => {
          console.log("Response Tag_Task create::", response);
          // Add tag into task log entry
          CmnFunc.insertHistoryLog(store, store.state.userObject._id, response.tag_id, response.task_id, Constant.HISTORY_LOG_ACTION.TAG_ADD)
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
        created_by_user_id: store.state.userObject._id
      }).then(response => {
        console.log("Response Tag Find::", response);
        CmnFunc.insertHistoryLog(store, store.state.userObject._id, taskTagObject.tag.id, taskTagObject.taskId, Constant.HISTORY_LOG_ACTION.TAG_ADD)
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
        is_deleted: true, deleted_by_user_id: store.state.userObject._id
      }, { query: { "task_id": taskTagObject.task_id, "tag_id": taskTagObject.tag_id } }).then(response => {
        console.log("Response update task tags:", response);
        // Remove tag into task log entry
        CmnFunc.insertHistoryLog(store, store.state.userObject._id, response.tag_id, response.task_id, Constant.HISTORY_LOG_ACTION.TAG_DELETE)
      });
    },
    changeProjectPrivacy({ commit }, privacy_id) {
      services.projectService.patch(null, {
        project_privacy: privacy_id
      }, { query: { "id": store.state.currentProjectId } }).then(response => {
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
      // return axios.post(process.env.USER_AUTH + '/api/setup', {
        return axios.post(config.user_auth + '/api/setup', {
        email: regObject.email,
        password: regObject.password,
        username: regObject.email,
        fullname: regObject.fullname,
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
      // let apiUrl = loginObj.userType == 1 ? '/api/login' : '/api/login';
      let apiUrl = (loginObj.userType == 1 ? "/api/login" : "/api/ldapauth");
      console.log("API url:", apiUrl)
      // return axios.post(process.env.USER_AUTH + apiUrl, {
        return axios.post(config.user_auth + apiUrl, {
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
          if (error.response.status === 401 || error.response.status === 404) {
            throw new Error('You have entered wrong credentials...')
          }
          if (error.response.status === 403) {
            throw new Error('Login failed')
          }

        });
    },
    socialAuthRegistration({ commit }, objSocialAuth) {
      // return axios.post(process.env.USER_AUTH + '/api/googleauthprocess', {
        return axios.post(config.user_auth + '/api/googleauthprocess', {
        email: objSocialAuth.email,
        aboutme: objSocialAuth.aboutme,
        id: store.state.googleId
      }, {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .then(function (response) {
          commit('SAVE_USERTOKEN', response.data.logintoken)
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            throw new Error('Wrong email address...')
          }
          if (error.response.status === 409) {
            throw new Error('This Email id already exists')
          }
        });
    },
    signInWithLDAP({ commit }, loginObj) {
      console.log("Login Object", loginObj);
      // return axios.post(process.env.USER_AUTH + '/api/ldapauth', {
        return axios.post(config.user_auth + '/api/ldapauth', {
        userid: loginObj.userid,
        passwd: loginObj.passwd
      }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log('LDAP response obj: ', response);
          commit('SAVE_USERTOKEN', response.data.logintoken)
        })
        .catch(function (error) {
          if (error.response) {
            console.log('================================');
            console.log(error.response.data);
            console.log('--------------------------------');
          }
        });
    },
    getUserDetail({ commit }) {
      console.log('token: ', store.state.userToken)
      console.log('cookie token', Vue.cookie.get('auth_token'))
      // return axios.get(process.env.USER_AUTH + '/api/userdetails', {
        return axios.get(config.user_auth + '/api/userdetails', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          // 'Authorization': store.state.userToken
          'Authorization': Vue.cookie.get('auth_token')
        },
      })
        .then(function (response) {
          console.log('userdetail response:', response.data.data)
          commit('GET_USERDETAIL', response.data.data)
          services.socket.emit("userdata", response.data.data._id);
          console.log('USER TOKEN: --->', store.state.userToken)
          services.socket.emit("authorization", store.state.userToken);
        })
        .catch(function (error) {
          console.log('userdetail error:', error)
          throw error
        })
    },
    updateUserProfile({ commit }, objProfile) {
      // var url = (process.env.USER_DETAIL + '/updateuserdetails/' + store.state.userObject._id)
      var url = (config.user_detail + '/updateuserdetails/' + store.state.userObject._id)
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
            'Authorization': Vue.cookie.get('auth_token')
          }
        })
        .then(function (response) {

        })
        .catch(function (error) {
          throw error
        })
    },
    async getAllUsersList({ commit }, callback) {
      try {
        // let { data } = await axios.get(process.env.USER_DETAIL + '/alluserdetails', {
          let { data } = await axios.get(config.user_detail + '/alluserdetails', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': Vue.cookie.get('auth_token')
          }
        })
        commit('GET_ALL_USERS', data.data)
        if (callback) {
          callback();
        }
        //callback();
        return data.data
      } catch (error) {
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
            { project_privacy: '0', is_deleted: false },
            { project_privacy: '1', is_deleted: false },
            { project_privacy: '2', create_by: userId, is_deleted: false }
          ],
          $client: {
            flag: 'allprojectlist'
          }
        }
      }).then(response => {
        // console.log("Response from Project", response)
        commit('GET_PROJECT_LIST', response)
      });
      // Vue.http.post('/tasks_parentId', { parentId: payload.parentId }).then(function (response) {
      //   commit('GET_TODO', response.data)
      // });
    },
    getPermissions({ commit }) {
      services.permissionsService.find().then(response => {
        console.log("Response from Permisisons", response)
        commit('PERMISSIONS', response)
      });
      // Vue.http.post('/tasks_parentId', { parentId: payload.parentId }).then(function (response) {
      //   commit('GET_TODO', response.data)
      // });
    },
    insertProject({ commit }, object) {
      var self = this;
      services.projectService.create(object.data).then(response => {
        console.log("Response Project create::", response);
        object.callback(response);
        //  commit('addTodo', {"data":response, "todo": insertElement})
      });
    },
    getDeleteTask({ commit }, payload) {
      // Deleted Create_by and Assigned to from delete task
      // $or: [
      //   { isDelete: true, project_id: payload, created_by: store.state.userObject._id },
      //   { isDelete: true, project_id: payload, assigned_to: store.state.userObject._id }
      // ]
      services.tasksService.find({
        query: {
          $or: [
            { isDelete: true, project_id: payload },
            { isDelete: true, project_id: payload }
          ]
        }
      }).then(response => {
        commit('DELETED_TASKS', response)
      });
    },
    undelete({ commit }, undeleteElement) {
      let dbId = undeleteElement.id
      if (dbId) {
        services.tasksService.patch(dbId, { isDelete: false }).then(response => {
          console.log("Response unDeteleTodo Flag Update:", response)
        })
      }
    },
    deletePermently({ commit }, deletePermentlyEle) {
      let dbId = deletePermentlyEle.id
      services.tasksService.remove(dbId, { query: { 'id': dbId } }).then(response => {
        console.log("Reesponse deleteTodo::", response);
      });
      services.tasksService.on('removed', message => {

      })
    },
    delete_Comment({ commit }, deleteCommentObj) {
      let commentId = deleteCommentObj.id
      services.taskComments.remove(commentId, { query: { 'id': commentId } }).then(response => {
        console.log("Response To Delete Comment:--", response)
        CmnFunc.insertHistoryLog(store, store.state.userObject._id, deleteCommentObj.comment, response.task_id, Constant.HISTORY_LOG_ACTION.COMMENT_DELETE)
      })
    },
    getTaskCreatedBy({ commit }, payload) {
      services.tasksService.find({
        query: {
          $or: [
            { created_by: payload.userID, isDelete: false, project_id: payload.project_id }
          ]
        }
      }).then(response => {
        console.log("Response To Find Created by User Tasks List:--", response)
        commit('showTasksList', response)
      });
    },
    getRecentlyCompletedTasks({ commit }, payload) {
      services.tasksService.find({ query: { project_id: payload.project_id, created_by: payload.userID, completed: true } }).then(response => {
        console.log("Response To Find Created by Recently Completed Tasks List:--", response)
        commit('showRecentlyCompletedTasks', response)
      });
    },
    getTaskToAssignOthers({ commit }, payload) {
      services.tasksService.find({
        query: { project_id: payload.project_id, assigned_by: payload.userID, isDelete: false }
      }).then(response => {
        console.log("Response To Tasks I've assigned To Others:--", response)
        commit('showTaskToAssignOthers', response)
      })
    },
    insertNewRole({ commit }, payload) {
      services.roleServicePermission.create({
        name: payload.name,
        index: payload.index
      }).then(response => {
        console.log("Response To Add New Role:--", response)
      })
    },
    removeNewRole({ commit }, payload) {
      services.roleServicePermission.remove(payload.id,
        { query: { 'id': payload.id } }
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
        services.taskTypesService.patch(payload.id, { type: payload.type, typeDesc: payload.typeDesc, updatedBy: store.state.userObject._id },
          { query: { 'id': payload.id } }).then(response => {
            console.log("Response patch Task Type::", response);
          });
      } else {
        services.taskTypesService.create({
          type: payload.type,
          default_Type: payload.type,
          createdAt: new Date().toJSON(),
          created_by: payload.created_by
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
    getTypeState({ commit }, payload) {
      services.taskTypeStateService.find({ query: { type_id: payload } }).then(response => {
        console.log("GET_TYPE_STATE log type_state", response)
        commit("GET_TYPE_STATE", response)
      })
    },
    insert_type_state({ commit }, payload) {
      let findDuplicate = store.state.task_types_state.find(function (type) {
        return type.type_id === payload.taskType.id && type.state_id === payload.state.id
      })
      if (!findDuplicate) {
        services.taskTypeStateService.create({
          type_id: payload.taskType.id,
          state_id: payload.state.id,
          createdAt: new Date().toJSON()
        }).then(response => {
          console.log("State Selected for task type in DB:", response)
          // commit('ADD_TASK_STATE', response)
        })
      }
    },
    remove_type_state({ commit }, payload) {
      services.taskTypeStateService.remove(payload.id,
        {
          query: { 'id': payload.id }
        }).then(response => {
          console.log("Delete From task type state in db:", response)
          // commit('DELETE_TASK_STATE', response)
        })
    },
    getTaskStaus({ commit }) {
      services.taskStateService.find().then(response => {
        console.log("Response task Staus Find::", response);
        commit('GET_TASK_STATUS', response)
      });
    },
    addTask_State({ commit }, payload) {
      if (payload.state.id != -1) {
        services.taskStateService.patch(payload.state.id,
          { taskState: payload.state.taskState, stateDesc: payload.state.stateDesc, color: payload.color }, {
            query: { 'id': payload.id }
          }).then(response => {
            console.log("Patch respnse Task State Updated: ", response)
          })
      } else {
        services.taskStateService.create({
          taskState: payload.state.taskState,
          createdAt: new Date().toJSON()
        }).then(response => {
          console.log("Insert Taks State:--", response)
        })
      }
    },
    deleteTaskStatus({ commit }, payload) {
      services.taskStateService.remove(payload.id,
        {
          query: { 'id': payload.id }
        }).then(response => {
          console.log("Remove From Task State", response)
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
    editState({ commit }, payload) {
      services.taskStateService.patch(payload.id, {
        taskState: payload.taskState,
        stateDesc: payload.stateDesc
      }).then(response => {
        console.log("Edit State from Right:-", response)
      })
    },
    changeUserRole({ commit }, data) {
      // console.log("roleId:",data);
      services.projectMemberService.patch(null, {
        user_role_id: data.roleId
      }, {
        query: {
          "project_id": data.projectId, "user_id": data.userId
          , $client: {
            flag: 'changeRole'
          }
        }
        }).then(response => {
          // console.log("Response update project member:", response);
          //  commit('UPDATE_TODO', insertElement)
        });
    },
    /**
   * Delete project
   */
    deleteProject({ commit }, data) {
      console.log("project:", data);
      // console.log("state.user_id:",store.state.userObject._id);
      services.projectService.patch(data.id, {
        is_deleted: true,
        deletedBy: store.state.userObject._id
      }).then(response => {
        // console.log("Response update project:", response);
        //  commit('UPDATE_TODO', insertElement)
      });
    },
    /**
     * Delete project member
     */
    deleteProjectMember({ commit }) {
      var member = store.state.removeMember;
      services.projectMemberService.patch(member.id, {
        is_deleted: true,
        deletedBy: store.state.userObject._id
      }).then(response => {

      });
    },
    roleCheckChange({ commit }, role) {
      console.log("Role --->", role);

      if (role.id !== '-1') {
        console.log("Role Check changes")
        services.roleService.patch(role.id, {
          is_checked: role.is_checked
        }).then(response => {
          console.log("Role Check changes", response);
          let userIndex = _.findIndex(store.state.userRoles, function (user) { return user.id === response.id })
          store.state.userRoles[userIndex] = response
        });
      } else {
        if (role.name.length > 0) {
          let insertRole = role
          insertRole.is_checked = true
          // console.log("insert Role --->",insertRole);
          store.dispatch("insertRole", insertRole);
        }
      }
    },
    insertRole({ commit }, role) {
      console.log("insert Role --->", role);
      services.roleService.create({ name: role.name, is_checked: role.is_checked, is_editable: role.is_editable, created_by: role.created_by }).then(response => {
        // store.state.userRoles.push(response)
        // Vue.set(store.state.userRoles, store.state.userRoles.length-1, response)
      })
    },
    historylog({ commit }, task_id) {

      return services.taskHistoryLogs.find({
        task_id: task_id
      }).then(response => {
        return response;
      })
    },
    getCountofTaskType({ commit }, data) {
      console.log("Data id", data)
      services.tasksService.find({
        query: { type_id: data.id }, $client: {
          flag: 'countflag'
        }
      }).then(response => {
        console.log("Response in getCountofTaskType", response)
        if (response.length <= 0) {
          store.dispatch('deleteTaskType', data)
        } else {
          $.notify.defaults({ className: "error" })
          $.notify("Can not Delete", { globalPosition: "top center" })
        }
      })
    },
    getCountofTypeState({ commit }, data) {
      services.taskTypeStateService.find({
        query: { state_id: data.id }, $client: {
          flag: 'countState'
        }
      }).then(response => {
        console.log("Response in getCountofTypeState", response)
        if (response.length <= 0) {
          store.dispatch('deleteTaskStatus', data)
        } else {
          $.notify.defaults({ className: "error" })
          $.notify("Can not Delete", { globalPosition: "top center" })
        }
      })
    },
    renameProjectName({ commit }, value) {
      console.log("value->>", value)
      var projectId = store.state.currentProjectId;
      console.log("value data->>", projectId)
      services.projectService.find({
        query: {
          'id': projectId,
          project_name: value,
          $client: {
            flag: 'projectrename'
          }
        }
      }).then(response => {
        if (response.error) {
          $.notify.defaults({ className: "error" })
          $.notify(response.error, { globalPosition: "top center" })
        } else {

          services.projectService.patch(projectId, {
            project_name: value,
            updated_by: store.state.userObject._id
          }).then(response => {
            console.log("Response renameProjectName:", response);
            //  commit('UPDATE_TODO', insertElement)
            if (response.error) {
              $.notify.defaults({ className: "error" })
              $.notify(response.error, { globalPosition: "top center" })
            }
          });
        }

      })
    },
    /**
     * Find history log using task id
     */
    findHistoryLog({ commit }, taskId) {
      services.taskHistoryLogs.find({ query: { task_id: taskId } }).then(response => {
        response.sort(function (a, b) {
          return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
        });
        store.state.taskHistoryLog = response
        console.log('findHistoryLog() method call', store.state.taskHistoryLog)
      })
    },
    deleteRoles({ commit }, role) {
      services.roleService.remove(role.id).then(response => {
        console.log("Remove Role--->", response)
      });
    },
    closeComment(state, commentId) {
      console.log("Commentid:---", commentId)
      let parentIdArr = store.state.parentIdArr;
      let index = 0;

      let tempParentId = '';
      let removeIndex = [];
      parentIdArr.forEach(function (element) {
        console.log("element id:", element);
        if (element.show_type === "subcomment" && (element.parentId === tempParentId || element.id === commentId) && (element.isPinned === undefined || !element.isPinned)) {
          tempParentId = element.id;
          removeIndex.push(index);
        }
        index++;
      }, this);


      let tempIndex = 0;
      removeIndex.forEach(function (element) {
        Vue.delete(store.state.parentIdArr, element - tempIndex)
        tempIndex++;

      }, this);
    },
    closeChildComment(state, commentId) {
      let parentIdArr = store.state.parentIdArr;
      let index = 0;

      let tempParentId = '';
      let removeIndex = [];

      parentIdArr.forEach(function (element) {
        console.log("element id:", element);
        if (element.show_type === "subcomment" && (element.parentId === tempParentId || element.parentId === comment.id)) {
          tempParentId = element.id;
          removeIndex.push(index);
        }
        index++;
      }, this);


      let tempIndex = 0;
      removeIndex.forEach(function (element) {
        Vue.delete(store.state.parentIdArr, element - tempIndex)
        tempIndex++;

      }, this);
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
      if (state.deleteItemsSelected) {
        return function (id, level) {
          var todolist = state.deletedTaskArr
          todolist = _.sortBy(todolist, 'index')
          return todolist
        }
      } else {
        return function (id, level) {
          var todolist = state.todolist.filter(function (todo) {
            return !todo.isDelete && todo.parentId === id && todo.project_id === store.state.currentProjectId
          })
          todolist = _.sortBy(todolist, 'index')
          return todolist
        }
      }
    },
    parentIdArr: state => state.parentIdArr,
    getHistoryLog: (state, getters) => {
      return function (id) {
        var history = state.taskHistoryLog.filter(history => history.task_id === id)
        return history
      }
    },
    // getAttachment: state => state.arrAttachment,
    getAttachment: (state, getters) => {
      return function (id, level) {
        var attachment = state.arrAttachment.filter(attachment => attachment.task_id === id)
        return attachment
      }
    },
    settingArr: state => state.settingsObject,
    getCommentById: (state, getters) => {
      return function (id, parentId) {
        var comment = state.taskComment.filter(c => c.task_id === id && c.parentId === parentId)
        return comment
      }
    },
    // getTaskTags: state => state.taskTags,
    getTaskTagsById: (state, getters) => {
      return function (id) {
        return state.taskTags.filter(tags => tags.task_id === id)
      }
    },
    getMemberProfileDetail: (state, getters) => {
      return function (uId) {
        let userIndex = _.findIndex(state.arrAllUsers, function (user) { return user._id === uId })
        if (userIndex < 0) {
          return { user_id: uId }
        } else {
          return { user_id: uId, url: state.arrAllUsers[userIndex].image_url, name: state.arrAllUsers[userIndex].name }
        }
      }
    },
    getMemberName: (state, getters) => {
      return function (uId) {
        let userIndex = _.findIndex(state.arrAllUsers, function (user) { return user._id === uId })
        // console.log("user index:--",userIndex)
        if (userIndex > -1)
          return state.arrAllUsers[userIndex].fullname ? state.arrAllUsers[userIndex].fullname : state.arrAllUsers[userIndex].username
        else
          return ""
      }
    },
    isProjectAvailable: state => state.isNoProjectShow,
    getAccessRight: state => state.accessRight,
    getObjectById: state => state.todoObjectByID,
    getAllUserList: state => state.arrAllUsers,
    getProjectList: state => state.projectlist,
    getdeleteArray: state => state.deletedTaskArr,
    getTaskLists: state => state.createdByTaskList,
    getRecentlyCompletedLists: state => state.recentlyCompletedTasks,
    getTaskAssignedToOthers: state => state.assignedToOthers,
    getTaskTypeList: (state) => {
      return state.task_types_list
    },
    getRolesList: (state) => {
      return state.userRoles
    },
    getTaskStausList: state => state.task_state_list,
    getTask_types_state: state => state.task_types_state,
    getIdArray: state => state.splitWidthArr
  },

  plugins: [createPersistedState()]
})
