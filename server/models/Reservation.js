const mongoose = require('mongoose');

// Normalizes a date-only string (e.g. "2024-03-15") to noon UTC,
// preventing the date from shifting to an adjacent day in any timezone.
function toNoonUTC(value) {
    const date = new Date(value);
    date.setUTCHours(12, 0, 0, 0);
    return date;
}

const ReservationMongooseSchema = new mongoose.Schema({
    dateBooked: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        required: true,
    },
    beginDate: {
        type: mongoose.Schema.Types.Date,
        set: toNoonUTC,
        required: true,
    },
    endDate: {
        type: mongoose.Schema.Types.Date,
        set: toNoonUTC,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    downPaymentAmountRequired: {
        type: Number,
    },
    paymentAmountCollected: {
        type: Number,
        default: 0.00
    },
    downPaymentPaid: {
        type: Boolean,
        default: false,
    },
    balance: {
        type: Number,
    },
    paidInFull: {
        type: Boolean,
        default: false,
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
        default: false
    },
    dateCancelled: {
        type: mongoose.Schema.Types.Date,
        required: false,
    }
});

//defining a pre save hook that sets certain values of the reservation based on the payment history for the reservation.
ReservationMongooseSchema.pre('save', function(next) {
    const instance = this;
    //calculate the down payment amount required.
    instance.downPaymentAmountRequired = instance.totalPrice * .50;
    //check to see if the paymentAmountCollected is greater or equal to the downPaymentAmountRequired
    //If it is set the downPaymentPaid boolean to 'true'.  
    if(instance.paymentAmountCollected >= instance.downPaymentAmountRequired) {
        instance.downPaymentPaid = true;
    //other wise we'll leave it at the default value of 'false'.
    }
    //calculate the balance based on the totalPrice and the paymentAmountCollected
    instance.balance = instance.totalPrice - instance.paymentAmountCollected
    //If the balance is less than or equal to 0.00 set the paidInFull boolean to true.
    if(instance.balance <= 0.00) {
        instance.paidInFull = true;
        //otherwise we'll leave it at the default value which is false. 
    } 
    //just do the next function in the callStack (ie: save the data);
    next();
});

module.exports = mongoose.model('Reservation', ReservationMongooseSchema);