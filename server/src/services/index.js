'use strict';
const message = require('./message');
const tasks = require('./tasks');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(message);
  app.configure(tasks);
};
