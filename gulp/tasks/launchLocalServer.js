var freeport = require('freeport');
var gulp = require('gulp');
var highland = require('highland');
var http = require('http');
var isPortInUse = require('../util/isPortInUse.js')
var ecstatic = require('ecstatic')({
  root: __dirname + '/../../',
  showDir: true,
  autoIndex: true
});

var getFreePort = highland.wrapCallback(freeport);

/*
function getPort(preferredPort) {
  return highland([preferredPort])
  .flatMap(function() {

  })
  if (!!process.env.LOCALSERVER_PORT) {
    return done();
  }

}
//*/

gulp.task('launchLocalServer', function(done) {

  var waitBeforeClosingInterval = 2 * 1000 * 60;

  highland(getFreePort())
  .each(function(port) {
    process.env.LOCALSERVER_PORT = port;
    var server = http.createServer(ecstatic);
    server.listen(port)
    console.log('Started local server at http://localhost:' +
      port + '/test');
    console.log('CTRL-C stops server.');

    highland('connection', server)
    .debounce(waitBeforeClosingInterval)
    .each(function(connection) {
      process.env.LOCALSERVER_PORT = undefined;
      delete process.env.LOCALSERVER_PORT;
      console.log('Closing local server after ' +
        (waitBeforeClosingInterval / 1000) +
        ' sec. inactivity.');
      return server.close();
    });

    return done();
  });
});
