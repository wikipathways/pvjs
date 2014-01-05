var emitter = new(require('events').EventEmitter);

function Server (app, config) {
  this.app = app;
  this.config = config.server;
}
Server.prototype.on = function(){
  emitter.on.apply(emitter, arguments);
}
Server.prototype.rerun = function(){
  emitter.emit('reload');
}
Server.prototype.start = function() {
  var routes = this.app,
      port = this.config.port;
  routes.listen(port, function(){
    emitter.emit('server-started', routes);
    console.log('Server started. Navigate to http://localhost:' +  port);
  })
};

exports.TestServer = Server;
exports.init = function(e){ // this stinks to high heaven
  emitter = e;
}

