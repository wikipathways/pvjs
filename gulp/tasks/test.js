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
  , seleniumLauncher = require('selenium-launcher')
  , mocha = require('gulp-spawn-mocha')
  ;


gulp.task('test', function () {
  process.env.SELENIUM_LAUNCHER_PORT = 4444;
  /*
  seleniumLauncher(function(er, selenium) {
    // selenium is running
    // selenium.host / selenium.port are available
    // selenium is a child process, so you can do selenium.kill()
    if (er) {
      selenium.kill();
    }



    console.log('process.env.SELENIUM_LAUNCHER_PORT in test.js');
    console.log(process.env.SELENIUM_LAUNCHER_PORT);
    console.log('selenium.host in test.js');
    console.log(selenium.host);
    console.log('selenium.port in test.js');
    console.log(selenium.port);
    //*/



    return test()
    .on('error', function (e) {
      console.log('Error');
      //selenium.kill();
      throw e;
    })
    .on('end', function () {
      //*
      //selenium.kill();
      console.log('bye');
      //*/
    });


//})







  //require('../../tests/demo.js');

});

/*
gulp.task('default', function () {
  gulp.watch('{lib,test}/*', test);
  test();
});
//*/

function test() {
  return gulp.src(['./test/e2e/dev.js'], {read: false}).pipe(mocha({
    // module to require
    r: './test/wd-test-config.js',
    // reporter to use
    R: 'spec',
    // enable colors
    c: true,
    debug: true
  })).on('error', console.warn.bind(console));
}
