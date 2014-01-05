if (!process.env.NODE_ENV) process.env.NODE_ENV='development'

var express = require('express')
    , http = require('http')
    , path = require('path')
    , reload = require('reload')
    , colors = require('colors')

express.static.mime.define({'text/plain': ['md']});
express.static.mime.define({'application/xml': ['gpml']});

var app = express()

var testDir = __dirname;

app.configure(function() {
    app.set('port', process.env.PORT || 3000)
    app.use(express.favicon())
    app.use(express.logger('dev'))
    app.use(express.bodyParser())
    app.use(app.router)
    app.use(express.static(testDir))
})

app.configure('development', function(){
    app.use(express.errorHandler());
})

app.get('/', function(req, res) {
    res.sendfile(path.join(testDir, 'index.html'))
})

var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
    console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


