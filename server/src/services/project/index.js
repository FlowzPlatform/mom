'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const errorHandler = require('feathers-errors/handler');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'vue_todo'
  });

  const options = {
    Model: r,
    name: 'project',
    
  };

  // Initialize our service with any options it requires 
  app.use('/project', service(options));
 

  // Get our initialize service to that we can bind hooks
  const project =app.service('/project');
  app.service('project').init().then(project => {
      console.log('Project created', project)
  });


  // Set up our before hooks
  project.before(hooks.before);

  // Set up our after hooks
  project.after(hooks.after);

  // project.hooks(hooks);


}