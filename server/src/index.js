/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(`Feathers application started on ${app.get('host')}:${port}`)
);

// let services = Promise.resolve();

// Object.keys(app.services).forEach(path => {
//   const service = app.service(path);
//   if(typeof service.init === 'function') {
//     services = services.then(() => service.init());
//   }
// });

// services.then(() => {
//   // const server = app.listen(port);

//   server.on('listening', () =>
//     logger.info(`Feathers application started on ${app.get('host')}:${port}`)
//   );
// });

