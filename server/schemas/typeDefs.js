//defines the data models, query arrangements and mutations.  
const typeDefs = `#graphql
scalar Date

type Reservation {
  _id: ID!
  dateBooked: Date
  beginDate: Date
  endDate: Date
  downPaymentPaid: Boolean
  totalPrice: Int
  balance: Int
  paidInFull: Boolean
  propertyId: ID
  customerId: ID
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
  firstName: String
  lastName: String
  phone: String
  email: String
  reservations: [Reservation]
}

type Query {
  getProperties: [Property]
  getProperty(_id: ID!): Property
}

type Mutation {
  addProperty(name: String, reserved: Boolean, reserveCost: Int, addressSt: String, city: String, state: String, zip: String, readyToReserve: Boolean, Available: Boolean): Property
  addCustomer(firstName: String, lastName: String, phone: String, email: String): Customer
}
`;


module.exports = typeDefs;