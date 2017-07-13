var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_IO: '"http://172.16.105.110:3030"',
  USER_AUTH: '"http://172.16.120.64:3000"',
  USER_DETAIL: '"http://172.16.120.64:3005"',
  COPY_URL_PATH: '"http://172.16.105.110:3000"'
})
