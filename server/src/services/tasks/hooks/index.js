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
    hook.params.rethinkdb = query.merge(function (todo) {
      return { subtask_count: query.filter({ 'parentId': todo('id') }).count() }
    })
      .merge(function (todo) {
        return { completed_subtask_count: query.filter({ 'parentId': todo('id'), 'completed': true }).count() }
      })
      .merge({ 'progress': 0 })
      .merge({ 'progress_count': '' })
      .merge({ 'attachmentprogress': 0 })
      .merge({ 'deleteprogress': 0 }).orderBy('index')

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