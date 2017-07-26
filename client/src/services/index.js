/* eslint-disable*/
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
import * as vuex from '../VuexSession.js'

export const sockett = io(process.env.SOCKET_IO, {transports: ['websocket'], upgrade: false});

 sockett.on("connect", function(){
     var userId=vuex.store.state.userObject._id;
     console.log('io connected!')
     if (userId) {
      sockett.emit("userdata",userId );   
     }
 });
sockett.on("reconnect", function () {
//   console.log('reconnect fired!',src.store.state.userObject._id);
//   sockett.emit("userdata", "13456");
});

// sockett.on("disconnect", function () {
//   console.log('disconnect fired!');
// //   sockett.emit("userdata", store.state.userObject._id);
// });
//   io.use(function(socket, next) {
//       socket.feathers.data1 = 'Hello world';
//       next();
//     });
export const app = feathers().configure(socketio(sockett));
// app.configure(socketio(sockett,function(io) {
//        console.log("io--->",io)
//     io.on('connect', function(socket) {
        
//         socket.feathers.data1 = 'Hello world';
//         // console.log("Socket--->",socket)
//         // socket.emit('ehlo', data);
  
//     });

//     io.use(function(socket, next) {
//       socket.feathers.data1 = 'Hello world';
//       next();
//     });

// }));

// app.listen(process.env.SOCKET_IO);

// sockett.on('connect',function(socket){ 
//     console.log("Socket--->",sockett)
//     // Send ehlo event right after connect:
//     sockett.feathers.data = 'Hello world';
// });
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
export const paymentsService = app.service('payments')
// paymentsService.filter('log', function (data, connection, hook) {
//     console.log("client payments Create  data:-->", data);
//     console.log("client payments Create connection:-->", connection);
//     console.log("client  payments Create hook:-->", hook);
//     // connection.userId = data.userId

//     return data
//   });