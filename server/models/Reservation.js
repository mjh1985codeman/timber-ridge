const mongoose = require('mongoose');

const ReservationMongooseSchema = new mongoose.Schema({
    dateBooked: {
        type: mongoose.Schema.Types.Date
    },
    beginDate: {
        type: mongoose.Schema.Types.Date
    },
    endDate: {
        type: mongoose.Schema.Types.Date
    },
    downPaymentPaid: {
        type: Boolean
    },
    totalPrice: {
        type: Number
    },
    balance: {
        type: Number
    },
    paidInFull: {
        type: Boolean
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

module.exports = mongoose.model('Reservation', ReservationMongooseSchema);