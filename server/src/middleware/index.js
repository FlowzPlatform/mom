const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
const subscription = require('D:/Urvashi/Javascript-Workspace/subscription')
console.log('subscription :', subscription)

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;
  app.use(subscription.subscription)
  app.use(notFound());
  app.use(handler());
  app.use(function(error, req, res, next){
      console.log("Middleware-------->",req);
  })
  app.use(function(req, res, next){
    console.log("Subscrion test-------->",req);
})
};
