/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

var gutil        = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTimes = {};

module.exports = {
  start: function(subtask) {
    startTimes[subtask] = process.hrtime();
    gutil.log('Running', gutil.colors.green(subtask) + '...');
  },

  end: function(subtask) {
    var taskTime = process.hrtime(startTimes[subtask]);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', gutil.colors.green(subtask), 'in', gutil.colors.magenta(prettyTime));
  }
};
