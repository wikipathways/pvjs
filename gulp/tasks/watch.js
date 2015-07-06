var colors = require('colors');
var gulp = require('gulp');
var path = require('path');

var changeTypeToColorMappings = {
  'added': 'green',
  'changed': 'yellow',
  'deleted': 'red'
};

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
    var watchTargetJs = path.join(remoteBase, '**/*.js');
    var watchTargetCss = path.join(remoteBase, '**/*.css');
    var watchTargetHtml = path.join(remoteBase, '**/*.html');
    gulp.watch([watchTargetJs, watchTargetCss, watchTargetHtml], function(event) {
      var type = event.type;
      console.log(type[changeTypeToColorMappings[type]] + ': ' +
          event.path.replace(packageName, packageName.inverse));
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
