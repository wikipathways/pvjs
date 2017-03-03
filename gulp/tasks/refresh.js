var gulp = require('gulp');
var browserSync = require('browser-sync');

/**
* Run the browserify task and refresh the page.
*/
gulp.task('refresh', function(done){
  browserSync.reload();
  done();
});
