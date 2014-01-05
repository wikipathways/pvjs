onmessage = function(evt){
  commands[evt.data.name](evt.data)
}

var commands = {
  start:function(opts){
    var s = require(__dirname + '/server'),
      server = s.newServer(opts.config);

    server.on('finished', function(results){
      postMessage({name:'finished', results:results})
    })
    server.on('server-started', function(){
      postMessage({name:'started'})
    })
    server.start()
  }
}
