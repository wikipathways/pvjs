// rarely used libraries (will concatenate with pvjs, because it's unlikely anyone will have them already cached)
var rarelyUsedJsLibraries = [
  './lib/es5-shim/es5-sham.min.js',
  './lib/node-uuid/uuid.js',
  './lib/strcase/dist/strcase.min.js',
  './lib/svg-pan-zoom/dist/svg-pan-zoom.min.js',
  './lib/svg-pan-zoom/control-icons.js',
  './lib/blueimp-load-image/js/load-image.min.js',
  './lib/jsonld.js/js/jsonld.js',
  './lib/jsonld.js/js/Promise.js'
];

var pvjsCssSources = [
  'src/css/pathvisiojs.css',
  'src/css/annotation.css',
  'src/css/pan-zoom.css',
  'src/css/typeahead.css'
];

var specFileName;

module.exports = function(grunt) {

// Load all plugins that provide tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

var testPathwaysElementCounts = grunt.file.readJSON("test/data/protocol/counts.json"),
    srcDir = './src/js/',
    libDir = './lib/',
    distDir = './dist/',
    tmpDir = './tmp/',
    demoDir = './demo/',
    pagesDir = './gh-pages/',
    distLibDir = distDir + 'lib/';

// Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      build: distLibDir,
      temp: tmpDir,
      pages: pagesDir
    },
    concat: {
      options: {
        separator: '\n\n',
        banner: "/* <%= pkg.name %> <%= pkg.version %>\n" +
                "Built on <%= grunt.template.today('yyyy-mm-dd') %>\n" +
                //"//! Git commit: <%= gitInfo %>\n" +
                "https://github.com/wikipathways/pathvisiojs\n" +
                "License: http://www.apache.org/licenses/LICENSE-2.0/ */\n\n",
        process: true
      },
      css: {
        src:  pvjsCssSources,
        dest: distLibDir + 'pathvisiojs/css/pathvisiojs.css'
      },
      jsonld: {
        src: ['./lib/jsonld.js/js/jsonld.js', './lib/jsonld.js/js/Promise.js'],
        dest: tmpDir + 'jsonld/js/jsonld.js'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      pathvisiojs: {
        src: distLibDir + 'pathvisiojs/js/pathvisiojs.js',
        dest: distLibDir + 'pathvisiojs/js/pathvisiojs.min.js'
      },
      jsonld: {
        src: [ tmpDir + 'jsonld/js/jsonld.js' ],
        dest: distLibDir + 'jsonld/js/jsonld.min.js'
      },
      modernizr: {
        src: libDir + 'modernizr/modernizr.js',
        dest: distLibDir + 'modernizr/js/modernizr.min.js'
      }
    },
    watch: {
      browserify: {
        files: ['./src/**/*.js'],
        tasks: ['browserify:dev', 'test-minimal'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      beforeconcat: [srcDir + '**/*.js'],
      afterconcat: [distLibDir + 'pathvisiojs/js/pathvisiojs.js']
    },
    browserify: {
      dev: {
        files: {
          './dist/lib/pathvisiojs/js/pathvisiojs.js': './src/js/pathvisiojs.js'
        },
        // src: [srcDir + 'js/pathvisiojs.js'],
        // dest: distLibDir + 'pathvisiojs/js/pathvisiojs.js',
        options: {
          bundleOptions: {debug: true}
        , transform: ['deglobalify', 'brfs']
        }
      },
      build: {
        files: {
          './dist/lib/pathvisiojs/js/pathvisiojs.js': './src/js/pathvisiojs.js'
        },
        // src: [srcDir + 'js/pathvisiojs.js'],
        // dest: distLibDir + 'pathvisiojs/js/pathvisiojs.js',
        options: {
          bundleOptions: {}
        , transform: ['deglobalify', 'brfs']
        }
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
      //protractor_test: ['protractor-chrome', 'protractor-firefox']
      protractor_test: ['protractor-chrome', 'protractor-safari', 'protractor-firefox']
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
        dir: 'gh-pages',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:wikipathways/pathvisiojs.git',
          branch: 'gh-pages'
        }
      },
    },
    copy: {
      jquery: {
        src: libDir + 'jquery/jquery.min.js',
        dest: distLibDir + 'jquery/js/jquery.min.js'
      },
      typeahead: {
        src: libDir + 'typeahead.js/dist/typeahead.min.js',
        dest: distLibDir + 'typeahead/js/typeahead.min.js'
      },
      crossplatformshapes: {
        expand: true,
        cwd: libDir + 'cross-platform-shapes/dist/lib/',
        src: ['./**/*'],
        dest: distLibDir
      },
      crossplatformtext: {
        expand: true,
        cwd: libDir + 'cross-platform-text/dist/lib/',
        src: ['./**/*'],
        dest: distLibDir
      },
      pages: {
        expand: true,
        cwd: demoDir,
        src: '**',
        dest: pagesDir
      },
      pagesLibs: {
        expand: true,
        cwd: distDir,
        src: '**',
        dest: pagesDir
      },
    },
    replace: {
      pages: {
        src: [pagesDir + '/*.html'],
        overwrite: true,
        replacements: [{
          from: '../dist/lib/',
          to: './lib/'
        }]
      }
    }
  });

//*
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

  // test
  grunt.registerTask('test-minimal', 'Run local tests for development', function(val) {
    grunt.option('spec', 'minimal');
    grunt.task.run('protractor-firefox');
  });

  grunt.registerTask('test', 'Run extensive local tests', function(val) {
    grunt.option('spec', val);
    grunt.task.run('protractor-e2e');
  });
//*/

  // Build
  grunt.registerTask('build', ['sync', 'clean:build', 'jshint:beforeconcat', 'browserify:build', 'concat', 'uglify', 'copy:jquery', 'copy:typeahead', 'copy:crossplatformshapes', 'copy:crossplatformtext']);

  // Build, create and publish gh-pages
  grunt.registerTask('build-pages', ['build', 'copy:pages', 'copy:pagesLibs', 'replace:pages', 'buildcontrol:pages', 'clean:pages'])

  // Live development
  grunt.registerTask('dev', 'Live Browserify', ['browserify:dev', 'watch:browserify'])

  // Default task
  grunt.registerTask('default', ['build']);
};
