/* launchSelenium task
   ---------------
*/

/*
var seleniumLauncher = require('selenium-launcher');
var gulp = require('gulp');

gulp.task('launchSelenium', function() {
  return seleniumLauncher(function(er, selenium) {
    if (er) {
      selenium.kill();
      return console.log(er);
    }
    return selenium;
  });
});
//*/

  /*
  highland('data', seleniumServer.stderr)
  .each(function seleniumSays(data) {
    var line = data.toString().trim();
    console.log('line');
    console.log(line);
    if (line.indexOf('Started SocketListener on 0.0.0.0:4444') > -1) {
      seleniumServer.kill();
    }
  });

  highland('data', seleniumServer.stdout)
  .each(function seleniumSays(data) {
    var line = data.toString().trim();
    console.log('line');
    console.log(line);
  });
  //*/

var freeport = require('freeport');
var gulp = require('gulp');
var highland = require('highland');
var http = require('http');
var isPortInUse = require('../util/isPortInUse.js')
var selenium = require('selenium-standalone');
var wd = require('wd');

var defaultPort = 4444;
var waitBeforeClosingInterval = 30000;

function getFreePort(preferredPort) {
  return highland([preferredPort])
  .flatMap(isPortInUse)
  .flatMap(function(err, isInUse) {
    if (isInUse) {
      return highland(createFreePortStream());
    } else {
      return highland([preferredPort])
    }
  });
}

var createFreePortStream = highland.wrapCallback(getPort);

function getActiveSeleniumPort() {
  var port = process.env.SELENIUM_PORT || defaultPort;
  var browser = wd.remote({
    hostname: '127.0.0.1',
    port: port
  });

  return highland.wrapCallback(getStatus)(browser)
  .errors(function(err, push) {
    if (err.code === 'ECONNREFUSED') {
      return push(null, false);
    }
    return push(err, port);
  });
}

function getPort(callback) {
  if (typeof process.env.SELENIUMSERVER_PORT !== 'undefined') {
    return callback(null, process.env.SELENIUMSERVER_PORT);
  }

  freeport(function(err, port) {
    if (err) {
      throw err;
    }
    return callback(null, port);
  });
}

function getStatus(browser, callback) {
  browser.status(function(err, status) {
    return callback(err, status);
  });
}

function launch(preferredPort) {
  return getFreePort(preferredPort).flatMap(function(port) {
    var seleniumServerStream = highland.wrapCallback(selenium)({stdio: 'pipe'})
    .errors(function(err) {
      console.log('seleniumServer error');
      console.log(err);
    })
    .map(function(seleniumServer) {
      process.env.SELENIUMSERVER_PORT = port;
      return port;
    });

    /*
    seleniumServerStream.fork()
    .debounce(waitBeforeClosingInterval)
    .each(function(seleniumServer) {
      console.log('Closing selenium server after ' +
        (waitBeforeClosingInterval / 1000) +
        ' sec. inactivity.');
      return seleniumServer.kill();
    });
    //*/

    return seleniumServerStream.fork()
  });
}

function notify(port, done) {
  return highland([port]).map(function(port) {
    console.log('Started selenium server at http://localhost:' +
      port);
    console.log('CTRL-C stops server');
    return done();
  });
}

gulp.task('launchSeleniumServer', function(done) {
  return getActiveSeleniumPort()
  .flatMap(function(port) {
    if (!port) {
      return launch(defaultPort);
    }
    return highland([port]);
  })
  .map(function(port) {
    return port;
  })
  .each(function(res) {
    console.log('res');
    console.log(res);
    return done();
  });
});
