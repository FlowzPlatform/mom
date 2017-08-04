var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_IO: '"http://172.16.105.110:3030"',
  USER_AUTH: '"http://162.242.223.167:3001"',
  USER_DETAIL: '"http://162.242.223.167:3002"',
  COPY_URL_PATH: '"http://172.16.105.110:3000"'
})
