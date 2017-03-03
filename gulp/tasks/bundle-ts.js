var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var babelify = require("babelify");
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var assign = require('lodash/assign');
var brfs = require('gulp-brfs');

/** Bundle Typescript!
* Uses browserify to bundle Typescript starting from the main.ts file.
*
* If watching then it uses watchify to watch all imports and bundles if one
* changes.
*/
gulp.task('bundle-ts', bundle);

var bundler = function() {
  // Set up the bundler
  // Uses watchify if watching
  var customOpts = {
    entries: ['./lib/main.ts'],
    extension: ['ts'],
    extensions: ['.ts'],
    plugin: ['tsify'],
    //debug: true,
    basedir: '.'
  };

  if(global.isWatching) {
    gutil.log('Bundling Typescript using watchify!');
    var opts = assign({}, { cache: {}, packageCache: {} }, customOpts);
    return watchify(browserify(opts))
      .on('update', bundle)
      .on('log', gutil.log);
  }

  return browserify(customOpts);
};

function bundle(){
  gutil.log('Bundling Typescript...');

  bundling = bundler()
      .transform("babelify", {presets: ['es2015'], extensions: ['.ts', '.js']})
      .transform("brfs")
      .ignore('commander')
      .ignore('cheerio')
      .bundle();

  bundling.on('error', gutil.log.bind(gutil, 'Browserify error'));

  bundling = bundling.pipe(source('typescript.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}));

  if(! global.isWatching) {
    // Sourcemaps and uglify if not watching
    bundling = bundling.pipe(uglify())
  }

  return bundling
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./tmp/'));
}
