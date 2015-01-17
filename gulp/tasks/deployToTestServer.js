var gulp = require('gulp')
  , rsyncwrapper = require('rsyncwrapper')
  ;

gulp.task('deployToTestServer', ['build'], function() {
  var rsync = require('rsyncwrapper').rsync;
  rsync({
      args: ['--verbose'],
      exclude: ['.*','.git*','*.scss','node_modules','.svn*'],
      recursive: true,
      src: './**',
      dest: '/var/www/pvjs/',
      host: process.env.POINTER_UCSF_EDU_USERNAME + '@pointer.ucsf.edu',
      delete: true
    }, function() {
      console.log('Finished deploying pvjs to test server.')
    });
});
