var autopolyfiller = require('gulp-autopolyfiller');
var gulp = require('gulp');

gulp.task('autopolyfiller', function() {
  return gulp.src('./test/lib/pvjs/pvjs-dev.bundle.js')
      .pipe(autopolyfiller('result_polyfill_file.js', {
        browsers: ['last 2 version', 'ie 9']
      }))
      .pipe(gulp.dest('./dist'));
});
