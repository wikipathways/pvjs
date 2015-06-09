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

gulp.task('browserify', function() {

  var packageJson = JSON.parse(fs.readFileSync('package.json'));
  var version = packageJson.version;
  var name = packageJson.name;

  mkdirp.sync('./dist/' + version + '/');
  mkdirp.sync('./demo/lib/' + name + '/' + version + '/');
  mkdirp.sync('./test/lib/' + name + '/' + version + '/');
  mkdirp.sync('./test/lib/' + name + '/dev/');

  var process = function(subsection) {
    return highland.pipeline(function(stream) {

      var unminifiedFileName = name + '.' + subsection + '.js';
      var minifiedFileName = name + '.' + subsection + '.min.js';

      var vinylifiedStream = stream
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .through(source(unminifiedFileName));

      if (global.isWatching) {
        vinylifiedStream
        .pipe(gulp.dest('./test/lib/' + name + '/dev/'));
      }

      return vinylifiedStream
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
        // locate sourcemaps in same dir as source file
        .through(sourcemaps.write('./'))
        .through(gulp.dest('./test/lib/' + name + '/' + version + '/'))
        .through(gulp.dest('./dist/' + version + '/'))
        .pipe(gulp.dest('./demo/lib/' + name + '/' + version + '/'));
    });
  };

  var bundler = browserify(config.entries, {
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
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

  bundler.plugin('factor-bundle', {
    outputs: config.entries.map(function(entry) {
      return entry.split('/').pop().replace('.js', '');
    })
    .map(process)
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
    .bundle()
    // Report compile errors
    .on('error', handleErrors)
    .pipe(process('core'))
    // Log when bundling completes!
    .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});
