// see the wd example for how to build this: https://github.com/admc/wd/blob/master/gulpfile.js
var gulp = require('gulp')
  , _ = require('lodash')
  , args   = require('yargs').argv
  , fs   = require('fs')
  , highland = require('highland')
  , path = require('path')
  , through = require('through')
  , mocha = require('gulp-mocha')
  //, SpawnMocha = require('spawn-mocha-parallel')
  ;

/*
gulp.task('default', function () {
  gulp.watch('{lib,test}/*', test);
  test();
});
//*/

var expressPort = 3000; // incremented after each test to avoid colision
var browsers = (args.browser || 'phantomjs').split(',');
/*
var browserInstances = {};
browsers.forEach(function(browser) {
  browserInstances[browser] = {};
});

highland(browsers)
    .map(function(browser) {
      var opts = {};
      opts.midway = true;
      opts.browser = browser;
      opts.pathway = pathway;
      return opts;
    })
    .map(buildMochaOpts)
    .each(runLocalhostTest);
    //*/

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

console.log('pathways');
console.log(pathways);
console.log(pathways.length);

var startTime = new Date();

var pathwaysStream = highland(pathways);

/*
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
//*/

//*
var pathwaysCompletedCount = 0;
function runBrowsers(pathway) {
  console.log('pathway');
  console.log(pathway);
  process.env.PVJS_PATHWAY = pathway;
  pathwaysCompletedCount += 1;
  //console.log('Testing pathway ' + pathwaysCompletedCount + ' of ' + pathways.length);
  pathwaysStream.pause();
  if (pathwaysCompletedCount < pathways.length) {
    //pathwaysStream.pause();
  }
  return highland(browsers)
    .map(function(browser) {
      var opts = {};
      opts.midway = true;
      opts.browser = browser;
      opts.pathway = pathway;
      return opts;
    })
    //.map(buildMochaOpts)
    .each(runLocalhostTest);
}
//*/

process.env.BROWSER = 'phantomjs';

function moveToNextPathway() {
    browsersCompletedCount += 1;
    console.log('Finished testing browser ' + browsersCompletedCount + ' of ' + browsers.length + ' for pathway ' + pathwaysCompletedCount + ' of ' + pathways.length);
    var later = new Date();
    console.log('Elapsed time (ms): ' + (later - startTime));
    if (browsersCompletedCount === browsers.length) {
      browsersCompletedCount = 0;
      pathwaysStream.resume();
    }
  through(function write(data) {
    this.queue(data) //data *must* not be null
  },
  function end () { //optional
    this.queue(null)
  })
}

/*
gulp.task('testLocalhost', function () {
    return gulp.src('./test/tests/localhost.js', {read: false})
        .pipe(mocha({reporter: 'nyan', timeout: 6000}));
});
//*/

//*
var browsersCompletedCount = 0;
function runLocalhostTest(opts) {
  console.log('runLocalhostTest')
  return gulp.src('./test/tests/localhost.js', {read: false})
    .pipe(mocha({reporter: 'nyan', timeout: 6000}))
    .pipe(moveToNextPathway)
  /*
    .on('error', function() {
      pathwaysStream.destroy();
      console.log('Destroyed stream due to error.');
    })
  /*
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

//gulp.task('testLocalhost', ['browserSync'], function () {
gulp.task('testLocalhost', function () {
  pathwaysStream
  .take(15)
  .each(runBrowsers)
});
//*/
