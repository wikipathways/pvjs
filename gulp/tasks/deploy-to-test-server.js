var gulp = require('gulp');
var rsyncwrapper = require('rsyncwrapper');

/*
gulp.task('deploy-to-test-server', ['build'], function() {
});
//*/
gulp.task('deploy-to-test-server', function(callback) {
  var rsync = require('rsyncwrapper').rsync;
  rsync({
      args: ['--verbose'],
      exclude: ['.*', '.git*', '*.scss', 'node_modules', '.svn*'],
      recursive: true,
      /*
      src: './**',
      dest: '/var/www/pvjs/',
      //*/
      src: './test/**',
      dest: '/var/www/pvjs/test/',
      host: process.env.POINTER_UCSF_EDU_USERNAME + '@pointer.ucsf.edu',
      delete: true
    }, function() {
      console.log('Finished deploying pvjs to test server.');
      return callback();
    });
});
