var fs = require('fs');
var gulp = require('gulp');
var highland = require('highland');
var replace = require('gulp-regex-replace');

gulp.task('create-demos-from-tests', function(done) {
  // Reading it here (instead of using require) because
  // the version may have been bumped since require ran.
  var packageJson = JSON.parse(fs.readFileSync(
      'package.json', 'utf8'));

  return gulp.src(['./test/web-component-demos/**',
                   './test/jquery-demos/**',
                   './test/other-demos/**'],
                   {base: './test'})

    /*
    .pipe(replace({
      regex: packageJson.name + '-polyfills-dev.bundle',
      replace: packageJson.name + '-polyfills-' + packageJson.version + '.bundle.min'
    }))
    //*/
    .pipe(replace({
      regex: '\.js',
      replace: '.min.js'
    }))
    .pipe(replace({
      regex: packageJson.name + '\/dev\/',
      replace: packageJson.name + '/' + packageJson.version + '/'
    }))
		.pipe(gulp.dest('./demo'));
});
