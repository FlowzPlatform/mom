/* eslint-disable*/
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
import * as vuex from '../VuexSession.js'

export const socket = io(process.env.SOCKET_IO, {transports: ['websocket'], upgrade: false});

 socket.on("connect", function(){
     var userId=vuex.store.state.userObject._id;
     console.log('io connected!')
     if (userId) {
      socket.emit("userdata",userId );   
     }
 });
export const app = feathers().configure(socketio(socket));

export const tasksService = app.service('tasks')
export const taskAttachmentService = app.service('task_attachment')
export const roleAccessService = app.service('accessright')
export const roleService = app.service('role')
export const tagsService = app.service('tags')
export const taskTagsService = app.service('task_tags')
export const settingService = app.service('getSettings')
export const taskHistoryLogs = app.service('history_logs')
export const projectService = app.service('project')
export const projectMemberService = app.service('projectmember')
export const roleServicePermission = app.service('permission')
export const taskTypesService = app.service('task_types')
export const taskStatusService = app.service('task_status')
export const taskTypeStateService = app.service('task_type_state')
