var bump = require('gulp-bump');
var config = require('../config.json');
var getVersionType = require('../util/get-version-type.js');
var gulp = require('gulp');
var highland = require('highland');
var JSONStream = require('JSONStream');
var metadataFilePaths = config.metadataFilePaths;
var oldPackageJson = require('../../package.json');
var replace = require('gulp-regex-replace');

// Update bower, component, npm all at once:
gulp.task('bump-version-number-in-files',
    function bumpVersionNumberInFiles(callback) {
  getVersionType.each(function(versionType) {
    console.log('versionType');
    console.log(versionType);
    if (versionType === 'none') {
      return callback(null, 'none');
    }

    gulp.src(metadataFilePaths)
    .pipe(bump({type: versionType}))
    .pipe(gulp.dest('./'))
    .pipe(highland.pipeline(function(s) {
      return s.map(function(file) {
        return file.contents;
        // TODO we should be able to use something like this
        // to make this code simpler, but it's not working:
        //return file.pipe(JSONStream.parse('*'));
      })
      .head()
      .pipe(JSONStream.parse())
      // This is needed to turn the stream into a highland stream
      .pipe(highland.pipeline())
      .flatMap(function(newPackageJson) {

        // TODO do we need to pollute the global namespace?
        global.newPackageJson = newPackageJson;

        var version = {};
        version.old = oldPackageJson.version;
        version.new = newPackageJson.version;
        console.log('files bumping from ' + version.old + ' to ' + version.new);

        function replaceVersionedName() {
          return replace({
            regex: oldPackageJson.name + '-\\d+\\.\\d+\\.\\d+',
            replace: oldPackageJson.name + '-' + version.new
          });
        }

        function replacePolyfillVersionedName() {
          return replace({
            regex: oldPackageJson.name + '-polyfills-\\d+\\.\\d+\\.\\d+',
            replace: oldPackageJson.name + '-polyfills-' + version.new
          });
        }

        // TODO how can we use a dest that just matches where
        // the file was found?
        return highland(gulp.src([
          'README.md'
        ])
        .pipe(replaceVersionedName())
        .pipe(gulp.dest('./'))
        )
        .concat(
          gulp.src([
            './test/*.html'
          ])
          .pipe(replaceVersionedName())
          .pipe(gulp.dest('./test/'))
        )
        .concat(
          gulp.src([
            './demo/*.html'
          ])
          .pipe(replacePolyfillVersionedName())
          .pipe(replaceVersionedName())
          .pipe(gulp.dest('./demo/'))
        )
        .concat(
          // gulp-bump does not update the dist file name
          gulp.src(metadataFilePaths)
          .pipe(replaceVersionedName())
          .pipe(gulp.dest('./'))
        );
      })
      .last()
      .each(function() {
        return callback();
      });
    }));
  });
});
