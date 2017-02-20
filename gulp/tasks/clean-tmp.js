var gulp = require('gulp');
var clean = require('gulp-clean');

/**
Remove all files inside the tmp directory
**/
gulp.task('clean-tmp', function () {
    return gulp.src('./tmp', {read: false})
        .pipe(clean());
});
