'use strict';
exports.before = {
  all: [],
  find(hook){
    const query = this.createQuery(hook.params.query);
    const r = this.options.r;
    console.log("query:---------", query)
    hook.params.rethinkdb =query.orderBy('createdAt')
  },
  // find: [],
  get: [],
  create: [],
  update: [],
  patch(hook){
    // const query = this.createQuery(hook.params.query);
    // const r = this.options.r;
    // hook.params.rethinkdb =query.append(hook.daya)
    // console.log("Before hook in task type", hook)
  },
  // patch: [],
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