//defines the data models, query arrangements and mutations.  
const typeDefs = `#graphql
scalar Date

type Book {
  title: String
  author: String
}

type Reservation {
  id: ID
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
  id: ID
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
  getBooks: [Book]
}

type Mutation {
  addProperty(name: String, reserved: Boolean, reserveCost: Int, addressSt: String, city: String, state: String, zip: String, readyToReserve: Boolean, Available: Boolean): Property
}

`;


module.exports = typeDefs;