// see the wd example for how to build this: https://github.com/admc/wd/blob/master/gulpfile.js
var _ = require('lodash');
var args   = require('yargs').argv;
var fs   = require('fs');
var gulp = require('gulp');
var highland = require('highland');
var notification = require('../util/notification.js');
var path = require('path');
var selenium = require('selenium-standalone');
var SpawnMocha = require('spawn-mocha-parallel').SpawnMocha;
require('bdd-with-opts');

gulp.task('testLocalhost', ['launchLocalServer'], function(done) {

  /**
   * Create a mocha options object
   *
   * @param {object} opts I think these are the options
   *                  specific to this run?
   * @return {object} opts With any defaults added?
   */
  function buildMochaOpts(opts) {
    var mochaTimeout = 30 * 1000;
    var mochaOpts = {
      flags: {
        //u: 'bdd',
        u: 'bdd-with-opts',
        R: 'spec',
        b: true,
        // timeout: this is the time mocha will spend on one test
        t: mochaTimeout,
        c: true,
        //debug: true,
      },
      bin: path.join('./node_modules/mocha/bin/mocha'),
      // TODO 3 might not work on a single or dual core CPU
      concurrency: args.concurrency | process.env.CONCURRENCY || 3
    };
    if (args.grep) {
      mochaOpts.flags.g = args.grep;
    }
    mochaOpts.env = function() {
      var env = _.clone(process.env);
      // TODO I should be able to get this some other way in the test.
      env.MOCHA_TIMEOUT = mochaTimeout;
      env.PVJS_PATHWAY = opts.pathway;
      if (opts.unit) {
        // unit test
        delete env.SAUCE;
        delete env.SAUCE_USERNAME;
        delete env.SAUCE_ACCESS_KEY;
      } else {
        // midway + e2e tests
        env.BROWSER = opts.browser;
        env.SAUCE = args.sauce;
      }
      if (opts.midway) {
        // local server port
        env.EXPRESS_PORT = localServerPort;
      }
      return env;
    };
    return mochaOpts;
  }

  function mochaStream(opts) {
    opts = opts || {};
    var spawnMocha = new SpawnMocha(opts);

    var endStream = highland('end', spawnMocha);

    // Unknown errors (not test failures)
    // When a test fails, it causes an error to be thrown.
    // Mocha can be working fine; the error is just how Mocha
    // indicates the test didn't pass. These test failure
    // errors are filtered out here.
    var errorStream = highland('error', spawnMocha)
    .filter(function(err) {
      return !err.files;
    })
    .map(function(err) {
      console.log('Unknown Mocha error');
      //console.log(err);
      /*
      pathwaysStream.destroy();
      console.log('Ending all tests.');
      process.exit();
      //*/
      throw err;
    });

    return highland.pipeline(function(s) {
      s.each(function write(file) {
        spawnMocha.add(file.path);
      });

      return highland([errorStream, endStream])
      .merge()
      .head();
    });
  }

  /**
   * Run current test on all browsers currently enabled
   *
   * @param {string} pathway
   * @return
   */
  function runBrowsers(pathway) {
    var browsersCompletedCount = 0;

    return highland(args.browsers)
    .map(function(browser) {
      var opts = {};
      opts.midway = true;
      opts.browser = browser;
      opts.pathway = pathway;
      return opts;
    })
    .map(buildMochaOpts)
    .map(runLocalhostTest)
    .parallel(args.browsers.length)
    .map(function(result) {
      browsersCompletedCount += 1;
      console.log('Browser ' + browsersCompletedCount +
        ' of ' + args.browsers.length +
        ' completed for this test');

      return result;
    })
    .collect();
  }

  /**
   * Run tests for localhost. This could be
   * abstracted to allow for running on other servers.
   *
   * @param {object} opts Mocha options
   * @return
   */
  function runLocalhostTest(opts) {
    return gulp.src(['./test/tests/localhost.js'], {read: false, globals:[]})
    .pipe(mochaStream(opts));
  }

  var pathwaysTestedCount = 0;
  var localServerPort = process.env.LOCALSERVER_PORT || 3000;
  //args.browsers = (args.browser || 'phantomjs').split(',');
  //args.browsers = (args.browser || 'firefox').split(',');
  //args.browsers = (args.browser || 'safari').split(',');
  //args.browsers = (args.browser || 'chrome').split(',');
  args.browsers = (args.browser || 'chrome,firefox').split(',');
  // TODO Need to install Safari driver
  //args.browsers = (args.browser || 'chrome,firefox,safari').split(',');

  var pathways = fs.readdirSync('./test/input-data/protocol')
  .filter(function(fileName) {
    return fileName.indexOf('gpml') > -1;
  })
  .map(function(pathwayFileName) {
    var pathway = {};
    pathway.name = pathwayFileName
    .replace('.gpml.xml', '')
    .replace('.gpml', '');
    pathway.fileName = pathwayFileName;
    return pathway;
  })
  .map(function(pathway) {
    return JSON.stringify(pathway);
  });

  var seleniumServer;
  var pathwaysStream = highland(pathways);

  pathwaysStream
  .flatMap(function(pathway) {
    // there is some sort of bug in how selenium and spawn-mocha-parallel are working together that causes it to hang
    // after running 16 tests, at least on my machine. --AR
    // We're using a kludge of restarting selenium after every pathway.
    if (!!seleniumServer) {
      seleniumServer.kill();
    }

    return highland.wrapCallback(function(cb) {
      selenium.start({stdio: 'pipe'}, function(err, seleniumInstance) {
        seleniumServer = seleniumInstance;
        process.env.SELENIUM_PORT = 4444;
        return cb(null, pathway);
      });
    })();
  })
  .flatMap(runBrowsers)
  .each(function(result) {
    pathwaysTestedCount += 1;
    console.log('Test ' + pathwaysTestedCount +
      ' of ' + pathways.length + ' completed');
    if (pathwaysTestedCount === pathways.length) {
      console.log('Completed all ' + pathways.length +
        ' tests requested.');
      setTimeout(function() {
        // TODO we're using exit() to stop the servers,
        // but this might cause problems down the road,
        // such as: what happens if we run both local and remote tests?
        process.exit();
        //return done();
      }, 1000)
    } else {
      pathwaysStream.resume();
    }
  });

});
