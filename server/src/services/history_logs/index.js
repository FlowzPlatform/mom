'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const db_username = config.get('db_username')
const db_password = config.get('db_password')
let fs = require('fs');
const rootPath = require('get-root-path');
const path = require('path');

// const r = require('rethinkdbdash')({
//     db: db,
//     host: db_host,
//     port:db_port,
//     username: db_username,
//     password: db_password
//   });
const table = config.get('tbl_history_log')

module.exports = function() {
  const app = this;
  var appDir= path.join(rootPath.rootPath, 'config/cacert');
  fs.readFile(appDir, function(err, caCert) {
    const r = require('rethinkdbdash')({
      db: db,
      host: db_host,
      port:db_port,
      // username: db_username,
      authKey: db_password,
      if(db_password){
        ssl: {
          ca: caCert
        }
      }
    });
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
  // taskHistoryLogs.before(hooks.before);

//   // Set up our after hooks
//   taskHistoryLogs.after(hooks.after);
  });

}