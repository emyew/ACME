var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var passport = require('./config/passport');
var hbs = require('hbs');
var app = express();

// force redirect HTTPS ========================================================
app.use(function(req, res, next) {
    var sslUrl;
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        sslUrl = ['https://acme-cogs121.herokuapp.com', req.url].join('');
        return res.redirect(sslUrl);
    }
    return next();
});

// view engine setup ===========================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'acme',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// HANDLEBARS BLOCK/EXTEND HELPERS =============================================
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
app.use('/explore', require('./routes/explore'));
app.use('/list', require('./routes/list'));

app.get('/success', function(req, res) {
    res.send('action success');
});
app.get('/failure', function(req, res) {
    res.send('action failure');
});

// register and login routes (to be moved)
app.post('/register', passport.authenticate('local-register', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));
app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));

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
