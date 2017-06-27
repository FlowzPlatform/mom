'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
var config = require('config');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'vue_todo'
  });

  const options = {
    Model: r,
    name: 'permission',
    
  };

  // Initialize our service with any options it requires 
  app.use('/permission', service(options));
  const permissionService = app.service('/permission');
  // Set up our before hook
  // permissionService.before(hooks.before)
  // {
  //   console.log('hooks', hooks.before)
  //   const r = this.options.r;
  //   const db = config.get('dbName')
  //   console.log('Rrr', r, "====dbName===>", db)
  //   const tables = 'permission'
  //   console.log('My custom before hook ran! permission');
  //   r.db(db).tableList().contains(table) // create table if not exists
  //     .do(tableExists => r.branch(tableExists, { created: 0 }, r.db(db).tableCreate(table)))
  //     .run();
  //   console.log('permission table created');
  // };
  
}