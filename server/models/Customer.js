const mongoose = require('mongoose');

//mongoose schema (database => mongoose (mapper) => graphQLAPI)
const CustomerMongooseSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    reservations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Reservation'
    }]
});

module.exports = mongoose.model('Customer', CustomerMongooseSchema);