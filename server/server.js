const connectDB = require('./config/db');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const express = require('express');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config();

const PORT = process.env.PORT || 3001
//creates a new instance of the Express app.  
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false,
  cache: "bounded"
});

async function startServer() {
  try {
    await server.start();
    // Mount our instance of express to our Apollo Server.  
    server.applyMiddleware({ app });
    //connecting to Database: 
    connectDB(); 
  } catch (err) {
    console.error('There was an Error getting the server to start: ' , err);
    return err; 
  }
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up CORS
const corsOptions = {
  //our server will allow requests from the following urls:  
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:3002', 
    'https://studio.apollographql.com', 
    'https://timber-properties.netlify.app'
  ],
  //this is here so that this server allows cookies or other user credentials to be included on cross-origin requests.  
  credentials: true,
};
//mounting our cors options to our express server.  
app.use(cors(corsOptions));

// Define health check endpoint
app.get('/', (req, res) => {
  res.status(200).send("Hello From the Timber Properties API!!!!");
});


app.listen({ port: PORT }, () =>
console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);

startServer();