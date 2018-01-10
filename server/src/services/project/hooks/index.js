'use strict';
const errors = require('feathers-errors');
exports.before = {

  all:[],
  find(hook){
    const userid = hook.params.userId;
    var client = hook.params.query.$client;
    if (client && client.flag && client.flag == 'allprojectlist') {
      const query = this.createQuery(hook.params.query);
      const r = this.options.r;
      hook.params.rethinkdb = query.merge(function (projectid) {
        return {
          'members': r.table('projectmember')
            .filter({ 'project_id': projectid('id') ,'is_deleted':false})
            .orderBy('created_at')
            .coerceTo('array').pluck('user_id','user_role_id','is_deleted','id')
        }
      }
      ).filter(function (project) {
        return project("project_privacy").eq('0').or(project("project_privacy").eq('2'))
          .or(project('members')('user_id').contains(userid))
      }).orderBy('created_at')
    } else if (client && client.flag && client.flag == 'projectmember') {
      const query = this.createQuery(hook.params.query);
      const r = this.options.r;
      hook.params.rethinkdb = query.merge(function (projectid) {
        return {
          'members': r.table('projectmember')
            .filter({ 'project_id': projectid('id'),'is_deleted':false})
            .coerceTo('array').pluck('user_id')
        }
      }
      ).orderBy('created_at')
    }
  },
  get: [],
  create(hook) {
    var hookData = hook.data;
    return this.find({ query: { project_name: hookData.project_name } }).then(reponse => {
      if (reponse.length > 0) {
        hook.result = { error: "Project already exist" }
        // return hook;
      }
      console.log("-----Before created Success------")

      return hook;
    })

  },
  update: [],
  patch(hook){
     //console.log("hook:",hook.result);
    //this.emit('deleteProject',hook.result)
    
  },
  remove: []
};


exports.after = {

  all:[],
  find:[],
  get: [],
  create(hook){
    console.log("-----After created Success------")
/*    var projectData=hook.result;
     console.log("Hook Result--->",{
          project_id:projectData.id,
                user_id:projectData.create_by,
                create_by:projectData.create_by,
                invited_date:new Date()
      })
     
      hook.app.service('/projectmember').create({
          project_id:projectData.id,
                user_id:projectData.create_by,
                create_by:projectData.create_by,
                invited_date:new Date()
      }).then(result => {
         console.log("Project Created");
      });
    */

},
  update: [],
  patch(hook){
     //console.log("hook:",hook.result);
    // this.emit('deleteProject',hook.result)
  },
  remove: []
};





