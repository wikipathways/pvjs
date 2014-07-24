var wd = require('wd')
  , imageDiff = require('image-diff')
  , colors = require('colors')
  , chai = require("chai")
  , chaiAsPromised = require("chai-as-promised")
  , expect = chai.expect
  , seleniumLauncher = require('selenium-launcher')
  ;

var desired = {"browserName": "phantomjs"};
desired.name = 'example with ' + desired.browserName;
desired.tags = ['dev-test'];

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe('Quick test for development', function() {
    var browser;
    var allPassed = true;
    var selenium;
    before(function(done) {
      seleniumLauncher(function(er, thisSelenium) {
        if (er) {
          return done(er);
        }
        selenium = thisSelenium;

        browser = wd.remote({
          hostname: selenium.host,
            port: selenium.port
        }, 'promiseChain');

        /*
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
        //*/

        var width = 800,
            height = 800;
        browser
            .init({browserName:'phantomjs'})

            .setWindowSize(width, height)

            .nodeify(done);
      });
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {
        //selenium.kill()
        browser
            .quit()
            .nodeify(done);
    });

    it("should render the 'dev' test page", function(done) {
        browser
            .get("http://localhost:3002/test/one-diagram.html?gpml=http://localhost:3002/test/input-data/dev/dev.gpml")
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 3000)
            .saveScreenshot('tmp/dev-' + desired.browserName + '-test.png')
            .nodeify(done);
    });

    it("should confirm test and last known good screenshots are the same", function(done) {
        imageDiff({
          actualImage: 'tmp/dev-' + desired.browserName + '-test.png',
          expectedImage: 'test/input-data/dev/dev-' + desired.browserName + '-lkg.png',
          diffImage: 'tmp/dev-' + desired.browserName + '-difference.png',
        }, function (err, imagesAreSame) {
          expect(imagesAreSame).to.equal(true);
          done();
          // error will be any errors that occurred
          // imagesAreSame is a boolean whether the images were the same or not
          // diffImage will have an image which highlights differences
        });
    });
});
