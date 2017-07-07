/* eslint-disable*/
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
// require('dotenv/config')
// const config = require('config');

const socket = io('http://172.16.105.110:3030')
export const app = feathers().configure(socketio(socket));

//const dotenv = require('../config')
// console.log('service', dotenv.SOCKET_IO_PATH)

//  socket.on('connect',function(){
//  console.log("socket connection",socket)
//   // socket.emit('hello', 'world');
//   // socket.user="ada"
//     //  socket.feathers.connection.custom = { name: 'David' };
// })
  // app.listen(3030);
// export const app = feathers().configure(socketio(function(io) {
//     io.on('connection', function(socket) {
//       socket.emit('news', { text: 'A client connected!' });
//       socket.on('my other event', function (data) {
//         console.log(data);
//       });
//     });
    
//     // Registering Socket.io middleware
//     io.use(function (socket, next) {
//       // Exposing a request property to services and hooks
//       socket.feathers.referrer = socket.request.referrer;
//       next();
//     });
//   }));
// app.listen(3030);
// function(){
//     io.use(function(socket,next){
//       console.log("----- io use-----")
//       socket.feathers.custom = 'Hello world'
//       next();
//     })
// });

// app.listen('http://localhost:3030');
//  socketio.on('connection', function(socket) {
//       io.use(function(socket, next) {
//       socket.feathers.connection.custom = 'Hello world';
//       next();
//     });
//     });
// export const app = feathers().configure(socketio(socket,function(io){
//  io.use(function(socket, next) {
//       socket.feathers.connection.uuu = '============Hello world=================';
//       next();
//     });
// }));

// export const app = feathers()
//   .configure(socketio({
//     wsEngine: 'uws'
//   }))
// app.listen(3030);

// const app = feathers()
//   .configure(socketio({
//     wsEngine: 'uws'
//   }))

// app.listen(3030);

// export const app = feathers().configure(socketio(function(io) {
//     io.on('connection', function(socket) {
//       socket.emit('news', { hello: 'world' });
//       socket.on('my other event', function (data) {
//         console.log(data);
//       });
//     }); 

//     io.use(function(socket, next) {
//       socket.feathers.data = 'Hello world';
//        console.log(socket.feathers);
//       next();
//     });

//   }));
//  app.listen(3030);
// repeat this line for every service in our backend

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

// projectService.filter(function(data, connection, hook) {
//     console.log("Project Service data:-->",data);
//     console.log("Project Service connection:-->",connection);
//     console.log("Project Service hook:-->",hook);
// })

// app.use(socketio(function(io) {
//   io.on('connection', function(socket) {
//      socket.on('join', function(roomId) {
//      socket.connection.feathers.user="dasda";
//      });
//   });
// }));
