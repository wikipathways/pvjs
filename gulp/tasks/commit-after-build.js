var config = require('../config.json');
var fs = require('fs');
var git = require('gulp-git');
var gitStreaming = require('../util/git-streaming.js');
var gulp = require('gulp');
var highland = require('highland');
var metadataFilePaths = config.metadataFilePaths;

gulp.task('commit-after-build', function commitAfterBuild(callback) {
  var package = JSON.parse(fs.readFileSync('package.json'));
  var version = package.version;

  gulp.src(['./dist/**/*',
            './docs/**/*',
            './test/lib/**/*',
            './test/jquery-demos/**/*',
            './test/web-component-demos/**/*',
            './demo/',
            'README.md']
            .concat(metadataFilePaths)
  )
  .pipe(highland.pipeline())
  .through(git.add())
  .through(git.commit('Built and bumped version to ' + version + '.'))
  .last()
  .errors(function(err, push) {
    throw err;
  })
  .each(function() {
    return callback();
  });
});
