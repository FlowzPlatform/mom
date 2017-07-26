'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_tasks')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const socketio = require('feathers-socketio');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db:db,
    host: db_host,
    port: db_port
  });

  const options = {
    Model: r,
    name: table,
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
     console.log("<========Tassk Filter Call=====>",connection);
    var userId=connection.userId;
    if (!userId) {
      return false;
    }
    var self=this;
    //  $or: [
    //         { parentId: payload.parentId, project_id: payload.project_id, created_by: store.state.userObject._id },
    //         { parentId: payload.parentId, project_id: payload.project_id, assigned_to: store.state.userObject._id }
    //       ]  
    return app.service('project').find({ query: { 'id': data.project_id } }).then(response => {
      // console.log("<========Tassk Filter response=====>",response);  
      // console.log("<========Tassk Filter userid=====>",userId);
      if (response.length>0 && response[0].project_privacy==="0") {
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
  
}