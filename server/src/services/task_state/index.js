'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_task_state')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const db_username = config.get('db_username')
const db_password = config.get('db_password')
let fs = require('fs');
const rootPath = require('get-root-path');
const path = require('path');

module.exports = function() {
  const app = this;
  let appDir= path.join(rootPath.rootPath, 'config/cacert');
  fs.readFile(appDir, function(err, caCert) {
  const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port,
    //username: db_username,
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
  app.use('/task_state', service(options));
  const taskState =app.service('/task_state');
  app.service('task_state').init().then(taskState => {
      console.log('Created task_state', taskState)
      if(taskState.tables_created)
        {
          r.db(db).table(table).insert([
            {'taskState': 'Active', 'color': '#0ba93e' },
          ]).run()
        }
  });

  // Set up our before hooks
  taskState.before(hooks.before);

  // Set up our after hooks
  taskState.after(hooks.after);
  });
}