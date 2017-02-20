var gulp = require('gulp');
/** Libs task
* Copy all libs from the tmp directory into dist
* Also c
*/
gulp.task('libs', ['concat'], function() {
  return gulp.src(['./tmp/built/*.js', './tmp/built/*.js.map'])
    .pipe(gulp.dest('./dist'));
});
