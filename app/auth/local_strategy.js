const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const Users = require('../models/users.js');

//compare the hashed password and the requested one
function comparePasswords(user, password) {
    return bcrypt.compareSync(password, user.password);
};

module.exports = (passport) => {
    //passport needs to serialize and deserialize user session

    //serialize the user session
    passport.serializeUser((user, done) => done(null, user._id));

    //deserialize the user session
    passport.deserializeUser((id, done) => {
        Users.findById(id, (err, user) => done(err, user));
    });

    passport.use('local', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        // check if user with username exists
        Users.findOne({ 'username': username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }

            if (!comparePasswords(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }));
};
