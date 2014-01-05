require.paths.unshift(__dirname+'/../lib/');
var vows = require('vows'),
  assert = require('assert'),
  TestServer = require('testserver').TestServer,
  app = {},
  config = {};

config = {
  server:{
    port:8080
  }
}
app={listen:function(port, cb){
    this.callback(port, cb);
  }
}
vows.describe('Server').addBatch({
  'starting up':{
    topic:function(){
      app.callback = this.callback;
      this.server = new TestServer(app, config);

      this.server.start();
    },
    'should start listening on the configured port':function(port, cb){
      assert.equal(config.server.port, port)
    }
  },
  'starting up fires the server started event':{
    topic:function(){
      app.callback = function(port, cb){
        cb()
      }
      this.server = new TestServer(app, config);
      this.server.on('server-started', this.callback);
      this.server.start();
    },
    'containing a reference to the app':function(appInEvt, ignored){
      assert.equal(app, appInEvt);
    } 
  }
}).export(module);
