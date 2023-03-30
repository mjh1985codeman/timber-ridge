const mongoose = require('mongoose');

const ReservationMongooseSchema = new mongoose.Schema({
    dateBooked: {
        type: mongoose.Schema.Types.String,
        default: Date.now,
        required: true
    },
    beginDate: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endDate: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    downPaymentPaid: {
        type: Boolean,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
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