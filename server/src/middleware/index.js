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
  let totalMessage = 20;
  subscription.moduleResource.appRoles = ['Admin', 'ProjectManage', 'TeamLead']
  subscription.registeredAppModulesRole()
  subscription.secureService.validate = (route, params, packageInfo, secureRouteInfo) => {
    console.log('Route===========>', route)
    console.log('Params===========>', params)
    console.log('====================== Test Console ===================================',packageInfo)
    return new Promise((resolve, reject) => {
      console.log(packageInfo.value, '====', totalMessage)
      console.log('Route', '====', route)
      if ((route === '/tasks' || route === 'tasks') && packageInfo.value >= totalMessage) {
        resolve(true)
      }
      resolve(false)
    })
  }
  app.use(notFound());
  app.use(handler());
  app.use(function(error, req, res, next){
      console.log("Middleware-------->",req);
  })
};
