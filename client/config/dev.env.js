var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_IO: '"http://localhost:3030"',
  USER_AUTH: '"http://localhost:3001"',
  USER_DETAIL: '"http://localhost:3002"',
  COPY_URL_PATH: '"http://localhost:3000"'
})
