// see the wd example for how to build this: https://github.com/admc/wd/blob/master/gulpfile.js
var gulp = require('gulp')
  , _ = require('lodash')
  , args   = require('yargs').argv
  , fs   = require('fs')
  , highland = require('highland')
  , path = require('path')
  , through = require('through')
  , SpawnMocha = require('spawn-mocha-parallel')
  , through2 = require('through2')
  ;

var expressPort = 3000; // incremented after each test to avoid colision
args.browsers = (args.browser || 'phantomjs').split(',');
//args.browsers = (args.browser || 'firefox,safari').split(',');
//args.browsers = (args.browser || 'safari').split(',');

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
      //u: 'bdd-with-opts',
      R: 'spec',
      b: true,
      t: 12000,
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

function runBrowsers(pathwaysStream, pathway) {
  function moveToNextPathway (done) {
      return through2.obj(function (data, enc, cb) {
        cb();
      },
      function (cb) {
        browsersCompletedCount += 1;
        console.log('Finished testing browser ' + browsersCompletedCount + ' of ' + args.browsers.length);
        var later = new Date();
        if (browsersCompletedCount === args.browsers.length) {
          browsersCompletedCount = 0;
          pathwaysStream.resume();
        }
        cb();
        done(null, 'success');
      });
  }

  //console.log('Testing pathway ' + pathwaysCompletedCount + ' of ' + pathways.length);
  pathwaysStream.pause();
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
    /*
    .errors(function (e) {
      console.log('Error');
      console.log(e);
      //throw e;
    })
    .each()
    .toArray(function (x) {
      //console.log(x);
      console.log('Finished testing  pathway ' + pathwaysCompletedCount + ' of ' + pathways.length);
    });
    //*/
}

var browsersCompletedCount = 0;
function runLocalhostTest(opts) {
  return gulp.src(['./test/tests/localhost.js'], {read: false, globals:[]})
    .pipe(mocha(opts))
  /*
    .pipe(moveToNextPathway(function(err, result) {
      console.log('err');
      console.log(err);
      console.log('result');
      console.log(result);
    }));
    /*
    .pipe(function(err, result) {
      console.log('err');
      console.log(err);
      console.log('result');
      console.log(result);
      browsersCompletedCount += 1;
      console.log('Finished testing browser ' + browsersCompletedCount + ' of ' + args.browsers.length + ' for pathway ' + pathwaysCompletedCount + ' of ' + pathways.length);
      var later = new Date();
      console.log('Elapsed time (ms): ' + (later - startTime));
      if (browsersCompletedCount === args.browsers.length) {
        browsersCompletedCount = 0;
        pathwaysStream.resume();
      }
    })
    //*/
    //*
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
        pathwaysStream.resume();
      }
    });
    //*/
}


