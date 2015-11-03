var colors = require('colors');
var gulp = require('gulp');
var highland = require('highland');
var jshint = require('gulp-jshint');
var path = require('path');
var tmp = require('tmp');

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

  function getPackNameFromDirName(dirName) {
    return dirName.replace(/-js$/, '').replace(/\.js$/, '').replace(/js$/, '');
  }

  // child dependencies
  [
    'kaavio',
    'kaavio-editor',
    'gpml2pvjson-js',
    'wikipathways-api-client-js',
  ]
  .forEach(function(dirName) {
    var packageName = getPackNameFromDirName(dirName);
    var remoteBase = path.resolve(path.join('..', dirName, 'lib'));
    var watchTargetJs = path.join(remoteBase, '**/*.js');
    var watchTargetJson = path.join(remoteBase, '**/*.json');
    var watchTargetCss = path.join(remoteBase, '**/*.css');
    var watchTargetHtml = path.join(remoteBase, '**/*.html');
    gulp.watch([watchTargetJs, watchTargetJson, watchTargetCss, watchTargetHtml], function(event) {
      var type = event.type;
      console.log(type[changeTypeToColorMappings[type]] + ': ' +
          event.path.replace(packageName, packageName.inverse));
      if (['changed', 'added'].indexOf(type) > -1) {
        var srcPath = event.path;
        var localBase = path.resolve(path.join('.', 'node_modules', packageName, 'lib'));
        var destTarget = path.dirname(srcPath.replace(remoteBase, localBase));
        gulp.src(srcPath)
          .pipe(jshint())
          .pipe(jshint.reporter('default'))
          .pipe(highland.pipeline(function(stream) {
            return stream.map(function(file) {
              if (!file.jshint.success) {
                console.log('jshint failed');
                destTarget = tmp.dirSync({unsafeCleanup: true});
              }
              return file;
            });
          }))
          .pipe(gulp.dest(destTarget));
      }
    });
  });

  /* TODO: verify that "npm link" is handling this. If so, remove the code below.
  // grandchild dependencies
  [
    {
      child: 'kaavio',
      grandchildren: ['bridgedbjs', 'jsonld-rx']
    }, {
      child: 'kaavio-editor',
      grandchildren: ['bridgedbjs', 'jsonld-rx']
    }, {
      child: 'gpml2pvjson-js',
      grandchildren: ['bridgedbjs', 'jsonld-rx']
    }
  ]
  .reduce(function(accumulator, dependency) {
    var child = dependency.child;
    dependency.grandchildren.forEach(function(grandchild) {
      accumulator.push({
        child: child,
        grandchild: grandchild
      });
    });
    return accumulator;
  }, [])
  .forEach(function(dependency) {
    var childDirName = dependency.child;
    var grandchildDirName = dependency.grandchild;

    var childPackageName = getPackNameFromDirName(childDirName);
    var grandchildPackageName = getPackNameFromDirName(grandchildDirName);
    var remoteBase = path.resolve(path.join('..', grandchildDirName, 'lib'));
    //*/
    //var watchTargetJs = path.join(remoteBase, '**/*.js');
    //var watchTargetJson = path.join(remoteBase, '**/*.json');
    //var watchTargetCss = path.join(remoteBase, '**/*.css');
    //var watchTargetHtml = path.join(remoteBase, '**/*.html');
    /*
    gulp.watch([watchTargetJs, watchTargetJson, watchTargetCss, watchTargetHtml], function(event) {
      var type = event.type;
      console.log(type[changeTypeToColorMappings[type]] + ': ' +
          event.path.replace(grandchildPackageName, grandchildPackageName.inverse));
      if (['changed', 'added'].indexOf(type) > -1) {
        var srcPath = event.path;

        var localBase = path.resolve(path.join('.', 'node_modules', childPackageName,
            'node_modules', grandchildPackageName, 'lib'));
        var localDestTarget = path.dirname(srcPath.replace(remoteBase, localBase));

        var childLocalBase = path.resolve(path.join(
            '..', childPackageName, 'node_modules', grandchildPackageName, 'lib'));
        var childDestTarget = path.dirname(srcPath.replace(remoteBase, childLocalBase));

        gulp.src(srcPath)
          .pipe(jshint())
          .pipe(jshint.reporter('default'))
          .pipe(highland.pipeline(function(stream) {
            return stream.map(function(file) {
              if (!file.jshint.success) {
                console.log('jshint failed');
                localDestTarget = childDestTarget = tmp.dirSync({unsafeCleanup: true});
              }
              return file;
            });
          }))
          .pipe(gulp.dest(localDestTarget))
          .pipe(gulp.dest(childDestTarget));
      }
    });
  });
  //*/
});
