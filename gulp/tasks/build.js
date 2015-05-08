var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

/* Task Steps
 * Manually commit in master, then this task will:
 * Build
 *  - Check git status for no changes
 *  - Bump metadata files version
 *  - Sync README with current version
 *  - Build docs & browserify
 *  - Copy built files to demo directory
 *  - Commit again with message "Bumped to version X.Y.Z. Built"
 *  - Create tag with new version
 * When this task finishes, you can run ``gulp publish``
 */

gulp.task('build', gulpSequence('verify-git-status',
      'bump-version-number-in-files',
      ['browserify', 'build-docs', 'browserify-polyfills'],
      'create-demos-from-tests',
      'commit-after-build',
      'sync-tag-version'));
