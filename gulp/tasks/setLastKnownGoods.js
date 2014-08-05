var gulp = require('gulp')
  , _ = require('lodash')
  , args   = require('yargs').argv
  , crypto = require('crypto')
  , fs   = require('fs')
  , highland = require('highland')
  , path = require('path')
  , through = require('through')
  ;

gulp.task('setLastKnownGoods', function () {
  var protocolTestResultsDirectory = './tmp/protocol/';

  var testImageFileNameStream = highland(fs.readdirSync(protocolTestResultsDirectory))
  .filter(function(fileName) {
    return fileName.indexOf('png') > -1 && fileName.indexOf('test') > -1;
  });

  var testImageTagStream = testImageFileNameStream.fork();
  var imageHashStream = testImageFileNameStream.fork();
  
  var imageHashStream2 = imageHashStream.map(function(testImageFileName) {
    var imagePath = protocolTestResultsDirectory + testImageFileName;
    var sha1Sum = crypto.createHash('sha1');
    return highland(fs.ReadStream(imagePath))
      .map(function(d) {
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
    var testImageTags = input[0];
    var browser = testImageTags.browser;
    var type = testImageTags.type;
    var name = testImageTags.name;

    var imageHash = input[1];

    imageHashes[name] = imageHashes[name] || {};
    imageHashes[name][browser] = imageHash;
    return imageHashes;
  })
  .each(function(result) {
    console.log(result.curves.safari);
    console.log('result');
    console.log(result);
  });
});

