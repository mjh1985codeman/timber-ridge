const mongoose = require('mongoose');

const ReservationMongooseSchema = new mongoose.Schema({
    dateBooked: {
        type: mongoose.Schema.Types.Date,
        default: function() {
            const easternOffset = 240; // Eastern Time Zone offset in minutes
            const now = new Date();
            const easternNow = new Date(now.getTime() - easternOffset * 60 * 1000);
            easternNow.setUTCHours(5);
            easternNow.setUTCMinutes(5);
            easternNow.setUTCSeconds(5);
            easternNow.setUTCMilliseconds(5);
            return easternNow;
        },
        required: true,
    },
    beginDate: {
        type: mongoose.Schema.Types.Date,
        set: function(value) {
        const date = new Date(value);
        const easternDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        easternDate.setUTCHours(5);
        easternDate.setUTCMinutes(5);
        easternDate.setUTCSeconds(5);
        easternDate.setUTCMilliseconds(5);
        return easternDate;
        },
        required: true,
    },
    endDate: {
        type: mongoose.Schema.Types.Date,
        set: function(value) {
        const date = new Date(value);
        const easternDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        easternDate.setUTCHours(5);
        easternDate.setUTCMinutes(5);
        easternDate.setUTCSeconds(5);
        easternDate.setUTCMilliseconds(5);
        return easternDate;
        },
        required: true,
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
        ref: 'User',
        required: true
    },
    cancelled: {
        type: mongoose.Schema.Types.Boolean,
    }
});

module.exports = mongoose.model('Reservation', ReservationMongooseSchema);