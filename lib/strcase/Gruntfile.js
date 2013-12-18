module.exports = function(grunt) {

// ----------
var packageJson = grunt.file.readJSON("package.json"),
    distDir = "dist/",
    distribution = distDir + "strcase.js",
    minified = distDir + "strcase.min.js",
    sources = [
      'index.js'
    ];

// ----------
// Project configuration.
grunt.initConfig({
    pkg: packageJson,
    clean: {
        dist: ["distPackageDir"]
    },
    uglify: {
      options: {
        mangle: false
      },
      strcase: {
          src: [ distribution ],
          dest: minified
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/strcase.js': sources
        },
        options: {
          standalone: 'strcase'
           /*
          transform: ['coffeeify']
           //*/
        }
      }
    },
    "git-describe": {
        build: {
            options: {
                prop: "gitInfo"
            }
        }
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-git-describe");
  grunt.loadNpmTasks('grunt-browserify');

  // build 
  grunt.registerTask('build', ['clean:dist', 'browserify', 'git-describe', 'uglify']);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
