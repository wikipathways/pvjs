'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    str2js: {
      NS: { 'test/build.js': ['test/html.html']}
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['str2js']);
  
};
