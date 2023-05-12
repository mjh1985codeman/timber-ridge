const connectDB = require('./config/db');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
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

async function startServer() {
  await server.start();
  // Apply Apollo middleware
  server.applyMiddleware({ app }); 
};


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connecting to Database: 
connectDB();

// Set up CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://timber-properties.netlify.app'],
  credentials: true,
};
app.use(cors(corsOptions));

// Define health check endpoint
app.get('/', (req, res) => {
  res.status(200).send("Hello From the Timber Properties API!!!!");
});

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../client/build")));
  
  // Catch all other routes and return the index file
  app.get("*", (req, res) => {
    console.log('catch-all route is being executed');
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.listen({ port: PORT }, () =>
console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);

startServer()