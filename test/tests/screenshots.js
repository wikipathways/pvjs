var  chai = require("chai")
  , chaiAsPromised = require("chai-as-promised")
  , colors = require('colors')
  , expect = chai.expect
  , fs = require('fs')
  , gulp = require('gulp')
  , highland = require('highland')
  , imageDiff = require('image-diff')
  , imagemagick = require('imagemagick-native')
  , os   = require('os')
  , pHash = require('phash')
  , prompt = require('prompt')
  , wd = require('wd')
  ;

var pathway = JSON.parse(process.env.PVJS_PATHWAY);
var pathwayName = pathway.name;

var desired = {"browserName": process.env.BROWSER};
desired.name = 'Local Protocol for ' + pathwayName.toUpperCase().cyan + ' (' + desired.browserName.grey + ')';
desired.tags = ['localhost'];

var lastKnownGoodScreenshotHashes = JSON.parse(fs.readFileSync('./test/last-known-goods/protocol/screenshot-hashes.json'));

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

/*
// http configuration, not needed for simple runs
wd.configureHttp( {
    timeout: 3,
    retryDelay: 1500,
    retries: 5
});
//*/

describe(desired.name, function() {
  var browser;
  var allPassed = true;

  before(function(done) {
    browser = wd.remote({
      hostname: '127.0.0.1',
        port: process.env.SELENIUM_PORT || 4444
    }, 'promiseChain');

    // Check if tmp/protocol folder exists. Create if it does not exist
    if (!fs.existsSync('./tmp/protocol/')) {
      fs.mkdirSync('./tmp/protocol/', 0755, function(err){
        if(err){console.log(err);}
      });
    }

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

    var width = 1024,
      height = 768;
    browser
      .init(desired)
      .setWindowSize(width, height)
      .nodeify(done);
  });

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');
    done();
  });

  after(function(done) {
    return browser
      .saveScreenshot('tmp/protocol/' + pathwayName + '-' + desired.browserName + '-test.png')
      .quit()
      .nodeify(done);
  });

  it('should render diagram', function(done) {
    browser
      .get('http://localhost:3000/test/one-diagram.html?gpml=http://localhost:3000/test/input-data/protocol/' + pathway.fileName)
      .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 4000)
      .waitForElementByCss(".pathvisiojs-highlighter", wd.asserters.isDisplayed, 4000)
      .nodeify(done);
  });

  //*
  var detailsPanelTimeout = 6000;
  if (pathwayName === 'data-nodes') {
    it('should highlight the CCR5 node', function(done) {
      browser
        .waitForElementByCss('[placeholder="Enter node name to highlight"]', wd.asserters.isDisplayed, 500)
        .elementByCss('[placeholder="Enter node name to highlight"]')
        //.elementByCss('.pathvisiojs-highlighter')
        .click()
        .type('CCR')
        .type('\uE014') // right arrow key
        .type('\uE007') // enter key
        //.moveTo(null, 20, 20)
        //.elementByCss('.tt-dropdown-menu')
        //.click()
        .nodeify(done);
    });
    it('should open the details panel for CCR5', function(done) {
      browser
        // TODO the contains selector isn't working for me, even though it would be nice to use it
        //.waitForElementByCss(":contains('CCR5')", wd.asserters.isDisplayed, detailsPanelTimeout)
        .waitForElementByCss("#bbd97", wd.asserters.isDisplayed, 500)
        .elementById('bbd97')
        .click()
        //.waitForElementByCss("span:contains('CCR5')", wd.asserters.isDisplayed, detailsPanelTimeout)
        .waitForElementByCss("a.annotation-item-text", wd.asserters.isDisplayed, detailsPanelTimeout)
        .nodeify(done);
    });
  }
  //*/
});

