
// The root provides a resolver function for each API endpoint
// resolves the requests from the server.  
const resolvers = {
    hello: () => {
      return 'Hello world!';
    },
  };


  module.exports = resolvers