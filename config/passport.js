var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var redis = require('../config/redis');

/*
    //REDIS TABLE HIEARCHY:
    // one dict for each user, schema "users:<username>"
    // for user "arlenpan@gmail.com"
    "users:arlenpan@gmail.com": {
        name: "Arlen Pan",
        password: "aksdjfaks",
        email: "arlenpan@gmail.com"
    }
*/

// local passport configuration using verify callback on redis data
passport.use('local', new LocalStrategy(function(email, password, done) {
    console.log("PASSPORT: ", email, password);
    var USERDICT = "users:" + email;

    // search for user on database
    redis.exists(USERDICT, function(err, data) {
        console.log(`REDIS USER LOOKUP on ${email}: ` + data);
        if (err) {
            return done(err);
        }
        if (!data) {
            return done(null, false);
        }

        // verify password by looking up dict
        redis.hget(USERDICT, "password", function(err, data) {
            if (data != password) {
                return done(null, false);
            } else {
                return done(null, {bladh:"blah"});
            }
        });
    });
}));


module.exports = passport;