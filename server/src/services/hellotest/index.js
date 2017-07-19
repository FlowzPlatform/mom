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
    db:db,
    host: db_host,
    port: db_port
  });

  const options = {
    Model: r,
    name: table
  };

  // Initialize our service with any options it requires 
  app.use('/hello', service(options));

  // Get our initialize service to that we can bind hooks
  const taskService = app.service('/hello');

  // Set up our before hooks
  taskService.before(hooks.before);

  // Set up our after hooks
  taskService.after(hooks.after);

}