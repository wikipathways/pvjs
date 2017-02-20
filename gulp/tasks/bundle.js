var brfs = require('gulp-brfs');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var highland = require('highland');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var assign = require('lodash/assign');

/* Bundle task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.

   Uglifies if not watching.
*/

gulp.task('bundle', bundle);

var bundler = function() {
  gutil.log('Bundling Javascript...');

  // Set up the bundler
  // Uses watchify if watching
  var customOpts = {
    entries: ['./lib/main.js'],
    extension: ['js'],
    insertGlobals: true,
    //debug: true,
    basedir: '.',
    transform: ['brfs', 'deglobalify']
  };

  if(global.isWatching) {
    gutil.log('Bundling using watchify!');
    var opts = assign({}, { cache: {}, packageCache: {} }, customOpts);
    return watchify(browserify(opts))
      .on('update', bundle)
      .on('log', gutil.log);
  }

  return browserify(customOpts);
};

function bundle(){
  bundling = bundler()
      .ignore('commander')
      .ignore('cheerio')
      .bundle();
  bundling.on('error', gutil.log.bind(gutil, 'Browserify error'));

  bundling = bundling.pipe(source('pvjs.js'));

  if(! global.isWatching) {
    // Sourcemaps and uglify if not watching
    bundling = bundling
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
  }

  return bundling.pipe(gulp.dest('./tmp/'));
}
