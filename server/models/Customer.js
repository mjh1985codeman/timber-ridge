const mongoose = require('mongoose');

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
    reservations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Reservation'
    }]
});

module.exports = mongoose.model('Customer', CustomerMongooseSchema);