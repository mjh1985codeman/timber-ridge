const { CourierClient } = require("@trycourier/courier");
require('dotenv').config();

const courier = CourierClient({ authorizationToken: process.env.COURIER_TOKEN }); // get from the Courier UI

// Example: send a basic message to an email recipient

const courierActions = {
    sendEmailConfirmation: async (emailInput) => {
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
        return `Email Confirmation Sent!  Courier Request Id: ${requestId}`;
    },
    
    sendPwResetEmail: async (resetEmailInput) => {
      console.log('resetEmailInput: ' , resetEmailInput);

      //get a valid token and the email address needed to get the email. 
      //formulate the link that will be sent to the user that they will utilize to reset the pw.  
      const { requestId } = await courier.send({
        message: {
          to: {
            email: `${resetEmailInput.customerEmail}`,
          },
          data: {
              link: resetEmailInput.link
          },
          template: "6AZ2XESQ83MT9XG4FH1KQCZZG3NY",
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      });
      // console.log('requestId: ' , requestId);
      return `PW Reset Email Sent!  Courier Request Id: ${requestId}`;
    }
};

module.exports = courierActions;

