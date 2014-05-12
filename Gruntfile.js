var _ = require('lodash')
  , fs = require('fs')
  ;

var pvjsCssSources = [
  'src/css/pathvisiojs.css',
  'src/css/annotation.css',
  'src/css/pan-zoom.css'
];

var desireds = require('./test/desireds');
var npmPackageFile = JSON.parse(fs.readFileSync('package.json'));

var specFileName;

module.exports = function(grunt) {

// Load all plugins that provide tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

var testPathwaysElementCounts = JSON.parse(fs.readFileSync("test/data/protocol/counts.json")),
    srcDir = './src/js/',
    libDir = './lib/',
    distDir = './dist/',
    tmpDir = './tmp/',
    demoDir = './demo/',
    pagesDir = './gh-pages/',
    distLibDir = distDir + 'lib/';

// Project configuration.
grunt.initConfig({
    pkg: npmPackageFile,
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
      jsonld: {
        src: ['./lib/jsonld.js/js/jsonld.js', './lib/jsonld.js/js/Promise.js'],
        dest: tmpDir + 'jsonld/js/jsonld.js'
      },
      pathvisiojsCss: {
        src:  pvjsCssSources,
        dest: distLibDir + 'pathvisiojs/css/pathvisiojs.css'
      },
      pathvisiojsCssBundle: {
        src:  [distLibDir + 'pathvisiojs/css/pathvisiojs.css', './dist/plugins/pathvisiojs-notifications/pathvisiojs-notifications.css', './dist/plugins/pathvisiojs-highlighter/pathvisiojs-highlighter.css'],
        dest: distLibDir + 'pathvisiojs/css/pathvisiojs.bundle.css'
      }
    },
    uglify: {
      options: {
        mangle: true
      , beautify: {
          beautify: false
        , ascii_only: true
        , quote_keys: true
        }
      },
      pathvisiojs: {
        src: distLibDir + 'pathvisiojs/js/pathvisiojs.js',
        dest: distLibDir + 'pathvisiojs/js/pathvisiojs.min.js'
      },
      pathvisiojsBundle: {
        src: [libDir + 'cross-platform-shapes/dist/lib/cross-platform-shapes/js/cross-platform-shapes.min.js',
          libDir + 'cross-platform-text/dist/lib/cross-platform-text/js/cross-platform-text.min.js',
          distLibDir + 'pathvisiojs/js/pathvisiojs.js', './dist/plugins/pathvisiojs-notifications/pathvisiojs-notifications.js',
          './dist/plugins/pathvisiojs-highlighter/pathvisiojs-highlighter.js'],
        dest: distLibDir + 'pathvisiojs/js/pathvisiojs.bundle.min.js'
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
    },
    rsync: {
      options: {
        args: ["--verbose"],
        exclude: [".git*","*.scss","node_modules",".svn*"],
        recursive: true
      },
      dist: {
        options: {
          src: "./",
          dest: "../dist"
        }
      },
      test: {
        options: {
          src: "./gh-pages/",
          dest: "/var/www/d3/r/pathvisiojs",
          host: process.env.POINTER_UCSF_EDU_USERNAME + "@pointer.ucsf.edu",
          syncDestIgnoreExcl: true
        }
      },
      prod: {
        options: {
          src: "../dist/",
          dest: "/var/www/site",
          host: "user@live-host",
          syncDestIgnoreExcl: true
        }
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
  grunt.registerTask('build', ['sync', 'clean:build', 'jshint:beforeconcat', 'browserify:build', 'concat', 'uglify', 'copy:crossplatformshapes', 'copy:crossplatformtext']);

  // Build, create and publish to test server. Run extensive tests.
  grunt.registerTask('build-test', ['build', 'copy:pages', 'copy:pagesLibs', 'replace:pages', 'rsync:test'])
  //grunt.registerTask('build-test', ['build', 'copy:pages', 'copy:pagesLibs', 'replace:pages', 'rsync:test', 'clean:pages'])

  // Build, create and publish gh-pages
  grunt.registerTask('build-pages', ['build', 'copy:pages', 'copy:pagesLibs', 'replace:pages', 'buildcontrol:pages', 'clean:pages'])

  // Live development
  grunt.registerTask('dev', 'Live Browserify', ['browserify:dev', 'watch:browserify'])

  // Default task
  grunt.registerTask('default', ['build']);
};
