
var gulp = require('gulp');
//var gulpPolyfillService = require('gulp-polyfill-service');

gulp.task('polyfill', function() {
  //gulp.src('./lib/**/*.js')
  gulp.src('./test/lib/pvjs/pvjs-dev.bundle.js')
    /* TODO the following module doesn't install and it was removed from github.
    .pipe(gulpPolyfillService({
      // Or false if not need transform files to next pipe, exclude generated polyfills
      transformFile: true,
      // User agent
      uaString: 'Mozilla/5.0 (X11; Linux x86_64) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/41.0.2272.76 ' +
          'Safari/537.36',
      filename: './polyfills.js', // Filename
      features: {}
      //exclude: [] // For exclude polyfills by name
    }))
    //*/
    .pipe(gulp.dest('./dist/'));
});
