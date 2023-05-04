const connectDB = require('./config/db');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config();

const PORT = process.env.PORT || 3001
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //will set context to our auth logic once that is done.
  context: authMiddleware, 
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

//connecting to Database: 
connectDB();

const startServer = async () => {
  await server.start();
  
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(express.static(path.join(__dirname, '../client/build')));
  // }

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // });
  

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server),
  );
  
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
}

startServer();