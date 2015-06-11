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
var config = require('../config.json');
var fs = require('fs');
var gulp = require('gulp');
var handleErrors = require('../util/handle-errors.js');
var highland = require('highland');
var load = require('scriptloader');
var map = require('vinyl-map');
var modernizr = require('gulp-modernizr');
var mkdirp = require('mkdirp');
var polyfillService = require('polyfill-service');
var rename = require('gulp-rename');
var semi = require('semi');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('browserify', function() {

  var polyfillServiceList = polyfillService.getAllPolyfills();
  var packageJson = JSON.parse(fs.readFileSync('package.json'));
  var version = packageJson.version;
  var name = packageJson.name;

  mkdirp.sync('./dist/' + version + '/');
  mkdirp.sync('./demo/lib/' + name + '/' + version + '/');
  mkdirp.sync('./test/lib/' + name + '/dev/');

  function inspect() {
    return highland.pipeline(function(stream) {
      return stream.map(function(file) {
        if (file.isNull()) {
          return file;
        }

        console.log('fileafter1');
        console.log(file);

        console.log('file.contents inspect');
        console.log(file.contents.toString());

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
        console.log('file145');
        console.log(file.contents.toString());

        return highland([file])
          // TODO make the stream gulp-compatible
          //.through(source(namespace + '.js'))
          .through(modernizr('modernizr.' + namespace + '.min.js'))
          .map(function(customModernizr) {
            console.log('customModernizr77');
            console.log(customModernizr);

            console.log('customModernizr.contents132');
            console.log(customModernizr.contents.toString());

            var customModernizrString = oneLinifyJs(customModernizr.contents.toString());

            console.log('customModernizrString137');
            console.log(customModernizrString.length);
            console.log(customModernizrString);

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
          console.log('in polyfills');
          /*
          console.log('polyfillServiceList');
          console.log(polyfillServiceList);
          //*/
          // TODO provide our preferred browser requirements.
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

          var polyfillServiceCallbackName = ('polyfillServiceCallback' + namespace)
            .replace(/[^\w]/g, '');

          var polyfillServiceIri = '//cdn.polyfill.io/v1/polyfill.min.js?features=' +
            polyfillFeatures.join(',') +
            '&callback=' + polyfillServiceCallbackName;

          var polyfillLoaderCallback = 'function(err) {' + codeString + '}';

          var loadString = oneLinifyJs(load);
          var polyfillLoaderString = oneLinifyJs(polyfillLoader);

          // NOTE: removed linebreaks in order to not mess up line numbering for sourcemaps.
          var newContent = loadString + ' ' +
            polyfillLoaderString + ' ' +
            'polyfillLoader("' + polyfillServiceIri + '", ' +
                '"' + polyfillServiceCallbackName + '", ' +
                polyfillLoaderCallback + ');';

          var newContentBuffer = new Buffer(newContent);
          file.contents = newContentBuffer;

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

  var process = function(subsection) {
    return highland.pipeline(function(stream) {

      var unminifiedFileName = name + '.' + subsection + '.js';

      var vinylifiedStream = stream
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .through(source(unminifiedFileName))
        .through(polyfill(name + subsection))
        .through(gulp.dest('./test/lib/' + name + '/dev/'));

      if (global.isWatching) {
        return vinylifiedStream;
      }

      console.log('isnotwatching');

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
        .through(gulp.dest('./demo/lib/' + name + '/' + version + '/'));
        /*
        .through(gulp.dest('./demo/lib/' + name + '/' + version + '/'))
        .pipe(modernizr('modernizr-custom1.js'))
        .pipe(gulp.dest('tmp/'));
        //*/
    });
  };

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

    bundler.plugin('factor-bundle', {
      outputs: config.entries.map(function(entry) {
        return entry.split('/').pop().replace('.js', '');
      })
      .map(process)
    });

    // Log when bundling starts
    bundleLogger.start();

    return bundler
    .bundle()
    // Report compile errors
    .on('error', handleErrors)
    // Log when bundling completes!
    //.on('end', bundleLogger.end)
    .pipe(process('core'))
    .toArray(function(result) {
      bundleLogger.end();
      console.log('result');
      console.log(result);
    });
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});
