// 1) launch selenium standalone server: https://github.com/daaku/nodejs-selenium-launcher
// 2) Make it possible to control selenium standalone server with JS using WebDriver: use wd https://github.com/admc/wd/blob/master/gulpfile.js
// 3) Start mocha: https://www.npmjs.org/package/spawn-mocha-parallel
// 4) Run mocha tests: then maybe run this: https://www.npmjs.org/package/gulp-mocha
//
// see also: https://github.com/mllrsohn/gulp-protractor/issues/12
//
// 1) launch selenium standalone server: https://github.com/daaku/nodejs-selenium-launcher
// 2) Use one of the the options for implementing the Selenium WebDriver Wire Protocol
    // [ sode ](https://github.com/LearnBoost/soda)
    // [ wd ](https://github.com/admc/wd)
    // [ nightwatch ](http://nightwatchjs.org/)
// 3) Run tests with mocha
    //
//

var gulp = require('gulp')
  //, seleniumLauncher = require('selenium-launcher')
  , mocha = require('gulp-mocha')
  //, mocha = require('gulp-spawn-mocha')
  , wd = require('wd')
  , highland = require('highland')
  ;

  //*
var seleniumLauncher = require('selenium-launcher')
  // https://github.com/dominictarr/event-stream
  , es = require('event-stream')
  ;

var launchSeleniumAsync = function(callback) {
  process.env.SELENIUM_LAUNCHER_PORT = '4444';
  seleniumLauncher(function(er, selenium) {
    if (er) {
      selenium.kill();
      return console.log(er);
    }
    console.log('selenium in seleniumLauncher in test.js');
    console.log(selenium);
    callback(null, selenium);
  });
};

var launchSeleniumStream = highland.wrapCallback(launchSeleniumAsync);

/*
function getData(filename) {
    // create a new Stream
    return _(function (push, next) {
        // do something async when we read from the Stream
        fs.readFile(filename, function (err, data) {
            push(err, data);
            push(null, _.nil);
        });
    });
};

var getData = _.wrapCallback(fs.readFile);

getData('myfile').map(toUpperCase).map(function (x) {
    return {name: x};
});
//*/

//*/

/*
gulp.task('test', ['launchSelenium'], function (selenium) {
  console.log('selenium in test.js');
  console.log(selenium);
  console.log('process.env.SELENIUM_LAUNCHER_PORT in test.js');
  console.log(process.env.SELENIUM_LAUNCHER_PORT);
  //*/
gulp.task('test', function () {
    return launchSeleniumStream()
    .apply(devTest)
  //*
    .on('error', function (e) {
      console.log('Error');
      console.log(e);
      //throw e;
    })
    .on('end', function (selenium) {
      if (selenium) {
        // Rebundle with watchify on changes.
        selenium.kill();
      }
      console.log('End of test');
    });
    //*/


  /*
  process.env.SELENIUM_LAUNCHER_PORT = '4444';
  seleniumLauncher(function(er, selenium) {
    // selenium is running
    // selenium.host / selenium.port are available
    // selenium is a child process, so you can do selenium.kill()
    if (er) {
      console.log('Error starting selenium server');
      console.log(er);
      selenium.kill();
    }

      console.log('selenium');
      console.log(selenium);


    console.log('process.env.SELENIUM_LAUNCHER_PORT in test.js');
    console.log(process.env.SELENIUM_LAUNCHER_PORT);
    console.log('selenium.host in test.js');
    console.log(selenium.host);
    console.log('selenium.port in test.js');
    console.log(selenium.port);



    devTest()
    .on('error', function (e) {
      console.log('Error');
      selenium.kill();
      throw e;
    })
    .on('end', function () {
      selenium.kill();
      console.log('bye');
    });


  });
      //*/
});

/*
gulp.task('default', function () {
  gulp.watch('{lib,test}/*', test);
  test();
});
//*/

function devTest(selenium) {
  global.selenium = selenium;
  console.log('selenium in devTest in test.js');
  console.log(selenium);
  console.log('process.env.SELENIUM_LAUNCHER_PORT in test.js');
  console.log(process.env.SELENIUM_LAUNCHER_PORT);
  //return gulp.src(['./test/e2e/dev-with-selenium-launcher.js'], {read: false}).pipe(mocha({
  return gulp.src(['./test/e2e/dev.js'], {read: false}).pipe(mocha({
    // module to require
    r: './test/wd-test-config.js',
    reporter: 'spec',
    timeout: 4000,
    // enable colors
    c: true,
    debug: true
  }))
  .on('error', console.warn.bind(console));
}
