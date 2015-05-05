var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

/* Task Steps
 * Manually commit in master, then this task will:
 * Build
 *  - Check git status for no changes
 *  - Bump metadata files version
 *  - Sync README with current version
 *  - Build docs / Browserify
 *  - Copy built files to demo directory
 *  - Commit again with message "Bumped to version X.Y.Z. Built"
 *  - Create tag with new version
 * Publish
 */

gulp.task('build', gulpSequence('verify-git-status',
      'bump-version-number-in-files',
      ['browserify', 'build-docs'],
      'copy',
      'commit-after-build',
      'sync-tag-version'));
