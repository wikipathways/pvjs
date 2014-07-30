// see the wd example for how to build this: https://github.com/admc/wd/blob/master/gulpfile.js
var gulp = require('gulp')
  , _ = require('lodash')
  , args   = require('yargs').argv
  , fs   = require('fs')
  , highland = require('highland')
  , path = require('path')
  , through = require('through')
  , SpawnMocha = require('spawn-mocha-parallel')
  , wd = require('wd')
  ;

/*
gulp.task('default', function () {
  gulp.watch('{lib,test}/*', test);
  test();
});
//*/

var expressPort = 3000; // incremented after each test to avoid colision
//args.browsers = (args.browser || 'phantomjs').split(',');
//args.browsers = (args.browser || 'firefox,safari').split(',');
args.browsers = (args.browser || 'safari').split(',');

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

var pathways = fs.readdirSync('./test/input-data/protocol')
  .filter(function(fileName) {
    return fileName.indexOf('gpml') > -1;
  })
  .filter(function(fileName) {
    return fileName;
    //return pathwaysAlreadyConsidered.indexOf(fileName.replace('.gpml.xml', '').replace('.gpml', '')) === -1;
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
      //u: 'bdd-with-opts',
      R: 'spec',
      b: true,
      t: 4000,
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

function testMultiplePathways(pathway) {
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
    .map(runLocalhostTest)
    .errors(function (e) {
      console.log('Error');
      console.log(e);
      //throw e;
    })
    .toArray(function (x) {
      //console.log(x);
      console.log('End of test');
    });
}

var browsersCompletedCount = 0;
function runLocalhostTest(opts) {
  return gulp.src(['./test/tests/localhost.js'], {read: false, globals:[]})
    .pipe(mocha(opts))
    .on('error', function() {
      //pathwaysStream.destroy();
      console.log('Destroyed stream due to error.');
    })
    .on('end', function() {
      browsersCompletedCount += 1;
      if (browsersCompletedCount === args.browsers.length) {
        console.log('Finished a test for browser #' + browsersCompletedCount + ' (last)');
        browsersCompletedCount = 0;
        pathwaysStream.resume();
      } else {
        console.log('Finished a test for browser #' + browsersCompletedCount);
      }
    });
}

//gulp.task('testLocalhost', ['browserSync'], function () {
gulp.task('testLocalhost', function () {
  return pathwaysStream
  .take(1)
  .each(testMultiplePathways)
  /*
  .errors(function (e) {
    console.log('Error');
    console.log(e);
    //throw e;
  })
  .toArray(function (x) {
    //console.log(x);
    console.log('End of test');
  });
  //*/
});

