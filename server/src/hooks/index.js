'use strict';

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.
// import config from '../default.json'
var config = require('config');

exports.myHook = function (options) {
  return function (hook) {
    console.log('My custom global hook ran. Feathers is awesome!');

    console.log('config', config.get('dbName'))
    console.log('Tables', config.get('tablelist.tables').length)
    const r = this.options.r;
    const db = config.get('dbName')
    const tables = config.get('tablelist.tables')
    r.dbList().contains(db) // create db if not exists
      .do(dbExists => r.branch(dbExists, { created: 0 }, r.dbCreate(db)))
      .run().then(() => {
        if (tables && tables.length > 0) {
          tables.forEach(function (table) {
            r.db(db).tableList().contains(table) // create table if not exists
              .do(tableExists => r.branch(tableExists, { created: 0 }, r.db(db).tableCreate(table)))
              .run();
          })
        }
      });
  }
};
  