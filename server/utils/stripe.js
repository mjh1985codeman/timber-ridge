
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const stripeActions = {
   getStripeClientSecret: async (resDetails) => {
        console.log('resDetails for payment intent: ' , resDetails);
        //have to send the amount to stripe in cents sooooo this is to account for that nonsense: 
        const amount = resDetails.resDownPaymentAmount * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, 
            currency: "usd",
            payment_method_types: ["card"],
            //need to update the resDetails here to include the email of the customer.
            //receipt_email: resDetails.customer.email,
            receipt_email: 'mj.hodges1985@gmail.com',
            description: "This is a Test Bro."
        });
        
        const clientSecret = paymentIntent.client_secret;
        return clientSecret;
   }
};

module.exports = stripeActions;

