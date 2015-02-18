/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var brfs = require('gulp-brfs');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var bundleLogger = require('../util/bundleLogger');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var highland = require('highland');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('browserify', function() {

  var bundleMethod = global.isWatching ? watchify : browserify;

  var getBundleName = function() {
    var package = JSON.parse(fs.readFileSync('package.json'));
    var version = package.version;
    var name = package.name;
    if (global.isWatching) {
      return name + '-dev.bundle';
    } else {
      return name + '-' + version + '.bundle.min';
    }
  };

  var bundler = bundleMethod({
    // Specify the entry point of your app
    entries: ['./src/pathvisiojs.js',
      './src/highlighter/highlighter.js',
      './src/notifications/notifications.js',
      './src/diff-viewer/diff-viewer.js']
  })
  // enable fs.readFileSync() in browser
  .transform('brfs')
  .transform('deglobalify');

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
    .bundle({
      insertGlobals : true,
      exclude: 'cheerio',
      // Enable source maps!
      debug: true
    })
    // Report compile errors
    .on('error', handleErrors)
    // Use vinyl-source-stream to make the
    // stream gulp compatible. Specify the
    // desired output filename here.
    .pipe(source(getBundleName() + '.js'))
    .pipe(highland.pipeline(function(stream) {
      if (global.isWatching) {
        return stream;
      }

      return stream
        // These steps are only enabled when
        // a watch is not set.
        // They are too slow to enable
        // during development.
        .pipe(buffer())
        // TODO keep an eye on this issue:
        // https://github.com/floridoo/gulp-sourcemaps/issues/73
        // It's the reason we're using v1.1.0 of gulp-sourcemaps,
        // not the latest version.
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
    }))
    // Specify the output destination
    .pipe(gulp.dest('./dist/'))
    // Log when bundling completes!
    .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});
