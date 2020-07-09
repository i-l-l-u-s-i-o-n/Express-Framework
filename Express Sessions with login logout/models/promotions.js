const mongoose = require('mongoose');

const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);


const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    }
}, {
    timestamps: true
})


const Promotion = mongoose.model('Promotion', promotionSchema);


module.exports = Promotion;