var gulp = require('gulp')
  , _ = require('lodash')
  , args   = require('yargs').argv
  , crypto = require('crypto')
  , fs   = require('fs')
  , highland = require('highland')
  , os   = require('os')
  , path = require('path')
  , through = require('through')
  ;

gulp.task('setLastKnownGoods', function () {
  var protocolTestResultsDirectory = './tmp/protocol/'
    , protocolTestLastKnownGoodsDirectory = './test/last-known-goods/protocol/'
    ;

  var testImageFileNameStream = highland(fs.readdirSync(protocolTestResultsDirectory))
  .filter(function(fileName) {
    return fileName.indexOf('png') > -1 && fileName.indexOf('test') > -1;
  });

  var testImageTagStream = testImageFileNameStream.fork();
  var imageHashStream = testImageFileNameStream.fork();
  
  // TODO figure out how to do this properly without redefining the variable
  var imageHashStream2 = imageHashStream.map(function(testImageFileName) {
    var imageSourcePath = protocolTestResultsDirectory + testImageFileName;
    var sha1Sum = crypto.createHash('sha1');
    var imageBufferStream = highland(fs.ReadStream(imageSourcePath));

    if (testImageFileName.indexOf('phantomjs') > -1) {
      var imageDestinationPath = protocolTestLastKnownGoodsDirectory + testImageFileName.replace('phantomjs-test', 'lkg');
      var dest = fs.createWriteStream(imageDestinationPath)
      imageBufferStream.fork().pipe(dest);
    }

    return imageBufferStream.fork().map(function(d) {
      sha1Sum.update(d);
      return;
    })
    .last()
    .map(function() {
      imageHashStream.resume();
      return sha1Sum.digest('hex');
    });
  })
  .sequence();

  var imageHashesDestination = fs.createWriteStream(protocolTestLastKnownGoodsDirectory + 'image-hashes.json')

  testImageTagStream.map(function(testImageFileName) {
    var testImageFileNameComponents = testImageFileName.split('-');
    var testImageFileNameComponentsLength = testImageFileNameComponents.length;

    var browser = testImageFileNameComponents[testImageFileNameComponentsLength - 2];
    var type = testImageFileNameComponents[testImageFileNameComponentsLength - 1].replace('.png', '');
    var name = testImageFileName.split('-' + browser)[0];

    var result = {
      browser: browser,
      type: type,
      name: name
    };
    testImageTagStream.resume();
    return result;
  })
  .zip(imageHashStream2)
  .reduce({}, function(imageHashes, input) {
    // NOTE: we are setting a hash for every combination of these variables that we test:
    // test protocol pathway name, operating system + version, browser
    var testImageTags = input[0];
    var browser = testImageTags.browser;
    var type = testImageTags.type;
    var name = testImageTags.name;

    var imageHash = input[1];

    imageHashes[name] = imageHashes[name] || {};
    var operatingSystem = os.type() + os.release();
    imageHashes[name][operatingSystem] = imageHashes[name][operatingSystem] || {};
    imageHashes[name][operatingSystem][browser] = imageHash;
    return imageHashes;
  })
  .map(function(imageHashes) {
    return JSON.stringify(imageHashes, null, '\t')
  })
  .pipe(imageHashesDestination);
});

