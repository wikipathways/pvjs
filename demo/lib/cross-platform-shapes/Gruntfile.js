var tmp = require('temporary');

var jsSources = [
  'cross-platform-shapes.js',
  'path-calculator/path-calculator.js',
  'path-calculator/arc.js',
  'path-calculator/arrow.js',
  'path-calculator/brace.js',
  'path-calculator/complex.js',
  'path-calculator/endoplasmic-reticulum.js',
  'path-calculator/golgi-apparatus.js',
  'path-calculator/hexagon.js',
  'path-calculator/line-curved.js',
  'path-calculator/line-elbow.js',
  'path-calculator/line-segmented.js',
  'path-calculator/line-straight.js',
  'path-calculator/mim-degradation.js',
  'path-calculator/mitochondria.js',
  'path-calculator/ellipse-double.js',
  'path-calculator/ellipse.js',
  'path-calculator/pentagon.js',
  'path-calculator/rectangle.js',
  'path-calculator/rounded-rectangle-double.js',
  'path-calculator/rounded-rectangle.js',
  'path-calculator/sarcoplasmic-reticulum.js',
  'path-calculator/triangle.js',
  'path-calculator/mim-secessary-stimulation.js',
  'path-calculator/mim-binding.js',
  'path-calculator/mim-conversion.js',
  'path-calculator/mim-stimulation.js',
  'path-calculator/mim-modification.js',
  'path-calculator/mim-catalysis.js',
  'path-calculator/mim-inhibition.js',
  'path-calculator/mim-cleavage.js',
  'path-calculator/mim-covalentBond.js',
  'path-calculator/mim-transcription-translation.js',
  'path-calculator/mim-gap.js',
  'path-calculator/t-bar.js',
  'path-calculator/mim-branching-left.js',
  'path-calculator/mim-branching-right.js',
  'custom-shapes.js',
  'svg/svg.js',
  'svg/image.js',
  'svg/marker.js',
  'svg/path.js',
  'canvas/canvas.js'
];

var specFileName;

var tmpDir = new tmp.Dir().path;

module.exports = function(grunt) {

// ----------
var packageJson = grunt.file.readJSON("package.json"),
    distDir = "./dist/",
    distLibDir = distDir + "lib/";

// ----------
// Project configuration.
grunt.initConfig({
    pkg: packageJson,
    clean: {
      build: [distDir],
      tmp: ['markers.js'],
      demoLibs: ['./demos/lib/']
    },
    concat: {
        options: {
          separator: '\n\n',
          banner: "/* <%= pkg.name %> <%= pkg.version %>\n" +
              "Built on <%= grunt.template.today('yyyy-mm-dd') %>\n" +
              //"//! Git commit: <%= gitInfo %>\n" +
              "https://github.com/ariutta/cross-platform-shapes\n" +
              "License: http://www.apache.org/licenses/LICENSE-2.0/ */\n\n",
          process: true
        },
        crossPlatformShapes: {
            src:  [ '<banner>', 'markers.js' ].concat(jsSources),
            dest: tmpDir + 'cross-platform-shapes/js/cross-platform-shapes.js'
        }
    },
    uglify: {
      options: {
        mangle: false
      },
      crossPlatformShapes: {
        src: [ tmpDir + 'cross-platform-shapes/js/cross-platform-shapes.js' ],
        dest: distLibDir + 'cross-platform-shapes/js/cross-platform-shapes.min.js'
      }
    },
    watch: {
      scripts: {
        files: [ "Gruntfile.js", "./src/**/*.js" ],
        tasks: ['test-min', 'quick-build'],
        //tasks: ['net', 'build'],
        options: {
          interrupt: true,
        },
      },
      /*
      build: {
        files: [ "Gruntfile.js", "public/js/*.js" ],
        tasks: ['build']
      }
      //*/
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      beforeconcat: jsSources,
      afterconcat: [ distLibDir + 'cross-platform-shapes/js/cross-platform-shapes.min.js' ]
    },
    str2js: {
      'crossPlatformShapesNS': { 'markers.js': ['markers.svg']}
    },
    "git-describe": {
      build: {
        options: {
          prop: "gitInfo"
        }
      }
    },
    concurrent: {
      protractor_test: ['protractor-chrome', 'protractor-firefox']
      //protractor_test: ['protractor-chrome', 'protractor-safari', 'protractor-firefox']
    },
    protractor: {
      options: {
        keepAlive: true,
        singleRun: false,
        configFile: "test/protractor-config.js"
      },
      chrome: {
        options: {
          args: {
            browser: "chrome"
          }
        }
      },
      safari: {
        options: {
          args: {
            browser: "safari"
          }
        }
      },
      firefox: {
        options: {
          args: {
            browser: "firefox"
          }
        }
      }
    },
    net: {
      remote: {
        host: '192.168.42.74',
        port:5004,
        tasks: ['protractor-e2e']
      }
    },
    buildcontrol: {
      options: {
        dir: 'demos',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:ariutta/cross-platform-shapes.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      },
    },
    copy: {
      index: {
        src: './demos/index.html',
        dest: './dist/index.html',
      },
      demos: {
        expand: true,
        cwd: './dist/lib/',
        src: ['**'],
        dest: './demos/lib/',
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
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks("grunt-net");

  grunt.registerTask('protractor-chrome', 'Run local tests for development', function() {
    grunt.config.set('protractor.chrome.options.args.specs', ['test/e2e/' + grunt.option('spec') + '.js']);
    grunt.task.run('protractor:chrome');
  });
  grunt.registerTask('protractor-safari', 'Run local tests for development', function() {
    grunt.config.set('protractor.safari.options.args.specs', ['test/e2e/' + grunt.option('spec') + '.js']);
    grunt.task.run('protractor:safari');
  });
  grunt.registerTask('protractor-firefox', 'Run local tests for development', function() {
    grunt.config.set('protractor.firefox.options.args.specs', ['test/e2e/' + grunt.option('spec') + '.js']);
    grunt.task.run('protractor:firefox');
  });
  grunt.registerTask('protractor-e2e', ['concurrent:protractor_test']);


  grunt.registerTask('set_global', 'Set a global var.', function(name, val) {
    global[name] = val;
  });

  grunt.registerTask('set_array_config', 'Set a config property that is an array.', function(name, val) {
    var valArray = val.split(',');
    grunt.config.set(name, valArray);
  });

  grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
    grunt.config.set(name, val);
  });

  // build 
  grunt.registerTask('build', ['sync', 'str2js', 'clean:build', 'git-describe', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'clean:demoLibs', 'copy', 'clean:tmp']);
  //grunt.registerTask('build', ['sync', 'str2js', 'clean:build', 'git-describe', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'copy', 'clean:tmp']);

  // quick-build 
  grunt.registerTask('quick-build', ['sync', 'str2js', 'clean:build', 'git-describe', 'concat', 'uglify', 'clean:demoLibs', 'copy', 'clean:tmp']);

  // test
  grunt.registerTask('test-min', 'Run local tests for development', function(val) {
    grunt.option('spec', 'minimal');
    grunt.task.run('protractor-safari');
  });

  grunt.registerTask('test', 'Run extensive local tests', function(val) {
    grunt.option('spec', val);
    grunt.task.run('protractor-e2e');
  });

  // Default task(s).
  grunt.registerTask('default', ['build']);
};
