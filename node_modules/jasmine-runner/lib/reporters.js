(function(ctx){
  require.paths.unshift(__dirname);
  var colors = require('colors'),
      NotifierReporter = require('notify').NotifierReporter,
    log = console.log;

  function ConsoleReporter () {
    this.reportRunnerStarting = function(){
      log("Running specs...")
    }   
    this.reportSuiteResults = function(suite){
      var results = suite.results
      var color = results.failedCount > 0?'red':'green'
      log((suite.padding+suite.desc)[color])
      log((suite.padding+'  Passed: ' + results.passedCount + ' Failed: ' + results.failedCount + ' Total: ' + results.totalCount)[color])
    }
    this.reportSpecResults = function(spec){
      var results = spec.results
      var desc = spec.padding+results.description
      var color = results.failedCount > 0?'red':'green'
      log(desc[color])
      log((spec.padding+'  Passed: ' + results.passedCount + ' Failed: ' + results.failedCount + ' Total: ' + results.totalCount)[color])
    }
    this.reportRunnerResults = function(){
      log('specs finished');
    }
  }

  ctx.ConsoleReporter = ConsoleReporter;
  ctx.NotifierReporter = NotifierReporter;
})(exports);
