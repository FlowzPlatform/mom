'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_tasks')
const db_host = config.get('db_host')
const db_port = config.get('db_port')

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: db,
    // host: db_host,
    // port:db_port
  });

  const options = {
    Model: r,
    name: table,
     // Enable pagination
    // paginate: {
    //     default: 50,
    //     max: 50
    // }
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