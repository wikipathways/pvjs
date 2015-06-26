var gulp = require('gulp');
var path = require('path');

gulp.task('watch', ['set-watch', 'browser-sync'], function() {
	// Note: The browserify task handles js recompiling with watchify
  //gulp.watch('./test/lib/pvjs/pvjs-dev.bundle.js', ['modernizr']);
  //gulp.watch('./dist/**', ['update-dev-bundle']);
	//gulp.watch('./lib/**', ['testDev']);
  [
    'kaavio',
    'kaavio-editor',
    'gpml2pvjson-js',
    'wikipathways-api-client-js'
  ]
  .forEach(function(dirName) {
    var packageName = dirName.replace(/-js$/, '').replace(/\.js$/, '').replace(/js$/, '');
    var remoteBase = path.resolve(path.join('..', dirName, 'lib'));
    var watchTarget = path.join(remoteBase, '**/*.js');
    gulp.watch(watchTarget, function(event) {
      console.log(packageName + ' file ' + event.path + ' was ' + event.type + '.');
      var type = event.type;
      if (['changed', 'added'].indexOf(type) > -1) {
        var srcPath = event.path;
        var localBase = path.resolve(path.join('.', 'node_modules', packageName, 'lib'));
        var destTarget = path.dirname(srcPath.replace(remoteBase, localBase));
        gulp.src(srcPath)
          .pipe(gulp.dest(destTarget));
      }
    });
  });
});
