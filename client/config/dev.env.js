var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_IO: '"http://localhost:3030"',
  // USER_AUTH: '"http://ec2-54-88-11-110.compute-1.amazonaws.com"',
  // USER_DETAIL: '"http://54.88.11.110:81"',
  USER_AUTH: '"http://auth.flowz.com"',
  USER_DETAIL: '"http://api.flowz.com/user"',
  // LDAP_AUTH: '"http://auth.flowz.com/api/ldapauth"',
  COPY_URL_PATH: '"http://localhost:3000"',
  accesskey: JSON.stringify(process.env.accesskey),
  secretkey: JSON.stringify(process.env.secretkey)
})
