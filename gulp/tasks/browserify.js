/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var _ = require('lodash');
//var applySourceMap = require('vinyl-sourcemaps-apply');
var autopolyfiller = require('autopolyfiller');
var brfs = require('gulp-brfs');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var bundleLogger = require('../util/bundle-logger.js');
var colors = require('colors');
var config = require('../config.json');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handle-errors.js');
var highland = require('highland');
var jshint = require('gulp-jshint');
var load = require('scriptloader');
var map = require('vinyl-map');
var modernizr = require('gulp-modernizr');
var mkdirp = require('mkdirp');
var path = require('path');
var polyfillService = require('polyfill-service');
var rename = require('gulp-rename');
var Rx = require('rx-extra');
var RxNode = Rx.RxNode;
var semi = require('semi');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('browserify', function(gulpTaskCompleteCallback) {

  var isInitialized = false;

  var polyfillServiceList = polyfillService.getAllPolyfills();
  var packageJson = JSON.parse(fs.readFileSync('package.json'));
  var version = packageJson.version;
  var name = packageJson.name;
  var polyfillsCache = {};

  mkdirp.sync('./dist/' + version + '/');
  mkdirp.sync('./demo/lib/' + name + '/' + version + '/');
  mkdirp.sync('./test/lib/' + name + '/dev/');

  function inspect() {
    return highland.pipeline(function(stream) {
      return stream.map(function(file) {
        if (file.isNull()) {
          return file;
        }
        return file;
      });
    });
  }

  // TODO this doesn't work yet. It does get the custom modernizr build
  // for each section, but it doesn't merge them, add them to the file or
  // load the polyfills. It also produces a stream error.
  function modernize(namespace) {
    return highland.pipeline(function(stream) {
      return stream.flatMap(function(file) {

        return highland([file])
          // TODO make the stream gulp-compatible
          //.through(source(namespace + '.js'))
          .through(modernizr('modernizr.' + namespace + '.min.js'))
          .map(function(customModernizr) {
            /*
            console.log('customModernizr77');
            console.log(customModernizr);

            console.log('customModernizr.contents132');
            console.log(customModernizr.contents.toString());
            //*/

            var customModernizrString = oneLinifyJs(customModernizr.contents.toString());

            /*
            console.log('customModernizrString137');
            console.log(customModernizrString.length);
            console.log(customModernizrString);
            //*/

            return file;
          });
      });
    });
  }

  function oneLinifyJs(code) {
    var codeString = typeof code === 'function' ? code.toString() : code;
    var semicolonedString = semi.add(codeString);
    var oneLinedString = semicolonedString.replace(/[\n\r]/g, '');
    return oneLinedString;
  }

  // TODO Handle polyfills that the FT polyfill service does not.
  // NOTE: Intentionally using outdated "document.onreadystatechange"
  // instead of listening for the "DOMContentLoaded" event. This is to
  // support old browsers, because we're adding polyfills here.
  function polyfillLoader(polyfillServiceIri, polyfillServiceCallbackName, callback) {
    window[polyfillServiceCallbackName] = function() {
      return callback(null);
    };

    if (!!document.body) {
      load(polyfillServiceIri);
    } else {
      var existingonreadystatechange = document.onreadystatechange;
      document.onreadystatechange = function() {
        if (document.readyState === 'interactive') {
          if (typeof existingonreadystatechange === 'function') {
            existingonreadystatechange();
          }

          load(polyfillServiceIri);
        }
      };
    }
  }

  function polyfill(namespace) {
    return highland.pipeline(function(stream) {
      bundleLogger.start(namespace + ' - wrap with polyfills');
      return stream.flatMap(function(file) {
        // NOTE: we don't appear to need to do this
        // if we keep the added code all on one line.
        /*
        // generate source maps if plugin source-map present
        if (file.sourceMap) {
          options.makeSourceMaps = true;
        }
        //*/

        if (file.isNull()) {
          return file;
        }

        return highland(file.contents).reduce('', function(codeString, code) {
          codeString += code.toString();
          return codeString;
        })
        .map(function(codeString) {
          var sourceMappingLine = codeString.match(/\n\/\/# sourceMappingURL=.*\n/);
          codeString = codeString.replace(sourceMappingLine, '');
          /*
          console.log('polyfillServiceList');
          console.log(polyfillServiceList);
          //*/

          var polyfillServiceCallbackName = ('polyfillServiceCallback' + namespace)
            .replace(/[^\w]/g, '');

          var polyfillServiceIri;
          var polyfillLoaderStringified;
          var polyfillLoaderCallback;
          // NOTE Only generating the polyfills the first time through.
          // Building during dev is too slow otherwise.
          if (!!polyfillsCache[namespace]) {
            polyfillServiceIri = polyfillsCache[namespace].polyfillServiceIri;
            polyfillLoaderStringified = polyfillsCache[namespace].polyfillLoaderStringified;
            polyfillLoaderCallback = 'function(err) {' + codeString + '}';
          } else {
            bundleLogger.start(namespace + ' - generate polyfills');
            console.log('           Restart gulp to update polyfills.');
            // TODO provide our preferred browser requirements.

            polyfillsCache[namespace] = {};

            var requiredPolyfills = autopolyfiller()
              .add(codeString)
              .polyfills;
            //*
            console.log('requiredPolyfills');
            console.log(requiredPolyfills);
            //*/

            var polyfillFeatures = _.intersection(
                polyfillServiceList,
                requiredPolyfills
            );

            /*
            console.log('polyfillFeaturesIntersection');
            console.log(polyfillFeatures);
            //*/

            file.polyfills = file.polyfills || {};
            file.polyfills.features = (file.polyfills.features || []).concat(polyfillFeatures);

            polyfillServiceIri = '//cdn.polyfill.io/v1/polyfill.min.js?features=' +
              polyfillFeatures.join(',') +
              '&callback=' + polyfillServiceCallbackName;
            polyfillsCache[namespace].polyfillServiceIri = polyfillServiceIri;

            polyfillLoaderCallback = 'function(err) {' + codeString + '}';

            // The script loader function, stringified with linebreaks removed.
            var scriptLoaderStringified = oneLinifyJs(load);
            polyfillsCache[namespace].scriptLoaderStringified = scriptLoaderStringified;
            polyfillLoaderStringified = scriptLoaderStringified + ' ' +
              oneLinifyJs(polyfillLoader);
            polyfillsCache[namespace].polyfillLoaderStringified = polyfillLoaderStringified;
            bundleLogger.end(namespace + ' - generate polyfills');
          }

          // NOTE: removed linebreaks in order to not mess up line numbering for sourcemaps.
          var newContent = polyfillLoaderStringified + ' ' +
            'polyfillLoader("' + polyfillServiceIri + '", ' +
                '"' + polyfillServiceCallbackName + '", ' +
                polyfillLoaderCallback + ');' + sourceMappingLine;

          var newContentBuffer = new Buffer(newContent);
          file.contents = newContentBuffer;

          bundleLogger.end(namespace + ' - wrap with polyfills');
          /*
          // apply source map to the chain
          if (file.sourceMap) {
            applySourceMap(file, {
              version : 3,
              file: 'out.js',
              sourceRoot : '',
              sources: ['foo.js', 'bar.js'],
              names: ['src', 'maps', 'are', 'fun'],
              mappings: 'AAgBC,SAAQ,CAAEA'
            });
          }
          //*/

          return file;
        });
      });
    });
  }

  function build(subsection) {
    return highland.pipeline(function(stream) {

      bundleLogger.start(subsection + ' build');

      var unminifiedFileName = name + '.' + subsection + '.js';

      function finishStream(value) {
        return highland.pipeline(function(stream) {
          return stream.map(function(value) {
            bundleLogger.end(subsection + ' build');
            return value;
          });
        });
      }

      var vinylifiedStream = stream
        // Using vinyl-source-stream (source) to make the
        // stream gulp compatible.
        // Specifying the desired output filename here.
        .through(source(unminifiedFileName))
        /*
        .through(jshint())
        .through(jshint.reporter('default'))
        //*/
        //  TODO polyfill is super slow. Can we speed it up?
        //  Also, does it work?
        //  How is it related to the polyfills bundle?
        //  Should we get rid of it once the polyfills bundle
        //  generation is working?
        //.through(polyfill(name + subsection))
        .through(gulp.dest('./test/lib/' + name + '/dev/'));

      if (global.isWatching) {
        return vinylifiedStream.pipe(finishStream());
      }

      console.log('One-time build process - no watch set.');

      return vinylifiedStream
        // These steps are only enabled when
        // a watch is not set.
        // They are too slow to enable
        // during development.
        //.through(modernize(name + subsection))
        .through(buffer())
        .through(rename(function(path) {
          path.extname = '.min.js';
        }))
        .through(inspect())
        .through(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .through(uglify({
          'global_defs': {
            DEBUG: false
          }
        }))
        // locate sourcemaps in same dir as source file
        .through(sourcemaps.write('./'))
        // TODO this doesn't seem to be it, but we need to figure out
        // how to make the stream finish when not doing watchify
        //.through(buffer())
        .through(gulp.dest('./dist/' + version + '/'))
        .through(gulp.dest('./demo/lib/' + name + '/' + version + '/'))
        .pipe(finishStream());
        /*
        .through(gulp.dest('./demo/lib/' + name + '/' + version + '/'))
        .pipe(modernizr('modernizr-custom1.js'))
        .pipe(gulp.dest('tmp/'));
        //*/
    });
  }

  /**
   * startBundling
   *
   * @param {Object} config
   * @param {string} config.entries the file(s) that serve as entry points for this project
   * @return {Observable}
   */
  function startBundling(bundler, currentConfig) {
    // Log when bundling starts
    bundleLogger.start('bundling');

    var browserifySources = [];

    // see this issue on memory leak:
    // https://github.com/substack/factor-bundle/issues/64
    // We have currently patched the local version of the factor-bundle module like this:
    // from b.on('reset', addHooks);
    // to b.once('reset', addHooks);
    bundler.plugin('factor-bundle', {
      outputs: currentConfig.entries.map(function(entry) {
        return entry.split('/').pop().replace('.js', '');
      })
      .map(function(subsection) {
        var factorStream = build(subsection);
        browserifySources.push(
          RxNode.fromStream(factorStream, 'end')
        );
        return factorStream;
      })
    });

    browserifySources.push(
      RxNode.fromStream(
          bundler.bundle()
          .pipe(build('core')),
          'end'
      )
    );

    return Rx.Observable.from(browserifySources)
    .mergeAll()
    .flatMap(function(file) {
      if (file && file.path) {
        console.log('...'.green);
        return Rx.Observable.return(file);
      } else {
        return Rx.Observable.throw(new Error('Unexpected result when bundling'));
      }
    })
    .doOnCompleted(function() {
      bundleLogger.end('bundling');
    });
  }

  /************************************************
  * Settings and Execution
  *************************************************/

  console.log('Quit by typing "q" and then hitting "Enter"');
  console.log('Rebundle by typing "rs" and then hitting "Enter"');

  var builtinNames = _.keys(require('browserify/lib/builtins.js'));
  var topLevelDirPath = __dirname + '/../..';
  var externalBundlePath = topLevelDirPath + '/test/lib/pvjs/dev/pvjs.external.js';
  var externalBundleStream;

  function resolveRelToTopLevel(item) {
    var abs;
    try {
      abs = require.resolve(item);
    } catch (e) {
      abs = item;
    }

    return path.relative(topLevelDirPath, abs);
  }

  var internalPackages = [
    'gpml2pvjson',
    'kaavio',
    'kaavio-editor',
    'rx',
    'rx-extra',
    'wikipathways-api-client',
  ];

  var internalEntries = internalPackages.map(resolveRelToTopLevel);

  var externalEntries = _.difference(
      _.keys(packageJson.dependencies),
      internalPackages,
      builtinNames
  )
  .concat([
    //*
    'jsonld',
    'hyperquest',
    'lodash',
    'csv-streamify',
    'mithril-simple-modal',
    'jsonld-rx-extra',
    'jsonstream',
    'bridgedb',
    //*/
  ])
  .filter(function(externalPackage) {
    // TODO why does resolve.require fail for this? It's in node_modules.
    return externalPackage !== 'blueimp-load-image';
  })
  .map(resolveRelToTopLevel);

  var noParse = [
    'd3',
    'jsonld',
  ];

  /*
  // These values override the real values.
  // This is for quick testing of the build process.
  config.entries = [
    './lib/main1.js',
    './lib/sing.js',
  ];

  externalEntries = [
    './lib/sub1.js'
  ]
  .concat([
    'd3',
    //'jsonld',
    'rx',
    //'rx-extra',
  ])
  .filter(function(externalPackage) {
    // TODO why does resolve.require fail for this? It's in node_modules.
    return externalPackage !== 'blueimp-load-image';
  })
  .map(resolveRelToTopLevel);
  //*/

  function fileExists(filePath) {
    try {
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }

  if (fileExists(externalBundlePath)) {
    console.log('Using cached bundle for the following external entries:');
    console.log(externalEntries);
    externalBundleStream = highland(fs.createReadStream(externalBundlePath));
  } else {
    console.log('Creating cache bundle for the following external entries:');
    console.log(externalEntries);
    externalBundleStream = highland(
      browserify(externalEntries, {
        basedir: __dirname + '/../../',
        // Required watchify args
        cache: {}, packageCache: {}, fullPaths: true,
        // Browserify Options
        // Enable source maps!
        debug: true,
        //exclude: 'cheerio',
        noParse: noParse,
      })
      .ignore('cheerio')
      .ignore('commander')
      .ignore('jquery')
      // enable fs.readFileSync() in browser
      .transform('brfs')
      .transform('deglobalify')
      .bundle()
    );

    externalBundleStream
    .fork()
    .pipe(build('external'));
  }

  var internalBundler = browserify(config.entries, {
    basedir: __dirname + '/../../',
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    // Enable source maps
    debug: true,
    require: [
      externalBundleStream.fork()
    ],
    //bundleExternal: false,
    noParse: noParse,
  })
  .external(externalEntries)
  .ignore('cheerio')
  .ignore('commander')
  .ignore('jquery')
  // enable fs.readFileSync() in browser
  .transform('brfs')
  .transform('deglobalify');

  // Run the initial time
  var internalBundlerSource = startBundling(internalBundler, config)
  .doOnCompleted(gulpTaskCompleteCallback);

  if (global.isWatching) {
    // Rebundle with watchify on changes and on user request.
    internalBundler = watchify(internalBundler);

    // Detect when the user types the rebundleTrigger
    // based on code from
    // https://github.com/remy/nodemon/blob/master/lib/nodemon.js
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var userInputSource = Rx.Observable.fromEvent(process.stdin, 'data')
    .map(function(data) {
      return (data + '').trim().toLowerCase();
    });

    var quitSource = userInputSource
    .filter(function(data) {
      // TODO right now, we need to type "q" and then hit "Enter".
      // Make Ctrl/Cmd c or just "q" quit this.
      return ['q'].indexOf(data) > -1;
    })
    .subscribe(function(data) {
      console.log('Quitting...'.green);
      process.exit(1);
    }, console.error);

    var rebundleRequestSource = userInputSource
    .filter(function(data) {
      // do the keys entered match the rebundable value?
      return data === 'rs';
    });

    var updateSource = Rx.Observable.fromEvent(internalBundler, 'update');

    internalBundlerSource = internalBundlerSource.concat(
      // Rebundle
      Rx.Observable.merge(
          updateSource,
          rebundleRequestSource
      )
      // Run at most once per second.
      // This is to handle cases such as multiple files being changed at the same time.
      .debounce(1000 /* ms */)
      .doOnNext(function(data) {
        console.log('Rebundling...'.green);
      })
      .flatMap(function(value) {
        return startBundling(internalBundler, config);
      })
    );
  }

  return internalBundlerSource
  .subscribeOnError(function(err) {
    err.message = (err.message || '') + ' in browserify gulp task.';
    throw err;
  });
});
