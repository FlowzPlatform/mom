'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'vue_todo'
  });

  const options = {
    Model: r,
    db: 'vue_todo', //must be on the same connection as rethinkdbdash
    name: 'task_comments'
  };

  // Initialize our service with any options it requires 
  app.use('/history_logs', service(options));

  // Get our initialize service to that we can bind hooks
  const taskHistoryLogs = app.service('/history_logs');

//   // Set up our before hooks
//   taskHistoryLogs.before(hooks.before);

//   // Set up our after hooks
//   taskHistoryLogs.after(hooks.after);


}