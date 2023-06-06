//defines the data models, query arrangements and mutations.  
const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Reservation {
  _id: ID!
  beginDate: String
  endDate: String
  totalPrice: Float
  downPaymentAmountRequired: Float
  paymentAmountCollected: Float
  downPaymentPaid: Boolean
  balance: Float
  paidInFull: Boolean
  property: Property
  customer: User
  cancelled: Boolean
  dateCancelled: String
}

type Property {
  _id: ID!
  name: String
  reserved: Boolean
  reserveCost: Float
  addressSt: String
  city: String
  state: String
  zip: Int
  readyToReserve: Boolean
  available: Boolean
}

type User {
  _id: ID!
  firstName: String
  lastName: String
  phone: String
  email: String
  role: String
  reservations: [Reservation]
}

type Auth {
  token: ID
  user: User
}

input ReservationEmailInput {
  checkInDate: String!,
  checkOutDate: String!,
  totalPrice: String!,
  customerName: String!,
  customerEmail: String!,
  propertyName: String!,
  propertyAddress: String!,
}

type Query {
  getProperties: [Property]
  getProperty(_id: ID!): Property
  getPropertyByName(name: String!): Property
  getUser(_id: ID!): User
  getReservation(_id: ID!): Reservation
  getReservations: [Reservation]
  getReservationsByPropertyId(_id: ID!): [Reservation]
  getUserReservations(email: String!): User
  getS3URL(propId: ID!): String
  getCoverS3URL(propId: ID!): String
}

type Mutation {
  addProperty(name: String, reserved: Boolean, reserveCost: Float, addressSt: String, city: String, state: String, zip: Int, readyToReserve: Boolean, available: Boolean): Property
  addUser(firstName: String!, lastName: String!, phone: String, email: String!, role: String, password: String!): Auth
  addReservation(
    beginDate: String,
    endDate: String,
    totalPrice: Float,
    downPaymentAmountRequired: Float,
    paymentAmountCollected: Float,
    downPaymentPaid: Boolean,
    balance: Float,
    paidInFull: Boolean,
    property: ID,
    customer: ID,
    cancelled: Boolean,
    dateCancelled: String
  ): Reservation
  deleteReservation(_id: ID!):Reservation
  login(email: String!, password: String!): Auth
  sendReservationEmailConfirmation(emailInput: ReservationEmailInput): String
  getPwResetLink(email: String): String
  updateUserPassword(token: String!, email: String!, password: String!): String
}
`;


module.exports = typeDefs;