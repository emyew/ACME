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
passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        console.log("PASSPORT LOGIN: ", email, password);
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
                    return done(null, true);
                }
            });
        });
    })
);

// local passport configuration using verify callback on redis data
passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        console.log("PASSPORT SIGNUP: ", email, password);
        var USERDICT = "users:" + email;

        // search for user on database
        redis.exists(USERDICT, function(err, data) {
            console.log(`REDIS USER LOOKUP on ${email}: ` + data);
            if (err) {
                return done(err);
            }
            if (data) {
                return done(null, false);
            } else {
                // if user doesn't exist, create one
                redis.hmset(USERDICT, ["email", email, "password", password], function(err, data) {
                    console.log(data);
                    console.log(err);
                    if (err) {
                        console.log("REDIS ERROR");
                        return done(null, false);
                    } else {
                        return done(null, {email: email, password: password});
                    }
                });
            }
        });
    })
);


module.exports = passport;
