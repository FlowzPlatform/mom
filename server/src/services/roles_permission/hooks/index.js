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

      hook.params.rethinkdb = r.table('permission')
         .merge(function (permission) {
           return {
             'roleid': query.filter({'pId':permission('id')}).pluck('rId')
             .coerceTo('array')
           }
         }).orderBy('index')

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