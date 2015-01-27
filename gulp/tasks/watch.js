var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	// Note: The browserify task handles js recompiling with watchify
  gulp.watch('./dist/**', ['copy']);
  //gulp.watch('./demo/*.js', ['stripScriptTags']);
	//gulp.watch('./src/**', ['testDev']);
});
