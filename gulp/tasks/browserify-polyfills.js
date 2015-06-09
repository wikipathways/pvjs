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
var modernizr = require('gulp-modernizr');
var handleErrors = require('../util/handle-errors.js');
var highland = require('highland');
var mkdirp = require('mkdirp');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

//gulp.task('browserify-polyfills', ['modernizr'], function() {
gulp.task('browserify-polyfills', function() {

  var packageJson;

  var getBundleName = function() {
    packageJson = JSON.parse(fs.readFileSync('package.json'));
    var version = packageJson.version;
    return 'polyfills.bundle';
  };

  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    // Specify the entry point of your app
    entries: [
      './tmp/modernizr-custom.js',
      //'./lib/polyfills.js'
      //'./node_modules/kaavio/lib/polyfills.js'
    ],
    // Enable source maps!
    debug: true,
    //insertGlobals : true,
    //exclude: 'cheerio'
  })
  .ignore('commander')
  .ignore('cheerio')
  // enable fs.readFileSync() in browser
  .transform('brfs')
  .transform('deglobalify');

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
    .bundle()
    // Report compile errors
    .on('error', handleErrors)
    // Use vinyl-source-stream to make the
    // stream gulp compatible. Specify the
    // desired output filename here.
    .pipe(source(getBundleName() + '.js'))
    .pipe(highland.pipeline(function(stream) {
      if (global.isWatching) {
        return stream
          .pipe(gulp.dest('./test/lib/' + packageJson.name + '/' + packageJson.version + '/'));
      }

      return stream
        // These steps are only enabled when
        // a watch is not set.
        // They are too slow to enable
        // during development.
        .through(buffer())
        .through(rename(function(path) {
          path.extname = '.min.js';
        }))
        .through(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .through(uglify())
        .through(sourcemaps.write('./'))
        .through(gulp.dest('./dist/' + packageJson.version + '/'))
        .through(gulp.dest('./test/lib/' + packageJson.name + '/' + packageJson.version + '/'))
        .pipe(gulp.dest('./demo/lib/' + packageJson.name + '/' + packageJson.version + '/'));
    }))
    // Log when bundling completes!
    .on('end', bundleLogger.end);
  };

  return bundle();
});
