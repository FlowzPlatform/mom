'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const middleware = require('../../middleware'); 

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
    // paginate: {
    //     default: 50,
    //     max: 50
    // }
  };

  // Initialize our service with any options it requires 
  app.use('/tasks', service(options));

  // Get our initialize service to that we can bind hooks
  const taskService = app.service('/tasks');
  app.service('tasks').init().then(tasks => {
      console.log('Created tasks', tasks)
  });

  // Set up our before hooks
  taskService.before(hooks.before);

  // Set up our after hooks
  taskService.after(hooks.after);



  taskService.filter('created', function(data, connection, hook) {
     console.log("Tassk Create  data:-->",data);
    console.log("Tassk Create connection:-->",connection);
    console.log("Tassk Create hook:-->",hook);
    app.service('projectmember').find({query:{'create_by':"594cdf504b5d41138302f19a"}}).then(response => {
      console.log("cerated_by-->",response);
    })
    

    return data
});

}