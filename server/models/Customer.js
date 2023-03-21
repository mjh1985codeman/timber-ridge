const mongoose = require('mongoose');
const ReservationSchema = require('./Reservation')

//mongoose schema (database => mongoose (mapper) => graphQLAPI)
const CustomerMongooseSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    reservations: {
        type: mongoose.Schema.Types.Array,
        ref: 'Reservation'
    }
});

module.exports = mongoose.model('Customer', CustomerMongooseSchema);