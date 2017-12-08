
'use strict';
const service = require('feathers-rethinkdb');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const db_username = config.get('db_username')
const db_password = config.get('db_password')
const table = config.get('tbl_projectmember')
const hooks = require('./hooks');
let fs = require('fs');
const rootPath = require('get-root-path');
const path = require('path');

module.exports = function() {
  const app = this;
  let appDir= path.join(rootPath.rootPath, 'config/cacert');
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
    events: ['deleteProjectMember'] 
  };

  // Initialize our service with any options it requires 
  app.use('/projectmember', service(options));
  const projectMemberService = app.service('/projectmember');
  
   app.service('/projectmember');

     app.service('projectmember').init().then(project => {
      console.log('projectmember created', project)
  });
    // Set up our before hooks
  projectMemberService.before(hooks.before);

  // Set up our after hooks
  projectMemberService.after(hooks.after);
  

    app.service('/projectmember').filter(function (data, connection, hook) {
    console.log("<========projectmember Filter response=====>",connection);
    if (!connection.userId) {
      return false;
    }

    console.log("<========Tassk Filter res-->",data);


    return app.service('project').get(data.project_id).then(response => {
      var projectData=response;
      console.log("<========project Filter response=====>",projectData);  
      // console.log("<========Tassk Filter userid=====>",userId);
      if (projectData.project_privacy==="0") {
        return data;
      } else {
         console.log("<========Project member Filter Call=====>",connection.userId);
        return app.service('projectmember').find({ query: { 'user_id':connection.userId, project_id: projectData.id } }).then(response => {
          var pMember=response
          
          if (response && response.length > 0) {
            return data;                                
            
          } else {
            return false;
          }
        })
      }
    })
  });

  });


}