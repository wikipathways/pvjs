var bump = require('gulp-bump');
var gulp = require('gulp');
var replace = require('gulp-regex-replace');

// I added <script></script> tags to enclose
// my JS code in the riotjs .tag files. This
// is to allow for syntax highlighting for
// HTML and JS when they're in the same file.
// But the riotjs compiler can't handle the
// script tags, so I need to remove them for
// actually running the compiled JS.
gulp.task('stripScriptTags',
    function stripScriptTags(callback) {

  gulp.src(['./demo/*.js'])
    .pipe(replace({
      // Note: we need to include a space in the regex,
      // because otherwise, gulp-regex-replace prepends
      // and appends \b, the word boundary, to the regex.
      regex: ' ?<\/?script> ?',
      replace: ''
    }))
    .pipe(gulp.dest('./demo/'));
});
