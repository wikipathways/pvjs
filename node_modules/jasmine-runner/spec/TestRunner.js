require.paths.unshift(__dirname+'/../lib/');
var vows = require('vows');
var assert = require('assert');
var runner = require('TestRunner');
var app = new(require("events").EventEmitter);
var emitter = new(require("events").EventEmitter);


var io = {
  listen:function(){return app; }
};

(function(){
  vows.describe('Websocket based test runner socket.io emitter').addBatch({
    'emitter from socket':{
      'start' : 
        message({type:'start'}).passedTo('reportRunnerStarting'),
      'suite':
        message({type:'suite'}).passedTo('reportSuiteResults'),
      'spec':
        message({type:'spec'}).passedTo('reportSpecResults'),
      'finished':
        message({type:'finished'}).passedTo('reportRunnerResults')
      },
      'reload specs':{
        topic:function(){
          app.on('send', this.callback);
          emitter.emit("reload");
        },
        'sends reload to browser':function(err, result){
          assert.equal('reload', result);
        }
      }
  }).export(module);
  
  // wiring and test setup
  var testRunner = new runner.RemoteTestRunner(emitter),
    reporter = {};
  ['reportRunnerStarting', 'reportSuiteResults', 
   'reportSpecResults', 'reportRunnerResults'].forEach(function(method){
    reporter[method] = function(evt){
      reporter.callback({method:method, arg:evt});
    }
  });
  testRunner.start(app, io);
  testRunner.addReporter(reporter);
  app.emit('connection', app);
  // stub client
  app.send = function(msg){
    app.emit('send', null, msg);
  }

  // helper to make things more concise
  function message(obj){
    return {
      passedTo:function(name){
        return {
          topic:function(){
            reporter.callback = this.callback;
            app.emit('message', JSON.stringify(obj));
          },
          'should invoke report runner starting':function(a, b){
            assert.equal(a.method, name)
          },
          'contains full event':function(a, b){
            assert.deepEqual(obj, a.arg);
          }
        }
      }
    }
  }
})();
