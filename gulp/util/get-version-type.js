var _ = require('lodash');
var highland = require('highland');
var utils = require('../util/utils.js');

module.exports = highland(utils.createPromptStream({
  type: 'list',
  name: 'versionType',
  message: 'Choose a version type below.',
  choices: ['patch', 'minor', 'major', 'prerelease', 'none']
}))
.errors(function(err, push) {
  // inquirer.prompt doesn't follow the node callback style convention
  // of passing error back as first argument, so this "error handling" is
  // required to pass along the actual response in addition to any errors.
  if (_.isPlainObject(err)) {
    // err is not actually an error! It's res.
    push(null, err);
  } else {
    // err is an error.
    push(err);
  }
})
.last()
.map(function(res) {
  return res.versionType;
});
