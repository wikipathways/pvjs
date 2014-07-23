var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['build'], function() {
	browserSync.init(['./src/**/*.js'], {
		server: {
			baseDir: './'
		}
	});
});
