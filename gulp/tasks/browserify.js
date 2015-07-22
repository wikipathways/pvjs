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
var polyfillService = require('polyfill-service');
var rename = require('gulp-rename');
var Rx = require('rx');
var RxNode = require('rx-node');
var semi = require('semi');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('browserify', function(callback) {

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

        /*
        console.log('fileafter1');
        console.log(file);

        console.log('file.contents inspect');
        console.log(file.contents.toString());
        //*/

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
        /*
        console.log('file145');
        console.log(file.contents.toString());
        //*/

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

            var polyfillFeatures = _.intersection(polyfillServiceList,
                autopolyfiller()
                  .add(codeString)
                  .polyfills);

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
            polyfillLoaderStringified = scriptLoaderStringified + ' ' + oneLinifyJs(polyfillLoader);
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

  var build = function(subsection) {
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
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .through(source(unminifiedFileName))
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
        .through(gulp.dest('./dist/' + version + '/'))
        .through(gulp.dest('./demo/lib/' + name + '/' + version + '/'))
        .pipe(finishStream());
        /*
        .through(gulp.dest('./demo/lib/' + name + '/' + version + '/'))
        .pipe(modernizr('modernizr-custom1.js'))
        .pipe(gulp.dest('tmp/'));
        //*/
    });
  };

  /* These values override the real
   * values for testing the build process.
  config.entries = [
    './lib/main1.js',
    './lib/sub1.js'
  ];
  //*/
  var bundler = browserify(config.entries, {
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    // Enable source maps!
    debug: true,
    //insertGlobals : true,
    //exclude: 'cheerio'
  })
  .ignore('commander')
  .ignore('cheerio')
  // enable fs.readFileSync() in browser
  .transform('brfs')
  .transform('deglobalify');

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start('bundle');

    var streams = [];

    function factorBuild(subsection) {
      var factorStream = build(subsection)
        .pipe(highland.pipeline(function(stream) {
          return stream.last();
        }));
      streams.push(factorStream);
      return factorStream;
    }

    // see this issue on memory leak:
    // https://github.com/substack/factor-bundle/issues/64
    // currently just changing the factor-bundle module like this:
    // from b.on('reset', addHooks);
    // to b.once('reset', addHooks);
    bundler.plugin('factor-bundle', {
      outputs: config.entries.map(function(entry) {
        return entry.split('/').pop().replace('.js', '');
      })
      .map(function(subsection) {
        return factorBuild(subsection);
      })
    });

    var core = bundler.bundle()
      .pipe(build('core'));

    streams.push(core);

    var browserifyStreams = highland(streams)
      .errors(function(err, push) {
        // Report compile errors
        handleErrors(err);
      })
      .merge()
      .last()
      .filter(function(value) {
        return value;
      })
      .map(function(value) {
        // Log when bundling completes!
        bundleLogger.end('bundle');
        return value;
      });

    return highland(gulp.src('./lib/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default')))
      .last()
      .flatMap(function(value) {
        return browserifyStreams;
      });
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes or user request.
    bundler = watchify(bundler);

    // Detect when the user types the rebundleTrigger
    // based on code from
    // https://github.com/remy/nodemon/blob/master/lib/nodemon.js
    var rebundleTrigger = 'rs';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var rebundleRequestSource = Rx.Observable.fromEvent(process.stdin, 'data')
      .map(function(data) {
        return (data + '').trim().toLowerCase();
      })
      .filter(function(data) {
        // do the keys entered match the rebundable value?
        return data === rebundleTrigger;
      })
      .map(function(data) {
        console.log('Rebundling...'.green);
        return data;
      });

    var updateSource = Rx.Observable.fromEvent(bundler, 'update');

    return Rx.Observable.merge(
        // Run the initial time
        Rx.Observable.return(true),
        // Rebundle
        Rx.Observable.merge(
            updateSource,
            rebundleRequestSource
        )
        .debounce(1500 /* ms */)
      )
      .flatMap(function(value) {
        return RxNode.fromReadableStream(bundle());
      })
      .subscribe(function(file) {
        if (file && file.path) {
          console.log('Bundle Success'.green);
        } else {
          console.log('Unexpected result when bundling'.red);
        }

        if (!isInitialized) {
          isInitialized = true;
          return callback();
        }
      }, function(err) {
        console.error(err);
      }, function() {
        console.log('bundler ended');
      });
  }

  return bundle();
});
