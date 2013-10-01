module.exports = function(grunt) {

// ----------
var packageJson = grunt.file.readJSON("package.json"),
    distribution = "build/js/pathvisio.js",
    minified = "build/js/pathvisio.min.js",
    packageDirName = "pathvisio.js-" + packageJson.version,
    packageDir = "build/" + packageDirName + "/",
    releaseRoot = "../site-build/built-pathvisio.js/",
    sources = [
      'src/js/pathvisio/pathvisio.js',
      'tmp/viewer.js',
      'src/js/pathvisio/helpers.js',
      'src/js/pathvisio/pathway/pathway.js',
      'src/js/pathvisio/pathway/group.js',
      'src/js/pathvisio/pathway/info-box.js',
      'src/js/pathvisio/pathway/node.js',
      'src/js/pathvisio/pathway/edge/edge.js',
      'src/js/pathvisio/pathway/edge/marker.js',
      'src/js/pathvisio/pathway/edge/point.js',
      'src/js/pathvisio/pathway/edge/path-data.js',
      'src/js/pathvisio/pathway/data-sources.js',
      'src/js/pathvisio/pathway/x-ref.js'
    ];

// ----------
// Project configuration.
grunt.initConfig({
    pkg: packageJson,
    clean: {
        build: ["build"],
        package: [packageDir],
        release: {
            src: [releaseRoot],
            options: {
                force: true
            }
        }
    },
    concat: {
        options: {
          separator: ';\n\n',
          banner: "//! <%= pkg.name %> <%= pkg.version %>\n"
              + "//! Built on <%= grunt.template.today('yyyy-mm-dd') %>\n"
              //+ "//! Git commit: <%= gitInfo %>\n"
              + "//! https://github.com/wikipathways/pathvisio.js\n"
              + "//! License: http://www.apache.org/licenses/LICENSE-2.0/\n\n",
          process: true
        },
        dist: {
            src:  [ "<banner>" ].concat(sources),
            dest: distribution
        }
    },
    uglify: {
      options: {
        mangle: false
      },
      pathvisiojs: {
          src: [ distribution ],
          dest: minified
      }
    },
    watch: {
        files: [ "Gruntfile.js", "src/js/*.js" ],
        tasks: "build"
    },
    jshint: {
        options: {
            jshintrc: '.jshintrc'
        },
        beforeconcat: sources,
        afterconcat: [ distribution ]
    },
    str2js: {
      pathvisioNS: { 'tmp/viewer.js': ['src/views/viewer.html', 'src/views/error.html', 'src/views/pathway-template.svg']}
    },
    "git-describe": {
        build: {
            options: {
                prop: "gitInfo"
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-string-to-js");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-git-describe");

  // build 
  grunt.registerTask('build', ['str2js', 'clean:build', 'git-describe', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify']);

  // quick-build 
  grunt.registerTask('quick-build', ['str2js', 'clean:build', 'git-describe', 'concat', 'uglify']);

  // test
  //grunt.registerTask('test', ['build']);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
