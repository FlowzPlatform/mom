
const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
const subscription = require('flowz-subscription')

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;
  app.use(subscription.subscription)
  subscription.moduleResource.moduleName = 'todo'
  subscription.moduleResource.registerAppModule = {
    'project': {
      'create': 'project/new',
      'read': 'project/new',
      'update': 'project/update',
      'find':'project/find'
    },
    'task': {
      'create': 'task/new',
      'delete': 'task/delete',
      'find':'task/find'
    },
    'message': {
      'create': 'message',
      'find': 'message',
      'update': 'message',
      'delete': 'message'
    }
  }
  subscription.moduleResource.appRoles = ['Admin', 'ProjectManage', 'TeamLead']
  subscription.registeredAppModulesRole()
  subscription.secureService.validate = (route, params, packageInfo, secureRouteInfo) => {
    // console.log('Route===========>', route)
    // console.log('Params===========>', params)
    // console.log('====================== Test Console ===================================',packageInfo)
    return new Promise((resolve, reject) => {
      // console.log(packageInfo.value, '====', packageInfo)
      // console.log('Route---->', secureRouteInfo)

      let userId=secureRouteInfo.data._id;
      if ((route === '/tasks' || route === 'tasks')) {
        app.service('tasks').find({query: { created_by: userId }}).then(result=>{
          // console.log("Result:---",result.length)
          resolve(packageInfo.value > result.length)
        })
      }else if ((route === '/project' || route === 'project')) {
        app.service('project').find({query: { create_by: userId }}).then(result=>{
          // console.log("Result:---",result.length)
          resolve(packageInfo.value > result.length)
        })
      }else if ((route === '/projectmember' || route === 'projectmember')) {
        app.service('projectmember').find({query: { create_by: userId }}).then(result=>{
          // console.log("Result:---",result.length)
          resolve(packageInfo.value >= result.length)
        })
      }else if ((route === '/tags' || route === 'tags')) {
        app.service('tags').find({query: { created_by_user_id: userId }}).then(result=>{
          console.log("Result tags:---",result.length)
          resolve(packageInfo.value > result.length)
        })
      }else if ((route === '/role' || route === 'role')) {
        app.service('role').find({query: { created_by: userId }}).then(result=>{
          console.log("Result:---",result.length)
          resolve(packageInfo.value > result.length)
        })
      }else if ((route === '/task_types' || route === 'task_types')) {
        app.service('task_types').find({query: { created_by: userId }}).then(result=>{
          // console.log("Result:---",result.length)
          resolve(packageInfo.value > result.length)
        })
      }else if ((route === '/task_comments' || route === 'task_comments')) {
        app.service('task_comments').find({query: { commentBy: userId }}).then(result=>{
          // console.log("Result:---",result.length)
          resolve(packageInfo.value > result.length)
        })
      }else if ((route === '/task_tags' || route === 'task_tags')) {
        app.service('task_tags').find({query: { created_by_user_id: userId }}).then(result=>{
          // console.log("Result:---",result.length)
          resolve(packageInfo.value > result.length)
        })
      }
      else{
        resolve(true)        
      }
    })
  }
  app.use(notFound());
  app.use(handler());
  app.use(function(error, req, res, next){
      console.log("Middleware-------->",req);
  })
};
