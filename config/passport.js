const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const key = require('../config/keys').customKey;

const opts = {};
opts.secretOrKey = key;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//decripts the header token and pulls out the credentials
module.exports = passport => {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user)
                        return done(null, user) //error: null | user : user found
                    return done(null, false); //no user found
                })
                .catch((err)=> console.log(err))
        }))
};