const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
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


module.exports = mongoose.model('User', User);