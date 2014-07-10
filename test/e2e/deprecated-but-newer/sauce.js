var wd = require('wd')
  , imageDiff = require('image-diff')
  ;
require('colors');
var _ = require("lodash");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// checking sauce credential
if(!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY){
    console.warn(
        '\nPlease configure your sauce credential:\n\n' +
        'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
        'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
    );
    throw new Error("Missing sauce credentials");
}

// http configuration, not needed for simple runs
wd.configureHttp( {
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
});

var desired = JSON.parse(process.env.DESIRED || '{"browserName": "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['full-protocol'];

describe('full-protocol (' + desired.browserName + ')', function() {
    var browser;
    var allPassed = true;

    before(function(done) {
        var username = process.env.SAUCE_USERNAME;
        var accessKey = process.env.SAUCE_ACCESS_KEY;
        browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
        if(process.env.VERBOSE){
            // optional logging     
            browser.on('status', function(info) {
                console.log(info.cyan);
            });
            browser.on('command', function(meth, path, data) {
                console.log(' > ' + meth.yellow, path.grey, data || '');
            });            
        }
        browser
            .init(desired)
            .nodeify(done);
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {
        browser
            .quit()
            .sauceJobStatus(allPassed)
            .nodeify(done);
    });

    it("should get interactions test page", function(done) {
        browser
            .get("http://pointer.ucsf.edu/d3/r/pathvisiojs/test/one-diagram.html?gpml=http://pointer.ucsf.edu/d3/r/pathvisiojs/test/data/protocol/interactions.gpml.xml")
            .title()
            .should.become("Pathvisiojs Simple Built Production Example")
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 20000)
            .saveScreenshot('tmp/interactions-' + desired.browserName + '-test.png')
            .nodeify(done);
    });

    it("should get data-nodes test page", function(done) {
        browser
            .get("http://pointer.ucsf.edu/d3/r/pathvisiojs/test/one-diagram.html?gpml=http://pointer.ucsf.edu/d3/r/pathvisiojs/test/data/protocol/gpml-data-nodes.gpml.xml")
            .title()
            .should.become("Pathvisiojs Simple Built Production Example")
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 20000)
            .saveScreenshot('tmp/data-nodes-' + desired.browserName + '-test.png')
            .nodeify(done);
    });

    //*
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


    it("should get the difference between screenshots from test and production", function(done) {
        imageDiff({
          actualImage: 'tmp/WP1-' + desired.browserName + '-test.png',
          expectedImage: 'tmp/WP1-' + desired.browserName + '-production.png',
          diffImage: 'tmp/WP1-' + desired.browserName + '-difference.png',
        }, function (err, imagesAreSame) {
          console.log('Screenshots are exactly the same: ' + imagesAreSame);
          done();
          // error will be any errors that occurred
          // imagesAreSame is a boolean whether the images were the same or not
          // diffImage will have an image which highlights differences
        });
    });
    //*/

});
