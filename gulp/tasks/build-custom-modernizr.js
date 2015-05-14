/* browserify task for polyfills
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var brfs = require('gulp-brfs');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var bundleLogger = require('../util/bundle-logger.js');
var config = require('../config.json');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handle-errors.js');
var highland = require('highland');
var mkdirp = require('mkdirp');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('build-custom-modernizr', function(callback) {

  var modernizr = require('modernizr');

  modernizr.build({
    'feature-detects': config.modernizrFeatureDetects,
  }, function(result) {
    mkdirp('./tmp', function(err) {
      fs.writeFileSync('./tmp/modernizr-custom.js', result);
      return callback(err, result);
    });
  });

});
