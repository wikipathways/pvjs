var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch', ['pre-watch-build'], function() {
	// Note: The browserify task handles js recompiling with watchify
  gulp.watch('./tmp/**', ['watch-build']);
  gulp.watch('./test/*.html', ['refresh'])
  //gulp.watch('./demo/*.js', ['stripScriptTags']);
	//gulp.watch('./src/**', ['testDev']);
});

/**
* Run these tasks when watchify creates a new bundle
* Need to concat the bundles in ./tmp
* and copy everything from the ./tmp/built.
*
* Don't need to bundle again since watchify already did that
*/
gulp.task('watch-build', function(cb){
  return runSequence(
    'libs',
    'demo-libs',
    'refresh',
    cb
  )
});

/**
* Run these tasks when before starting the watch task.
* Need to create the js bundles from js and ts, and create the modernizr bundle.
* Then need to concat the bundles and then copy them into /dist and /demo.
* Then need to start the browser-sync server.
*
* NOTE: Do not clean the tmp folder because it is watched to see if watchify
* creates a bundle.
*/
gulp.task('pre-watch-build', function(cb){
  return runSequence(
    'setWatch',
    'bundle',
    'bundle-ts',
    'modernizr',
    'libs',
    'demo-libs',
    'browser-sync',
    cb
  )
});
