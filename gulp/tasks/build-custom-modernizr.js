var config = require('../config.json');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handle-errors.js');
var highland = require('highland');
var mkdirp = require('mkdirp');
var modernizr = require('modernizr');

gulp.task('build-custom-modernizr', function(callback) {

  modernizr.build({
    'feature-detects': config.modernizrFeatureDetects,
  }, function(result) {
    mkdirp('./tmp', function(err) {
      console.log('resultaaaaa');
      console.log(result);
      fs.writeFileSync('./tmp/modernizr-custom.js', result);
      return callback(err, result);
    });
  });

});
