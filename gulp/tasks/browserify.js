/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var buffer = require('vinyl-buffer');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var brfs = require('gulp-brfs');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('browserify', function() {

  var bundleMethod = global.isWatching ? watchify : browserify;

  var bundler = bundleMethod({
    // Specify the entry point of your app
    entries: ['./src/js/pathvisiojs.js']
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
      //debug: true
    })
    // Report compile errors
    .on('error', handleErrors)
    // Use vinyl-source-stream to make the
    // stream gulp compatible. Specify the
    // desired output filename here.
    .pipe(source('pathvisiojs.min.js'))
    .pipe(buffer())
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    // Specify the output destination
    .pipe(gulp.dest('./dist/lib/pathvisiojs/js/'))
    // Log when bundling completes!
    .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});
