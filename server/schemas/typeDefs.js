const { buildSchema } = require('graphql');

//defines the query types and datatypes.  
const typeDefs = buildSchema(`
  type Query {
    hello: String
  }
`);


module.exports = typeDefs;