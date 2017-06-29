'use strict';
const service = require('feathers-rethinkdb');
// const hooks = require('./hooks');
// var config = require('config');
const r = require('rethinkdbdash')({
    db: 'vue_todo'
  });

module.exports = function() {
  const app = this;
  // const r = require('rethinkdbdash')({
  //   db: 'vue_todo'
  // });

  const options = {
    Model: r,
    name: 'permission',
    
  };

  // Initialize our service with any options it requires 
  app.use('/permission', service(options));
  const permissionService = app.service('/permission');

  app.service('permission').init().then(permission => {
      console.log('Created permission', permission)
      if(permission.created === 0)
          console.log('table exist')
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