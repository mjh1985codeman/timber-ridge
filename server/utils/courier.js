const { CourierClient } = require("@trycourier/courier");
require('dotenv').config();

const courier = CourierClient({ authorizationToken: process.env.COURIER_TOKEN }); // get from the Courier UI

// Example: send a basic message to an email recipient

const courierActions = {
    sendEmailConfirmation: async (emailInput) => {
        const { requestId } = await courier.send({
          message: {
            to: {
              data: {
                name: emailInput.customerName,
              },
              email: `${emailInput.customerEmail}`,
            },
            content: {
              title: `Your Reservation request for ${emailInput.propertyName} has been sent!`,
              
              body: `

                ${emailInput.emailBody}
                
                Property Details:
                ${emailInput.propertyName}
                ${emailInput.propertyAddress}

                CheckIn Date:   ${emailInput.checkInDate}
                CheckOut Date:  ${emailInput.checkOutDate}

                Total Price of Reservation: 
                ${emailInput.totalPrice}

                The Property Owner will be in contact shortly.  In the meantime if you have any questions
                please give them a call at 1-888-888-8888.  

                Thank You!
              `,
            },
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
        });
        
        // console.log('requestId: ' , requestId);
        return `Email Confirmation Sent!  Courier Request Id: ${requestId}`;
    } 
};

module.exports = courierActions;

