if (!process.env.NODE_ENV) {
  process.env.NODE_ENV='development';
}

var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , colors = require('colors');

express.static.mime.define({'text/plain': ['md']});
express.static.mime.define({'application/xml': ['gpml']});

var app = express();
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();    
});

var testDir = __dirname;

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(testDir, { maxAge: 0 }));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res) {
  res.statusCode = 307;
  res.sendfile(path.join(testDir, 'index.html'));
});

var server = http.createServer(app);

reload(server, app);

server.listen(app.get('port'), function(){
  console.log("Testing web server listening in %s at http://localhost:%d/test", colors.red(process.env.NODE_ENV), app.get('port'));
});


