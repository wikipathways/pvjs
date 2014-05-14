var wd = require('wd')
  ;

require('colors');
var _ = require("lodash");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// http configuration, not needed for simple runs
wd.configureHttp( {
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
});

describe('dev', function() {
    var browser;
    var allPassed = true;

    before(function(done) {
      browser = wd.remote({
        hostname: '127.0.0.1',
          port: 4444
      }, 'promiseChain');

      // optional extra logging
      browser.on('status', function(info) {
        console.log(info.cyan);
      });
      browser.on('command', function(eventType, command, response) {
        console.log(' > ' + eventType.cyan, command, (response || '').grey);
      });
      browser.on('http', function(meth, path, data) {
        console.log(' > ' + meth.magenta, path, (data || '').grey);
      });

      browser
          .init({browserName:'chrome'})
          .nodeify(done);
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {
        browser
            .quit()
            .nodeify(done);
    });

    it("should render the 'one of each' test page", function(done) {
        browser
            .get("http://localhost:3000/test/one-diagram.html?gpml=http://localhost:3000/test/data/one-of-each.gpml")
            .title()
            .should.become("Pathvisiojs Simple Built Production Example")
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 20000)
            .nodeify(done);
    });

});
