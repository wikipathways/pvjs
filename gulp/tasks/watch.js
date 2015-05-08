var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync', 'update-dev-bundle'], function() {
	// Note: The browserify task handles js recompiling with watchify
  gulp.watch('./dist/**', ['update-dev-bundle']);
	//gulp.watch('./lib/**', ['testDev']);
});
