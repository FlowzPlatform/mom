'use strict';
const service = require('feathers-rethinkdb');
const socketio = require('feathers-socketio');
module.exports = function () {
  const app = this;

  //  const options = {
  //      Model:"payments",
  //   events: [ 'log' ],
  // };

  class PaymentService {
  constructor() {
    this.events = ['log'];
  }

  find(params) {
      console.log("LoginUser:-->", params);

     app.configure(socketio(function(io) {
    io.on('connection', function(socket) {
    //   socket.emit('news', { hello: 'world' });
    //   socket.on('my other event', function (data) {
    //     console.log(data);
    //   });
    });

    io.use(function(socket, next) {
      socket.feathers.datavalue = 'Server say hello india';
      next();
    });

}));


      this.emit('log', { userId: params.query.userId });
      // var errorHandler = error => log(`There was an error processing your payment: ${error.message}`);

      return;
    }
}
  // class paymentService {
  //   constructor() {
  //     this.events = ['log'];
  //     },

  //   find(params) {
  //     console.log("LoginUser:-->", params);
  //     this.emit('log', { userId: params.userId });
  //     // var errorHandler = error => log(`There was an error processing your payment: ${error.message}`);

  //     return;
  //   }
  // };

  app.use('/payments', new PaymentService());

  //  app.service('/payments').all(hook)
  //  {
  //     console.log("payments Create  data:-->",data);   
  //  };

  app.service('/payments').filter('log', function (data, connection, hook) {
    console.log("payments Create  data:-->", data);
    console.log("payments Create connection:-->", connection);
    console.log("payments Create hook:-->", hook);
    // connection.userId = data.userId

    return data
  });
}
