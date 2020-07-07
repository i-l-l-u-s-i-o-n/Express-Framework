// by Shivam Shukla
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Loading currency module to allow mongoose schema have the currency fields for dishes.
require('mongoose-currency').loadType(mongoose);

// Now creating currency field
const Currency = mongoose.Types.Currency;


// Creating schema for sub document 'comment'.
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        // Using the currency type.
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },

    // Adding Sub Document 'comment' in the document 'dishes'.
    comments: [commentSchema]

}, {
    // It will add 2 fields: createdAt and updatedAt to each document.
    timestamps: true
});


// The name 'Dish' in the model is used to create a collection with plural of Dish i.e Dishes and in lowercase.
// So on creating model, the collection will be created named 'dishes'.
let Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;