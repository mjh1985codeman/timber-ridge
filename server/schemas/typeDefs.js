//defines the data models, query arrangements and mutations.  
const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Money
scalar Date

type Reservation {
  _id: ID!
  beginDate: Date
  endDate: Date
  downPaymentPaid: Boolean
  totalPrice: Money
  balance: Money
  paidInFull: Boolean
  property: Property
  customer: Customer
}

type Property {
  _id: ID!
  name: String
  reserved: Boolean
  reserveCost: Money
  addressSt: String
  city: String
  state: String
  zip: Int
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
  getPropertyByName(name: String!): Property
  getCustomer(_id: ID!): Customer
  getReservation(_id: ID!): Reservation
  getReservations: [Reservation]
  getS3URL(propId: ID!): String
}

type Mutation {
  addProperty(name: String, reserved: Boolean, reserveCost: Money, addressSt: String, city: String, state: String, zip: String, readyToReserve: Boolean, available: Boolean): Property
  addCustomer(firstName: String, lastName: String, phone: String, email: String): Customer
  addReservation(beginDate: Date, endDate: Date, downPaymentPaid: Boolean, totalPrice: Money, balance: Money, paidInFull: Boolean, property: ID, customer: ID): Reservation
  deleteReservation(_id: ID!):Reservation
}
`;


module.exports = typeDefs;