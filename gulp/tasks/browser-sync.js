// see setup guide for using with gulp: http://www.browsersync.io/docs/gulp/
var browserSync = require('browser-sync');
var gulp        = require('gulp');
var evt = browserSync.emitter;

evt.on('rs', function() {
  console.log('You want to reload BrowserSync!');
});

gulp.task('browser-sync', function() {
  return browserSync.init({
    server: {
      baseDir: './'
    },
    port: 8000,
    notify: false,
    startPath: './test/',
    injectChanges: false
  });
});
