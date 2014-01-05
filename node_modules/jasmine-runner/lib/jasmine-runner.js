(function(){
  var exec = require('child_process').exec,
      web = require('webworker'),
      Configuration = require('config').Configuration,
      Browser = require(__dirname+'/browser').Browser,
      messages = {
        initialized:[
          'Jasmine has been installed with example specs.',
          '',
          'To run the server:',
          '',
          'jasmine run',
          '',
          'To run the server and monitor for changes:',
          '',
          'jasmine mon',
          '',
          'To run the automated CI task with WebDriver:',
          '',
          'jasmine ci',
          ''
      ].join('\n')
  };
  var commands = {
    init: function(info){
      var workingDir = info.args.length > 0 ? info.args[0] : info.cwd
      exec('cp -R '+__dirname + '/template/* ' + workingDir, function(err){
        console.log(messages.initialized)
      })
    }, 
    run: function(){
      loadConfig(function(config){
        var server = require('server').newServer(config);
        server.start();
      });
    },
    mon: function(info){
      loadConfig(function(config){
	if(info.args.length === 1 && config.server){
          config.server.port = info.args[0]; 
        }
        var server = require('server').newServer(config);
        server.start();
        require('monitor').startMonitor(server);
      });
    },
    ci:function(){
      loadConfig(function(config){
        var worker = new web.Worker(__dirname + '/server-worker.js')
        var browser = {}

        worker.postMessage({name:'start', config:config})
        worker.onmessage = function(e){
          if(e.data.name == 'finished'){
            worker.terminate()
            browser.stop()
          }else if (e.data.name == 'started'){
            browser = new Browser('google-chrome', 'http://localhost:'+config.server.port)
            browser.start()
          }
        }
        worker.onerror = function(e){
          console.log("[ERROR]" + e.message)
          worker.terminate()
        }
      });
    }
  }
  var run = function(evt){
    commands[evt.command](evt)
  }

  exports.supports = function(command){
    return Object.keys(commands).indexOf(command) > -1
  }
  exports.run = run

  function loadConfig(cb){
      var file = process.cwd() + "/jasmine.json";
      new Configuration(file).load(cb);
  }
})()

