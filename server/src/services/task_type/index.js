'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_task_types')
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
  app.use('/task_types', service(options));
  const taskTypes =app.service('/task_types');
  app.service('task_types').init().then(taskTypes => {
      console.log('Created task_types', taskTypes)
      if(taskTypes.tables_created)
      {
        r.db(db).table(table).insert([
          {'type': 'Todo','defualt_Type': 'Todo', 'index': 0},
        ]).run()
      }
  });

  // Set up our before hooks
  taskTypes.before(hooks.before);

  // Set up our after hooks
  taskTypes.after(hooks.after);

}