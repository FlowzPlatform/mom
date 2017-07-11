'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port
  });
const table = config.get('tbl_task_comments')

module.exports = function() {
  const app = this;
  const options = {
    Model: r,
    name: table
  };

  // Initialize our service with any options it requires 
  app.use('/history_logs', service(options));

  // Get our initialize service to that we can bind hooks
  const taskHistoryLogs = app.service('/history_logs');
  app.service('history_logs').init().then(history_logs => {
      console.log('Created history_logs', history_logs)
  });

//   // Set up our before hooks
  taskHistoryLogs.before(hooks.before);

//   // Set up our after hooks
//   taskHistoryLogs.after(hooks.after);


}