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
    name: 'task_tags',
    
  };

  // Initialize our service with any options it requires 
  app.use('/task_tags', service(options));
   const taskTags =app.service('/task_tags');


  // Set up our before hooks
  taskTags.before(hooks.before);

  // Set up our after hooks
  taskTags.after(hooks.after);

}