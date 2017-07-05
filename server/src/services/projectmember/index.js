'use strict';
const service = require('feathers-rethinkdb');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'vue_todo'
  });

  const options = {
    Model: r,
    name: 'projectmember',
    
  };

  // Initialize our service with any options it requires 
  app.use('/projectmember', service(options));
   app.service('/projectmember');

     app.service('projectmember').init().then(project => {
      console.log('projectmember created', project)
  });

}