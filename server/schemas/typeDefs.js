const { buildSchema } = require('graphql');

//defines the data models, query arrangements and mutations.  
const typeDefs = buildSchema(`
  type Reservation {
      _id: String
      dateBooked: String
      beginDate: String
      endDate: String
      downPaymentPaid: Boolean
      downPaymentAmount: Int
      totalPrice: Int
      balance: Int
      paidInFull: Boolean
      available: Boolean
      reservedProperty: Property
  }

  type Property {
    _id: String
    name: String
    booked: Boolean
    reserveCost: Int
    addressSt: String
    city: String
    state: String
    zip: String
  }

  type Customer {
    _id: String
    firstName: String
    lastName: String
    phone: String
    email: String
    password: String
    reservations: [Reservation]
  }

  type Query {
    getReservations: [Reservation],
    getReservation(_id: String): Reservation
  }
`);


module.exports = typeDefs;