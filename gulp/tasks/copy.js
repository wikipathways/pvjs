var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src('./lib/cross-platform-text/dist/lib/**')
		.pipe(gulp.dest('./dist'));
});
