var gulp = require('gulp');
var buildBranch = require('gulp-build-branch');

gulp.task('githubPages', function githubPages() {
  return buildBranch({folder: 'demo'});
});
