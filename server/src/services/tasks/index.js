'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_tasks')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const db_username = config.get('db_username')
const db_password = config.get('db_password')
const socketio = require('feathers-socketio');
let fs = require('fs');
const path = require('path');
const rootPath = require('get-root-path');

module.exports = function() {
  const app = this;
  var appDir= path.join(rootPath.rootPath, 'config/cacert');
  console.log("Path from :---",appDir)
  fs.readFile(appDir, function(err, caCert) {
  // const r = require('rethinkdbdash')({
  //   db:db,
  //   host: db_host,
  //   port: db_port,
  //   buffer: 5,
  //   user: db_username,
  //   password: db_password,
  //   timeout:60,
  //   pingInterval:5,
  //   // if(db_password){
  //   //   ssl: {
  //   //     ca: caCert
  //   //   } 
  //   // }
  // });

 var connOption= {
    db: db,
    discovery: false,
    timeout: 10,
    buffer: 5,
    authKey: db_password,
    servers: [
        {
            host: db_host,
            port: db_port
        }
    ]
}
  if(db_password && db_password.length>0) {  connOption.ssl= {ca: caCert, rejectUnauthorized: true}}
  const r = require('rethinkdbdash')(connOption);


console.log("ssl options:--", r);
  // var pathUrl=path.format({
  //   dir: 'D:\Urvashi\Projects\todo-vue\TODO-Github\todo-vue-dynamic-component\server\config',
  //   base: 'cacert'

  // });
  var appDir = path.dirname(require.main.filename);
 
  const options = {
    Model: r,
    name: table,
    events: ['toggleTodoTask']
  };

  // Initialize our service with any options it requires 
  app.use('/tasks', service(options));

// app.configure(socketio(function(io) {
//     io.on('connection', function(socket) {
//     //   socket.emit('news', { hello: 'world' });
//     //   socket.on('my other event', function (data) {
//     //     console.log(data);
//     //   });
//     });

//     io.use(function(socket, next) {
//       socket.feathers.data = 'Server say hello india';
//       next();
//     });

// }));

  

  // Get our initialize service to that we can bind hooks
  const taskService = app.service('/tasks');
  app.service('tasks').init().then(tasks => {
      console.log('Created tasks', tasks)
  });

  // Set up our before hooks
  taskService.before(hooks.before);

  // Set up our after hooks
  taskService.after(hooks.after);



 


  taskService.filter(function(data, connection, hook) {
     console.log("<========Tassk Filter Call task =====>",data);
    var userId=connection.userId;
    if (!userId) {
      return false;
    }
    var self=this;
    //  $or: [
    //         { parentId: payload.parentId, project_id: payload.project_id, created_by: store.state.userObject._id },
    //         { parentId: payload.parentId, project_id: payload.project_id, assigned_to: store.state.userObject._id }
    //       ]  
      // console.log("<========Tassk Filter response= data.project_id ====>",data.project_id);  

    return app.service('project').get(data.project_id).then(response => {
      // console.log("<========Tassk Filter userid=====>",userId);
      if (response.project_privacy==="0") {
        return data;
      } else {
        //  console.log("<========Tassk Filter Call=====>",userId);
        return app.service('projectmember').find({ query: { 'user_id':userId, project_id: data.project_id } }).then(response => {
          if (response && response.length > 0) {
            return data;
          } else {
            return false;
          }
        })

      }
    })
   
});
}); 
}