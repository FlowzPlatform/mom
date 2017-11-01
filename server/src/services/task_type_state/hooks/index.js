'use strict';
exports.before = {
  all: [],
  find(hook){
    const query = this.createQuery(hook.params.query);
    const r = this.options.r;
    
    var client = hook.params.query.$client;
    console.log("Find query:-->>",query)
    if (client && client.flag && client.flag == 'countState') {
      hook.params.rethinkdb = query
    } 
  },
  // find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};