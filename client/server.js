const express = require('express')
const r = require('rethinkdbdash')()
const bodyParser = require('body-parser')
const webpack = require('webpack')
const config = require('./build/webpack.dev.conf')
const _ = require('lodash')

const app = express()
const router = express.Router()
const compiler = webpack(config)
const jsonParser = bodyParser.json()
var fs = require("fs");

var path = require('path');
var mime = require('mime');
var pdf = require('html-pdf');
var options = { 
  format: 'Letter',
  "header": {
    "height": "30mm",
    "contents": '<div style="width: 100%;height: 70px;background-color:#F7F4F4"><img style="widht:70%;height:70%" src="https://s3-us-west-2.amazonaws.com/airflowbucket1/obexpense/expenses/Flowz-logo.png"/><span style="float: right;margin-right:10px;margin-top:10px">Minutes of Meeting (MOM)</span></div>'
  },
  "footer": {
    "height": "20mm",
    "contents": '<div style="background-color:#F7F4F4;height:40px"><span style="float: right;margin-right:10px;margin-top:10px;font-size:70%">Powered by &copy; Flows</span><span style="float: left;margin-left:10px;margin-top:10px;font-size:70%">Minutes of Meeting (MOM)</span></div>'
   // "contents": '<div style="text-align: center;">Footer</div>'
  }

};
 
app.get('/report', (req, res) => {
  var file = __dirname + '/out.pdf';
  var filename = path.basename(file);
  var mimetype = mime.lookup(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())


// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

app.post('/getHtmlToPdf', jsonParser, (req, response) => {
  var html = req.body.divHtml;
  pdf.create(html, options).toFile(__dirname+'/out.pdf', function(err, res) {
    if (err) return console.log(err);
    response.send(__dirname);
  });
});

// To remove file from directory
// fs.unlink('./server/upload/my.csv',function(err){
//         if(err) return console.log(err);
//         console.log('file deleted successfully');
//    });

app.use('/api', router)

app.listen(3000, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:3000')
})
