'use strict';
exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
   patch(hook){

 
    
    var client = hook.params.query.$client;
    console.log("Find query:-->>",hook.params.query.$client)
    if (client && client.flag && client.flag == 'changeRole') {
      // Do something
    //       const query = this.createQuery(hook.params.query);
    // const r = this.options.r;
    //   hook.params.rethinkdb=query;

    }else{
        this.emit('deleteProjectMember',hook.id)
    }

   // this.emit('deleteProjectMember',hook.id)
    
  //  this.emit('deleteProjectMember',this.get(hook.id))
  },
  remove: []
};
  
exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch(hook){
    console.log("After Find Project menager:-->>",hook.params)
  },
  remove: []
};