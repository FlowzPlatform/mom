'use strict';
exports.before = {
  all: [],
  find(hook){
    const query = this.createQuery(hook.params.query);
    const r = this.options.r;
    console.log("query:---------", query)
    hook.params.rethinkdb =query.orderBy('createdAt')
  },
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