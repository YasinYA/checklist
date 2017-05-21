const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);

let user = mongoose.model('users', userSchema);

module.exports = user;
