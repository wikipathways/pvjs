/**
 * shamelessly copied from https://github.com/remy/nodemon/
 */
var fs = require('fs'),
    exec = require('child_process').exec,
    flag = './.monitor',
    timeout = 1000; // check every 1 second


fs.writeFileSync(flag, '');

var startMonitor = function(server) {
  var cmd = 'find . -type f -newer ' + flag + ' -print';
  setInterval(function(){
    exec(cmd, function (error, stdout, stderr) {
      var files = stdout.split(/\n/);

      files.pop(); // remove blank line ending and split
      if (files.length) {
        fs.writeFileSync(flag, '');

        if (files.length) {
          var files = files.filter(function(f){ return f.match(/(.js|.coffee)$/) });
          if (server && files.length) {
            console.log('[monitor] sending reload command');
	    server.rerun();
          }
        }
      }
    });
  }, timeout);
}

exports.startMonitor = startMonitor;
