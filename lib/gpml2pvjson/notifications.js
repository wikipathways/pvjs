var figlet = require('figlet');
var colors = require('colors');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'white',
  error: 'red'
});

module.exports = {
  log: function(header, body) {
    header = header || 'Error: No notification header text specified.';
    body = body || 'Error: No notification body text specified.';
    /*
    figlet(text,['-c'], function (ascii){
        console.log(ascii.toString());    
    });
    //*/
    //*
    figlet(header, function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      if (header.toLowerCase() === 'start' || header.toLowerCase() === 'begin') {
        console.log(data.inverse.green);
      } else if (header.toLowerCase() === 'end' || header.toLowerCase() === 'done') {
        console.log(data.inverse.silly);
      } else if (header.toLowerCase() === 'error' || header.toLowerCase() === 'err') {
        console.log(data.inverse.red);
      } else if (header.indexOf('!') > -1) {
        console.log(data.cyan.inverse);
        console.log(body);
      } else {
        console.log(data.inverse);
        console.log(body);
      }
    });
    //*/
  }
};
