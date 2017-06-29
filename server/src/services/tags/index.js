'use strict';
const service = require('feathers-rethinkdb');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'vue_todo'
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