'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_tasks')
const db_host = config.get('db_host')
const db_port = config.get('db_port')

// const table = 'tasks'
// const feathers = require('feathers');
// const r = require('rethinkdb');
// const config_automated = require('../../config');
// const path = require('path');
// let  connection ;

module.exports = function() {
  const app = this;
  // const Model = app.get('rethinkdbClient');
  // console.log("####### HOST " , config_automated.rethinkdb.servers[0].host);
  // console.log("####### PORT " , config_automated.rethinkdb.servers[0].port);
  // const r = require('rethinkdb');
  // r.connect({
  //     host: config_automated.rethinkdb.servers[0].host,
  //     port: config_automated.rethinkdb.servers[0].port,
  //     db: config_automated.rethinkdb.db
  // }, function(err, conn) {
  //     if (err) throw err;
  //       console.log('error', err)
  //     connection = conn
  // })

  const r = require('rethinkdbdash')({
    db:db,
    // host: db_host,
    // port: db_port
  });

  const options = {
    Model: r,
    name: 'tasks'
  };

  // Initialize our service with any options it requires 
  app.use('/tasks', service(options));

  // Get our initialize service to that we can bind hooks
  const taskService = app.service('/tasks');
  app.service('tasks').init().then(tasks => {
      console.log('Created tasks', tasks)
  });

  // Set up our before hooks
  taskService.before(hooks.before);

  // Set up our after hooks
  taskService.after(hooks.after);



  taskService.filter('created', function(data, connection, hook) {
     console.log("Tassk Create  data:-->",data);
    console.log("Tassk Create connection:-->",connection);
    console.log("Tassk Create hook:-->",hook);
    app.service('projectmember').find({query:{'create_by':"594cdf504b5d41138302f19a"}}).then(response => {
      console.log("cerated_by-->",response);
    })
    

    return data
});

}