module.exports = {
  NODE_ENV: '"production"',
  SOCKET_IO: '"http://localhost:3030"',
  USER_AUTH: '"http://localhost:3001"',
  USER_DETAIL: '"http://localhost:3002"',
  COPY_URL_PATH: '"http://localhost:3000"',
  accesskey: JSON.stringify(process.env.accesskey),
  secretkey: JSON.stringify(process.env.secretkey)
}
