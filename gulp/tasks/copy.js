var gulp = require('gulp');
var highland = require('highland');

gulp.task('copy', function(done) {
  return gulp.src('./dist/**')
		.pipe(gulp.dest('./test/lib/pvjs'));
});
