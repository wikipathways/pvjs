var freeport = require('freeport');
var http    =  require('http');
var mockserver  =  require('mockserver');
var Rx = require('rx');

function getPort() {
  return Rx.Observable.fromNodeCallback(function getPort(callback) {
    if (typeof process.env.MOCKSERVER_PORT !== 'undefined') {
      return callback(null, process.env.MOCKSERVER_PORT);
    }

    freeport(function(err, port) {
      if (err) {
        return callback(err, port);
        //throw err;
      }
      return callback(null, port);
    });
  })();
}

// TODO there must be a better way to do this.
// I want to close the server when any/all tests are complete.
function gracefullyCloseServer(server) {
  setTimeout(function() {
    var connectionCount = server._connections;
    if (connectionCount > 0) {
      return gracefullyCloseServer(server);
    }

    return server.close();
  }, 5000);
}

function launch() {
  if (!!process.env.MOCKSERVER_PORT) {
    return Rx.Observable.empty();
  }

  return getPort()
  .map(function(port) {
    process.env.MOCKSERVER_PORT = port;
    return http.createServer(
      mockserver(__dirname + '/mockserver-data/')
    )
    .listen(port);
  })
  .doOnNext(function(server) {
    //gracefullyCloseServer(server);
  });
}

module.exports = {
  launch: launch,
  close: gracefullyCloseServer
};
