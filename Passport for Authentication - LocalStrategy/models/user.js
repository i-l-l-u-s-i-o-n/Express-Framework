const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// It will allow us to directly store the password in hashed form.
const passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({

    admin: {
        type: Boolean,
        default: false
    }
});



// Using passLocalMongoose

User.plugin(passportLocalMongoose); // it will automatically add username and password to this schema.


module.exports = mongoose.model('User', User);