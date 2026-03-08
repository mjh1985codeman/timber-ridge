
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const stripeActions = {
   getStripeClientSecret: async (resDetails) => {
        const amount = Math.round(resDetails.resDownPaymentAmount * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, 
            currency: "usd",
            payment_method_types: ["card"],
            description: "Timber Properties - Reservation Down Payment"
        });
        
        const clientSecret = paymentIntent.client_secret;
        return clientSecret;
   }
};

module.exports = stripeActions;

