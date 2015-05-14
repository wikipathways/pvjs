/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var brfs = require('gulp-brfs');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var bundleLogger = require('../util/bundle-logger.js');
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

gulp.task('browserify', ['browserify-polyfills'], function() {

  var bundleMethod = global.isWatching ? watchify : browserify;

  var packageJson;

  var getBundleName = function() {
    packageJson = JSON.parse(fs.readFileSync('package.json'));
    var version = packageJson.version;
    var name = packageJson.name;
    return name + '-dev.bundle';
  };

  var bundler = bundleMethod({
    // Specify the entry point of your app
    entries: [//'./index.js',
      './lib/jquery-plugin.js',
      './lib/diff-viewer/diff-viewer.js'
    ]
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
    .bundle({
      insertGlobals : true,
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
        .through(buffer())
        .through(rename(function(path) {
          path.basename = path.basename.replace(
              '-dev.bundle', '-' + packageJson.version + '.bundle.min');
        }))
        .through(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .through(uglify())
        .through(sourcemaps.write('./'))
        .through(gulp.dest('./dist/'))
        .through(gulp.dest('./demo/lib/' + packageJson.name + '/'));
    }))
    // Specify the output destination
    .pipe(gulp.dest('./test/lib/' + packageJson.name + '/'))
    // Log when bundling completes!
    .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});
