/* launchSelenium task
   ---------------
*/

var seleniumLauncher = require('selenium-launcher')
  , gulp         = require('gulp')
  ;

gulp.task('launchSelenium', function() {
  return seleniumLauncher(function(er, selenium) {
    if (er) {
      selenium.kill();
      return console.log(er);
    }
    return selenium;
  });
});

