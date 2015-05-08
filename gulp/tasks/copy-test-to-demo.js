var gulp = require('gulp');
var highland = require('highland');
var packageJson = require('../../package.json');
var replace = require('gulp-regex-replace');

gulp.task('copy-test-to-demo', function(done) {
  return gulp.src(['./test/lib/pvjs/**',
                   './test/web-component-demos/**',
                   './test/jquery-demos/**'],
                   {base: './test'})

    .pipe(replace({
            regex: packageJson.name + '-dev',
            replace: packageJson.name + '-' + packageJson.version
          }))
		.pipe(gulp.dest('./demo'));
    /*
    .concat(
      gulp.src('./dist/**')
        .pipe(highland.pipeline())
        .pipe(gulp.dest('./demo/lib/pvjs'));
    )
    //*/
});
