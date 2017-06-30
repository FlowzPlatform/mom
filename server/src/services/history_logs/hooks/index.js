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
        console.log('query', query)
        hook.params.rethinkdb = query.orderBy('createdAt')
        // hook.params.rethinkdb = query.innerJoin(r.db('vue_todo').table('users'),function (comment, user) {
        //     return comment("commentBy").eq(user("id"))
        // }).map({
        //   cId: r.row("left")("id"),
        //   uId: r.row("right")("id"),
        //   comment: r.row("left")("comment"),
        //   commentBy: r.row("left")("commentBy"),
        //   createdAt: r.row("left")("createdAt"),
        //   username: r.row("right")("username"),
        //   image_url: r.row("right")("image_url"),
        //   task_id: r.row("left")("task_id")
        // }).orderBy('createdAt')
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