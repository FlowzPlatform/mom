// /services/index.js
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

const socket = io('http://172.16.105.110:3030')

export const app = feathers().configure(socketio(socket))
// repeat this line for every service in our backend

export const tasksService = app.service('tasks')
export const taskAttachmentService = app.service('task_attachment')
export const roleAccessService = app.service('accessright')
