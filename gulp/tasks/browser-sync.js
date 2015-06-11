// see setup guide for using with gulp: http://www.browsersync.io/docs/gulp/
var browserSync = require('browser-sync');
var evt = browserSync.emitter;
var gulp        = require('gulp');
var packageJson = require('../../package.json');
var reload      = browserSync.reload;

evt.on('rs', function() {
  console.log('You want to reload BrowserSync!');
});

/*
gulp.task('browser-sync', ['browserify', 'browserify-polyfills'], function() {
  browserSync(['./index.js', './lib/polyfills.js'], {
  //*/
gulp.task('browser-sync', ['browserify'], function() {
  browserSync({
		server: {
			baseDir: './'
		},
    port: 3000,
    // Don't show any notifications in the browser.
    notify: false,
    startPath: './test/'
	});

  gulp.watch(['./test/lib/' + packageJson.name + '/dev/**/*.js'])
    .on('change', reload);
});
