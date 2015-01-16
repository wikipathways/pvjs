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
var notification = require('../../gulp/util/notification.js');
var os   = require('os');
var pHash = require('phash');
var wd = require('wd');

var createImageDiffStream = highland.wrapCallback(imageDiff);

var osId = os.type() + os.release();
var pathway = JSON.parse(process.env.PVJS_PATHWAY);
var pathwayName = pathway.name;

// TODO Shouldn't I be able to get this some other way?
var mochaTimeout = process.env.MOCHA_TIMEOUT;

var browserName = process.env.BROWSER;
var desired = {'browserName': browserName};
desired.name = 'Local Protocol for ' + pathwayName.toUpperCase().cyan +
    ' (' + browserName.grey + ')';
desired.tags = ['localhost'];

var lastKnownGoodScreenshotHashesPath = __dirname +
    '/../../test/last-known-goods/protocol/screenshot-hashes.json';

var lastKnownGoodScreenshotHashes;
if (!!fs.existsSync(lastKnownGoodScreenshotHashesPath)) {
  lastKnownGoodScreenshotHashes = JSON.parse(
      fs.readFileSync(lastKnownGoodScreenshotHashesPath));
} else {
  lastKnownGoodScreenshotHashes = {};
}

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

function getScreenshotHash(actualImagePath) {
  var srcData = fs.readFileSync(actualImagePath);

  // returns a Buffer instance
  var resizedBuffer = imagemagick.convert({
      srcData: srcData, // provide a Buffer instance
      //width: 100,
      //height: 100,
      //resizeStyle: "aspectfill",
      quality: 100,
      format: 'JPEG'
  });

  var screenshotJpgFilePath = actualImagePath
  .replace('.png', '.jpg');
  fs.writeFileSync(screenshotJpgFilePath, resizedBuffer, 'binary');

  var screenshotHashActual = pHash.imageHashSync(screenshotJpgFilePath);
  fs.unlinkSync(screenshotJpgFilePath);

  return screenshotHashActual;
}

