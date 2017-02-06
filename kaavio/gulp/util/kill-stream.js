var highland = require('highland');
var http = require('http');

function isPortInUse(port) {
  return highland([port]).map(function(port) {
    var server = http.createServer().listen(port);
    return server;
  })
  .flatMap(function(server) {
    var listeningStream = highland('listening', server)
    .map(function() {
      if (!!server) {
        server.close();
      }
      return false;
    });

    var errorStream = highland('error', server)
    .map(function(err) {
      var result = true;
      if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        return true;
      } else {
        console.log('Error starting server.');
        return err;
      }
    });

    return listeningStream.otherwise(errorStream);
  });
}

module.exports = isPortInUse;
