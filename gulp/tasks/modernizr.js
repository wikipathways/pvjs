var config = require('../config.json');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handle-errors.js');
var highland = require('highland');
var mkdirp = require('mkdirp');
var modernizr = require('gulp-modernizr');
var utils = require('../util/utils');

mkdirp('tmp');

gulp.task('modernizr', function(callback) {
  utils.createExecStream('touch ./tmp/modernizr-custom.js')
  .concat(
    gulp.src('./test/lib/pvjs/dev/*.js')
      .pipe(modernizr('modernizr-custom.js'))
      .pipe(gulp.dest('tmp/'))
  )
  .toArray(function() {
    return callback();
  });
});
