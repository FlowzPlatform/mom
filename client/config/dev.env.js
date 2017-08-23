var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_IO: '"http://localhost:3030"',
  USER_AUTH: '"http://162.242.223.167:3001"',
  USER_DETAIL: '"http://54.88.11.110:81"',
  COPY_URL_PATH: '"http://localhost:3000"'
})
