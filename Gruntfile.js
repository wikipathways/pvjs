var pvjsSources = [
  'src/js/pathvisiojs.js',
  'src/js/utilities.js',
  'config/default.js',
  'src/js/format-converter/format-converter.js',
  'src/js/format-converter/bridgedb/bridgedb.js',
  'src/js/format-converter/biopax/biopax.js',
  'src/js/format-converter/pvjson/pvjson.js',
  'src/js/format-converter/gpml/gpml.js',
  'src/js/format-converter/gpml/graphics.js',
  'src/js/format-converter/gpml/element.js',
  'src/js/format-converter/gpml/text.js',
  'src/js/format-converter/gpml/namespaces.js',
  'src/js/format-converter/gpml/biopax-ref.js',
  'src/js/format-converter/gpml/group.js',
  'src/js/format-converter/gpml/data-node.js',
  'src/js/format-converter/gpml/label.js',
  'src/js/format-converter/gpml/shape.js',
  'src/js/format-converter/gpml/state.js',
  'src/js/format-converter/gpml/anchor.js',
  'src/js/format-converter/gpml/interaction.js',
  'src/js/format-converter/gpml/graphical-line.js',
  'src/js/format-converter/gpml/point.js',
  'src/js/renderer/renderer.js',
  'src/js/renderer/info-box.js',
  'src/js/renderer/publication-xref.js',
  'src/js/renderer/img.js',
  'src/js/renderer/annotation/annotation.js',
  'src/js/renderer/annotation/citation.js',
  'src/js/renderer/annotation/x-ref.js',
  'src/js/renderer/highlighter.js',
];

var pvjsCssSources = [
  'src/css/pathvisiojs.css',
  'src/css/annotation.css',
  'src/css/pan-zoom.css'
];

var specFileName;

module.exports = function(grunt) {



// ----------
var packageJson = grunt.file.readJSON("package.json"),
    testPathwaysElementCounts = grunt.file.readJSON("test/data/protocol/counts.json"),
    tmpDir = "./tmp/",
    distDir = "./dist/",
    distLibDir = distDir + "lib/";

// ----------
// Project configuration.
grunt.initConfig({
    pkg: packageJson,
    clean: {
      build: [distDir],
      temp: [tmpDir],
      demoLibs: ['./demos/lib/']
    },
    concat: {
        options: {
          separator: '\n\n',
          banner: "/* <%= pkg.name %> <%= pkg.version %>\n"
              + "Built on <%= grunt.template.today('yyyy-mm-dd') %>\n"
              //+ "//! Git commit: <%= gitInfo %>\n"
              + "https://github.com/wikipathways/pathvisiojs\n"
              + "License: http://www.apache.org/licenses/LICENSE-2.0/ */\n\n",
          process: true
        },
        pathvisiojsJs: {
            src:  ['./lib/es5-shim/es5-sham.min.js', './lib/blueimp-load-image/js/load-image.min.js', './lib/rgb-color/rgb-color.js', './lib/node-uuid/uuid.js', './lib/strcase/dist/strcase.min.js', './lib/svg-pan-zoom/svg-pan-zoom.js', './lib/blueimp-load-image/js/load-image.min.js', 'tmp/pathvisiojs-temp.js'].concat(pvjsSources),
            //src:  [ '<banner>' ].concat(pvjsSources),
            dest: tmpDir + 'pathvisiojs/js/pathvisiojs.js'
        },
        pathvisiojsDistCss: {
            src:  pvjsCssSources,
            dest: distLibDir + 'pathvisiojs/css/pathvisiojs.css'
        },
        d3WithAight: {
            src:  [ './lib/aight/aight.min.js', './lib/d3/d3.min.js', './lib/aight/aight.d3.min.js' ],
            dest: tmpDir + 'd3/js/d3-with-aight.js'
        },
        jsonld: {
            src:  [ './lib/jsonld.js/js/jsonld.js', './lib/jsonld.js/js/Promise.js' ],
            dest: tmpDir + 'jsonld/js/jsonld.js'
        }
    },
    uglify: {
      options: {
        mangle: true
      },
      pathvisiojs: {
        src: [ tmpDir + 'pathvisiojs/js/pathvisiojs.js' ],
        dest: distLibDir + 'pathvisiojs/js/pathvisiojs.min.js'
      },
      async: {
        src: [ './lib/async/lib/async.js' ],
        dest: distLibDir + 'async/js/async.min.js'
      },
      d3: {
        src: [ tmpDir + 'd3/js/d3-with-aight.js' ],
        dest: distLibDir + 'd3/js/d3-with-aight.min.js'
      },
      jquery: {
        src: [ './lib/jquery/jquery.min.js' ],
        dest: distLibDir + 'jquery/js/jquery.min.js'
      },
      typeahead: {
        src: [ './lib/typeahead.js/dist/typeahead.min.js' ],
        dest: distLibDir + 'typeahead/js/typeahead.min.js'
      },
      jsonld: {
        src: [ tmpDir + 'jsonld/js/jsonld.js' ],
        dest: distLibDir + 'jsonld/js/jsonld.min.js'
      },
      modernizr: {
        src: [ './lib/modernizr/modernizr.js' ],
        dest: distLibDir + 'modernizr/js/modernizr.min.js'
      },
      he: {
        src:  [ './lib/he/he.js' ],
        dest: distLibDir + 'he/he.min.js'
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
      beforeconcat: pvjsSources,
      afterconcat: [ distLibDir + 'pathvisiojs/js/pathvisiojs.min.js' ]
    },
    str2js: {
      pathvisioNS: { 'tmp/pathvisiojs-temp.js': ['src/pathvisiojs.html', 'tmp/pathvisiojs.svg']}
    },
    browserify: {
      dist: {
        files: {
          './lib/entities/entities.js': ['./node_modules/entities/index.js'],
          //'node_modules/node-xml2json/index.js': ['client/scripts/**/*.js', 'client/scripts/**/*.coffee'],
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
          remote: 'git@github.com:wikipathways/pathvisiojs.git',
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
  grunt.registerTask('build', ['sync', 'str2js', 'clean:build', 'git-describe', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'clean:demoLibs', 'copy']);
  //grunt.registerTask('build', ['sync', 'clean:temp', 'str2js', 'clean:build', 'git-describe', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'copy']);

  // quick-build 
  grunt.registerTask('quick-build', ['sync', 'str2js', 'clean:build', 'git-describe', 'concat', 'uglify', 'clean:demoLibs', 'copy']);

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
