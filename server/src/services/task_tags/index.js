'use strict';
const service = require('feathers-rethinkdb');
const hooks = require('./hooks');
const config = require('config');
const db = config.get('dbName')
const table = config.get('tbl_task_tags')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const db_username = config.get('db_username')
const db_password = config.get('db_password')
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
    //username: db_username,
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
  };

  // Initialize our service with any options it requires 
  app.use('/task_tags', service(options));
  const taskTags =app.service('/task_tags');
  app.service('task_tags').init().then(task_tags => {
      console.log('Created task_tags', task_tags)
  });

  // Set up our before hooks
  taskTags.before(hooks.before);

  // Set up our after hooks
  taskTags.after(hooks.after);


  taskTags.filter(function (data, connection, hook) {
    // console.log("<========Task Tags Filter Call=====>", data);
    var userId = connection.userId;
    if (!userId) {
      return false;
    }
    var self = this;

    return app.service('tasks').get(data.task_id).then(response => {
      var dataTask=response
      // console.log("<========Tassk data reponse=====>",dataTask);  
      return app.service('project').get(dataTask.project_id).then(response => {
      // console.log("<========Tassk project response=====>",response);  
       var dataProject=response
      // console.log("<========Tassk Filter userid=====>",userId);
      if (dataProject.project_privacy === "0") {
        return data;
      } else {
        //  console.log("<========Tassk Filter Call=====>",userId);
        return app.service('projectmember').find({ query: { 'user_id': userId, project_id: dataProject.id } }).then(response => {
          // console.log("<========Tasskprojectmember  Call=====>",response);
          if (response && response.length > 0) {
            return data;
          } else {
            return false;
          }
        })

      }
    })

    })

    

  });
});
}