var gulp = require('gulp');
var highland = require('highland');

gulp.task('copy-test-to-demo', function(done) {
  return gulp.src(['./test/lib/pvjs/**',
                   './test/web-component-demos/**',
                   './test/jquery-demos/**'],
                   {base: './test'})
    //.pipe(highland.pipeline())
		.pipe(gulp.dest('./demo'));
    /*
    .concat(
      gulp.src('./dist/**')
        .pipe(highland.pipeline())
        .pipe(gulp.dest('./demo/lib/pvjs'));
    )
    //*/
});
