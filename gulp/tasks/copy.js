var gulp = require('gulp');

gulp.task('copy', function(done) {
  //return done();
  //*
  return gulp.src('./dist/**')
		.pipe(gulp.dest('./demo/lib/pathvisiojs'))
		.pipe(gulp.dest('./demo-mithril/lib/pathvisiojs'));
  //*/
});
