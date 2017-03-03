var _ = require('lodash');
var highland = require('highland');
//var inquirer = require('inquirer');
var notifier = require('node-notifier');

/* Neither of these work on Mac OS X 10.8 because this.options.customPath
* causes an error to be thrown because this.options does not exist
var notifyA = highland.ncurry(1, notifier.notify);
//var notifyA = highland.partial(notifier.notify);
var createStream = highland.wrapCallback(notifyA);
//*/
// Same for this
//var createStream = highland.wrapCallback(notifier.notify);

// This works, even though it seems kludgy to have to wrap the function
// with another function to get the callback to work with
// highland.wrapCallback
var createStreamOnce = highland.wrapCallback(function(options, done) {
  notifier.notify(options, done);
});

var start;
// The extra code here makes it possible to make the notifier wait
// for the amount of time specified in options.time.
// options.time doesn't seem to pause it for more than ~5sec,
// at least on Mac OS X.
// I'm not sure that options.time even has any effect on OS X.
var createStream = function(options) {
  if (!options.time) {
    return createStreamOnce(options);
  }

  start = start || new Date();
  return createStreamOnce(options)
  .flatMap(function(result) {
    var now = new Date();
    // The result is "Activate\n" or something, so I'm using indexOf.
    if (result.indexOf('Activate') > -1 || (now - start) > options.time) {
      return highland([result]);
    }

    var secondsRemaining = Math.round((options.time - (now - start)) / 1000);
    var messageLines = options.message.split('\r');
    // There will be one line sent in originally for options.messaage.
    // The second line will indicate the time before timeout.
    // At least for Mac OS X, there is a limit of two lines.
    messageLines[1] = 'Timeout in ' + secondsRemaining + ' sec. ' + result;
    options.message = messageLines.join('\r');

    return createStream(options);
  })
  .last();
};

//var createPromptStream = highland.wrapCallback(inquirer.prompt);

module.exports = {
  createStream: createStream
};
