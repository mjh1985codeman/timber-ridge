const connectDB = require('./config/db');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
require('dotenv').config();
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//connecting to Database: 
connectDB();

const buildServer  = async () => {
    const {url} = await startStandaloneServer(server, {
    listen: {port: PORT},
  });
  console.log(`Server Listening at => ${url}`);
};

buildServer();
