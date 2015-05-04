var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
  require('./tasks/' + task);
});

// TODO move content from here into separate files in ./tasks
var _ = require('lodash');
var argv = require('yargs').argv;
var exec = require('child_process').exec;
var File = require('vinyl');
var fs = require('vinyl-fs');
var git = require('gulp-git');
var gulp = require('gulp');
var bump = require('gulp-bump');
var highland = require('highland');
var inquirer = require('inquirer');
var jsdoc = require('gulp-jsdoc');
var jsdocOptions = require('../jsdoc-conf.json');
var JSONStream = require('JSONStream');
var nodeFs = require('fs');
var rename = require('gulp-rename');
var replace = require('gulp-regex-replace');
var source = require('vinyl-source-stream');

var createGitCheckoutStream = highland.wrapCallback(git.checkout);
var createGitMergeStream = highland.wrapCallback(git.merge);
var createGitPushStream = highland.wrapCallback(git.push);
var createGitTagStream = highland.wrapCallback(git.tag);
var createPromptStream = highland.wrapCallback(inquirer.prompt);

var oldPackageJson = require('../package.json');
// TODO refactor because this is not a good idea to pollute the global NS.
global.oldPackageJson = oldPackageJson;
var newPackageJson = global.newPackageJson = oldPackageJson;
var versionType;

var metadataFiles = [
  './bower.json',
  './component.json',
  './package.json'
];

gulp.task('build-docs', ['sync-readme-version'], function(callback) {
  // I think gulp-jsdoc currently cannot use an external conf.json.
  // Until it's confirmed that it does, we'll disable the gulp-jsdoc command
  // and use exec instead to run the command at the command line.
  /*
  gulp.src(['./lib/*.js', 'README.md'])
    .pipe(jsdoc.parser())
    .pipe(jsdoc.generator('./docs', {
      path: './node_modules/jaguarjs-jsdoc/'
    }, jsdocOptions));
  //*/

  //jsdoc -t "./node_modules/jaguarjs-jsdoc/"
  //      -c "./jsdoc-conf.json" "./lib/" -r "./README.md" -d "./docs/"

  exec('jsdoc -t "./node_modules/jaguarjs-jsdoc/" -c ' +
    '"./jsdoc-conf.json" "./lib/" -r "./README.md" -d "./docs/"',
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      return callback(err, stdout);
      // TODO why does using @private give an error?
      // We can't use stderr as err until we handle that.
      //return callback(err || stderr, stdout);
    });
});

/*
gulp.task('bump', [
  'bump-git'
], function(callback) {
  return callback();
});
//*/

// bump git
gulp.task('sync-git-version', function bumpGit(callback) {
  if (newPackageJson.version === oldPackageJson.version) {
    return callback(null);
  }

  gulp.src(['./dist/*',
            './docs/*',
            'README.md']
            .concat(metadataFiles)
  )
  .pipe(git.add())
  .pipe(git.commit('Bump version to ' + newPackageJson.version + ' and build.'))
  .pipe(createGitTagStream('v' + newPackageJson.version,
          'Version ' + newPackageJson.version))
  .last()
  .each(function(data) {
    return callback(null, data);
  });
});
//*/

//*
// Update bower, component, npm all at once:
gulp.task('bump-metadata-files', ['get-version-type'], function(callback) {
  gulp.src(metadataFiles)
  .pipe(bump({type: versionType}))
  .pipe(gulp.dest('./'))
  .pipe(highland.pipeline(function(s) {
    return s.map(function(file) {
      return file.contents;
      // TODO we should be able to use something like this
      // to make this code simpler, but it's not working:
      //return file.pipe(JSONStream.parse('*'));
    })
    .pipe(JSONStream.parse())
    // This is needed to turn the stream into a highland stream
    .pipe(highland.pipeline())
    .each(function(json) {
      // TODO this might not work if we have more than just the
      // package.json file. What happens if we add a bower.json file?
      newPackageJson = global.newPackageJson = json;
      return callback(null, json);
    });
  }));
});
//*/

//*
gulp.task('sync-readme-version', function() {
  return gulp.src('README.md')
    .pipe(replace({
      regex: oldPackageJson.version,
      replace: newPackageJson.version
    }))
    .pipe(gulp.dest('./'));
});
//*/

//*
// get version type
gulp.task('get-version-type', function(callback) {
  highland(createPromptStream({
    type: 'list',
    name: 'versionType',
    message: 'Choose a version type below.',
    choices: ['patch', 'minor', 'major', 'prerelease']
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
  .each(function(res) {
    versionType = res.versionType;
    return callback(null, versionType);
  });
});
//*/

// publish to github repo, github pages and npm.
gulp.task('publish', ['sync-git-version'], function publish(callback) {
  highland(createGitPushStream('origin', 'master'))
  .errors(killStream)
  .flatMap(createGitPushStream('origin', 'v' + newPackageJson.version))
  .errors(killStream)
  .flatMap(createGitCheckoutStream('gh-pages'))
  .flatMap(createGitMergeStream('master'))
  .flatMap(createGitPushStream('origin', 'gh-pages'))
  .flatMap(createGitCheckoutStream('master'))
  //* TODO the following should look something like this, but I haven't tested it yet
  .flatMap(function() {
    return highland.wrapCallback(exec)('npm publish');
  })
  .map(function(stdout, stderr) {
    return stdout;
  })
  //*/
  .each(function(data) {
    return callback(null, data);
  });
});

/*
gulp.task('test-exec', function(cb) {
  exec('echo "hello"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
//*/

// verify git is ready
gulp.task('verify-git-status', function verifyGitStatus(callback) {
  var desiredBranch = 'master';

  highland([{}])
  .flatMap(highland.wrapCallback(git.status))
  .errors(killStream)
  .map(function(stdout) {
    var inDesiredBranch = stdout.indexOf('On branch ' + desiredBranch) > -1;
    var nothingToCommit = stdout.indexOf('nothing to commit') > -1;
    var gitStatusOk = inDesiredBranch && nothingToCommit;
    if (!gitStatusOk) {
      var message = 'Please checkout master and ' +
        'commit all changes before bumping.';
      throw new Error(message);
    }
    return stdout;
  })
  .errors(killStream)
  .flatMap(highland.wrapCallback(
    // TODO why does this run before git.status, unless I use this
    // extra function?
    function(data, callback) {
      git.exec({args : 'diff master origin/master'}, function(err, stdout) {
        return callback(null, stdout);
      });
    }
  ))
  .map(function(stdout) {
    var gitStatusOk = (stdout === '');
    if (!gitStatusOk) {
      var message = 'local/master is ahead of and/or behind origin/master.' +
        ' Please push/pull before bumping.';
      throw new Error(message);
    }
    return gitStatusOk;
  })
  .errors(killStream)
  .each(function(gitStatusOk) {
    return callback(null, gitStatusOk);
  });
});

function killStream(err, push) {
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
}
