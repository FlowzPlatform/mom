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

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(tasks);
  app.configure(taskAttachment);
  app.configure(role);
  app.configure(permission);
  app.configure(role_permission);
  app.configure(tags);
  app.configure(task_tags);
  app.configure(tasks_settings);
  app.configure(history_logs)
};
