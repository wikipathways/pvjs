var gulp = require('gulp');
var _ = require('lodash');
var args   = require('yargs').argv;
var fs   = require('fs');
var highland = require('highland');
var os   = require('os');
var path = require('path');
  // TODO update when this is done:
  // https://github.com/aaronm67/node-phash/issues/17
  //var pHash = require('phash');
var pHash = {};
var through = require('through');

// TODO watch for when imagemagick supports Node.js v5
// and then re-enable it.
//var imagemagick = require('imagemagick-native');
var imagemagick = {};

/*
 * Warning! Only run this task after manually viewing every PNG
 * in the protocolTestResultsDirectory and verifying each one
 * is a correct rendering of the corresponding pathway.
 */

gulp.task('setLastKnownGoods', function() {
  if (typeof imagemagick !== 'function') {
    return;
  }

  var protocolTestResultsDirectory = 'tmp/protocol/';
  var protocolTestLastKnownGoodsDirectory = 'test/last-known-goods/protocol/';
  var screenshotHashesFilePath = 'test/last-known-goods/protocol/screenshot-hashes.json';

  var existingScreenshotHashes = JSON.parse(fs.readFileSync(screenshotHashesFilePath));

  var testScreenshotFileNameStream = highland(fs.readdirSync(protocolTestResultsDirectory))
  .filter(function(fileName) {
    return fileName.indexOf('png') > -1 && fileName.indexOf('test') > -1;
  });

  var testScreenshotTagStream = testScreenshotFileNameStream.fork();
  var screenshotHashStream = testScreenshotFileNameStream.fork();

  // TODO figure out how to do this properly without redefining the variable
  var screenshotHashStream2 = screenshotHashStream.map(function(testScreenshotFileName) {
    var screenshotSourcePath = protocolTestResultsDirectory + testScreenshotFileName;
    console.log('screenshotSourcePath');
    console.log(screenshotSourcePath);

    var srcData = fs.readFileSync(screenshotSourcePath);

    // returns a Buffer instance
    var resizedBuffer = imagemagick.convert({
        srcData: srcData, // provide a Buffer instance
        //width: 100,
        //height: 100,
        //resizeStyle: "aspectfill",
        quality: 100,
        format: 'JPEG'
    });

    var screenshotJpgFilePath = screenshotSourcePath.replace('.png', '.jpg');

    fs.writeFileSync(screenshotJpgFilePath, resizedBuffer, 'binary');

    var screenshotHash = pHash.imageHashSync(screenshotJpgFilePath);
    console.log('screenshotHash');
    console.log(screenshotHash);

    if (testScreenshotFileName.indexOf('chrome') > -1) {
      var screenshotBufferStream = highland(fs.ReadStream(screenshotSourcePath));
      var screenshotDestinationPath = protocolTestLastKnownGoodsDirectory +
        testScreenshotFileName.replace('chrome-test', 'lkg');
      var dest = fs.createWriteStream(screenshotDestinationPath);
      screenshotBufferStream.fork().pipe(dest);
    }

    fs.unlinkSync(screenshotJpgFilePath);
    fs.unlinkSync(screenshotSourcePath);

    return screenshotHash;
  });

  var screenshotHashesDestination = fs.createWriteStream(
    protocolTestLastKnownGoodsDirectory + 'screenshot-hashes.json');

  testScreenshotTagStream.map(function(testScreenshotFileName) {
    var testScreenshotFileNameComponents = testScreenshotFileName.split('-');
    var testScreenshotFileNameComponentsLength = testScreenshotFileNameComponents.length;

    var browser = testScreenshotFileNameComponents[testScreenshotFileNameComponentsLength - 2];
    var type = testScreenshotFileNameComponents[testScreenshotFileNameComponentsLength - 1]
      .replace('.png', '');
    var name = testScreenshotFileName.split('-' + browser)[0];

    var result = {
      browser: browser,
      type: type,
      name: name
    };
    testScreenshotTagStream.resume();
    return result;
  })
  .zip(screenshotHashStream2)
  .reduce(existingScreenshotHashes, function(screenshotHashes, input) {
    // NOTE: we are setting a hash for every combination of these variables that we test:
    // test protocol pathway name, operating system + version, browser
    var testScreenshotTags = input[0];
    var browser = testScreenshotTags.browser;
    var type = testScreenshotTags.type;
    var name = testScreenshotTags.name;

    var screenshotHash = input[1];

    screenshotHashes[name] = screenshotHashes[name] || {};
    var operatingSystem = os.type() + os.release();
    screenshotHashes[name][operatingSystem] = screenshotHashes[name][operatingSystem] || {};
    screenshotHashes[name][operatingSystem][browser] = screenshotHash;
    return screenshotHashes;
  })
  .map(function(screenshotHashes) {
    return JSON.stringify(screenshotHashes, null, '\t');
  })
  .pipe(screenshotHashesDestination);
});
