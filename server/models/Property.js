const mongoose = require('mongoose');

const PropertyMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    reserved: {
        type: Boolean,
        required: true,
        default: false
    },
    reserveCost: {
        type: Number,
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
        type: String,
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
    },
    pictures: {
        type: mongoose.Schema.Types.Array,
    }
});

module.exports = mongoose.model('Property', PropertyMongooseSchema);