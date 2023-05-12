const {GraphQLError} = require('graphql');
const PropertyMongooseSchema = require('../models/Property');
const UserMongooseSchema = require('../models/User');
const ReservationMongooseSchema = require('../models/Reservation');
const s3Actions = require('../utils/s3');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
    //Query's
    Query: {
        getProperties: async () => {
            const properties = await PropertyMongooseSchema.find();
            return properties;
        },

        //parent has to be there even though we aren't using it. 
        getProperty: async (parent, args) => {
            const property = await PropertyMongooseSchema.findById(args._id).exec();
            return property; 
        },

        getPropertyByName: async (parent, args) => {
          const property = await PropertyMongooseSchema.findOne({name: args.name});
          return property;
        },

        getReservations: async (parent, args) => {
            const reservations = await ReservationMongooseSchema.find().populate(
              {path: 'property', model: 'Property'})
              .populate(
              {path: 'customer', model: 'User'});
            return reservations;
        },

        getReservationsByPropertyId: async (parent, args) => {
          const reservations = await ReservationMongooseSchema.find(
            {property: args._id}
          ).populate(
            {path: 'customer', model: 'User'}
          ).populate({path: 'property' , model: 'Property'});
          console.log('reservations by prop id: ' , reservations)
          return reservations;
        },

        getReservation: async (parent, args) => {
            const reservation = await ReservationMongooseSchema.findById(args._id).populate(
              {path: 'property', model: 'Property'})
              .populate(
              {path: 'customer', model: 'User'});
              return reservation;
        },

        getUser: async (parent, args) => {
            const user = await UserMongooseSchema.findById(args._id).populate(
              //THIS IS HOW YOU POPULATE THINGS FOR MODELS THAT HAVE MUTIPLE MODEL REFERENCES.
              {path: 'reservations', model: 'Reservation', populate: {path: 'property' , model: 'Property'}});
            return user; 
        },
        getS3URL: async (parent, {propId}) => {
            const url = await s3Actions.getURL(propId);
            return url;
        }

  },

    //Mutations
    Mutation: {
        addProperty: async (parent, args, context) => {
          if(context.user && context.user.role.toLowerCase() === 'admin') {
            const property = await PropertyMongooseSchema.create(args);
            return property;
          } else {
            throw new AuthenticationError('You must Be Logged in as an Admin to add a Property.')
          }
        },

        addUser: async (parent, args) => {
            const user = await UserMongooseSchema.create(args);
            const token = signToken(user);
            return {token, user};
        },

        login: async (parent, args) => {
            const user = await UserMongooseSchema.findOne({email: args.email});

            if(!user) {
              throw new AuthenticationError('Incorrect email or password.')
            }

            const correctpw = await user.isCorrectPassword(args.password);

            if (!correctpw) {
              throw new AuthenticationError('Incorrect email or Password.')
            }

            const token = signToken(user);
            return {token, user};
        },
        //Again because this mutation is utilizing Mongo's 'ObjectId' property we need the 'parent' argument here
        //even though it's not being used.  
        addReservation: async (parent, args, context) => {
            console.log('context: ' , context);
            const reservation = await ReservationMongooseSchema.create({...args,
              property: args.property,
              customer: args.customer,
            });
            await UserMongooseSchema.findByIdAndUpdate(
              { _id: args.customer},
              { $push: {reservations: reservation._id}},
              {new: true}
            );
            return reservation
        },

        deleteReservation: async (parent, args) => {
          //Grab the customer id associated with the deleted reservation so you can use it to remove
          //the reseravation id from the Customer's reservation array prior to deleting the reservation itself from the table. 
          const resData = await Reservation.findById(args._id);
          if(!resData) {
            throw new GraphQLError("Invalid Reservation Delete Request.");
          }
          const userId = resData.user;
          //delete the reservation from the Reservations table.
          await ReservationMongooseSchema.deleteOne({...args,
          _id: args._id,
          }).then( async res => {
            if(res.deletedCount > 0) {
            //logic here to remove the reservation from the customer's 'reservations' array.
            await UserMongooseSchema.findByIdAndUpdate(
            {_id: userId},
            {$pull: {reservations: args._id}}
            );
            } else {
              throw new GraphQLError('Something Went Wrong');
            }
          });
          console.log('resData on delete mutation: ' , resData);
          return resData;
        }   
    }
};


  module.exports = resolvers;