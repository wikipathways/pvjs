var fs = require('fs');
var gulp = require('gulp');
var highland = require('highland');
var replace = require('gulp-regex-replace');

gulp.task('copy-test-to-demo', function(done) {
  // Reading it here (instead of using require) because
  // the version may have been bumped since require ran.
  var packageJson = JSON.parse(fs.readFileSync(
      '../../package.json', 'utf8'));

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
