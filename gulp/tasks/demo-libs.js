var gulp = require('gulp');

/**
* Copy all libs into the demo directory
*/
gulp.task('demo-libs', function(done) {
  return gulp.src('./dist/**')
		.pipe(gulp.dest('./demo/lib/pvjs'));
});
