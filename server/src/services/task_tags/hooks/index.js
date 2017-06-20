'use strict';
exports.before = {
  all: [],
  find(hook)
  {

     const query = this.createQuery(hook.params.query);
     const r = this.options.r;
     console.log("query:..",query)
     hook.params.rethinkdb = query.pluck('tag_id','task_id').innerJoin(
        r.table("tags"),
        function (post, user) {
          return post("tag_id").eq(user("id"));
        }).zip().pluck('id', 'name', 'task_id')
     console.log("Tag=>",hook.params.rethinkdb)


    //  hook.result = {
    //   name: "Parvez"
    // }
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
  create(hook){
    console.log("Task tag hook created",hook.result)

    var hookResult=hook.result;
     const r = this.options.r;

      console.log("query:..",hookResult.tag_id)

      return hook.app.service('tags').find({query:{'id':hookResult.tag_id}}).then(tagsResult => {
          // Update the result (the message)
          var right_pane_containertagList=tagsResult[0]
          console.log('tagList:---->',tagList);
          tagList.task_id=hookResult.task_id
          hook.result=tagList;
          console.log("add tag result:--> ",hook.result)
          // Returning will resolve the promise with the `hook` object
          return hook;
        });
   
  },
  update: [],
  patch: [],
  remove: []
};