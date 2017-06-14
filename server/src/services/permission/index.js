'use strict';
const service = require('feathers-rethinkdb');

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
   app.service('/permission');

}