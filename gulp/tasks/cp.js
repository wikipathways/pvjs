var gulp = require('gulp');
var path = require('path');

gulp.task('cp', function() {
  ['kaavio'].forEach(function(packageName) {
    var remoteBase = path.resolve(path.join('..', packageName, 'lib'));
    var watchTarget = path.join(remoteBase, '**');
    gulp.watch(watchTarget, function(event) {
      console.log('Kaavio File ' + event.path + ' was ' + event.type + ', running tasks...');
      var type = event.type;
      if (type === 'changed' || type === 'added') {
        var srcPath = event.path;
        var localBase = path.resolve(path.join('.', 'node_modules', packageName, 'lib'));
        var destTarget = path.dirname(srcPath.replace(remoteBase, localBase));

        gulp.src(srcPath)
          .pipe(gulp.dest(destTarget));
      }
    });
  });
});
