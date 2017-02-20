var gulp = require('gulp');
/** Libs task
* Copy all libs from the tmp directory into dist
*/
gulp.task('libs', ['concat'], function() {
  return gulp.src('./tmp/built/*.js')
    .pipe(gulp.dest('./dist'));
});
