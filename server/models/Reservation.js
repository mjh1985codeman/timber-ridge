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
        set: function(value) {
         if(value !== null || "" || undefined) {
             const date = new Date(value);
             const easternDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
             easternDate.setUTCHours(5);
             easternDate.setUTCMinutes(5);
             easternDate.setUTCSeconds(5);
             easternDate.setUTCMilliseconds(5);
             return easternDate;
         } else {
            return null
         }
        },
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