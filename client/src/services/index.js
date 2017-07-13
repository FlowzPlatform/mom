/* eslint-disable*/
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
// const socket = io('http://172.16.105.110:3030')
const socket = io(process.env.SOCKET_IO)
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
