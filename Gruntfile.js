module.exports = function(grunt) {

// ----------
var packageJson = grunt.file.readJSON("package.json"),
    distribution = "build/js/pathvisio.js",
    minified = "build/js/pathvisio.min.js",
    packageDirName = "pathvisiojs-" + packageJson.version,
    packageDir = "build/" + packageDirName + "/",
    releaseRoot = "../site-build/built-pathvisiojs/",
    sources = [
      'tmp/pathvisiojs.js',
      'src/js/pathvisiojs/pathvisio.js',
      'src/js/pathvisiojs/utilities.js',
      'src/js/pathvisiojs/data/data.js',
      'src/js/pathvisiojs/data/bridgedb/bridgedb.js',
      'src/js/pathvisiojs/data/bridgedb/data-sources.js',
      'src/js/pathvisiojs/data/gpml/gpml.js',
      'src/js/pathvisiojs/data/gpml/namespaces.js',
      'src/js/pathvisiojs/data/gpml/data-node.js',
      'src/js/pathvisiojs/data/gpml/node.js',
      'src/js/pathvisiojs/data/gpml/anchor.js',
      'src/js/pathvisiojs/data/gpml/interaction.js',
      'src/js/pathvisiojs/data/gpml/graphical-line.js',
      'src/js/pathvisiojs/data/gpml/edge/edge.js',
      'src/js/pathvisiojs/data/gpml/edge/point.js',
      'src/js/pathvisiojs/view/view.js',
      'src/js/pathvisiojs/view/annotation/annotation.js',
      'src/js/pathvisiojs/view/annotation/citation.js',
      'src/js/pathvisiojs/view/annotation/x-ref.js',
      'src/js/pathvisiojs/view/pathway-diagram/pathway-diagram.js',
      'src/js/pathvisiojs/view/pathway-diagram/path-finder.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/svg.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/group.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/info-box.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/node.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/symbol.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/use-element.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/path-shape/path-shape.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/path-shape/rounded-rectangle.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/label.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/edge/edge.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/edge/marker.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/edge/point.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/edge/path-data.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/anchor.js',
      'src/js/pathvisiojs/view/pathway-diagram/svg/grid.js'
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
              + "//! https://github.com/wikipathways/pathvisiojs\n"
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
      //pathvisioNS: { 'tmp/pathvisiojs.js': ['src/views/pathvisiojs.html', 'src/views/error.html', 'src/views/pathway-template.svg']}
      pathvisioNS: { 'tmp/pathvisiojs.js': ['tmp/pathvisiojs.html']}
    },
    browserify: {
      dist: {
        files: {
          'node_modules/node-xml2json/index.js': ['client/scripts/**/*.js', 'client/scripts/**/*.coffee'],
          //'build/module.js': ['client/scripts/**/*.js', 'client/scripts/**/*.coffee'],
        }/*,
        options: {
          transform: ['coffeeify']
        }//*/
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
  grunt.loadNpmTasks("grunt-string-to-js");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-git-describe");
  grunt.loadNpmTasks('grunt-browserify');

  // build 
  grunt.registerTask('build', ['str2js', 'clean:build', 'git-describe', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify']);

  // quick-build 
  grunt.registerTask('quick-build', ['str2js', 'clean:build', 'git-describe', 'concat', 'uglify']);

  // test
  //grunt.registerTask('test', ['build']);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
