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

/**
 * Start selenium server and web server (if needed)
 * Init browser(s), if needed
 * Run tests
 * After X tests, restart selenium server
 *
 */
gulp.task('testLocalhost', ['launchLocalServer'], function() {

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
    /*
    .flatMap(notification.createStream({
      title: 'End',
      message: 'Hello from node, Mr. User!',
      //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
      sound: false, // Only Notification Center or Windows Toasters
      wait: true // wait with callback until user action is taken on notification
    }));
    //*/

    // Unknown errors (not a test failure)
    var errorStream = highland('error', spawnMocha)
    .filter(function(err) {
      return !err.files;
    })
    .map(function(err) {
      console.log('Unknown Mocha error');
      console.log(err);
      throw err;
      /*
      pathwaysStream.destroy();
      console.log('Ending all tests.');
      process.exit();
      //*/
    });

    /*
    // When a test fails, it causes an error to be thrown.
    // Mocha might be working fine; the error is just how Mocha
    // indicates the test didn't pass.
    var testFailureStream = highland('error', spawnMocha)
    .map(function(err) {
      console.log('caught err in map from failed test');
      console.log(err);
      return err;
    })
    .filter(function(err) {
      return !!err.files;
    })
    .errors(function(err, push) {
      console.log('caught err from failed test in errors');
      console.log(err);
    })
    .each(function(err) {
      console.log('caught err from failed test');
      console.log(err);
    });
    //.pipe(process.stdout);
    /*
    .map(function(result) {
      pathwaysStream.pause();
      endStream.pause();
      return result;
    })
    .flatMap(function handleTestFailure(err) {
      endStream.pause();

      // This is a failure of the test.
      if (!!err.files) {
        var browserName = opts.env().BROWSER;
        //var testedItem = opts.env().env.PVJS_PATHWAY;
        var testedItem = 'it';
        return notification.createStream({
          title: 'Test Failed',
          message: 'Click here if it rendered correctly in ' +
                    opts.env().BROWSER,
          //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
          sound: false, // Only Notification Center or Windows Toasters
          wait: true, // wait with callback until user action is taken on notification
          time: 10 * 1000
        })
        .map(function(res) {
          var passes = res.passes;
          if (passes) {
            highland(
              fs.createReadStream(
                'tmp/protocol/proposed-screenshot-hashes.json'))
            //.pipe(process.stdout);
            .pipe(fs.createWriteStream(
                './test/last-known-goods/protocol/screenshot-hashes.json'));
            endStream.resume();
            return highland.nil;
          } else {
            pathwaysStream.destroy();
            console.log('Destroyed stream due to error.');
            process.exit();
          }
        });
      } else {
        console.log('Mocha err');
        console.log(err);
        pathwaysStream.destroy();
        console.log('Destroyed stream due to error.');
        process.exit();
      }
    });
    //*/

    return highland.pipeline(function(s) {
      s.each(function write(file) {
        spawnMocha.add(file.path);
      });

      //return highland([testFailureStream, errorStream, endStream])
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
    //return gulp.src(['./test/tests/empty.js'], {read: false, globals:[]})
    .pipe(mochaStream(opts));
  }

  var pathwaysTestedCount = 0;
  //var localServerPort = 3000;
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
    // so this batching is a hack that restarts selenium after every 16 pathways.
    // See also the discussion near the top of this file.
    if (!!seleniumServer) {
      seleniumServer.kill();
    }

    return highland.wrapCallback(function(done) {
      selenium.start({stdio: 'pipe'}, function(err, seleniumInstance) {
        seleniumServer = seleniumInstance;
        process.env.SELENIUM_PORT = 4444;
        return done(null, pathway);
      });
    })();
  })
  .flatMap(runBrowsers)
  /*
  .flatMap(notification.createStream({
    title: 'My awesome title',
    message: 'Hello from node, Mr. User!',
    //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
    sound: false, // Only Notification Center or Windows Toasters
    wait: true // wait with callback until user action is taken on notification
  }))
  .map(function(response) {
    // response is response from notification
    console.log('response');
    console.log(response);
    return response;
  })
  //*/
  .each(function(result) {
    pathwaysTestedCount += 1;
    console.log('Test ' + pathwaysTestedCount +
      ' of ' + pathways.length + ' completed');
    if (pathwaysTestedCount === pathways.length) {
      console.log('Completed all ' + pathways.length +
        ' tests requested.');
      setTimeout(function() {
        process.exit();
      }, 1000)
    } else {
      pathwaysStream.resume();
    }
  });
  //*/

});
