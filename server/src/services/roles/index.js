'use strict';
const service = require('feathers-rethinkdb');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const table = config.get('tbl_role')
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


module.exports = function() {
  const app = this;
  let appDir= path.join(rootPath.rootPath, 'config/cacert');
  fs.readFile(appDir, function(err, caCert) {
  const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port,
    buffer: 5,
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
    name: table,
  };

  // Initialize our service with any options it requires 
  app.use('/role', service(options));
  app.service('/role');
  app.service('role').init().then(role => {
      console.log('Created role', role)
      if(role.tables_created)
      {
        r.db(db).table(table).insert([
          {'name': 'Owner', 'index': 0},
          {'name': 'Admin', 'index': 1},
          {'name': 'Project Manager', 'index': 2},
          {'name': 'Team Lead', 'index': 3},
          {'name': 'Developer', 'index': 4},
          {'name': 'Guest', 'index': 5}
        ]).run()
      }
  });
  });
}