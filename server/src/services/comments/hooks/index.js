'use strict';
const globalHooks = require('../../../hooks');

exports.before = {
  all: [
    // call global hook
    globalHooks.myHook()
  ],
  find(hook){
    const query = this.createQuery(hook.params.query);
    const r = this.options.r;
    hook.params.rethinkdb = query.merge(function(task_comment){
      return {
        count: r.table("task_comments")
        .filter({"parentId":task_comment('id') }).count()
      }
    }).orderBy('createdAt')
  },
  get: [],
  create: [],
  update:[],
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