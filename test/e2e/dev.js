var wd = require('wd')
  , imageDiff = require('image-diff')
  ;

require('colors');
var _ = require("lodash");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

var desired = JSON.parse(process.env.DESIRED || '{"browserName": "phantomjs"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];

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
          .init({browserName:'phantomjs'})
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
            //.get("http://localhost:3000/test/one-diagram.html?gpml=http://localhost:3000/test/data/playground.gpml")
            .get("http://localhost:3000/test/one-diagram.html?gpml=http://localhost:3000/test/data/one-of-each.gpml")
            .title()
            .should.become("Pathvisiojs Simple Built Production Example")
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 9000)
            .saveScreenshot('tmp/one-of-each-' + desired.browserName + '-test.png')
            .nodeify(done);
    });

    it("should get the difference between screenshots from test and last known good", function(done) {
        imageDiff({
          actualImage: 'tmp/one-of-each-' + desired.browserName + '-test.png',
          expectedImage: 'test/one-of-each-' + desired.browserName + '-lkg.png.png',
          diffImage: 'tmp/one-of-each-' + desired.browserName + '-difference.png',
        }, function (err, imagesAreSame) {
          console.log('Screenshots are exactly the same: ' + imagesAreSame);
          done();
          // error will be any errors that occurred
          // imagesAreSame is a boolean whether the images were the same or not
          // diffImage will have an image which highlights differences
        });
    });

    /*
    it("should get the WP1 widget page on the test site", function(done) {
        browser
            .get("http://test2.wikipathways.org/wpi/PathwayWidget.php?id=WP1")
            .title()
            .should.become("WikiPathways Pathway Viewer")
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 20000)
            .saveScreenshot('tmp/WP1-' + desired.browserName + '-test.png')
            .nodeify(done);
    });

    it("should get the WP1 widget page on the production site", function(done) {
        browser
            .get("http://www.wikipathways.org/wpi/PathwayWidget.php?id=WP1")
            .title()
            .should.become("WikiPathways Pathway Viewer")
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 20000)
            .saveScreenshot('tmp/WP1-' + desired.browserName + '-production.png')
            .nodeify(done);
    });


    //*/
});
