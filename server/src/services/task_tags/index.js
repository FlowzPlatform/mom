'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_task_tags')
const db_host = config.get('db_host')
const db_port = config.get('db_port')

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port
  });

  const options = {
    Model: r,
    name: table,
  };

  // Initialize our service with any options it requires 
  app.use('/task_tags', service(options));
  const taskTags =app.service('/task_tags');
  app.service('task_tags').init().then(task_tags => {
      console.log('Created task_tags', task_tags)
  });

  // Set up our before hooks
  taskTags.before(hooks.before);

  // Set up our after hooks
  taskTags.after(hooks.after);

      taskTags.filter(function(data, connection, hook) {
     console.log("taskTags Create  data:-->",data);
    console.log("taskTags Create connection:-->",connection);
    console.log("taskTags Create hook:-->",hook);
    // app.service('projectmember').find({query:{'create_by':"594cdf504b5d41138302f19a"}}).then(response => {
    //   console.log("cerated_by-->",response);
    // })

    return data
});

}