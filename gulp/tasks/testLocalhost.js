// see the wd example for how to build this: https://github.com/admc/wd/blob/master/gulpfile.js
var gulp = require('gulp');
var _ = require('lodash');
var args   = require('yargs').argv;
var fs   = require('fs');
var highland = require('highland');
var inquirer = require('inquirer');
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
  var browsersCompletedCount = 0;
  var pathwaysTestedCount = 0;
  process.env.TESTS_RUN_COUNT = pathwaysTestedCount;
  //var localServerPort = 3000;
  var localServerPort = process.env.LOCALSERVER_PORT;
  //args.browsers = (args.browser || 'phantomjs').split(',');
  //args.browsers = (args.browser || 'firefox').split(',');
  //args.browsers = (args.browser || 'safari').split(',');
  //args.browsers = (args.browser || 'chrome').split(',');
  args.browsers = (args.browser || 'chrome,firefox').split(',');
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

  var pathwaysStream = highland(pathways);

  var seleniumServer;
  pathwaysStream
  .flatMap(function(pathway) {
    console.log('pathway');
    console.log(pathway);
    // there is some sort of bug in how selenium and spawn-mocha-parallel are working together that causes it to hang
    // after running 16 tests, at least on my machine. --AR
    // so this batching is a hack that restarts selenium after every 16 pathways.
    // See also the discussion near the top of this file.
    if (!!seleniumServer) {
      console.log('kill seleniumServer');
      seleniumServer.kill();
    }

    return highland.wrapCallback(function(done) {
      selenium.start({stdio: 'pipe'}, function(err, seleniumInstance) {
        seleniumServer = seleniumInstance;
        console.log('started seleniumServer');
        process.env.SELENIUM_PORT = 4444;
        return done(null, pathway);
      });
    })();
  })
  .flatMap(runBrowsers)
  .each(function(result) {
    pathwaysTestedCount += 1;
    console.log('Tests completed: ' + pathwaysTestedCount +
      ' of ' + pathways.length);
    if (pathwaysTestedCount === pathways.length) {
      console.log('Completed all tests requested.');
      setTimeout(function() {
        process.exit();
      }, 1000)
    } else {
      pathwaysStream.resume();
    }
  });

  /**
   * Create a mocha options object
   *
   * @param {object} opts I think these are the options
   *                  specific to this run?
   * @return {object} opts With any defaults added?
   */
  function buildMochaOpts(opts) {
    var mochaOpts = {
      flags: {
        //u: 'bdd',
        u: 'bdd-with-opts',
        R: 'spec',
        b: true,
        // timeout: this is the time mocha will spend on one test
        t: 20000,
        c: true,
        //debug: true,
      },
      bin: path.join('./node_modules/mocha/bin/mocha'),
      concurrency: 2 //args.concurrency | process.env.CONCURRENCY || 3
    };
    if (args.grep) {
      mochaOpts.flags.g = args.grep;
    }
    mochaOpts.env = function() {
      var env = _.clone(process.env);
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

  var createPromptStream = highland.wrapCallback(inquirer.prompt);

  function mochaStream(opts) {
    opts = opts || {};
    var spawnMocha = new SpawnMocha(opts);

    var endStream = highland('end', spawnMocha)
    .map(function(result) {
      browsersCompletedCount += 1;
      console.log('Browsers run for this test: ' +
        browsersCompletedCount + ' of ' + args.browsers.length);
      if (browsersCompletedCount === args.browsers.length) {
        browsersCompletedCount = 0;
      }

      return result;
    });

    var errorStream = highland('error', spawnMocha)
    .flatMap(function handleTestFailure(err) {
      endStream.pause();

      // This is a failure of the test.
      if (!!err.files) {
        var browserName = opts.env().BROWSER;
        //var testedItem = opts.env().env.PVJS_PATHWAY;
        var testedItem = 'it';
        return highland(createPromptStream({
          type: 'confirm',
          name: 'passes',
          message: 'Does ' + testedItem +
              ' render correctly in ' + browserName + '?'
        }))
        .errors(function(err, push) {
          // inquirer.prompt doesn't follow the node callback style convention
          // of passing error back as first argument, so this "error handling" is
          // required to pass along the actual response in addition to any errors.
          if (_.isPlainObject(err)) {
            // err is not actually an error! It's res.
            push(null, err);
          } else {
            // err is an error.
            push(err);
          }
        })
        .last()
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

    return highland.pipeline(function(s) {
      s.each(function write(file) {
        spawnMocha.add(file.path);
      });

      return highland([errorStream, endStream]).merge().head();
    });
  }

  /**
   * Run current test on all browsers currently enabled
   *
   * @param {string} pathway
   * @return
   */
  function runBrowsers(pathway) {
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
    //return gulp.src(['./test/tests/localhost.js'], {read: false, globals:[]})
    return gulp.src(['./test/tests/empty.js'], {read: false, globals:[]})
    .pipe(mochaStream(opts));
  }

});
