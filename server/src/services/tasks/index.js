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
    name: 'tasks',
     // Enable pagination
    paginate: {
        default: 50,
        max: 50
    }
  };

  // Initialize our service with any options it requires 
  app.use('/tasks', service(options));

  // app.use('/tasks', {
  //   get(id, params) {
  //     return Promise.resolve({
  //       id,
  //       text: `You have to do ${id}!`
  //     });
  //   }
  // });

  // Get our initialize service to that we can bind hooks
  const taskService = app.service('/tasks');

  //taskService.get('005f991f-db06-4702-92ac-93c5a1da059c').then(todo => console.log(todo))
  app.service('tasks').find({
    query: {
      parentId: ''
    }
 });

  // Set up our before hooks
  taskService.before(hooks.before);

  // Set up our after hooks
  taskService.after(hooks.after);


}