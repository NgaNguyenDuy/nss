var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express();

var http = require('http');
var io = require('socket.io');

var server = http.createServer(app);
var ioServer = io.listen(server);


// Using redis client
var redis = require('redis');
var redisClient = redis.createClient();
var RedisStore = require('connect-redis')(session);
var redisStore = new RedisStore({client: redisClient});


// Other
var config = require('./config');


// All environment
app.set('port', process.env.PORT || config.portServer);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(config.sessionSecret));
app.use(session({ 
    store: redisStore, 
    key: config.sessionCookieKey, 
    secret: config.sessionSecret, 
    resave: true, 
    saveUninitialized: true 
}));



// Initialize REST rotues
require('./shared/router')(app);


server.listen(app.get('port'), function() {
    console.log('Running server ... at ', app.get('port'));
});
