var redis = require('redis');

// CREATE REDIS CLIENT
if (process.env.REDISTOGO_URL) {
    // authenticating redis in production env
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var rclient = redis.createClient(rtg.port, rtg.hostname);
    rclient.auth(rtg.auth.split(":")[1]);
} else {
    var rclient = redis.createClient();
}

// REDIS CONNECTION HANDLING
rclient.on('connect', function() {
    console.log('Redis connected!');
});
rclient.on("error", function(err) {
    console.log("Error " + err);
});

module.exports = rclient;