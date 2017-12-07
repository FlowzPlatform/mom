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
//     password: db_password,
//     ssl: {
//       ca: caCert
//     }
//   });
const table = config.get('tbl_accessright')

module.exports = function() {
  const app = this;
  let appDir= path.join(rootPath.rootPath, 'config/cacert');
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
  });
}