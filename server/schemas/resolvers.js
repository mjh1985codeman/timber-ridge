const lodash = require("lodash");
// The root provides a resolver function for each API endpoint
// resolves the requests from the server.  
const mockReservations = [
{
    _id: "jpiohjphioe",
    dateBooked: "5-5-2023",
    beginDate: "6-5-2023",
    endDate: "7-5-2023",
    downPaymentPaid: true,
    downPaymentAmount: 200.00,
    totalPrice: 400.00,
    balance: 200.00,
    paidInFull: false,
    available: false,
    reservedProperty: {
        _id: "eeeeerrrrttt",
        name: "The Lake House",
        booked: true,
        reserveCost: 400.00,
        addressSt: "123 Main St.",
        city: "Nashville",
        state: "TN",
        zip: "37090"
    },
},
{
    _id: "rerererererer",
    dateBooked: "4-5-2023",
    beginDate: "5-5-2023",
    endDate: "9-5-2023",
    downPaymentPaid: true,
    downPaymentAmount: 100.00,
    totalPrice: 1000.00,
    balance: 900.00,
    paidInFull: false,
    available: false,
    reservedProperty: {
        _id: "wwwwwwiiiiiii",
        name: "The Jump House",
        booked: true,
        reserveCost: 1000.00,
        addressSt: "400 Main St.",
        city: "Nashville",
        state: "TN",
        zip: "37090"
    },
},
]

const resolvers = {
    getReservations: () => {
        return mockReservations;
    },
    getReservation: ({_id}) => {
      const id = _id;
      //if using database you would select from the DB by id.
      const reservation = lodash.find(mockReservations, {_id: id});
      return reservation;
    } 
}


  module.exports = resolvers