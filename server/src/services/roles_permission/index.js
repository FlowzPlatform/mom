'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'vue_todo'
  });

  const options = {
    Model: r,
    name: 'accessright'
  };

  // Initialize our service with any options it requires 
  app.use('/accessright', service(options));


  // Get our initialize service to that we can bind hooks
  const accessRights = app.service('/accessright');


  // Set up our before hooks
  accessRights.before(hooks.before);

  // Set up our after hooks
  accessRights.after(hooks.after);


}