function saveScreenshotHashes(
    lastKnownGoodScreenshotHashes, pathwayName,
    browserName, screenshotHashActual) {

  console.log('You said the screenshot looked OK, ' +
      'so we\'re calculating its hash and ' +
      'saving it as APPROVED for:');
  console.log('Operating system: ' + osId);
  console.log('Browser: ' + browserName);
  console.log('File path: ' + lastKnownGoodScreenshotHashesPath);
  console.log('Please commit this file in git.');

  lastKnownGoodScreenshotHashes[pathwayName] =
      lastKnownGoodScreenshotHashes[pathwayName] || {};
  lastKnownGoodScreenshotHashes[pathwayName][osId] =
      lastKnownGoodScreenshotHashes[pathwayName][osId] || {};
  lastKnownGoodScreenshotHashes[pathwayName][osId][browserName] =
      screenshotHashActual;

  var updatedScreenshotHashes =
      JSON.stringify(lastKnownGoodScreenshotHashes, null, '\t');
  fs.writeFileSync(
      lastKnownGoodScreenshotHashesPath,
      updatedScreenshotHashes, 'utf8');
}

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

  //*
  it('should confirm test and last known good screenshots are the same',
      function(done) {

    var pathsToImages = {
      diffImage: __dirname +
          '/../../' + 'tmp/protocol/' + pathwayName + '-' +
          browserName + '-difference.png',
      actualImage: __dirname +
          '/../../' + 'tmp/protocol/' + pathwayName + '-' +
          browserName + '-test.png',
      expectedImage: __dirname +
          '/../../' + 'test/last-known-goods/protocol/' +
          pathwayName + '-lkg.png'
    };

    highland([pathsToImages])
    .flatMap(function(pathsToImages) {
      return highland(browser.saveScreenshot(pathsToImages.actualImage));
    })
    .flatMap(function(result) {
      if (!!fs.existsSync(pathsToImages.expectedImage)) {
        return highland([pathsToImages]);
      }

      return notification.createStream({
        title: 'Expected Screenshot Unavailable',
        message: 'Click here if it rendered correctly in ' +
                  browserName + '.',
        //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
        sound: false, // Only Notification Center or Windows Toasters
        wait: true, // wait with callback until user action is taken on notification
        time: 15 * 1000
      })
      .flatMap(function(res) {
        if (res.indexOf('Activate') === -1) {
          var message = 'Expected screenshot not available for pathway ' +
              'named "' + pathwayName + '" as tested with browser "' +
              browserName + '." ' +
              'It should be located at: ' +
              pathsToImages.expectedImage + '. ' +
              'Update code so it renders correctly, and then ' +
              're-run this test to save the current screenshot ' +
              'as a reference for future tests.';
          throw new Error(message);
        }

        var screenshotHashActual = getScreenshotHash(pathsToImages.actualImage);
        saveScreenshotHashes(
            lastKnownGoodScreenshotHashes, pathwayName,
            browserName, screenshotHashActual);

        console.log('You said the screenshot looked OK, ' +
            'so we\'re saving it for future comparison purposes ' +
            'as the last known good reference screenshot ' +
            'for this pathway.');
        console.log('File path: ' + pathsToImages.actualImage);
        console.log('Please add and commit it in git.');

        var actualImageStream = highland(fs.createReadStream(
            pathsToImages.actualImage));

        actualImageStream.fork()
        .pipe(fs.createWriteStream(pathsToImages.expectedImage));

        return actualImageStream.fork()
        .last();
      });
    })
    .flatMap(function() {
      // Here we check the actual image against a list of hashes
      // for specific OS's and browsers. We use this because it's
      // possible to save a large number of hashes, but it would
      // not be reasonable to save the actual images for every
      // OS/browser combination.
      var screenshotHashExpected;
      if (!!lastKnownGoodScreenshotHashes[pathwayName] &&
          !!lastKnownGoodScreenshotHashes[pathwayName][osId] &&
          !!lastKnownGoodScreenshotHashes[pathwayName][osId][browserName]) {
        screenshotHashExpected =
            lastKnownGoodScreenshotHashes[pathwayName][osId][browserName];
      } else {
        /*
        notification.createStream({
          title: 'Expected Screenshot Hash Unavailable',
          message: 'Click here if it rendered correctly in ' +
                    browserName + '.',
          //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
          sound: false, // Only Notification Center or Windows Toasters
          wait:  false// wait with callback until user action is taken on notification
        })
        .each(function() {});
        //*/
      }

      var screenshotHashActual = getScreenshotHash(pathsToImages.actualImage);

      if (String(screenshotHashActual) ===
          String(screenshotHashExpected)) {
        fs.unlinkSync(pathsToImages.actualImage);
        expect(String(screenshotHashActual)).to.equal(
            String(screenshotHashExpected));
        return highland([true]);
      }

      return highland([pathsToImages])
      .flatMap(createImageDiffStream)
      .flatMap(function(imagesAreSame) {
        if (imagesAreSame) {
          fs.unlinkSync(pathsToImages.actualImage);
          fs.unlinkSync(pathsToImages.diffImage);
          expect(imagesAreSame).to.equal(true);
          return highland([true]);
        }

        // Display new, old and diff screenshots.
        var sleepPeriod = 750;
        highland(_.range(5))
        .map(function(iteration) {
          browser.get('file://' + pathsToImages.diffImage)
          .sleep(sleepPeriod)
          .get('file://' + pathsToImages.expectedImage)
          .sleep(sleepPeriod)
          .get('file://' + pathsToImages.actualImage)
          .sleep(sleepPeriod);
        })
        .ratelimit(1, 3 * sleepPeriod)
        .last()
        .map(function() {
          expect(String(screenshotHashActual)).to.equal(
              String(screenshotHashExpected));
          return true;
        })
        .errors(function(err, push) {
          console.log('err');
          console.log(err);
          return push(null, err);
        })
        .each(function() {});
        // error will be any errors that occurred
        // imagesAreSame is a boolean
        // diffImage is an image which highlights differences

        return notification.createStream({
          title: 'Screenshot Looks OK for ' + browserName + '?',
          message: 'If yes, click here. Otherwise, wait for timeout.',
          //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
          sound: false, // Only Notification Center or Windows Toasters
          wait: true, // wait with callback until user action is taken on notification
          time: mochaTimeout - 2 * 1000
        })
        .flatMap(function(res) {
          if (res.indexOf('Activate') === -1) {
            var message = 'Hash of expected screenshot did not match ' +
                'hash of actual screenshot for ' +
                'pathway named "' + pathwayName +
                '" as tested with browser "' +
                browserName + '" in "' +
                lastKnownGoodScreenshotHashesPath + '". ' +
                'Update code so it renders correctly, and then ' +
                're-run this test to save a hash of the current screenshot ' +
                'as a reference for future tests.';
            console.error(message);
            expect(String(screenshotHashActual)).to.equal(
                String(screenshotHashExpected));
            //throw new Error(message);
            /*
            var err = new Error(message);
            return highland([err]);
            //*/
          }

          saveScreenshotHashes(
              lastKnownGoodScreenshotHashes, pathwayName,
              browserName, screenshotHashActual);

          return highland([null]);
        });
      });
    })
    //*
    //*/
    .each(function(result) {
      return done(null, result);
    });
  });
  //*/
});
