var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var hbs = require('hbs');
var app = express();

// setup REDIS. comment out this block to disable redis =======================
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
    // authenticating redis in production env
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var rclient = redis.createClient(rtg.port, rtg.hostname);
    rclient.auth(rtg.auth.split(":")[1]);
} else {
    var rclient = redis.createClient();
}

rclient.on('connect', function() {
    console.log('Redis connected!');
});

rclient.on("error", function(err) {
    console.log("Error " + err);
});

// sample redis commands
rclient.set("key", "value", redis.print);
rclient.set("key2", "value2", redis.print);
rclient.get("key", redis.print);
rclient.get("key", function(err, res) {
    console.log("REDIS: retrieving 'key' value: "+ res);
});
rclient.keys("*", function(err, res) {
    console.log("REDIS: Retrieving all keys: " + res);
});
// =============================================================================

// force redirect HTTPS
app.use(function(req, res, next) {
    var sslUrl;
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        sslUrl = ['https://acme-cogs121.herokuapp.com', req.url].join('');
        return res.redirect(sslUrl);
    }
    return next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// HANDLEBARS BLOCK/EXTEND HELPERS
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});
hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
});

// ROUTES ======================================================================
app.use('/', require('./routes/index'));
app.use('/test', require('./routes/test'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {  
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404');
});

module.exports = app;
