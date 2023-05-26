const { CourierClient } = require("@trycourier/courier");
require('dotenv').config();

const courier = CourierClient({ authorizationToken: process.env.COURIER_TOKEN }); // get from the Courier UI

// Example: send a basic message to an email recipient

const courierActions = {
    sendEmailConfirmation: async (emailInput) => {
        console.log(emailInput);
        const { requestId } = await courier.send({
          message: {
            to: {
              email: `${emailInput.customerEmail}`,
            },
            data: {
                checkInDate: emailInput.checkInDate,
                checkOutDate: emailInput.checkOutDate,
                customerName: emailInput.customerName,
                propertyName: emailInput.propertyName,
                propertyAddress: emailInput.propertyAddress,
                totalPrice: emailInput.totalPrice
            },
            template: "7W62FE3N2V45BYKRWHZF1EX4G7AJ",
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

