'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_task_status')
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
  app.use('/task_status', service(options));
  const taskStatus =app.service('/task_status');
  app.service('task_status').init().then(taskStatus => {
      console.log('Created task_status', taskStatus)
  });

  // Set up our before hooks
  taskStatus.before(hooks.before);

  // Set up our after hooks
  taskStatus.after(hooks.after);

}