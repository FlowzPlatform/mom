
'use strict';
const service = require('feathers-rethinkdb');
const config = require('config');
const db = config.get('dbName')
const db_host = config.get('db_host')
const db_port = config.get('db_port')
const table = config.get('tbl_projectmember')

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'vue_todo',
    host: db_host,
    port:db_port
  });

  const options = {
    Model: r,
    name: table,  
  };

  // Initialize our service with any options it requires 
  app.use('/projectmember', service(options));
   app.service('/projectmember');

     app.service('projectmember').init().then(project => {
      console.log('projectmember created', project)
  });


    app.service('/projectmember').filter( function (data, connection, hook) {

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

    // if (connection.userId === data.user_id) {
    //   return data;
    // } else {
    //   retrun false;
    // }
  });

}