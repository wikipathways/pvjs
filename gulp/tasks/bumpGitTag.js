
var fs = require('fs');
var git = require('gulp-git');
var gitStreaming = require('../util/gitStreaming.js');
var gulp = require('gulp');
var highland = require('highland');
// TODO don't repeat these
var metadataFilePaths = require('../util/metadataFilePaths.json');

gulp.task('bumpGitTag', function bumpGitTag(callback) {
  var package = JSON.parse(fs.readFileSync('package.json'));
  var version = package.version;

  gitStreaming.readTags
  .filter(function(tag) {
    return tag !== version;
  })
  .last()
  .each(function(tag) {
    gulp.src(['./dist/*',
              './docs/*',
              'README.md']
              .concat(metadataFilePaths)
    )
    .pipe(git.add())
    .pipe(git.commit('Built and bumped version to ' + version + '.'))
    .pipe(gitStreaming.createTag(version,
            'Version ' + version))
    .last()
    .each(function() {
      return callback();
    });
  });
});
