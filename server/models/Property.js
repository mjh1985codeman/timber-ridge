const mongoose = require('mongoose');

const PropertyMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    reserved: {
        type: Boolean
    },
    reserveCost: {
        type: Number
    },
    addressSt: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    readyToReserve: {
        type: Boolean
    },
    available: {
        type: Boolean
    }
});

module.exports = mongoose.model('Property', PropertyMongooseSchema);