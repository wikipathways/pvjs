'use strict';
var _ = require('lodash')
  , fs = require('fs')
  ;

var desireds = require('./test/wd-test-config');
var testPathwaysElementCounts = JSON.parse(fs.readFileSync("test/data/protocol-element-counts.json"));
var npmPackageFile = JSON.parse(fs.readFileSync('package.json'));
var libDir = './build/lib/',
    distDir = './wpi/',
    tmpDir = './tmp/',
    distLibDir = distDir + 'lib/';
var specFileName;

var gruntConfig = {
  clean: {
    dist: distLibDir,
    temp: tmpDir
  },
  concat: {
    options: {
      separator: '\n\n',
      process: false
    },
    js: {
      src: [libDir + 'cross-platform-shapes/dist/lib/cross-platform-shapes/js/cross-platform-shapes.min.js', libDir + 'cross-platform-text/dist/lib/cross-platform-text/js/cross-platform-text.min.js', libDir + 'pathvisiojs/dist/lib/pathvisiojs/js/pathvisiojs.js'],
      dest: distLibDir + 'pathvisiojs/js/pathvisiojs.js'
    }
  },
  concurrent: {
    'test-protocol': [], // dynamically filled
  },
  copy: {
    css: {
      expand: true,
      flatten: true,
      src: libDir + 'pathvisiojs/dist/lib/pathvisiojs/css/pathvisiojs.css',
      dest: distLibDir + 'pathvisiojs/css/'
    }
  },
  env: {
    // dynamically filled
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc'
    },
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
  pkg: npmPackageFile,
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
        src: "./demo/",
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
  },
  simplemocha: {
    protocol: {
      options: {
        timeout: 60000,
        reporter: 'spec'
      },
      src: ['test/e2e/sauce.js']
      //src: ['test/e2e/minimal.js']
      //src: ['test/sauce/**/*-specs.js']
    }
  },    
  watch: {
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

  // Default task.
  grunt.registerTask('default', ['test:protocol:' + _(desireds).keys().first()]);

  _(desireds).each(function(desired, key) {
    grunt.registerTask('test:protocol:' + key, ['env:' + key, 'simplemocha:protocol']);
  });

  grunt.registerTask('test:protocol:parallel', ['concurrent:test-protocol']);

  // Build
  grunt.registerTask('build', ['clean:dist', 'concat', 'copy']);

  // Deploy to test site
  grunt.registerTask('deploy-test', ['build', 'rsync:test']);
};
