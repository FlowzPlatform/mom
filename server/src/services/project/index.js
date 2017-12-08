'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const errorHandler = require('feathers-errors/handler');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const db_username = config.get('db_username')
const db_password = config.get('db_password')
let fs = require('fs');
const rootPath = require('get-root-path');
const path = require('path');
// const r = require('rethinkdbdash')({
//     db: db,
//     host: db_host,
//     port:db_port,
//     username: db_username,
//     password: db_password,
//     ssl: {
//       ca: caCert
//     }
//   });
const table = config.get('tbl_project')

module.exports = function() {
  const app = this;
  var appDir= path.join(rootPath.rootPath, 'config/cacert');
  fs.readFile(appDir, function(err, caCert) {
    const r = require('rethinkdbdash')({
      db: db,
      host: db_host,
      port:db_port,
      buffer: 5,
      // username: db_username,
      authKey: db_password,
      if(db_password){
        ssl: {
          ca: caCert
        }
      }
    });
  const options = {
    Model: r,
    name: table,
    events:['logproject','deleteProject']
  };

  

  // Initialize our service with any options it requires 
  app.use('/project', service(options));
 

  // Get our initialize service to that we can bind hooks
  const project =app.service('/project');
  app.service('project').init().then(project => {
      console.log('Project created', project)
  });


project.filter('created',function(data, connection, hook) {
   
   console.log(">>>>>>>>>>Project Members<<<<<<<<<<<<<<<<");
  console.log("Project Service data:-->",data);
    console.log("Project Service connection:-->",connection.userId);
    console.log("Project Service hook:-->",hook);
   console.log("============================================");
     if (!connection.userId) {
      return false;
    }  
     console.log("============================================");

    if(data.project_privacy==='0' || connection.userId===data.create_by)
      return data;
    else
      return false;

    // return app.service('projectmember').find({ query: { 'create_by': connection.userId,'project_id':data.id } }).then(response => {
    //  console.log("============================================",response);
    //   if(response && response.length>0)
    //     {
    //       return data;
    //     }else
    //     {
    //       return false;
    //     }
    // })




    // return data
})  

  // Set up our before hooks
  project.before(hooks.before);

  // Set up our after hooks
  project.after(hooks.after);

  // project.hooks(hooks);
  
});

}