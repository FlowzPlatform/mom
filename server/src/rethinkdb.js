const rethinkdbdash = require('rethinkdbdash');

module.exports = function () {
  const app = this;
  const config = require('./config');
  const r = rethinkdbdash(config.rethinkdb);
  const oldSetup = app.setup;

  // console.log("retinkdb.js ####### " , config.rethinkdb.servers[0].host);
  // console.log("retinkdb.js  ####### " , process.env.RDB_HOST);

  app.set('rdb_host',config.rethinkdb.servers[0].host);
  app.set('rdb_port',config.rethinkdb.servers[0].port);
  app.set('rdb_db',config.rethinkdb.db);
  app.set('rethinkdbClient', r);

  app.setup = function (...args) {
    let promise = Promise.resolve();

    // Go through all services and call the RethinkDB `init`
    // which creates the database and tables if they do not exist
    Object.keys(app.services).forEach(path => {
      const service = app.service(path);

      if (typeof service.init === 'function') {
        promise = promise.then(() => service.init());
      }
    });

    // Access the initialization if you want to run queries
    // right away that depend on the database and tables being created
    this.set('rethinkInit', promise);

    promise.then(() => oldSetup.apply(this, args));

    return this;
  };
};
