'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_task_state')
const db_host = config.get('db_host')
const db_port = config.get('db_port')

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port
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

}