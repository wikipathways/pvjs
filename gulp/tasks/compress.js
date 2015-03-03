// TODO this isn't working at present.
var buffer = require('vinyl-buffer');
var fs = require('fs');
var gulp = require('gulp');
var source       = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  var package = JSON.parse(fs.readFileSync('package.json'));
  var version = package.version;
  var name = package.name;
  var getBundleName = function() {
    return name + '-' + version + '.bundle.min';
  };

  gulp.src(['tmp/pvjs-' + version + '.bundle.js'])
    //*
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify({
        'source_map': true,
        'source_map_options': {
          file : 'pvjs-' + version + '.bundle.min.js', // the compressed file name
          root : null, // the root URL to the original sources
          orig : null, // the input source map
        }
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
    //*/

    /*
    .pipe(buffer())
    .pipe(source(getBundleName() + '.js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    // Specify the output destination
    .pipe(gulp.dest('./dist/'))
    //*/
});
