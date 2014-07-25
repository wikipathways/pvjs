/* launchSelenium task
   ---------------
*/

var seleniumLauncher = require('selenium-launcher')
  , gulp         = require('gulp')
  , handleErrors = require('../util/handleErrors')
  , spawn = require('child_process').spawn
  // https://github.com/dominictarr/event-stream
  , es = require('event-stream')
  ;

gulp.task('launchSelenium', function() {

  return es.map(seleniumLauncher(function(er, selenium) {
      console.log('selenium in launchSelenium.js');
      console.log(selenium);
      if (er) {
        selenium.kill();
        return console.log(er);
      }
      return selenium;
    })
  );
});

