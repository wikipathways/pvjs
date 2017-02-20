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
//var watchify = require('watchify');

gulp.task('browserifyPolyfills', function() {

  // TODO move this into its own file
  var modernizr = require('modernizr');

  modernizr.build({
    'feature-detects': [
      'inputtypes',
      'svg',
      'svg/asimg',
      'svg/clippaths',
      'svg/filters',
      'svg/foreignobject',
      'svg/inline',
      'svg/smil'
    ]
  }, function(result) {
    fs.writeFileSync('./tmp/modernizr-custom.js', result);
  });

  var bundleMethod = browserify;

  var getBundleName = function() {
    var package = JSON.parse(fs.readFileSync('package.json'));
    var version = package.version;
    var name = package.name;
    return name + '-dev-polyfills.bundle';
  };

  var bundler = bundleMethod({
    // Specify the entry point of your app
    entries: ['./tmp/modernizr-custom.js',
      './lib/polyfills.js']
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
    // Specify the output destination
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./demo/lib/kaavio/'))
    // Log when bundling completes!
    .on('end', bundleLogger.end);
  };

  return bundle();
});
