  var io = require('socket.io'),
    events = require('events');

  function RemoteTestRunner(emitter){
    this.emitter = emitter || new events.EventEmitter();
  }
  RemoteTestRunner.prototype.addReporter = function(reporter){
    var emitter =this.emitter;
    emitter.on('start', reporter.reportRunnerStarting);
    emitter.on('suite', reporter.reportSuiteResults);
    emitter.on('spec', reporter.reportSpecResults);
    emitter.on('finished', reporter.reportRunnerResults);
  }
  RemoteTestRunner.prototype.start =function(app, providedIo) {
    var emitter = this.emitter;
    var socket = providedIo || io;
    socket.listen(app, {log:function(){}}).on('connection', function(client){
      client.on('message', function(msg){
        var evt = JSON.parse(msg);
        emitter.emit(evt.type, evt);
      });
      emitter.on('reload', function(){
        client.send('reload');
      });
    });
  }

  exports.RemoteTestRunner = RemoteTestRunner;
    
