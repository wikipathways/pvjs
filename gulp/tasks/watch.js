var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	// Note: The browserify task handles js recompiling with watchify
	gulp.watch('./lib/cross-platform-text/dist/lib/**', ['copy']);
	gulp.watch('./src/**', ['test']);
});
