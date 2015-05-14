var gulp = require('gulp');
var highland = require('highland');
var packageJson = require('../../package.json');

gulp.task('update-dev-bundle', function(done) {
  return gulp.src('./dist/**')
		.pipe(gulp.dest('./test/lib/' + packageJson.name));
});
