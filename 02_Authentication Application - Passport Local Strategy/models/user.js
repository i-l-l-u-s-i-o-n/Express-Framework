const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');



var User = new Schema({
    name: {
        type: String,
        required: true,
    },
    faculty: {
        type: Boolean,
        default: false
    },
    student: {
        type: Boolean,
        default: false
    }
});


User.plugin(passportLocalMongoose); // it will automatically add username and password fields to this schema.


module.exports = mongoose.model('User', User);