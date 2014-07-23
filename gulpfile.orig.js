var gulp = require('gulp')
  ,  browserify = require('gulp-browserify')
  ,  rename = require('gulp-rename')
  ;

// Basic usage
gulp.task('scripts', function() {
  // Single entry point for browserify
  gulp.src('./src/js/pathvisiojs.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production,
      transform: ['deglobalify', 'brfs'],
    }))
    .pipe(rename('pathvisiojs.js'))
    .pipe(gulp.dest('./dist/lib/pathvisiojs/js/'));
});

