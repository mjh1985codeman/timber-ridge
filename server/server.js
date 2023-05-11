const connectDB = require('./config/db');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const {authMiddleware} = require('./utils/auth');
const express = require('express');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config();

const PORT = process.env.PORT || 3001
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers, 
  context: authMiddleware,
  persistedQueries: false,
  cache: "bounded"
});

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

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
    cors(),
    );

    app.get('/health', (req, res) => {
      res.status(200, res.send("Hello From the Timber Properties API"));
    });

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
  };

startServer();
