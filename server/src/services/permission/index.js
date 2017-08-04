'use strict';
const service = require('feathers-rethinkdb');
// const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port
  });
const table = config.get('tbl_permission')

module.exports = function() {
  const app = this;
  const options = {
    Model: r,
    name: table,
  };

  // Initialize our service with any options it requires 
  app.use('/permission', service(options));
  const permissionService = app.service('/permission');

  app.service('permission').init().then(permission => {
      console.log('Created permission', permission)
      if(permission.tables_created === 1)
      {
        r.db(db).table(table).insert([
            {'name': 'Task','index': 0},
          {'name': 'Task assign','index': 1},
          {'name': 'Due_date','index': 2},
          {'name': 'Comment','index': 3},
          {'name': 'Add tag','index': 4},
          {'name': 'Delete Tag','index': 5},
          {'name': 'Add attachment','index': 6},
          {'name': 'Delete attachment','index': 7},
          {'name': 'Task priority','index': 8},
          {'name': 'Estimated hours','index': 9},
          {'name': 'Login', 'index':10}
        ]).run()
      }
      else
      {
          console.log('table created')
      }
  });

  // Set up our before hook
  // permissionService.before(hooks.before)
  // {
  //   // console.log('hooks', r)
  //   //const r = this.options.r;
  //   const db = config.get('dbName')
  //   // console.log('Rrr', r, "====dbName===>", db)
  //   const table = 'permission'
  //   console.log('My custom before hook ran! permission');
  //   try {
  //     r.db(db).tableList().contains(table) // create table if not exists
  //     .do(tableExists => r.branch(tableExists, { created: 0 }, r.db(db).tableCreate(table)))
  //     .run();
  //     console.log('permission table created');
  //   } catch (error) {
  //     console.log('error===>', error);
  //   }
    
  // };

//   permissionService.before({
//     all(hook) {
//       console.log('hooks', hook.param)
//     // return this.find().then(data => {
//     //   hook.params.message = 'Ran through promise hook';
//     //   hook.data.result = data;
//     //   // Always return the hook object
//     //   return hook;
//     // });
//   }
// });
  
}