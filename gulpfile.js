var gulp = require('gulp');
var copy = require('gulp-copy');
gulp.task('scripts', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

// Copy all static images
// TODO: Don't use gulp for this. Webpack?
gulp.task('copy:assets', function() {
    return gulp.src('./src/**/!(*.ts|*.tsx|*.js|*.jsx|*.map|*.log)')
        .pipe(copy('./lib', {
            prefix: 1 // Remove the src part of the path
        }))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['copy:assets']);