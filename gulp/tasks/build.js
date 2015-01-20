var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

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

gulp.task('build', gulpSequence(
    'verifyGitStatus',
    'bumpVersionNumberInFiles',
    'browserify',
    // TODO build docs
    //['browserify', 'build-docs'],
    'copy',
    'bumpGitTag'
));
