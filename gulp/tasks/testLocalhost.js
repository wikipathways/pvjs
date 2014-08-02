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

// TODO use browserSync or something to enable automatically starting the server
//gulp.task('testLocalhost', ['browserSync'], function () {
gulp.task('testLocalhost', function () {

  var selenium;
  var browsersCompletedCount = 0;
  var pathwayIndexOneBased = 1;
  var expressPort = 3000;
  args.browsers = (args.browser || 'phantomjs').split(',');
  //args.browsers = (args.browser || 'firefox,safari').split(',');
  //args.browsers = (args.browser || 'safari').split(',');

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
        t: 6000,
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
      })
      .on('end', function() {
        browsersCompletedCount += 1;
        console.log('Finished testing browser ' + browsersCompletedCount + ' of ' + args.browsers.length + ' for pathway ' + pathwayIndexOneBased + ' of ' + pathways.length);
        if (browsersCompletedCount === args.browsers.length) {
          browsersCompletedCount = 0;
          pathwayIndexOneBased += 1;
          if (pathwayIndexOneBased < pathways.length) {
            pathwaysStream.resume();
          } else {
            console.log('Completed all tests requested.');
            selenium.kill();
          }
        }
      });
  }

  pathwaysStream
  // there is some sort of bug in how selenium and spawn-mocha-parallel are working together that causes it to hang
  // after running 16 tests, at least on my machine. --AR
  // so this batching is a hack that restarts selenium after every 5 pathways.
  .batch(5)
  .map(function(pathwayBatch) {
    pathwaysStream.pause();
    if (!!selenium) {
      selenium.kill();
    }
    return pathwayBatch;
  })
  .pipe(through(function(pathwayBatch) {
    var pipeInstance = this;
    pipeInstance.pause();
    seleniumLauncher(function(err, seleniumInstance) {
      selenium = seleniumInstance;
      pipeInstance.push(pathwayBatch);
      pipeInstance.resume();
    });
  }))
  .pipe(through(function(pathwayBatch) {
    return highland(pathwayBatch).each(runBrowsers);
  }))
});

