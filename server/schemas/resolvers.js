const {GraphQLScalarType} = require('graphql');
const PropertyMongooseSchema = require('../models/Property');
const CustomerMongooseSchema = require('../models/Customer');
const ReservationMongooseSchema = require('../models/Reservation');

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
        //parent has to be there even though we aren't using it. 
        getProperty: async (parent, args) => {
            const property = await PropertyMongooseSchema.findById(args._id);
            return property; 
        },

        getReservations: async (parent, args) => {
            const reservations = await ReservationMongooseSchema.find().populate(
              {path: 'property', model: 'Property'})
              .populate(
              {path: 'customer', model: 'Customer'});
            return reservations;
        },
        getReservation: async (parent, args) => {
            const reservation = await ReservationMongooseSchema.findById(args._id).populate(
              {path: 'property', model: 'Property'})
              .populate(
              {path: 'customer', model: 'Customer'});
            return reservation;
        },

        getCustomer: async (parent, args) => {
            const customer = await CustomerMongooseSchema.findById(args._id);
            //need to populate the reservation data here for the customer 
            return customer
        }
    },

    //Mutations
    Mutation: {
        addProperty: async (parent, args, context) => {
            const property = await PropertyMongooseSchema.create(args);
            return property;
        },

        addCustomer: async (parent, args, context) => {
            const customer = await CustomerMongooseSchema.create(args);
            return customer;
        },
        //Again because this mution is utilizing Mongo's 'ObjectId' property we need the 'parent' argument here
        //even though it's not being used.  
        addReservation: async (parent, args) => {
        
            const reservation = await ReservationMongooseSchema.create({...args,
              property: args.property,
              customer: args.customer,
            });
            await CustomerMongooseSchema.findByIdAndUpdate(
              { _id: args.customer},
              { $push: {reservations: reservation._id}},
              {new: true}
            );
            return reservation;
        }
    }
};


  module.exports = resolvers;