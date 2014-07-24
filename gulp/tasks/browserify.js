/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify')
  , watchify     = require('watchify')
  , bundleLogger = require('../util/bundleLogger')
  , gulp         = require('gulp')
  , brfs = require('gulp-brfs')
  , handleErrors = require('../util/handleErrors')
  , source       = require('vinyl-source-stream')
  ;

gulp.task('browserify', function() {

	var bundleMethod = global.isWatching ? watchify : browserify;

	var bundler = bundleMethod({
		// Specify the entry point of your app
		entries: ['./src/js/pathvisiojs.js']
	})
  // enable fs.readFileSync() in browser
  .transform('brfs')
  .transform('deglobalify');

	var bundle = function() {
		// Log when bundling starts
		bundleLogger.start();

		return bundler
			.bundle({
        insertGlobals : true,
        exclude: 'cheerio',
        // Enable source maps!
        debug: true
      })
			// Report compile errors
			.on('error', handleErrors)
			// Use vinyl-source-stream to make the
			// stream gulp compatible. Specify the
			// desired output filename here.
			.pipe(source('pathvisiojs.js'))
      // Specify the output destination
			.pipe(gulp.dest('./dist/lib/pathvisiojs/js/'))
			// Log when bundling completes!
			.on('end', bundleLogger.end);
	};

	if(global.isWatching) {
		// Rebundle with watchify on changes.
		bundler.on('update', bundle);
	}

	return bundle();
});
