const {GraphQLError} = require('graphql');
const PropertyMongooseSchema = require('../models/Property');
const CustomerMongooseSchema = require('../models/Customer');
const ReservationMongooseSchema = require('../models/Reservation');
const Reservation = require('../models/Reservation');
const s3Actions = require('../utils/s3');


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
            const customer = await CustomerMongooseSchema.findById(args._id).populate(
              //THIS IS HOW YOU POPULATE THINGS FOR MODELS THAT HAVE MUTIPLE MODEL REFERENCES.
              {path: 'reservations', model: 'Reservation', populate: {path: 'property' , model: 'Property'}});
            return customer; 
        },
        getS3URL: async (parent, {propId}) => {
            console.log("do you see this here? " , propId);
            const url = await s3Actions.getURL(propId);
            return url;
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
        //Again because this mutation is utilizing Mongo's 'ObjectId' property we need the 'parent' argument here
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
        },

        deleteReservation: async (parent, args) => {
          //Grab the customer id associated with the deleted reservation so you can use it to remove
          //the reseravation id from the Customer's reservation array prior to deleting the reservation itself from the table. 
          const resData = await Reservation.findById(args._id);
          if(!resData) {
            throw new GraphQLError("Invalid Reservation Delete Request.");
          }
          const customerId = resData.customer;
          //delete the reservation from the Reservations table.
          await ReservationMongooseSchema.deleteOne({...args,
          _id: args._id,
          }).then( async res => {
            if(res.deletedCount > 0) {
            //logic here to remove the reservation from the customer's 'reservations' array.
            await CustomerMongooseSchema.findByIdAndUpdate(
            {_id: customerId},
            {$pull: {reservations: args._id}}
            );
            } else {
              throw new GraphQLError('Something Went Wrong');
            }
          });
          return resData;
        }   
    }
};


  module.exports = resolvers;