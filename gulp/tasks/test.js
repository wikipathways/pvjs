// 1) launch selenium standalone server: https://github.com/daaku/nodejs-selenium-launcher
// 2) Make it possible to control selenium standalone server with JS using WebDriver: use wd https://github.com/admc/wd/blob/master/gulpfile.js
// 3) Start mocha: https://www.npmjs.org/package/spawn-mocha-parallel
// 4) Run mocha tests: then maybe run this: https://www.npmjs.org/package/gulp-mocha
//
// see also: https://github.com/mllrsohn/gulp-protractor/issues/12
//
// 1) launch selenium standalone server: https://github.com/daaku/nodejs-selenium-launcher
// 2) Use one the the options for implementing the Selenium WebDriver Wire Protocol
    // [ sode ](https://github.com/LearnBoost/soda)
    // [ wd ](https://github.com/admc/wd)
    // [ nightwatch ](http://nightwatchjs.org/)
//

var seleniumLauncher = require('selenium-launcher');
seleniumLauncher(function(er, selenium) {
  // selenium is running
  // selenium.host / selenium.port are available
  // selenium is a child process, so you can do selenium.kill()
  if (er) {
    selenium.kill();
  }

  require('../../tests/demo.js');

  selenium.kill();
  console.log('bye');
});
