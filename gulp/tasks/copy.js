var gulp = require('gulp');
var highland = require('highland');

gulp.task('copy', function(done) {
  return gulp.src('./dist/**')
    //.pipe(highland.pipeline())
		.pipe(gulp.dest('./demo/lib/pvjs'));
		.pipe(gulp.dest('./test/lib/pvjs'));
    /*
    .concat(
      gulp.src('./dist/**')
        .pipe(highland.pipeline())
        .pipe(gulp.dest('./demo/lib/pvjs'));
    )
    //*/
});
