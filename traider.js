var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

var routes = require('./routes/routes.js');
var MongoStore = require('connect-mongo')(expressSession);
var dbConfig = {
 "db": "traider",
 "host": "localhost",
 "port": 27017
};

createServer = function createServer() {

    var server = express();
    // specify middleware 
    //server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use('/product/*', express.static(__dirname + '/public'));
    server.use('/basket/', express.static(__dirname + '/public'));

    server.use(cookieParser());
    server.use(expressSession({
        secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn',
        store: new MongoStore(dbConfig)
    }));


    // attach router handlers
    routes.attachHandlers(server); //, passport);

    return server;

};


var server = createServer();
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});