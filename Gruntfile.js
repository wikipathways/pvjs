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
var testPathwaysElementCounts = JSON.parse(fs.readFileSync("test/data/protocol-element-counts.json"));
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
    'test-protocol': [], // dynamically filled
    dev: {
      tasks: ['nodemon', 'watch:browserify'],
      options: {
        logConcurrentOutput: true
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
      script: 'server.js'
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
    test: {
      options: {
        src: "./gh-pages/",
        dest: "/var/www/d3/r/pathvisiojs",
        host: process.env.POINTER_UCSF_EDU_USERNAME + "@pointer.ucsf.edu",
        syncDestIgnoreExcl: true
      }
    }
  },
  simplemocha: {
    dev: { // you need to start selenium locally for this to work: webdriver-manager start
      options: {
        timeout: 6000,
        reporter: 'spec'
      },
      src: ['test/e2e/dev.js']
    },
    protocol: { // you don't need selenium locally for this to work. It runs at saucelabs.
      options: {
        timeout: 60000,
        reporter: 'spec'
      },
      src: ['test/e2e/sauce.js']
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
      tasks: ['browserify:dev', 'test-dev'],
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
  gruntConfig.concurrent['test-protocol'].push('test:protocol:' + key);
});

//console.log(gruntConfig);

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig(gruntConfig);

  // These plugins provide necessary tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  _(desireds).each(function(desired, key) {
    grunt.registerTask('test:protocol:' + key, ['env:' + key, 'simplemocha:protocol']);
  });

  grunt.registerTask('test-dev', ['simplemocha:dev']);
  grunt.registerTask('test:protocol:parallel', ['concurrent:test-protocol']);

  // Build
  grunt.registerTask('build', ['sync', 'clean:build', 'jshint:beforeconcat', 'browserify:build', 'concat', 'uglify', 'copy:crossplatformshapes', 'copy:crossplatformtext']);

  // Build, create and publish to test server. Run extensive tests.
  grunt.registerTask('build-test', ['build', 'copy:pages', 'copy:pagesLibs', 'copy:pagesTest', 'replace:pages', 'replace:pagesTest', 'rsync:test', 'clean:pages'])

  // Build, create and publish gh-pages
  grunt.registerTask('build-pages', ['build', 'copy:pages', 'copy:pagesLibs', 'replace:pages', 'buildcontrol:pages', 'clean:pages'])

  // Live development
  grunt.registerTask('dev', 'Live Browserify', ['browserify:dev', 'concurrent:dev'])

  // Default task
  grunt.registerTask('default', ['dev']);
};
