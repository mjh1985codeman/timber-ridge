const { CourierClient } = require("@trycourier/courier");
require('dotenv').config();

const courier = CourierClient({ authorizationToken: process.env.COURIER_TOKEN }); // get from the Courier UI

// Example: send a basic message to an email recipient

const courierActions = {
    sendEmailConfirmation: async (emailInput) => {
        console.log('emailInput: ' , emailInput);
        //Will need to destructure the customer, property and reservation here.
        // property="The Falcon Get Away."
        // body = 'Your Reservation Request has been submitted!!! We will follow up promptly to make the payment arrangments.'
        // customer = 'mj.hodges1985@gmail.com'
        // reservation = 'check in: date here. . .check out: date here. . .etc.'
        
        const { requestId } = await courier.send({
          message: {
            to: {
              data: {
                name: emailInput.customerName,
              },
              email: `${emailInput.customerEmail}`,
            },
            content: {
              title: `Your Reservation request has been requested!`,
              body: `${emailInput.body}`,
            },
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
        });
        
        // console.log('requestId: ' , requestId);
        return `Email Confirmation Sent!  ${requestId}`;
    } 
};

module.exports = courierActions;

