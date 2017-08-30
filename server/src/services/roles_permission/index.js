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
const table = config.get('tbl_accessright')

module.exports = function() {
  const app = this;
  const options = {
    Model: r,
    name: table
  };

  // Initialize our service with any options it requires 
  app.use('/accessright', service(options));


  // Get our initialize service to that we can bind hooks
  const accessRights = app.service('/accessright');
  app.service('accessright').init().then(accessright => {
      console.log('Created accessright', accessright)
  });


  // Set up our before hooks
  accessRights.before(hooks.before);

  // Set up our after hooks
  accessRights.after(hooks.after);




}