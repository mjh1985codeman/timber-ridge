const mongoose = require('mongoose');

const ReservationMongooseSchema = new mongoose.Schema({
    dateBooked: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        required: true
    },
    beginDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    endDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    downPaymentPaid: {
        type: Boolean,
        required: true
    },
    totalPrice: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    balance: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    paidInFull: {
        type: Boolean,
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
});

module.exports = mongoose.model('Reservation', ReservationMongooseSchema);