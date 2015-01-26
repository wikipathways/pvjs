var bump = require('gulp-bump');
var getVersionType = require('../util/getVersionType');
var gulp = require('gulp');
var highland = require('highland');
var JSONStream = require('JSONStream');
var oldPackageJson = require('../../package.json');
var metadataFiles = [
  './bower.json',
  './component.json',
  './package.json'
];
var replace = require('gulp-regex-replace');

// Update bower, component, npm all at once:
gulp.task('bumpVersionNumberInFiles',
    function bumpVersionNumberInFiles(callback) {
  getVersionType.each(function(versionType) {
    console.log('versionType');
    console.log(versionType);
    if (versionType === 'none') {
      return callback(null, 'none');
    }

    gulp.src(metadataFiles)
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
        var version = {};
        version.old = oldPackageJson.version;
        version.new = newPackageJson.version;
        console.log('version');
        console.log(version);

        return highland(gulp.src([
          'README.md'
        ])
        .pipe(replace({
          regex: version.old,
          replace: version.new
        }))
        .pipe(gulp.dest('./'))
        )
        .concat(
          gulp.src([
            './test/*.html'
          ])
          .pipe(replace({
            regex: 'pathvisiojs-' + version.old,
            replace: 'pathvisiojs-' + version.new
          }))
          .pipe(gulp.dest('./test/'))
        )
        .concat(
          gulp.src([
            './demo/*.html'
          ])
          .pipe(replace({
            regex: 'pathvisiojs-' + version.old,
            replace: 'pathvisiojs-' + version.new
          }))
          .pipe(gulp.dest('./demo/'))
        );
      })
      .last()
      .each(function() {
        return callback();
      });
    }));
  });
});
