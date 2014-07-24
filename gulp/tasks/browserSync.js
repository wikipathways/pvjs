// see setup guide for using with gulp: http://www.browsersync.io/docs/gulp/
var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['build'], function() {
	browserSync.init(['./src/**/*.js'], {
		server: {
			baseDir: './'
		},
    //port: 3000,
    // Don't show any notifications in the browser.
    notify: false,
    startPath: './test/'
	});
});
