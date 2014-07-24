/*
this.demoTestGoogle = function (browser) {
  browser
    .url("http://www.google.com")
    .waitForElementVisible('body', 1000)
    .setValue('input[type=text]', 'nightwatch')
    .waitForElementVisible('button[name=btnG]', 1000)
    .click('button[name=btnG]')
    .pause(1000)
    .assert.containsText('#main', 'The Night Watch')
    .end();
};
//*/





//*
var nightwatch = require('nightwatch');

console.log(nightwatch);

//var nightwatch = require('../../node_modules/nightwatch/bin/runner.js');
nightwatch.demoTestGoogle = function (browser) {
  browser
    .url("http://www.google.com")
    .waitForElementVisible('body', 1000)
    .setValue('input[type=text]', 'nightwatch')
    .waitForElementVisible('button[name=btnG]', 1000)
    .click('button[name=btnG]')
    .pause(1000)
    .assert.containsText('#main', 'The Night Watch')
    .end();
};

nightwatch.demoTestGoogle();
//*/






/*
require('nightwatch');
module.exports = {
  "step one" : function (browser) {
    browser
      .url("http://www.google.com")
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
  },
  
  "step two" : function (browser) {
    browser
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'The Night Watch')
      .end();
  }
};
//*/
