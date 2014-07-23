var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('./lib/cross-platform-text/dist/lib/**', ['copy']);
	// Note: The browserify task handles js recompiling with watchify
});
