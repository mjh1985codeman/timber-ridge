//defines the data models, query arrangements and mutations.  
const typeDefs = `#graphql
scalar Date

type Reservation {
  _id: ID!
  beginDate: Date
  endDate: Date
  downPaymentPaid: Boolean
  totalPrice: Int
  balance: Int
  paidInFull: Boolean
  property: Property
  customer: Customer
}

type Property {
  _id: ID!
  name: String
  reserved: Boolean
  reserveCost: Int
  addressSt: String
  city: String
  state: String
  zip: String
  readyToReserve: Boolean
  available: Boolean
}

type Customer {
  _id: ID!
  firstName: String
  lastName: String
  phone: String
  email: String
  reservations: [Reservation]
}

type Query {
  getProperties: [Property]
  getProperty(_id: ID!): Property
  getCustomer(_id: ID!): Customer
  getReservation(_id: ID!): Reservation
  getReservations: [Reservation]
}

type Mutation {
  addProperty(name: String, reserved: Boolean, reserveCost: Int, addressSt: String, city: String, state: String, zip: String, readyToReserve: Boolean, available: Boolean): Property
  addCustomer(firstName: String, lastName: String, phone: String, email: String): Customer
  addReservation(beginDate: Date, endDate: Date, downPaymentPaid: Boolean, totalPrice: Int, balance: Int, paidInFfull: Boolean, property: ID, customer: ID): Reservation
}
`;


module.exports = typeDefs;