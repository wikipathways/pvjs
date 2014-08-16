// see the wd example for how to build this: https://github.com/admc/wd/blob/master/gulpfile.js
var gulp = require('gulp')
  , _ = require('lodash')
  , args   = require('yargs').argv
  , fs   = require('fs')
  , highland = require('highland')
  , path = require('path')
  , through = require('through')
  , SpawnMocha = require('spawn-mocha-parallel')
  , seleniumLauncher = require('selenium-launcher')
  ;

require('bdd-with-opts');

gulp.task('testLocalhost', function () {
  var selenium;
  var browsersCompletedCount = 0;
  var pathwayIndexOneBased = 1;
  var expressPort = 3000;
  //args.browsers = (args.browser || 'phantomjs').split(',');
  //args.browsers = (args.browser || 'firefox').split(',');
  //args.browsers = (args.browser || 'safari').split(',');
  // TODO get Chrome working in tests. The chromedriver doesn't seem to be working at present.
  //args.browsers = (args.browser || 'chrome').split(',');
  args.browsers = (args.browser || 'chrome,firefox,safari').split(',');

  // TODO figure out why this hack is needed so as to
  // avoid getting errors in selenium/mocha.
  // This is telling the system to restart the selenium server
  // after running "batchSize" number of tests
  var batchSize;
  if (args.browsers.length > 1) {
    batchSize = 1;
  } else {
    batchSize = 4;
  }

  var pathways = fs.readdirSync('./test/input-data/protocol')
    .filter(function(fileName) {
      return fileName.indexOf('gpml') > -1;
    })
    .map(function(pathwayFileName) {
      var pathway = {};
      pathway.name = pathwayFileName.replace('.gpml.xml', '').replace('.gpml', '');
      pathway.fileName = pathwayFileName;
      return pathway;
    })
    .map(function(pathway) {
      return JSON.stringify(pathway);
    });

  var pathwaysStream = highland(pathways);

  function mocha(opts) {
    var spawnMocha = new SpawnMocha(opts);
    var stream = through(function write(file) {
      spawnMocha.add(file.path);
    }, function() {});
    var errors = [];
    spawnMocha.on('error', function(err) {
      console.error(err.toString());
      errors.push(err);
    }).on('end', function() {
      if(errors.length > 0) {
        console.error('ERROR SUMMARY: ');
        _(errors).each(function(err) {
          console.error(err.toString());
        });
        stream.emit('error', "Some tests failed.");
      }
      stream.emit('end');
    });
    return stream;
  }

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
        debug: true,
      },
      bin: path.join('./node_modules/mocha/bin/mocha'),
      concurrency: args.concurrency | process.env.CONCURRENCY || 3
    };  
    if(args.grep) {
      mochaOpts.flags.g = args.grep;
    }
    mochaOpts.env = function() {
      var env = _.clone(process.env);
      env.PVJS_PATHWAY = opts.pathway;
      if(opts.unit) {
        // unit test
        delete env.SAUCE;
        delete env.SAUCE_USERNAME;
        delete env.SAUCE_ACCESS_KEY;    
      } else {
        // midway + e2e tests
        env.BROWSER = opts.browser;
        env.SAUCE = args.sauce;
      }
      if(opts.midway) {
        // local server port
        env.EXPRESS_PORT = expressPort;
      }
      return env;
    };
    return mochaOpts;
  }

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
      .each(runLocalhostTest);
  }

  function runLocalhostTest(opts) {
    return gulp.src(['./test/tests/localhost.js'], {read: false, globals:[]})
      .pipe(mocha(opts))
      .on('error', function() {
        pathwaysStream.destroy();
        console.log('Destroyed stream due to error.');
        selenium.kill();
      })
      .on('end', function() {
        /*
        if (process.ENV.PVJS_PATHWAY) {
          console.log('Images are different. Please inspect the difference between the expected and actual images here:');
          console.log(pathDiffImage);
          console.log('You can also compare the following two images.');
          console.log('Actual image' + pathActualImage);
          console.log('vs');
          console.log('Expected image' + pathExpectedImage);
          console.log('After comparing, please choose the option corresponding to which image(s) are correct:');
          console.log('(1) Actual');
          console.log('(2) Expected');
          console.log('(3) Both');
          console.log('(4) Neither');

          //
          // Start the prompt
          //
          prompt.start();

          //
          // Get two properties from the user: username and email
          //
          prompt.get(['Option'], function (err, result) {
            //
            // Log the results.
            //
            console.log('Command-line input received:');
            console.log('  Option: ' + result.Option);
          });
        }
        //*/

        browsersCompletedCount += 1;
        if (browsersCompletedCount === args.browsers.length) {
          browsersCompletedCount = 0;
          pathwayIndexOneBased += 1;
          if (pathwayIndexOneBased < pathways.length && (pathwayIndexOneBased % batchSize === 0)) {
            setTimeout(function(){
              pathwaysStream.resume();
            }, 3000)
          } else if (pathwayIndexOneBased === pathways.length) {
            console.log('Completed all tests requested.');
            setTimeout(function(){
              selenium.kill();
              process.exit();
            }, 2000)
          }
        }
      });
  }

  pathwaysStream
  // there is some sort of bug in how selenium and spawn-mocha-parallel are working together that causes it to hang
  // after running 16 tests, at least on my machine. --AR
  // so this batching is a hack that restarts selenium after every 16 pathways.
  // See also the discussion near the top of this file.
  .batch(batchSize)
  .map(function(pathwayBatch) {
    pathwaysStream.pause();
    if (!!selenium) {
      selenium.kill();
    }
    return pathwayBatch;
  })
  .pipe(through(function(pathwayBatch) {
    seleniumLauncher(function(err, seleniumInstance) {
      selenium = seleniumInstance;
      process.env.SELENIUM_PORT = selenium.port;
      return highland(pathwayBatch).each(runBrowsers);
    });
  }))
});

