var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_IO: '"localhost:3030"',
  USER_AUTH: '"http://162.242.223.167:3001"',
  USER_DETAIL: '"http://162.242.223.167:3002"',
  COPY_URL_PATH: '"localhost:3000"'
})
