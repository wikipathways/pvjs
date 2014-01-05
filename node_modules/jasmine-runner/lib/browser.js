var child_process = require ('child_process')
function Browser(cmd, page){
  var child;
  
  this.start = function(){
    child = child_process.spawn(cmd, [page])
  }
  
  this.stop = function(){
    child.kill('SIGHUP')
  }
}

exports.Browser = Browser
