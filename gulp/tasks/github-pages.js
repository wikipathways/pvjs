var gulp = require('gulp');
var buildBranch = require('gulp-build-branch');

gulp.task('github-pages', function githubPages() {
  return buildBranch({folder: 'demo'});
});
