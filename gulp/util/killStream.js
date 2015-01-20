var _ = require('lodash');

module.exports = function killStream(err, push) {
  if (_.isString(err)) {
    // err is not of the JS type "error".
    err = new Error(err);
  } else if (_.isPlainObject(err)) {
    // err is not of the JS type "error".
    var jsError = new Error(err.msg || err.message || 'Error');
    _.assign(jsError, err);
    err = jsError;
  }

  // Using process.exit is a kludge to stop everything in this case.
  process.exit(1);
  // It would seem that Highland could kill the stream by
  // using some combination of the commented-out options below,
  // but in reality, at least with this version of Highland,
  // none of those options stop the stream.
  // Unless we use process.exit, the stream will continue, e.g.,
  // git diff below will still run.
  //stream.destroy();
  //push(err);
  //throw err;
};
