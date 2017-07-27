'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const errorHandler = require('feathers-errors/handler');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')

const r = require('rethinkdbdash')({
    db: db,
    host: db_host,
    port:db_port
  });
const table = config.get('tbl_project')

module.exports = function() {
  const app = this;
  const options = {
    Model: r,
    name: table,
  };

  // Initialize our service with any options it requires 
  app.use('/project', service(options));
 

  // Get our initialize service to that we can bind hooks
  const project =app.service('/project');
  app.service('project').init().then(project => {
      console.log('Project created', project)
  });


project.filter('created',function(data, connection, hook) {
    console.log("Project Service data:-->",data);
    console.log("Project Service connection:-->",connection);
    console.log("Project Service hook:-->",hook);

     if (!connection.userId) {
      return false;
    }

    return app.service('projectmember').find({ query: { 'create_by': connection.userId } }).then(response => {
      
      if(response && response.length>0)
        {
          return data;
        }else
        {
          return false;
        }
    })


    // return data
})  

  // Set up our before hooks
  project.before(hooks.before);

  // Set up our after hooks
  project.after(hooks.after);

  // project.hooks(hooks);


}