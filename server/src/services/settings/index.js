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
    db: 'vue_todo', //must be on the same connection as rethinkdbdash
    name: 'user_settings',
     // Enable pagination
  };

  // Initialize our service with any options it requires 
  app.use('/getSettings', service(options));
  
  // Get our initialize service to that we can bind hooks
  const tasks_Settings = app.service('/getSettings');

  // Set up our before hooks
  tasks_Settings.before(hooks.before);

  // Set up our after hooks
  tasks_Settings.after(hooks.after);


}