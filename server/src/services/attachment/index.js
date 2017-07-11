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
const table = config.get('tbl_attachment')

module.exports = function() {
  const app = this;
  
  const options = {
    Model: r,
    // db: db, //must be on the same connection as rethinkdbdash
    name: table,
     // Enable pagination
    paginate: {
        default: 50,
        max: 50
    }
  };

  // Initialize our service with any options it requires 
  app.use('/task_attachment', service(options));

  // Get our initialize service to that we can bind hooks
  const taskAttachmentService = app.service('/task_attachment');
  app.service('task_attachment').init().then(task_attachment => {
      console.log('Created task_attachment', task_attachment)
  });

 
  // Set up our before hooks
  taskAttachmentService.before(hooks.before);

  // Set up our after hooks
  taskAttachmentService.after(hooks.after);

}