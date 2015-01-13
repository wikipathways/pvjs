var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var colors = require('colors');
var expect = chai.expect;
var fs = require('fs');
var gulp = require('gulp');
var highland = require('highland');
var imageDiff = require('image-diff');
var imagemagick = require('imagemagick-native');
var os   = require('os');
var pHash = require('phash');
var wd = require('wd');

var pathway = JSON.parse(process.env.PVJS_PATHWAY);
var pathwayName = pathway.name;

var browserName = process.env.BROWSER;
var desired = {'browserName': browserName};
desired.name = 'Local Protocol for ' + pathwayName.toUpperCase().cyan +
    ' (' + browserName.grey + ')';
desired.tags = ['localhost'];

var lastKnownGoodScreenshotHashes = JSON.parse(
    fs.readFileSync('./test/last-known-goods/protocol/screenshot-hashes.json'));

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

/*
// http configuration, not needed for simple runs
wd.configureHttp({
    timeout: 1500,
    retryDelay: 1500,
    retries: 1
});
//*/

describe(desired.name, function() {
  var browser;
  var allPassed = true;
  // how long the details panel takes to load
  var detailsPanelTimeout = 6000;
  var localServerPort = process.env.LOCALSERVER_PORT;

  before(function(done) {
    browser = wd.remote({
      hostname: '127.0.0.1',
        port: process.env.SELENIUM_PORT || 4444
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

    var width = 1024;
    var height = 768;
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
    browser
      .quit()
      .nodeify(function() {
        return done(null, allPassed);
      });
  });

  it('should render diagram', function(done) {
    browser
      .get('http://localhost:' + localServerPort +
          '/test/one-diagram.html?gpml=' +
          'http://localhost:' + localServerPort +
          '/test/input-data/protocol/' + pathway.fileName)
      .waitForElementById('pvjs-diagram-1', wd.asserters.isDisplayed, 4000)
      .waitForElementByCss('.pathvisiojs-highlighter',
          wd.asserters.isDisplayed, 4000)
      .nodeify(done);
  });

  if (pathwayName === 'data-nodes') {
    it('should highlight the CCR5 node', function(done) {
      browser
        .waitForElementByCss('[placeholder="Enter node name to highlight"]',
            wd.asserters.isDisplayed, 500)
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
        .waitForElementByCss('#bbd97', wd.asserters.isDisplayed, 500)
        .elementById('bbd97')
        .click()
        //.waitForElementByCss("span:contains('CCR5')", wd.asserters.isDisplayed, detailsPanelTimeout)
        .waitForElementByCss('a.annotation-item-text',
            wd.asserters.isDisplayed, detailsPanelTimeout)
        .nodeify(done);
    });
  }

  it('should save the screenshot', function(done) {
    browser.saveScreenshot('tmp/protocol/' + pathwayName +
        '-' + browserName + '-test.png')
    .nodeify(done);
  });

  //*
  it('should confirm test and last known good screenshots are the same',
      function(done) {
    var pathToDiffImage = __dirname +
        '/../../' + 'tmp/protocol/' + pathwayName + '-' +
        browserName + '-difference.png';

    var pathToObservedImage = __dirname +
        '/../../' + 'tmp/protocol/' + pathwayName + '-' +
        browserName + '-test.png';

    var pathToExpectedImage = __dirname +
        '/../../' + 'test/last-known-goods/protocol/' +
        pathwayName + '-lkg.png';

    imageDiff({
      actualImage: pathToObservedImage,
      expectedImage: pathToExpectedImage,
      diffImage: pathToDiffImage,
    }, function(err, imagesAreSame) {
      if (!imagesAreSame) {
        var osId = os.type() + os.release();
        var screenshotHashExpected;
        if (!!lastKnownGoodScreenshotHashes[pathwayName] &&
            !!lastKnownGoodScreenshotHashes[pathwayName][osId] &&
            !!lastKnownGoodScreenshotHashes[pathwayName][osId][browserName]) {
          screenshotHashExpected =
              lastKnownGoodScreenshotHashes[pathwayName][osId][browserName];
        } else {
          console.error('screenshotHashExpected is not available for pathway ' +
              'named "' + pathwayName + '" as tested with browser "' +
              browserName + '" in ' +
              '"./test/last-known-goods/protocol/screenshot-hashes.json".');
          console.error('Run "gulp saveScreenshots" and inspect each one in ' +
              '"./tmp/protocol/".');
          console.error('If they are all correct, run ' +
              '"gulp setLastKnownGoods"; ' +
              'then re-run this test.');
          throw new Error();
        }

        var srcData = fs.readFileSync(pathToObservedImage);

        // returns a Buffer instance
        var resizedBuffer = imagemagick.convert({
            srcData: srcData, // provide a Buffer instance
            //width: 100,
            //height: 100,
            //resizeStyle: "aspectfill",
            quality: 100,
            format: 'JPEG'
        });

        var screenshotJpgFilePath = pathToObservedImage.replace('.png', '.jpg');
        fs.writeFileSync(screenshotJpgFilePath, resizedBuffer, 'binary');

        var screenshotHashObserved = pHash.imageHashSync(screenshotJpgFilePath);
        fs.unlinkSync(screenshotJpgFilePath);

        if (screenshotHashObserved.toString() ===
            screenshotHashExpected.toString()) {
          fs.unlinkSync(pathToObservedImage);
          fs.unlinkSync(pathToDiffImage);
        }

        if (String(screenshotHashObserved) !== String(screenshotHashExpected)) {
          lastKnownGoodScreenshotHashes[pathwayName][osId][browserName] =
              screenshotHashObserved;
          var proposedScreenshotHashes =
              JSON.stringify(lastKnownGoodScreenshotHashes, null, '\t');
          fs.writeFileSync('tmp/protocol/proposed-screenshot-hashes.json',
              proposedScreenshotHashes, 'utf8');
          var sleepPeriod = 750;
          console.log('Observed image hash does not match expected.');
          highland(_.range(10))
          .map(function(iteration) {
            browser.get('file://' + pathToDiffImage)
            .sleep(sleepPeriod)
            .get('file://' + pathToExpectedImage)
            .sleep(sleepPeriod)
            .get('file://' + pathToObservedImage)
            .sleep(sleepPeriod);
          })
          .ratelimit(1, 3 * sleepPeriod)
          .last()
          .map(function() {
            expect(screenshotHashObserved.toString()).to.equal(
                screenshotHashExpected.toString());
            return true;
          })
          .errors(function(err, push) {
            console.log('err');
            console.log(err);
            return push(null, err);
          })
          .each(function(result) {
            console.log('result');
            console.log(result);
            return done(result);
          });
        } else {
          if (screenshotHashObserved.toString() ===
              screenshotHashExpected.toString()) {
            expect(screenshotHashObserved.toString()).to.equal(
                screenshotHashExpected.toString());
            return done();
          } else {
            return setTimeout(function() {
              expect(screenshotHashObserved.toString()).to.equal(
                  screenshotHashExpected.toString());
              return done();
            }, detailsPanelTimeout + 500);
          }
        }
      } else {
        fs.unlinkSync(pathToObservedImage);
        fs.unlinkSync(pathToDiffImage);
        expect(imagesAreSame).to.equal(true);
        return done();
      }
      // error will be any errors that occurred
      // imagesAreSame is a boolean
      // diffImage is an image which highlights differences
    });
  });
  //*/
});
