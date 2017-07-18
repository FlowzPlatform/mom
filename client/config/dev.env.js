var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_IO: '"localhost:3030"',
  USER_AUTH: '"http://172.16.120.64:3000"',
  USER_DETAIL: '"http://172.16.120.64:3005"',
  COPY_URL_PATH: '"localhost:3000"'
})
