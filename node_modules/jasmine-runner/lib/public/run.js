(function(){
  jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
  jasmine.getEnv().addReporter(new jasmine.WebsocketReporter());
  jasmine.getEnv().execute();
})()

