var wd = require('wd');
//var imageDiff = require('image-diff');
var colors = require('colors');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// http configuration, not needed for simple runs
wd.configureHttp({
  timeout: 60000,
  retryDelay: 15000,
  retries: 5
});

//var desired = {'browserName': 'phantomjs'};
var desired = {'browserName': 'firefox'};
desired.name = 'example with ' + desired.browserName;
desired.tags = ['dev-test'];

/* globals describe:true, before:true, afterEach:true, after:true, it:true */

describe('Quick test for development', function() {
  var browser;
  var allPassed = true;

  before(function(done) {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
    browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey);
    //browser = wd.promiseChainRemote('saucelabs.com', 443, username, accessKey);
    //browser = wd.promiseChainRemote('maki78231.miso.saucelabs.com', 4445, username, accessKey);
    if (process.env.VERBOSE) {
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

  /*
  it('should get home page', function(done) {
    browser
      .get('http://nodejs.org/')
      .title()
      .should.become('Node.js')
      .elementById('intro')
      .text()
      .should.eventually.include('JavaScript runtime')
      .nodeify(done);
  });
  //*/

  //*
  it('should render the "dev" test page', function(done) {
    browser
      //.get('http://localhost:3000/test/one-diagram.html?' +
      //'gpml=http://localhost:3000/test/input-data/dev/dev.gpml')
      //.get('http://127.0.0.1:3000/test/web-component-demos/editor.html')
      .get('http://pointer.ucsf.edu/PVJS/test/web-component-demos/editor.html')
      .waitForElementById('Kaavio-diagram-1', wd.asserters.isDisplayed, 3000)
      .saveScreenshot('tmp/dev-' + desired.browserName + '-test.png')
      .nodeify(done);
  });
  //*/

  /*
  it('should confirm test and last known good screenshots are the same', function(done) {
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
  //*/
});
