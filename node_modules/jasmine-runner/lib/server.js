require.paths.unshift(__dirname);
var server = require('testserver')
  reporters = require('reporters'), 
  app = require('ServerRoutes'),
  runner = require('TestRunner'),
  emitter = new(require('events').EventEmitter),
  defaultConfig = {server:{port:8124}};

function createServer(config){
  var config = !config? defaultConfig : config;
  app.configure(config);

  server.init(emitter); // this stinks to high heaven
  var testServer = new server.TestServer(app.routes, config),
    testRunner = new runner.RemoteTestRunner(emitter);
  
  testRunner.addReporter(new reporters.ConsoleReporter());
  testRunner.addReporter(new reporters.NotifierReporter());

  testServer.on('server-started', function(){
    testRunner.start(app.routes);
  });
  return testServer;
}  
 
exports.newServer = createServer

