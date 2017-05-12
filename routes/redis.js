// ALL REDIS DATA ROUTES HERE
var express = require('express');
var router = express.Router();
var redis = require('../config/redis');

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

router.get('/test', function(req, res) {
	redis.get("key", function(err, data) {
		res.send('Should return "value": ' + data);
	});
});

// get user
router.get('/users', function(req, res) {
    var id = req.query['id'];
    res.send(id);
})


module.exports = router;