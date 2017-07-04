// /services/index.js
console.log('service', process.env.SECRET_MESSAGE)
console.log('service', process.env.SOCKET_IO)
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
// require('dotenv/config')
// const config = require('config');
// const socket_io = config.get('SOCKET_IO')

console.log('socket..')

// const socket = io('http://172.16.105.110:3030')

const socket = io('localhost:3030')

export const app = feathers().configure(socketio(socket))
// repeat this line for every service in our backend

export const tasksService = app.service('tasks')
export const taskAttachmentService = app.service('task_attachment')
export const roleAccessService = app.service('accessright')
export const tagsService = app.service('tags')
export const taskTagsService = app.service('task_tags')
export const settingService = app.service('getSettings')
export const taskHistoryLogs = app.service('history_logs')
export const projectService = app.service('project')
