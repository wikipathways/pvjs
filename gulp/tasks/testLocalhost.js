// see the wd example for how to build this: https://github.com/admc/wd/blob/master/gulpfile.js
var gulp = require('gulp')
  , mocha = require('gulp-mocha')
  , wd = require('wd')
  , highland = require('highland')
  ;

/*
gulp.task('default', function () {
  gulp.watch('{lib,test}/*', test);
  test();
});
//*/

function testLocalhost() {
  return gulp.src(['./test/tests/localhost.js'], {read: false, globals:[]}).pipe(mocha({
    // module to require
    r: './test/wd-test-config.js',
    reporter: 'spec',
    timeout: 4000,
    // enable colors
    c: true,
    debug: true
  }));
  //.on('error', console.warn.bind(console));
}

//gulp.task('testLocalhost', ['browserSync'], function () {
gulp.task('testLocalhost', function () {
  return testLocalhost()
  .on('error', function (e) {
    console.log('Error');
    console.log(e);
    //throw e;
  })
  .on('end', function () {
    console.log('End of test');
  });
});

