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

const user = module.exports = mongoose.model('users', userSchema);

module.exports.createUser = function(user, callback) {
    user.create(user, callback);
};

//updating a user profile
module.exports.updateUserProfile = function(id, user, option, callback) {
    let query = {_id: id};
    let update =  {
        username : user.username,
        name : user.name,
        email : user.email,
        image: user.image
    };

    user.findOneAndUpdate(query, update, option, callback);
};
