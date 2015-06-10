/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var applySourceMap = require('vinyl-sourcemaps-apply');
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
var mkdirp = require('mkdirp');
var rename = require('gulp-rename');
var semi = require('semi');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('browserify', function() {

  var packageJson = JSON.parse(fs.readFileSync('package.json'));
  var version = packageJson.version;
  var name = packageJson.name;

  mkdirp.sync('./dist/' + version + '/');
  mkdirp.sync('./demo/lib/' + name + '/' + version + '/');
  mkdirp.sync('./test/lib/' + name + '/' + version + '/');
  mkdirp.sync('./test/lib/' + name + '/dev/');

  // TODO Handle polyfills that the FT polyfill service does not.
  function polyfillLoader(polyfillServiceIri, polyfillServiceCallbackName, callback) {
    window[polyfillServiceCallbackName] = function() {
      return callback(null);
    };
    var newScriptTag = load(polyfillServiceIri);
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
          var polyfillFeatures = autopolyfiller()
            .add(codeString)
            .polyfills;

          file.polyfills = file.polyfills || {};
          file.polyfills.features = (file.polyfills.features || []).concat(polyfillFeatures);

          var polyfillServiceCallbackName = ('polyfillServiceCallback' + namespace)
            .replace(/[^\w]/g, '');

          var polyfillServiceIri = '//cdn.polyfill.io/v1/polyfill.min.js?features=' +
            polyfillFeatures.join(',') +
            '&callback=' + polyfillServiceCallbackName;

          var polyfillLoaderCallback = 'function(err) {' + codeString + '}';

          var loadString = semi.add(load.toString());
          var polyfillLoaderString = semi.add(polyfillLoader.toString());

          // NOTE: removed linebreaks in order to not mess up sourcemaps.
          var newContent = loadString.replace(/[\n\r]/g, '') + ' ' +
            polyfillLoaderString.toString().replace(/[\n\r]/g, '') + ' ' +
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

        /*
        return highland(file.contents).through(
          highland.pipeline(function(fileContentStream) {
            return fileContentStream.reduce('', function(codeString, code) {
              codeString += code.toString();

              console.log('fileafter');
              console.log(file);

              console.log('codeString');
              console.log(codeString);

              return codeString;
            })
            .map(function(codeString) {
              return file;
            });
          })
        );
        //*/

        /*
        return highland(file.contents).reduce('', function(codeString, code) {
          codeString += code.toString();

          console.log('fileafter');
          console.log(file);

          console.log('codeString');
          console.log(codeString);

          return codeString;
        })
        .map(function(codeString) {
          return file;
        });
        //*/
      });
    });
  }

  var process = function(subsection) {
    return highland.pipeline(function(stream) {

      var unminifiedFileName = name + '.' + subsection + '.js';
      var minifiedFileName = name + '.' + subsection + '.min.js';

      var vinylifiedStream = stream
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .through(source(unminifiedFileName));

      if (global.isWatching) {
        vinylifiedStream
        .pipe(gulp.dest('./test/lib/' + name + '/dev/'));
      }

      return vinylifiedStream
        // These steps are only enabled when
        // a watch is not set.
        // They are too slow to enable
        // during development.
        .through(polyfill(name + subsection))
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
        /*
        .map(function(data) {
          var fileString = data.contents;
          console.log('fileString');
          console.log(fileString);
          return data;
        })
        //*/
        .through(gulp.dest('./test/lib/' + name + '/dev/'))
        .through(gulp.dest('./test/lib/' + name + '/' + version + '/'))
        .through(gulp.dest('./dist/' + version + '/'))
        .pipe(gulp.dest('./demo/lib/' + name + '/' + version + '/'));
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

  bundler.plugin('factor-bundle', {
    outputs: config.entries.map(function(entry) {
      return entry.split('/').pop().replace('.js', '');
    })
    .map(process)
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
    .bundle()
    // Report compile errors
    .on('error', handleErrors)
    .pipe(process('core'))
    // Log when bundling completes!
    .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});
