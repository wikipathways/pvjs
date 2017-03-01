var wd = require('wd');
//var imageDiff = require('image-diff');
var colors = require('colors');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
var displayImage = require('./utils/display-image.js');
var PerceptualDiff = require('perceptualdiff');

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
//var desired = {'browserName': 'firefox'};
//var desired = {'browserName': 'ie11'};
//var desired = {'browserName': 'ie'};
var desired = {'browserName': 'internet explorer'};
desired.name = 'example with ' + desired.browserName;
desired.tags = ['dev-test'];

/* globals describe:true, before:true, afterEach:true, after:true, it:true */

describe('Quick test for development', function() {
  var browser;
  var diff;
  var allPassed = true;

  before(function(done) {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
    browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey);
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

  it('should render the "dev" test page', function(done) {
    browser
      .get('http://pointer.ucsf.edu/PVJS/test/web-component-demos/test-editor.html')
      //.waitForElementById('Kaavio-diagram-1', wd.asserters.isDisplayed, 3000)
      .saveScreenshot('tmp/dev-' + desired.browserName + '-test.png')
      .nodeify(done);
  });

  it('should confirm test and last known good screenshots are the same', function(done) {
    var expectedImage = 'test/input-data/dev/dev-' + desired.browserName + '-lkg.png';
    var actualImage = 'tmp/dev-' + desired.browserName + '-test.png';
    var diffImage = 'tmp/dev-' + desired.browserName + '-difference.png';

    diff = new PerceptualDiff({
      imageAPath: expectedImage,
      imageBPath: actualImage,
      scale: true,
      //verbose: true,
      //pyramidLevels: 5,
      thresholdType: PerceptualDiff.THRESHOLD_PERCENT,
      threshold: 0.01,
      imageThreshold: 0.005,
      colorFactor: 0.5,
      imageOutputPath: diffImage
    });

    diff.run(function(passed) {
      if (!passed) {
        //displayImage(__dirname + '/../../' + expectedImage);
        //displayImage(__dirname + '/../../' + actualImage);
        displayImage(__dirname + '/../../' + diffImage);
      }
      expect(passed).to.equal(true);
      done();
    });
  });
});
