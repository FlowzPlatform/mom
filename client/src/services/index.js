/* eslint-disable*/
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
import * as vuex from '../VuexSession.js'
import config from '../../config/customConfig'

let socket_io;
if(process.env.NODE_ENV == 'development')
    socket_io = process.env.SOCKET_IO
else
    socket_io = config.socket_io

export const socket = io(socket_io, {transports: ['websocket'], upgrade: false}); //, path: '/mom'

 socket.on("connect", function(){
     var userId=vuex.store.state.userObject._id;
    //  console.log('io connected!')
     if (userId) {
      socket.emit("userdata",userId );   
      socket.emit("authorization",vuex.store.state.userToken);
     }
 });
 socket.on("error",function(error){
    console.log('error', error)
    window.location="https://dcrazed.com/wp-content/uploads/2014/01/Unique-Price-Template.jpg";
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
export const taskStateService = app.service('task_state')
export const taskTypeStateService = app.service('task_type_state')
export const permissionsService = app.service('permission')
export const taskComments = app.service('comments')
