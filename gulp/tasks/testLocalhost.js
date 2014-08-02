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

//gulp.task('testLocalhost', ['browserSync'], function () {
gulp.task('testLocalhost', function () {

  var expressPort = 3000; // incremented after each test to avoid colision
  args.browsers = (args.browser || 'phantomjs').split(',');
  //args.browsers = (args.browser || 'firefox,safari').split(',');
  //args.browsers = (args.browser || 'safari').split(',');

  /*
  var pathwaysAlreadyConsidered = fs.readdirSync('./test/input-data/protocol')
    .filter(function(fileName) {
      return fileName.indexOf('-firefox-lkg.png') > -1;
    })
    .map(function(pathwayFileName) {
      return pathwayFileName.replace('-safari', '').replace('-firefox', '').replace('-lkg.png', '');
    });

  console.log('pathwaysAlreadyConsidered');
  console.log(pathwaysAlreadyConsidered);
    //*/

  var pathwayNames = [
  "z-index",
  "text-and-font",
  "size-and-proportion",
  "shapes",
  "publication-xrefs",
  "one-node",
  "one-edge",
  "labels",
  "interactions",
  "groups",
  "graphical-lines",
  "fill-and-stroke",
  "empty",
  "elbows",
  "data-nodes",
  "curves",
  "anchors",
  "dev"
  ];

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
    .filter(function(pathway) {
      return pathwayNames.indexOf(pathway.name) > -1; // && pathwayNames.indexOf(pathway.name) > 13;
    })
    .sort(function(b,a) {
      var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
      return -1 
      if (nameA > nameB)
      return 1
      return 0 //default return value (no sorting)
    })
    .map(function(pathway) {
      return JSON.stringify(pathway);
    });

  var startTime = new Date();

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
        u: 'bdd',
        //u: 'bdd-with-opts',
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

  var pathwaysCompletedCount = 0;
  function runBrowsers(pathway) {
    pathwaysStream.pause();
    //console.log('Testing pathway ' + pathwaysCompletedCount + ' of ' + pathways.length);
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


  var browsersCompletedCount = 0;
  function runLocalhostTest(opts) {
    return gulp.src(['./test/tests/localhost.js'], {read: false, globals:[]})
      .pipe(mocha(opts))
      .on('error', function() {
        pathwaysStream.destroy();
        console.log('Destroyed stream due to error.');
      })
      .on('end', function() {
        browsersCompletedCount += 1;
        console.log('Finished testing browser ' + browsersCompletedCount + ' of ' + args.browsers.length + ' for pathway ' + pathwaysCompletedCount + ' of ' + pathways.length);
        var later = new Date();
        console.log('Elapsed time (ms): ' + (later - startTime));
        if (browsersCompletedCount === args.browsers.length) {
          browsersCompletedCount = 0;
          pathwaysCompletedCount += 1;
          pathwaysStream.resume();
        }
      });
  }


  var selenium;
  function seleniumLauncherAndPathwayBatchPasser(pathwayBatchStream, callback) {
    seleniumLauncher(function(err, seleniumInstance) {
      selenium = seleniumInstance;
      return callback(null, pathwayBatchStream);
    });
  }

  var seleniumLauncherAndPathwayBatchPasserAsync = highland.wrapCallback(seleniumLauncherAndPathwayBatchPasser);

  pathwaysStream
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
  .pipe(through(function() {
    console.log('Completed all tests requested.');
    return selenium.kill();
  }))
  /*
  .each(function(result) {
    console.log('result in test');
    console.log(result);
    return result;
  })
  .each(runBrowsers);
  //*/
});

