var exec = require('child_process').exec;
var gitStreaming = require('../util/git-streaming.js');
var gulp = require('gulp');
var highland = require('highland');
var killStream = require('../util/kill-stream.js');
var packageJson = require('../../package.json');
var utils = require('../util/utils.js');

// publish to github repo, github pages and npm.
gulp.task('publish', ['sync-tag-version', 'github-pages'], function publish(callback) {
  highland(gitStreaming.push('origin', 'master'))
  .errors(killStream)
  .flatMap(gitStreaming.push('origin', packageJson.version))
  .errors(killStream)
  .flatMap(gitStreaming.checkout('gh-pages'))
  .flatMap(gitStreaming.push('origin', 'gh-pages'))
  .flatMap(gitStreaming.checkout('master'))
  /* TODO enable this if this package is on npm
  .flatMap(function() {
    return utils.createExecStream('npm publish');
  })
  //*/
  .map(function(stdout, stderr) {
    return stdout;
  })
  //*/
  .each(function(data) {
    return callback(null, data);
  });
});
