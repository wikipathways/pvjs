var wd = require('wd')
  , gulp = require('gulp')
  , imageDiff = require('image-diff')
  , colors = require('colors')
  , chai = require("chai")
  , chaiAsPromised = require("chai-as-promised")
  , expect = chai.expect
  , fs = require('fs')
  , highland = require('highland')
  , minifyHTML = require('gulp-minify-html')
  ;

var pathway = JSON.parse(process.env.PVJS_PATHWAY);
var pathwayName = pathway.name;

var desired = {"browserName": process.env.BROWSER};
desired.name = 'Local Protocol for ' + pathwayName.toUpperCase().cyan + ' (' + desired.browserName.grey + ')';
desired.tags = ['localhost'];

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// http configuration, not needed for simple runs
wd.configureHttp( {
    timeout: 3000,
    retryDelay: 1500,
    retries: 5
});

describe(desired.name, function() {
    var browser;
    var allPassed = true;

    before(function(done) {
      browser = wd.remote({
        hostname: '127.0.0.1',
          port: 4444
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
        browser
            .quit()
            .nodeify(done);
    });

    it('should render diagram', function(done) {
        browser
            .get('http://localhost:3000/test/one-diagram.html?gpml=http://localhost:3000/test/input-data/protocol/' + pathway.fileName)
            .waitForElementById("pvjs-diagram-1", wd.asserters.isDisplayed, 4000)
            .saveScreenshot('tmp/protocol/' + pathwayName + '-' + desired.browserName + '-test.png')
            .nodeify(done);
    });

    /*
    it("should save the HTML if it is PhantomJS", function(done) {
        browser
            .elementsByTagName('div')
            .then(function(elements){
                return elements[0].getAttribute("innerHTML")
            })
            .then(function(innerHTML){
                var Minimize = require('minimize')
                , minimize = new Minimize();

              if (desired.browserName === 'phantomjs') {
                  minimize.parse(innerHTML, function (error, minifiedInnerHtml) {
                    fs.writeFileSync('tmp/protocol/' + pathwayName + '-' + desired.browserName + '.html', minifiedInnerHtml);
                    expect(1).to.equal(1);
                    return done();
                  });
              } else {
                  expect(1).to.equal(1);
                  return done();
              }
            });
    });
    //*/

    /*
    it("should confirm test and last known good screenshots are the same", function(done) {
        imageDiff({
          actualImage: 'tmp/protocol/' + pathwayName + '-' + desired.browserName + '-test.png',
          expectedImage: 'test/input-data/protocol/' + pathwayName + '-' + desired.browserName + '-lkg.png',
          diffImage: 'tmp/protocol/' + pathwayName + '-' + desired.browserName + '-difference.png',
        }, function (err, imagesAreSame) {
          expect(imagesAreSame).to.equal(true);
          return done();
          // error will be any errors that occurred
          // imagesAreSame is a boolean whether the images were the same or not
          // diffImage will have an image which highlights differences
        });
    });
    //*/

    /*
    it("should confirm test and last known good innerHTML is the same", function(done) {
        browser
            .elementsByTagName('div')
            .then(function(elements){
                return elements[0].getAttribute("innerHTML")
            })
            .then(function(innerHTML){
                var Minimize = require('minimize')
                , minimize = new Minimize();

                minimize.parse(innerHTML, function (error, minifiedInnerHtml) {
                  fs.writeFileSync('tmp/protocol/' + pathwayName + '-' + desired.browserName + '.html', minifiedInnerHtml);
                  var lastKnownGoodHtml = fs.readFileSync('test/input-data/protocol/' + pathwayName + '-phantomjs-lkg.html', {encoding: 'utf8'});
                  expect(lastKnownGoodHtml).to.equal(minifiedInnerHtml);
                  return done();
                });

                /*
                var minimizeSync = highland.wrapCallback(minimize.parse);
                highland([ innerHTML ])
                  .map(minimizeSync)
                  .toArray(function(result) {
                    console.log('result');
                    console.log(result);
                  });
                //*/
    /*
            });
    });
    //*/
});

