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

    var client = hook.params.query.$client;
    if (client && client.flag && client.flag == 'rolePermision') {
    hook.params.rethinkdb =r.table("task_types")
        .merge(function(task_type){
          return {
            permission: r.table('permission')
                .merge(function (permission) {
                  return {
                    'roleid': query.filter({'pId':permission('id'),'task_type':task_type('id')}).pluck('rId','access_value')
                    .coerceTo('array')
                  }
                }).coerceTo('array').orderBy('index')	} 
        })
      }
    // hook.params.rethinkdb = query.merge(function (todo) {
    //   return { subtask_count: query.filter({ 'parentId': todo('id') }).count() }
    // })
    //   .merge(function (todo) {
    //     return { completed_subtask_count: query.filter({ 'parentId': todo('id'), 'completed': true }).count() }
    //   })
    //   .merge({ 'progress': 0 })
    //   .merge({ 'progress_count': '' }).orderBy('index')

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