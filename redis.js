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
    console.log("REDIS: retrieving 'key' value: " + res);
});
rclient.keys("*", function(err, res) {
    console.log("REDIS: Retrieving all keys: " + res);
});

module.exports = rclient;