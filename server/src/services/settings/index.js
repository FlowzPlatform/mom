'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_user_settings')
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
  app.use('/getSettings', service(options));
  
  // Get our initialize service to that we can bind hooks
  const tasks_Settings = app.service('/getSettings');
  app.service('getSettings').init().then(user_settings => {
      console.log('Created user_settings', user_settings)
  }); 

  // Set up our before hooks
  tasks_Settings.before(hooks.before);

  // Set up our after hooks
  tasks_Settings.after(hooks.after);


}