const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');

const socketio = require('feathers-socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const rethink = require('rethinkdbdash');
const errorHandler = require('feathers-errors/handler');
const rest = require('feathers-rest');

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
// Enable the REST provider for services.
app.configure(rest())
// app.configure(socketio());
app.configure(socketio(4030,{wsEngine: 'uws', origin: '*.flowz.com:*'},function(io) {
    io.on('connection', function(socket) {
        console.log("connection handshaken-->",socket.feathers)
    //   socket.emit('news', { hello: 'world' });
      socket.on('userdata', function (data) {
              socket.feathers.userId=data ;
      });
    });

    io.use(function(socket, next) {
        
      next();
    });

}));

// Set up our services (see `services/index.js`)
app.configure(services);
// Configure middleware (see `middleware/index.js`) - always has to be last
// app.configure(middleware);
app.hooks(appHooks);
app.use(errorHandler());
module.exports = app;
