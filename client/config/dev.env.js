var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // SOCKET_IO: '"http://172.16.105.110:3030"'
})
