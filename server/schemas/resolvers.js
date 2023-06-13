const {GraphQLError} = require('graphql');
const PropertyMongooseSchema = require('../models/Property');
const UserMongooseSchema = require('../models/User');
const ReservationMongooseSchema = require('../models/Reservation');
const s3Actions = require('../utils/s3');
const stripeActions = require('../utils/stripe');
const courierActions = require('../utils/courier');
const bcrypt = require('bcryptjs');
const { signToken, verifyToken, verifyTokenBelongsToUser } = require('../utils/auth');
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
          return reservations;
        },

        getUserReservations: async (parent, {email}) => {
          const userData = await UserMongooseSchema.findOne({email: email}
          ).populate(
            //THIS IS HOW YOU POPULATE THINGS FOR MODELS THAT HAVE MUTIPLE MODEL REFERENCES.
            {path: 'reservations', model: 'Reservation', populate: {path: 'property' , model: 'Property'},
            options: { sort: { beginDate: 1 } } // Sort by beginDate date in ascending order
          });
            if(userData) {
              return userData 
            } else {
              throw new GraphQLError("No User Found with this Email.");
            }
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
        },
        getCoverS3URL: async (parent, {propId}) => {
            const url = await s3Actions.getCoverPicURL(propId);
            return url;
        },

        //Stripe Things //
        getClientSecret: async (parent, {resDetails}, context) => {
          const headers = context.rawHeaders;
          let bearerToken;
          if(!resDetails.resDownPaymentAmount) {
            throw new AuthenticationError("You Must Be Logged In and include the necessary resDetails payload.")
          }
          if(headers) {
            //loop through the headers and find the 'Authorization' one and split out the token to grab it.
            for (let i = 0; i < headers.length; i++) {
              if (headers[i] && headers[i].toLowerCase() === 'authorization' && headers[i + 1].startsWith('Bearer ')) {
                bearerToken = headers[i + 1].split(' ')[1];
                //break out of the forloop once we find the token and assign it's value to the bearerToken variable.
                break;
              }
            }
          }
          const verified = verifyTokenBelongsToUser(bearerToken, context.user);
          if(verified) {
            const cSecret = await stripeActions.getStripeClientSecret(resDetails);
            return cSecret;
          } else {
            throw new AuthenticationError("You Must Be Logged In and trying to secure a reservation To Complete this Action.")
          }
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

        getPwResetLink: async (parent, args) => {
          const user = await UserMongooseSchema.findOne({email: args.email});
          if(!user) {
            throw new AuthenticationError('No User with that Email Exists.')
          }
          const token = signToken(user);
          //PRODUCTION
          const emailLink = `https://timber-properties.netlify.app/reset/${token}`;
          //LOCAL DEV
          //const emailLink = `http://localhost:3000/reset/${token}`;
          const resetEmailInput = {
            link: emailLink,
            customerEmail: user.email
          }
          const pwResetRequest = await courierActions.sendPwResetEmail(resetEmailInput);
          return pwResetRequest;
        },

        updateUserPassword: async (parent, args) => {
          //let's verify the token. 
          const tokenVerified = await verifyToken(args.token);
          if(tokenVerified) {
            const emailMatchesToken = tokenVerified.data?.email.toLowerCase() === args.email.toLowerCase();
            if(emailMatchesToken) {
              const user = await UserMongooseSchema.findOne({email: args.email});
              if(user) {
                const newPW = await bcrypt.hash(args.password, 10);
                await user.updateOne({password: newPW});
                return "Password Updated Successfully."
              }
            } else {
              return 'Invalid Token for this User.'
            }
          } else {
            return 'Invalid Token.'
          }
        },

        //Again because this mutation is utilizing Mongo's 'ObjectId' property we need the 'parent' argument here
        //even though it's not being used.  
        addReservation: async (parent, args, context) => {
            //console.log('context for addReservation: ' , context);
            if(context.user) {
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
            } else {
              throw new AuthenticationError("You Must be logged in to add a Reservation.")
            }
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
          //console.log('resData on delete mutation: ' , resData);
          return resData;
        },
        
        sendReservationEmailConfirmation: async (parent, {emailInput}) => {
          const emailRequest = await courierActions.sendEmailConfirmation(emailInput);
          return emailRequest;
      }
    }
};


  module.exports = resolvers;