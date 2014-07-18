'use strict';
var _ = require('lodash')
  , fs = require('fs')
  ;

var pvjsCssSources = [
  'src/css/pathvisiojs.css',
  'src/css/annotation.css',
  'src/css/pan-zoom.css'
];
var desireds = require('./test/wd-test-config');
var testPathwaysElementCounts = JSON.parse(fs.readFileSync("test/element-counts/protocol-element-counts.json"));
var npmPackageFile = JSON.parse(fs.readFileSync('package.json'));
var srcDir = './src/js/',
    libDir = './lib/',
    distDir = './dist/',
    tmpDir = './tmp/',
    demoDir = './demo/',
    pagesDir = './gh-pages/',
    distLibDir = distDir + 'lib/';
// declaring the test spec file here so it's global, because it won't work otherwise right now. TODO: refactor.
var specFileName;

var gruntConfig = {
  browserify: {
    exclude: 'cheerio',
    dev: {
      files: {
        'dist/lib/pathvisiojs/js/pathvisiojs.js': srcDir + 'pathvisiojs.js'
      },
      options: {
        bundleOptions: {debug: true}
      , transform: ['deglobalify', 'brfs']
      }
    },
    build: {
      files: {
        'dist/lib/pathvisiojs/js/pathvisiojs.js': srcDir + 'pathvisiojs.js'
      },
      // src: [srcDir + 'js/pathvisiojs.js'],
      // dest: distLibDir + 'pathvisiojs/js/pathvisiojs.js',
      options: {
        bundleOptions: {}
      , transform: ['deglobalify', 'brfs']
      }
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
      src:  [distLibDir + 'pathvisiojs/css/pathvisiojs.css', distDir + 'plugins/pathvisiojs-notifications/pathvisiojs-notifications.css', distDir + 'plugins/pathvisiojs-highlighter/pathvisiojs-highlighter.css'],
      dest: distLibDir + 'pathvisiojs/css/pathvisiojs.bundle.css'
    }
  },
  concurrent: {
    localProtocol: [], // dynamically filled
    dev: {
      tasks: ['nodemon', 'watch:browserify', 'exec:selenium'],
      options: {
        limit: 3//,
        //logConcurrentOutput: true
      }
    }
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
    pagesTest: {
      expand: true,
      cwd: './test',
      src: '**',
      dest: pagesDir + 'test'
    },
  },
  env: {
    // dynamically filled
  },
  exec: {
    selenium: 'webdriver-manager start'
  },
  "git-describe": {
    build: {
      options: {
        prop: "gitInfo"
      }
    }
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc'
    },
    beforeconcat: [srcDir + '**/*.js'],
    afterconcat: [distLibDir + 'pathvisiojs/js/pathvisiojs.js'],
    gruntfile: {
      src: 'Gruntfile.js'
    },
    test: {
      options: {
        jshintrc: 'test/.jshintrc'
      },
      src: ['test/**/*.js']
    }
  },
  nodemon: {
    dev: {
      script: 'server.js',
      options: {
        ignore: ['node_modules/**'],
        watch: ['server']
      }
    }
  },
  pkg: npmPackageFile,
  replace: {
    pages: {
      src: [pagesDir + '/*.html'],
      overwrite: true,
      replacements: [{
          from: '../dist/lib',
          to: './lib'
        },
        {
          from: '../dist/plugins',
          to: './plugins'
      }]
    },
    pagesTest: {
      src: [pagesDir + 'test/*.html'],
      overwrite: true,
      replacements: [{
          from: '/dist/lib',
          to: '/lib'
        },
        {
          from: '/dist/plugins',
          to: '/plugins'
      }]
    }
  },
  rsync: {
    options: {
      args: ["--verbose"],
      exclude: [".git*","*.scss","node_modules",".svn*"],
      recursive: true
    },
    pvjsTestServer: { // just testing pvjs on a remote server
      options: {
        src: "./gh-pages/",
        dest: "/var/www/pvjs",
        host: process.env.POINTER_UCSF_EDU_USERNAME + "@pointer.ucsf.edu",
        syncDestIgnoreExcl: true
      }
    }
  },
  simplemocha: {
    dev: {
      options: {
        timeout: 3000,
        reporter: 'spec'
      },
      src: ['test/e2e/dev.js']
    },
    localProtocol: {
      options: {
        timeout: 15000,
        reporter: 'spec'
      },
      src: ['test/e2e/local-protocol.js']
    },
    remoteFull: { // This runs IE tests at saucelabs.
      options: {
        timeout: 60000,
        reporter: 'spec'
      },
      src: ['test/e2e/remote-full.js']
    },
    testWikipathwaysOrg: { // This runs IE tests at saucelabs.
      options: {
        timeout: 60000,
        reporter: 'spec'
      },
      src: ['test/e2e/test-wikipathways-org.js']
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
        distLibDir + 'pathvisiojs/js/pathvisiojs.js',
        distDir + 'plugins/pathvisiojs-notifications/pathvisiojs-notifications.js',
        distDir + 'plugins/pathvisiojs-highlighter/pathvisiojs-highlighter.js'],
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
      tasks: ['browserify:dev', 'jshint:beforeconcat', 'simplemocha:dev'],
      options: {
        livereload: true
      }
    },
    browserifyLight: {
      files: ['./src/**/*.js'],
      tasks: ['browserify:dev'],
      options: {
        livereload: true
      }
    },
    gruntfile: {
      files: '<%= jshint.gruntfile.src %>',
      tasks: ['jshint:gruntfile']
    },
    test: {
      files: '<%= jshint.test.src %>',
      tasks: ['jshint:test']
    },
  },
};

_(desireds).each(function(desired, key) {
  gruntConfig.env[key] = {
    DESIRED: JSON.stringify(desired)
  };
  gruntConfig.concurrent.localProtocol.push('test:localProtocol:' + key);
});

//console.log(gruntConfig);

module.exports = function(grunt) {

  console.log('Test server available at localhost:3000/test/');

  // Project configuration.
  grunt.initConfig(gruntConfig);

  // These plugins provide necessary tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  _(desireds).each(function(desired, key) {
    grunt.registerTask('test:localProtocol:' + key, ['env:' + key, 'simplemocha:localProtocol']);
  });

  grunt.registerTask('test:localProtocol:parallel', ['concurrent:localProtocol']);

  // Build
  grunt.registerTask('build', ['sync', 'clean:build', 'jshint:beforeconcat', 'browserify:build', 'concat', 'uglify', 'copy:crossplatformshapes', 'copy:crossplatformtext']);

  // Build, create and publish to test server. Run extensive tests.
  grunt.registerTask('remote-test', ['build', 'copy:pages', 'copy:pagesLibs', 'copy:pagesTest', 'replace:pages', 'replace:pagesTest', 'rsync:pvjsTestServer', 'clean:pages']);

  // Build, create and publish gh-pages
  grunt.registerTask('build-pages', ['build', 'copy:pages', 'copy:pagesLibs', 'replace:pages', 'buildcontrol:pages', 'clean:pages']);

  // Live development
  grunt.registerTask('dev', 'Live Browserify', ['browserify:dev', 'concurrent:dev']);

  // Lightweight live development
  grunt.registerTask('dev-light', 'Live Browserify', ['browserify:dev', 'watch:browserifyLight']);

  // Default task
  grunt.registerTask('default', ['dev']);
};
