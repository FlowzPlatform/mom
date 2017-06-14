'use strict';
const message = require('./message');
const tasks = require('./tasks');
const taskAttachment = require('./attachment');
const role = require('./roles');
const permission = require('./permission');
const role_permission = require('./roles_permission');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(message);
  app.configure(tasks);
  app.configure(taskAttachment);
  app.configure(role);
  app.configure(permission);
  app.configure(role_permission);
};
