const {GraphQLScalarType} = require('graphql');
const PropertyMongooseSchema = require('../models/Property');
const CustomerMongooseSchema = require('../models/Customer');

  const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
      }
      throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
      if (typeof value === 'number') {
        return new Date(value); // Convert incoming integer to Date
      }
      throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // Convert hard-coded AST string to integer and then to Date
        return new Date(parseInt(ast.value, 10));
      }
      // Invalid hard-coded value (not an integer)
      return null;
    },
  });

const resolvers = {
    Date: dateScalar,
    //Query's
    Query: {
        getProperties: async () => {
            const properties = await PropertyMongooseSchema.find();
            return properties;
        },

        getProperty: async (parent, args, context, info) => {
            const property = await PropertyMongooseSchema.findById(args._id);
            return property; 
        }
    },

    //Mutations
    Mutation: {
        addProperty: async (args) => {
            const property = await PropertyMongooseSchema.create(args);
            return property;
        },

        addCustomer: async (args) => {
            const customer = await CustomerMongooseSchema.create(args);
            return customer;
        }
    }
};


  module.exports = resolvers;