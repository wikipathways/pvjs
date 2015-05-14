var config = require('../config.json');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handle-errors.js');
var highland = require('highland');
var mkdirp = require('mkdirp');
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src('./test/lib/pvjs/pvjs-dev.bundle.js')
    .pipe(modernizr())
    .pipe(gulp.dest('tmp/'));
});
