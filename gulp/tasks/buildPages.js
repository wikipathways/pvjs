var gulp = require('gulp')
  ;
// TODO finish this. it isn't working right now.
gulp.task('buildPages', ['build'], function() {
	gulp.src('./dist/lib/**')
		.pipe(gulp.dest('./gh-pages/lib/'));

	gulp.src('./dist/lib/**')
		.pipe(gulp.dest('./gh-pages/lib/'));
});


