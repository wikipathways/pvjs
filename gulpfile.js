var gulp = require('gulp');
var copy = require('gulp-copy');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');

// Create an external CSS style that can optionally be used by devs instead of the webpack style loader
// This is useful when using Angular CLI since all styles must be specified in the styles property of a component
// See: https://github.com/angular/angular-cli/issues/1459
// Note: the typestyles will still be imported fine since they are not css files
gulp.task('create-styles', function(){
    return gulp.src([
        './node_modules/roboto-fontface/css/roboto/roboto-fontface.css', // Robot font
        './node_modules/react-spinkit/css/*.css' // React SpinKit styles
    ])
        .pipe(concatCss('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./lib'));
});

// Copy all assets that aren't js or ts
gulp.task('copy:assets', function() {
    return gulp.src('./src/**/!(*.ts|*.tsx|*.js|*.jsx|*.map|*.log)')
        .pipe(copy('./lib', {
            prefix: 1 // Remove the src part of the path
        }))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['copy:assets', 'create-styles']);