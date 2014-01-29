module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    net: {
      devserver: {
        host: 'localhost',
        port: 5004,
        tasks: ['jshint']
      }
    },
    watch: {
      all: {
        files: '<%= net.all.src %>'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'tasks/*.js'],
      options: { jshintrc: '.jshintrc' }
    }
  });

  // Load external tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load this net task
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint', 'net']);
};
