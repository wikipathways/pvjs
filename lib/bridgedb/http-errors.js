var config = require('./config.js');

var httpErrors = function(args) {
  var error = args.error;
  var response = args.response;
  var body = args.body;
  var stream = args.stream;
  var source = args.source;

  // request doesn't throw an error for responses like 404, 500, etc.,
  // but we want to treat them like errors.
  if (!!response && !!response.statusCode) {
    var statusCode = response.statusCode;
    var statusCodeFirstCharacter = statusCode.toString()[0];
    if (statusCodeFirstCharacter === '4' || statusCodeFirstCharacter === '5') {
      error = error || new Error('HTTP status code ' + statusCode);
    }
  }

  // if there is no error
  if (!error) {
    return;
  }

  // if there is an error

  //stream.pause();

  console.error('Error getting ' + source);
  console.error(error);

  setTimeout(function() {
    //stream.resume();
  }, config.http.retryDelay);
};

module.exports = httpErrors;
