var buffer = require('vinyl-buffer');
var fs = require('fs');
var gulp = require('gulp');
var highland = require('highland');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('build-polyfills', ['browserify-polyfills'], function buildPolyfills(done) {
  var packageJson = JSON.parse(fs.readFileSync('package.json'));
  var name = packageJson.name;
  var version = packageJson.version;

  return gulp.src('./test/lib/' + name + '/' + name + '-polyfills-dev.js')
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('-dev', '-' + version + '.min');
    }))
    .pipe(highland.pipeline(function(stream) {
      return stream
        // These steps are only enabled when
        // a watch is not set.
        // They are too slow to enable
        // during development.
        .through(buffer())
        .through(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .through(uglify())
        .through(sourcemaps.write('./'));
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./demo/lib/' + packageJson.name + '/'));
});
