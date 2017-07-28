'use strict';
exports.before = {
  all: [],
<<<<<<< a1778d5ac936ad9a9c546e36fabb5dc1988f4913
  find(hook){
    const query = this.createQuery(hook.params.query);
    const r = this.options.r;
    console.log("query:---------", query)
    hook.params.rethinkdb =query.orderBy('createdAt')
  },
  // find: [],
=======
  find: [],
>>>>>>> task type get from db
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