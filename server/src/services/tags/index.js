'use strict';
const service = require('feathers-rethinkdb');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_tags')
const db_host = config.get('db_host')
const db_port = config.get('db_port')

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: db,
    // host: db_host,
    // port:db_port
  });

  const options = {
    Model: r,
    name: 'tags',
  };

  // Initialize our service with any options it requires 
  app.use('/tags', service(options));
  app.service('/tags');
  app.service('tags').init().then(tags => {
      console.log('Created tags', tags)
  });
}