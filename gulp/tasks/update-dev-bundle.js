var gulp = require('gulp');
var highland = require('highland');

gulp.task('update-dev-bundle', function(done) {
  return gulp.src('./dist/**')
		.pipe(gulp.dest('./test/lib/pvjs'));
});
