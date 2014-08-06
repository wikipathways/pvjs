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
      .get('http://localhost:3000/test/one-diagram.html?gpml=http://localhost:3000/test/input-data/protocol/' + pathway.fileName)
      .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 4000)
      .waitForElementByCss(".pathvisiojs-highlighter", wd.asserters.isDisplayed, 4000)
      .saveScreenshot('tmp/protocol/' + pathwayName + '-' + desired.browserName + '-test.png')
      .nodeify(done);
  });

  //*
  it("should confirm test and last known good screenshots are the same", function(done) {
    // thanks to http://www.hacksparrow.com/how-to-generate-md5-sha1-sha512-sha256-checksum-hashes-in-node-js.html
    // change the algo to sha1, sha256 etc according to your requirements

    var pathActualImage = 'tmp/protocol/' + pathwayName + '-' + desired.browserName + '-test.png'
      , pathExpectedImage = 'test/input-data/protocol/' + pathwayName + '-lkg.png'
      , pathDiffImage = 'tmp/protocol/' + pathwayName + '-' + desired.browserName + '-difference.png'
      ;

    imageDiff({
      actualImage: pathActualImage,
      expectedImage: pathExpectedImage,
      diffImage: pathDiffImage,
    }, function (err, imagesAreSame) {
      if (!imagesAreSame) {
        var operatingSystem = os.type() + os.release();
        var screenshotHash = lastKnownGoodScreenshotHashes[pathwayName][operatingSystem][desired.browserName];
        var algo = 'sha1';
        var shasum = crypto.createHash(algo);

        var s = fs.ReadStream(pathActualImage);
        s.on('data', function(d) { shasum.update(d); });
        s.on('end', function() {
          var d = shasum.digest('hex');
          expect(d).to.equal(screenshotHash);
          return done();
        });
      } else {
        expect(imagesAreSame).to.equal(true);
        return done();
      }
      // error will be any errors that occurred
      // imagesAreSame is a boolean whether the images were the same or not
      // diffImage will have an image which highlights differences
    });
  });
  //*/
});

