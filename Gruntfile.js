
var selectedConfigFileName = 'wikipathways-org';

/*
var selectedConfigFileName = 'localhost';
var selectedConfigFileName = 'default';
//*/

var pvjsSources = [
  'tmp/pathvisiojs.js', //we only use this one in the Gruntfile, not in development mode in test/compare.js,
  'src/js/pathvisiojs/pathvisio.js',
  'src/js/pathvisiojs/utilities.js',
  'config/default.js',
  'src/js/pathvisiojs/data/data.js',
  'src/js/pathvisiojs/data/bridgedb/bridgedb.js',
  'src/js/pathvisiojs/data/bridgedb/data-sources.js',
  'src/js/pathvisiojs/data/biopax/biopax.js',
  'src/js/pathvisiojs/data/pathvisiojs-json/pathvisiojs-json.js',
  'src/js/pathvisiojs/data/gpml/gpml.js',
  'src/js/pathvisiojs/data/gpml/element.js',
  'src/js/pathvisiojs/data/gpml/text.js',
  'src/js/pathvisiojs/data/gpml/namespaces.js',
  'src/js/pathvisiojs/data/gpml/biopax-ref.js',
  'src/js/pathvisiojs/data/gpml/node/node.js',
  'src/js/pathvisiojs/data/gpml/node/group-node.js',
  'src/js/pathvisiojs/data/gpml/node/entity-node/entity-node.js',
  'src/js/pathvisiojs/data/gpml/node/entity-node/data-node.js',
  'src/js/pathvisiojs/data/gpml/node/entity-node/label.js',
  'src/js/pathvisiojs/data/gpml/node/entity-node/shape.js',
  'src/js/pathvisiojs/data/gpml/node/anchor.js',
  'src/js/pathvisiojs/data/gpml/edge/edge.js',
  'src/js/pathvisiojs/data/gpml/edge/interaction.js',
  'src/js/pathvisiojs/data/gpml/edge/graphical-line.js',
  'src/js/pathvisiojs/data/gpml/edge/point.js',
  'src/js/pathvisiojs/view/view.js',
  'src/js/pathvisiojs/view/annotation/annotation.js',
  'src/js/pathvisiojs/view/annotation/citation.js',
  'src/js/pathvisiojs/view/annotation/x-ref.js',
  'src/js/pathvisiojs/view/pathway-diagram/pathway-diagram.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/svg.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/grid.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/info-box.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/symbol.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/publication-xref.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/node.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/anchor.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/entity-node.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/path-shape.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/arc.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/brace.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/complex.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/endoplasmic-reticulum.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/golgi-apparatus.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/grid-square.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/hexagon.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/mim-degradation.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/mitochondria.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/none.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/oval.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/oval-double.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/pentagon.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/rectangle.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/rounded-rectangle.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/rounded-rectangle-double.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/sarcoplasmic-reticulum.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/triangle.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/text.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/group-node.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/node/use-element.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/edge/edge.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/edge/graphical-line.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/edge/interaction.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/edge/marker.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/edge/point.js',
  'src/js/pathvisiojs/view/pathway-diagram/svg/edge/path.js',
  'src/js/pathvisiojs/view/pathway-diagram/img/img.js'
];

var pvjsCssSources = [
  'src/css/pathvisiojs.css',
  'src/css/annotation.css',
  'src/css/pan-zoom.css'
];

module.exports = function(grunt) {

// ----------
var packageJson = grunt.file.readJSON("package.json"),
    distributionJs = "build/" + selectedConfigFileName + "/js/pathvisio.js",
    distributionCss = "build/" + selectedConfigFileName + "/css/pathvisiojs.css",
    minifiedJs = "build/" + selectedConfigFileName + "/js/pathvisio.min.js",
    minifiedCss = "build/" + selectedConfigFileName + "/js/pathvisiojs.min.css",
    packageDirName = "pathvisiojs-" + packageJson.version,
    packageDir = "build/" + packageDirName + "/",
    releaseRoot = "../site-build/built-pathvisiojs/";

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
        distJs: {
            src:  [ "<banner>" ].concat(pvjsSources),
            dest: distributionJs
        },
        distCss: {
            src:  [ "<banner>" ].concat(pvjsCssSources),
            dest: distributionCss
        }
    },
    uglify: {
      options: {
        mangle: false
      },
      pathvisiojs: {
          src: [ distributionJs ],
          dest: minifiedJs
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
        beforeconcat: pvjsSources,
        afterconcat: [ distributionJs ]
    },
    str2js: {
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
  grunt.registerTask('quick-build', ['str2js', 'git-describe', 'concat', 'uglify']);

  // test
  //grunt.registerTask('test', ['build']);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
