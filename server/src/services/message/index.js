'use strict';
const service = require('feathers-rethinkdb');

module.exports = function() {
  const app = this;
  const r = require('rethinkdbdash')({
    db: 'feathers'
  });

  const options = {
    Model: r,
    db: 'feathers', //must be on the same connection as rethinkdbdash
    name: 'messages',
     // Enable pagination
    paginate: {
        default: 10,
        max: 25
    }
  };

  // Initialize our service with any options it requires 
  app.use('/messages', service(options));

  // Initialize the `messages` table with `messageId` as the primary key
  app.service('messages').init({
        primaryKey: 'id'
    }).then(() => {
        // Use service here
        app.service('messages').create({    
        text: 'message from service 1'
    }).then(message => console.log('Created message', message));
  });

// Find all messages starting with message
 app.service('messages').find({
  query: {
    text: {
      $search: '^message'
    }
  }
});

// Find all messages ending with server
app.service('messages').find({
  query: {
    text: {
      $search: 'server$'
    }
  }
});

}