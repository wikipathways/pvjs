var gulp = require('gulp');
var runSequence = require('run-sequence');
/* Before running this task, manually commit in master
 * Build (this task)
 *   Check git status for no changes
 *   Bump metadata files version
 *   Sync README, test and demo files with current version
 *   Build docs / Browserify
 *   Commit again with message "Built and bumped to version X.Y.Z."
 *   Create tag with new version
 * After this task, run gulp publish
 */

gulp.task('build', function(cb){
  return runSequence(
    'modernizr',
    'bundle-ts',
    'bundle',
    'libs',
    'demo-libs',
    'clean-tmp',
    cb
  )
});
