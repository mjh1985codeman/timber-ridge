const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successefully at: ${conn.connection.host}`)
    } catch (error) {
        console.log("**ERROR CONNECTING TO DATABASE** " + error);
    }
};

module.exports = connectDB;