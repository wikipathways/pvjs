var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;

// checking sauce credential
if(!username || !accessKey){
    console.warn(
        '\nPlease configure your sauce credential:\n\n' +
        'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
        'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
    );
    throw new Error("Missing sauce credentials");
}

var  chai = require("chai")
  , chaiAsPromised = require("chai-as-promised")
  , colors = require('colors')
  , crypto = require('crypto')
  , expect = chai.expect
  , fs = require('fs')
  , gulp = require('gulp')
  , highland = require('highland')
  , imageDiff = require('image-diff')
  , os   = require('os')
  , wd = require('wd')
  ;

//*
// http configuration, not needed for simple runs,
// but possibly needed for running tests from sauce labs
// or for very slow or long tests running locally.
wd.configureHttp( {
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
});
//*/

chai.use(chaiAsPromised);
chai.should();

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var desired = {
  browserName:'iexplore',
  version:'11',
  platform:'Windows 7',
  tags: ["examples"],
  name: "This is an example test"
};

//var desired = {"browserName": process.env.BROWSER};
//desired.name = 'Test Server Protocol for ' + pathwayName.toUpperCase().cyan + ' (' + desired.browserName.grey + ')';
//desired.tags = ['localhost'];

var pathway = JSON.parse(process.env.PVJS_PATHWAY || '{"name":"anchors","fileName":"anchors.gpml.xml"}');
var pathwayName = pathway.name;

var lastKnownGoodScreenshotHashes = JSON.parse(fs.readFileSync('./test/last-known-goods/protocol/screenshot-hashes.json'));

describe(desired.name, function() {
  var browser;
  var allPassed = true;

  before(function(done) {
    browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);

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
      .quit()
      .nodeify(done);
  });

  it('should render diagram', function(done) {
    browser
      .get('http://pointer.ucsf.edu/pvjs/test/one-diagram.html?gpml=http://pointer.ucsf.edu/pvjs/test/input-data/protocol/' + pathway.fileName)
      .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 4000)
      .waitForElementByCss(".pathvisiojs-highlighter", wd.asserters.isDisplayed, 4000)
      .nodeify(done);
  });

  //*
  var detailsPanelTimeout = 6000;
  if (pathwayName === 'data-nodes') {
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

  //*
  it("should confirm test and last known good screenshots are the same", function(done) {
    browser.saveScreenshot('./tmp/protocol/' + pathwayName + '-' + desired.browserName + '-test.png')

    var pathActualImage = 'tmp/protocol/' + pathwayName + '-' + desired.browserName + '-test.png'
      , pathExpectedImage = 'test/input-data/protocol/' + pathwayName + '-lkg.png'
      , pathDiffImage = 'tmp/protocol/' + pathwayName + '-' + desired.browserName + '-difference.png'
      ;

    /*
    imageDiff({
      actualImage: pathActualImage,
      expectedImage: pathExpectedImage,
      diffImage: pathDiffImage,
    }, function (err, imagesAreSame) {
      if (!imagesAreSame) {
        var operatingSystem = os.type() + os.release();
        var screenshotHash = lastKnownGoodScreenshotHashes[pathwayName][operatingSystem][desired.browserName];

        var sha1Sum = crypto.createHash('sha1');
        var imageStream = fs.ReadStream(pathActualImage);
        imageStream.on('data', function(d) { sha1Sum.update(d); });
        imageStream.on('end', function() {
          var d = sha1Sum.digest('hex');
          setTimeout(function() {
            expect(d).to.equal(screenshotHash);
            return done();
          }, detailsPanelTimeout + 500);
        });
      } else {
        expect(imagesAreSame).to.equal(true);
        return done();
      }
      // error will be any errors that occurred
      // imagesAreSame is a boolean
      // diffImage is an image which highlights differences
    });
    //*/
  });
  //*/
});

