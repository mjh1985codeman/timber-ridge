const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { typeDefs, resolvers } = require("./schemas");


const app = express();
app.use('/graphql', graphqlHTTP({
  schema: typeDefs,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');