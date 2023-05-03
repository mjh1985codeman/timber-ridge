const mongoose = require('mongoose');

const PropertyMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    reserved: {
        type: Boolean,
        required: true,
        default: false
    },
    reserveCost: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    addressSt: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    readyToReserve: {
        type: Boolean,
        required: true,
        default: false
    },
    available: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Property', PropertyMongooseSchema);