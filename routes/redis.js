// redis.js
// contains data and user authentication api
var express = require('express');
var router = express.Router();
var redis = require('../config/redis');
var passport = require('../config/passport');

// sample redis commands =======================================================
redis.set("key", "value", function(err, data) {
    console.log(data);
});
redis.set("key2", "value2", function(err, data) {
    console.log(data);
});
redis.get("key", function(err, data) {
    console.log(data);
});
redis.get("key", function(err, data) {
    console.log("REDIS: retrieving 'key' value: " + data);
});
redis.keys("*", function(err, data) {
    console.log("REDIS: Retrieving all keys " + data);
});
// =============================================================================

/* REDIS REST API */

// test GET request
router.get('/test', function(req, res) {
	redis.get("key", function(err, data) {
		res.send('Should return "value": ' + data);
	});
});

// lookup user
router.get('/users', function(req, res) {
})

// register route
router.post('/register', function(req, res) {
})

// LOGIN (see ../config/passport for auth handling)
router.post('/login', passport.authenticate('local'),
    function(req, res) {
        console.log("login!", req.user);
        res.send('success');
    });

module.exports = router;