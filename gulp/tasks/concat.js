var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');

var getBundleName = function() {
  var package = JSON.parse(fs.readFileSync('package.json'));
  var version = package.version;
  var name = package.name;
  if (global.isWatching) {
    return name + '-dev.bundle';
  } else {
    return name + '-' + version + '.bundle.min';
  }
};

/* Concantenate the bundles in ./tmp and save to ./tmp/built
* This takes the output files from bundle, bundle-ts and modernizr tasks and
* creates a new file with a versioned bundle name.
*/
gulp.task('concat', function() {
  return gulp.src(['./tmp/pvjs.js', './tmp/typescript.js', './tmp/modernizr.js'])
    .pipe(concat(getBundleName() + '.js'))
    .pipe(gulp.dest('./tmp/built'));
});
