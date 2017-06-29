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
    name: 'attachment',
     // Enable pagination
    paginate: {
        default: 50,
        max: 50
    }
  };

  // Initialize our service with any options it requires 
  app.use('/task_attachment', service(options));

  // app.use('/tasks', {
  //   get(id, params) {
  //     return Promise.resolve({
  //       id,
  //       text: `You have to do ${id}!`
  //     });
  //   }
  // });

  // Get our initialize service to that we can bind hooks
  const taskAttachmentService = app.service('/task_attachment');
  app.service('task_attachment').init().then(task_attachment => {
      console.log('Created task_attachment', task_attachment)
  });

 
  // Set up our before hooks
  taskAttachmentService.before(hooks.before);

  // Set up our after hooks
  taskAttachmentService.after(hooks.after);


}