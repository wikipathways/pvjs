var gulp = require('gulp');

gulp.task('copy', function(done) {
  //return done();
  //*
  return gulp.src('./dist/**')
		.pipe(gulp.dest('./demo/lib/pvjs'));
  //*/
});
