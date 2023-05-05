const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//mongoose schema (database => mongoose (mapper) => graphQLAPI)
const UserMongooseSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "customer",
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    reservations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Reservation'
    }]
});

// set up pre-save middleware to create password
UserMongooseSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  UserMongooseSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('User', UserMongooseSchema);