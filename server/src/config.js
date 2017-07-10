// const config = require('config');
// const db = config.get('rdb_db')
console.log('config.js - RDB_HOST', process.env.RDB_HOST)
console.log('config.js - RDB_PORT', process.env.RDB_PORT)
console.log('config.js -HOST', process.env.HOST)
console.log('config.js-PORT', process.env.PORT)
module.exports = {
    rethinkdb: {
        db: 'vue_todo',
        servers: [
          {
            host:  process.env.RDB_HOST,
            port: 28015,
          }
        ]
    }
}
