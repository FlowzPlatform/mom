'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_task_type_state')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const db_username = config.get('db_username')
const db_password = config.get('db_password')

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port,
    username: db_username,
    password: db_password
  });

  const options = {
    Model: r,
    name: table,
  };

  // Initialize our service with any options it requires 
  app.use('/task_type_state', service(options));
  const taskTypeState =app.service('/task_type_state');
  app.service('task_type_state').init().then(taskTypeState => {
      console.log('Created task_type_state', taskTypeState)
  });

  // Set up our before hooks
  taskTypeState.before(hooks.before);

  // Set up our after hooks
  taskTypeState.after(hooks.after);

}