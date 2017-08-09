'use strict';
const tasks = require('./tasks');
const taskAttachment = require('./attachment');
const role = require('./roles');
const permission = require('./permission');
const role_permission = require('./roles_permission');
const tags = require('./tags');
const task_tags = require('./task_tags');
const tasks_settings = require('./settings');
const history_logs = require('./history_logs');
const project = require('./project');
const project_member = require('./projectmember');
const taskType = require('./task_type')
const taskStatus = require('./task_status')
const taskTypeState = require('./task_type_state')

// const r = require('rethinkdbdash')({
//     db: 'vue_todo'
//   });
// var config = require('config');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars

  //  const db = config.get('dbName')
  //   console.log('Rrr===>', r, "====dbName===>", db)
  //   const table = 'permission'
    
  //   try {
  //     console.log("Inside try ")
  //     r.db(db).tableList().contains(table) // create table if not exists
  //     .do(tableExists => r.branch(tableExists, { created: 0 }, r.db(db).tableCreate(table)))
  //     .run();
  //     console.log('permission table created1111111');
  //   } catch (error) {
  //     console.log('error===>', error);
  //   }
  
  app.configure(tasks);
  app.configure(taskAttachment);
  app.configure(role);
  app.configure(permission);
  app.configure(role_permission);
  app.configure(tags);
  app.configure(task_tags);
  app.configure(tasks_settings);
  app.configure(history_logs)
  app.configure(project)
  app.configure(project_member)
  app.configure(loginuser)
  app.configure(taskType)
  app.configure(taskType),
  app.configure(taskStatus)
  app.configure(taskTypeState)
};
