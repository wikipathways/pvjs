var gulp = require('gulp');
var copy = require('gulp-copy');

// Copy all assets that aren't js or ts
gulp.task('copy:assets', function() {
    return gulp.src('./src/**/!(*.ts|*.tsx|*.js|*.jsx|*.map|*.log)')
        .pipe(copy('./lib', {
            prefix: 1 // Remove the src part of the path
        }))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['copy:assets']);