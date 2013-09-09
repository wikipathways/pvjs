module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ';\n\n',
      },
      dist: {
        src: [
          'src/js/case-converter.js',
          'src/js/xml2json.js',
          'src/js/rgbcolor.js',
          'src/js/pathvisio/pathvisio.js',
          'src/js/pathvisio/helpers.js',
          'src/js/pathvisio/pathway/pathway.js',
          'src/js/pathvisio/pathway/group.js',
          'src/js/pathvisio/pathway/info-box.js',
          'src/js/pathvisio/pathway/node.js',
          'src/js/pathvisio/pathway/edge/edge.js',
          'src/js/pathvisio/pathway/edge/marker.js',
          'src/js/pathvisio/pathway/edge/point.js',
          'src/js/pathvisio/pathway/edge/path-data.js',
        ],
        dest: 'build/js/pathvisio.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'build/js/pathvisio.min.js': ['build/js/pathvisio.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('default', ['uglify']);

};
